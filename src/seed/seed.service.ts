import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsService } from './../products/products.service';
import { initialData } from './../data/data-seed';
import { User } from '../auth/entities/user.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Brand } from '../brands/entities/brand.entity';

@Injectable()
export class SeedService {
  constructor(
    private readonly productsService: ProductsService,
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async runSeed() {
    await this.deleteTables();
    const adminUser = await this.insertUsers();

    await this.insertCategories();
    await this.insertBrands();

    await this.insertNewProducts(adminUser);

    return 'SEED EXECUTED';
  }

  private async deleteTables() {
    
    await this.productsService.deleteAllProducts();

    const queryBuilder = this.userRepository.createQueryBuilder();
    await queryBuilder.delete().where({}).execute();
    await this.brandRepository
      .createQueryBuilder()
      .delete()
      .where({})
      .execute();
    await this.categoryRepository
      .createQueryBuilder()
      .delete()
      .where({})
      .execute();
  }

  private async insertBrands() {
    const seedBrands = initialData.brands;

    const brands: Brand[] = [];

    seedBrands.forEach((brand) => {
      brands.push(this.brandRepository.create(brand));
    });

    const dbBrands = await this.brandRepository.save(brands);

    return dbBrands[0];
  }

  private async insertCategories() {
    const seedCategories = initialData.categories;

    const categories: Category[] = [];

    seedCategories.forEach((category) => {
      categories.push(this.categoryRepository.create(category));
    });

    const dbCategories = await this.categoryRepository.save(categories);

    return dbCategories[0];
  }

  private async insertUsers() {
    const seedUsers = initialData.users;

    const users: User[] = [];

    seedUsers.forEach((user) => {
      users.push(this.userRepository.create(user));
    });

    const dbUsers = await this.userRepository.save(seedUsers);

    return dbUsers[0];
  }

  private async insertNewProducts(user: User) {
    await this.productsService.deleteAllProducts();

    const products = initialData.products;

    const insertPromises = [];

    products.forEach((product) => {
      insertPromises.push(this.productsService.create(product, user));
    });

    await Promise.all(insertPromises);

    return true;
  }
}
