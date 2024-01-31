
  import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    Logger,
    NotFoundException,
  } from '@nestjs/common';
  import { CreateServiceDto } from './dto/create-service.dto';
  import { UpdateServiceDto } from './dto/update-service.dto';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository } from 'typeorm';
  import { PaginationDto } from 'src/common/dto/pagination.dto';
  import { isUUID } from 'class-validator';
  import { Service } from './entities';


  @Injectable()
  export class ServicesService {
    private readonly logger = new Logger('ServicesService');

    constructor(
      @InjectRepository(Service)
      private readonly serviceRepository: Repository<Service>,
    ) {}

    async create(createServiceDto: CreateServiceDto, image: Express.Multer.File) {
      try {
        if (!image || !image.originalname) {
          throw new BadRequestException('Image is required.');
        }
        const service = this.serviceRepository.create({
          ...createServiceDto,
          image: image.originalname, // Asigna la URL de la imagen
        });

        await this.serviceRepository.save(service);
        return service;
      } catch (error) {
        this.handleDBExceptions(error);
      }
    }

    async findAll(paginationDto: PaginationDto) {
      const { limit = 10, offset = 0 } = paginationDto;
      return await this.serviceRepository.find({
        take: limit,
        skip: offset,
      });
    }

    async findOne(id: string) {
      let getService: Service;
      if (isUUID(id)) {
        getService = await this.serviceRepository.findOneBy({ id: id });
      } else {
        const queryBuilder = this.serviceRepository.createQueryBuilder('serv');
        getService = await queryBuilder
          .where('UPPER(title)=:title or slug=:slug', {
            title: id.toUpperCase(),
            slug: id.toLocaleLowerCase(),
          })
          .getOne();
      }
      if (!getService) {
        throw new NotFoundException(`Service with id or slug ${id} not found!`);
      }
      return getService;
    }

    async update(id: string, updateServiceDto: UpdateServiceDto) {
      const service = await this.serviceRepository.preload({ id, ...updateServiceDto });

      if (!service) throw new NotFoundException(`Service with ${id} not found!`);

      await this.serviceRepository.save(service);
      return this.findOne(id);
    }

    async remove(id: string) {
      const result = await this.serviceRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`Service with id ${id} not found.`);
      }
      return { message: `Service with id ${id} deleted successfully.` };
    }
    private handleDBExceptions(error: any) {
      if (error.code === '23505') throw new BadRequestException(error.detail);
      this.logger.error(error);
      throw new InternalServerErrorException(
        'Unexpected error! Check server logs.',
      );
    }
  }
