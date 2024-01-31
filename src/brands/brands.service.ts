import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandsService {
  private readonly logger = new Logger('BrandsService');
  constructor(
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
  ) {}

  async create(createBrandDto: CreateBrandDto) {
    try {
      const brand = this.brandRepository.create(createBrandDto);
      await this.brandRepository.save(brand);
      return brand;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll() {
    return this.brandRepository.find();
  }

  async findOne(id: string) {
    const brand = await this.brandRepository.findOneBy({ id });
    if (!brand) throw new NotFoundException(`Brand with ${id} not found!`);
    return brand;
  }

  async update(id: string, updateBrandDto: UpdateBrandDto) {
    try {
      const brand = await this.brandRepository.preload({id, ...updateBrandDto});
      if (!brand) throw new NotFoundException(`Brand with ${id} not found!`);

      return await this.brandRepository.save(brand);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    const { affected } = await this.brandRepository.delete(id);
    if (affected === 0)
      throw new BadRequestException(`Brand with id ${id} not found!`);
    return `Brand with id ${id} deleted`;
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);
    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error! Check server logs.',
    );
  }
}
