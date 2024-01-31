import { Body, Controller, Post } from '@nestjs/common';
import { PaysService } from './pays.service';
import { Auth, GetUser } from 'src/auth/decorators';
import { User } from 'src/auth/entities/user.entity';

@Controller('pays')
export class PaysController {
  constructor(private readonly paysService: PaysService) {}

  @Post('create-order')
  @Auth()
  createOrder(@GetUser() user: User, @Body() cart: any) {
    return this.paysService.createOrder(user, cart);
  }

  @Post('webhook')
  webhook(@Body() body: any) {
    if (typeof body === 'object' && body !== null) {
      const payment = body.data;
      const type = body.type;
      if (payment && type) {
        return this.paysService.webhook(payment, type);
      }
    }
  }
}
