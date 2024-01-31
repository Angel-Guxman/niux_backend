import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { User } from 'src/auth/entities/user.entity';
import { OrderProduct } from './entities/order-products.entity';

@Injectable()
export class OrdersService {
  private readonly logger = new Logger('OrdersService');

  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderProduct)
    private readonly orderProductRepository: Repository<OrderProduct>,
  ) {}
  async create(createOrderDto: CreateOrderDto, user: User) {
    const { products, quantity, ...orderDetails } = createOrderDto;
    try {
      const order = this.orderRepository.create({
        user,
        ...orderDetails,
        orderProducts: products.map((product) =>
          this.orderProductRepository.create({
            product: { id: product },
            quantity: quantity[products.indexOf(product)],
          }),
        ),
      });
      await this.orderRepository.save(order);

      return order;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  findAll() {
    return this.orderRepository.find({
      where: { isActive: true },
    });
  }

  async findOrderPerUser(userId: string) {
    return await this.orderRepository.find({
      where: {
        user: { id: userId },
      },
      select: ['id', 'status', 'total', 'createdAt'],
      loadRelationIds: false,
      loadEagerRelations: true,
      relations: ['orderProducts'],
      order: {
        createdAt: 'DESC',
      }
    });
  }

  async findRecent(userId: string) {
    const order = await this.orderRepository.findOne({
      where: {
        user: { id: userId },
      },
      order: {
        createdAt: 'DESC',
      },
    });
    return order;
  }

  findOne(id: number) {
    return this.orderRepository.findOneBy({ id });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    try {
      const order = await this.orderRepository.preload({
        id,
        ...updateOrderDto,
      });
      if (!order) throw new NotFoundException(`Order with ${id} not found!`);

      return await this.orderRepository.save(order);
    } catch (error) {
      this.handleDBExceptions(error);
    }
    return `This action updates a #${id} order`;
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);
    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error! Check server logs.',
    );
  }
}
