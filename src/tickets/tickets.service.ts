
import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    Logger,
    NotFoundException,
  } from '@nestjs/common';
  import { CreateTicketDto } from './dto/create-ticket.dto';
  import { UpdateTicketDto } from './dto/update-ticket.dto';
  import { InjectRepository } from '@nestjs/typeorm';
  import { DataSource, Repository } from 'typeorm';
  import { PaginationDto } from 'src/common/dto/pagination.dto';
  import { isUUID } from 'class-validator';
  import { TicketImage, Ticket } from './entities';
import { User } from 'src/auth/entities/user.entity';
  
@Injectable()
export class TicketsService {
    private readonly logger = new Logger('TicketsService');
    constructor(
      @InjectRepository(Ticket)
      private readonly productRepository: Repository<Ticket>,
      @InjectRepository(TicketImage)
      private readonly productImageRepository: Repository<TicketImage>,
      private readonly dataSource: DataSource,
    ) {}
  
    async create(createProductDto: CreateTicketDto, user: User) {
      try {
        const { images = [], ...productDetails } = createProductDto;
        const product = this.productRepository.create({
          ...productDetails,
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
  
    async findAll(paginationDto: PaginationDto) {
      const { limit = 10, offset = 0 } = paginationDto;
      const getAllProducts = await this.productRepository.find({
        take: limit,
        skip: offset,
        relations: {
          images: true,
        },
      });
      return getAllProducts.map((product) => ({
        ...product,
        images: product.images.map((img) => img.url),
      }));
    }
  
    async findOne(id: string) {
      let getProduct: Ticket;
      if (isUUID(id)) {
        getProduct = await this.productRepository.findOneBy({ id: id });
      } else {
        const queryBuilder = this.productRepository.createQueryBuilder('prod');
        getProduct = await queryBuilder
          .where('UPPER(title)=:title or slug=:slug', {
            title: id.toUpperCase(),
            slug: id.toLocaleLowerCase(),
          })
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
  
    async update(id: string, updateProductDto: UpdateTicketDto) {
      const { images, ...toUpdate } = updateProductDto;
      const product = await this.productRepository.preload({ id, ...toUpdate });
  
      if (!product) throw new NotFoundException(`Product with ${id} not found!`);
  
      const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();
  
      try {
        if (images) {
          await queryRunner.manager.delete(TicketImage, { product: { id } });
          product.images = images.map((image) =>
            this.productImageRepository.create({ url: image }),
          );
        }
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
