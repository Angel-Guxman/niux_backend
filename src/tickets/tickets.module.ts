import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket, TicketImage } from './entities';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [TicketsService],
  controllers: [TicketsController],
  imports: [TypeOrmModule.forFeature([Ticket, TicketImage]), AuthModule],
  exports: [TicketsService],
})
export class TicketsModule {}
