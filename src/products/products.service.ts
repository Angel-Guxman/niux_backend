import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { isUUID } from 'class-validator';
import { ProductImage, Product } from './entities';
import { User } from 'src/auth/entities/user.entity';
import { Brand } from 'src/brands/entities/brand.entity';
import { Category } from '../categories/entities/category.entity';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger('ProductsService');
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>,
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private readonly dataSource: DataSource,
  ) {}

  async create(createProductDto: CreateProductDto, user: User) {
    const {
      images = [],
      brand,
      category,
      ...productDetails
    } = createProductDto;

    const brandId: string = brand as unknown as string;
    const categoryId: string = category as unknown as string;

    const findBrand = await this.brandRepository.findOneBy({ id: brandId });
    if (!findBrand)
      throw new NotFoundException(`Brand with id ${brand} not found!`);

    const findCategory = await this.categoryRepository.findOneBy({
      id: categoryId,
    });

    if (!findCategory)
      throw new NotFoundException(`Category with id ${category} not found!`);

    try {
      const product = this.productRepository.create({
        ...productDetails,
        brand,
        category,
        images: images.map((image) =>
          this.productImageRepository.create({ url: image }),
        ),
        user,
      });
      await this.productRepository.save(product);
      return { ...product, images };
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findProductById(productId: string): Promise<Product | null> {
    return await this.productRepository.findOneBy({ id: productId });
  }

  async findAllByCategory(id: string) {
    const findCategory = await this.categoryRepository.findOneBy({ id });
    if (!findCategory)
      throw new NotFoundException(`Category with id ${id} not found!`);

    const products = await this.productRepository.find({
      where: { category: { id } },
    });

    return products.map((product) => ({
      ...product,
      images: product.images.map((img) => img.url),
    }));
  }

  async findAllByBrand(id: string) {
    const findBrand = await this.brandRepository.findOneBy({ id });
    if (!findBrand)
      throw new NotFoundException(`Brand with id ${id} not found!`);

    const products = await this.productRepository.find({
      where: { brand: { id } },
    });

    return products.map((product) => ({
      ...product,
      images: product.images.map((img) => img.url),
    }));
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 40, offset = 0 } = paginationDto;
    const getAllProducts = await this.productRepository.find({
      take: limit,
      skip: offset,
      relations: {
        brand: true,
        category: true,
        images: true,
      },
    });
    return getAllProducts.map((product) => ({
      ...product,
      images: product.images.map((img) => img.url),
    }));
  }

  async findOne(id: string) {
    let getProduct: Product;
    if (isUUID(id)) {
      getProduct = await this.productRepository.findOneBy({ id: id });
    } else {
      const queryBuilder = this.productRepository.createQueryBuilder('prod');
      getProduct = await queryBuilder
        .where('UPPER(title)=:title or slug=:slug', {
          title: id.toUpperCase(),
          slug: id.toLocaleLowerCase(),
        })
        .leftJoinAndSelect('prod.brand', 'prodBrands')
        .leftJoinAndSelect('prod.category', 'prodCategories')
        .leftJoinAndSelect('prod.images', 'prodImages')
        .getOne();
    }
    if (!getProduct) {
      throw new NotFoundException(`Product with id or slug ${id} not found!`);
    }
    return getProduct;
  }

  async findOnePlain(term: string) {
    const { images = [], ...rest } = await this.findOne(term);
    return {
      ...rest,
      images: images.map((img) => img.url),
    };
  }

  async update(id: string, updateProductDto: UpdateProductDto, user: User) {
    const { images, ...toUpdate } = updateProductDto;
    const product = await this.productRepository.preload({ id, ...toUpdate });

    if (!product) throw new NotFoundException(`Product with ${id} not found!`);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      if (images) {
        await queryRunner.manager.delete(ProductImage, { product: { id } });
        product.images = images.map((image) =>
          this.productImageRepository.create({ url: image }),
        );
      }

      product.user = user;
      await queryRunner.manager.save(product);
      await queryRunner.commitTransaction();
      await queryRunner.manager.release();

      return this.findOnePlain(id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    const { affected } = await this.productRepository.delete(id);
    if (affected === 0)
      throw new BadRequestException(`Product with id ${id} not found!`);
    return `Product with id ${id} deleted`;
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);
    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error! Check server logs.',
    );
  }

  async deleteAllProducts() {
    const query = this.productRepository.createQueryBuilder('product');
    try {
      return await query.delete().where({}).execute();
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }
}
