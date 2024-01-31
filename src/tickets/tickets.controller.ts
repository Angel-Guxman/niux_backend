import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseUUIDPipe,
    Query,
  } from '@nestjs/common';
import { PaginationDto } from '../common/dto/pagination.dto';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Auth, GetUser } from 'src/auth/decorators';
import { User } from 'src/auth/entities/user.entity';
@Controller('tickets')
export class TicketsController {
    constructor(private readonly ticketsService: TicketsService) {}

    @Post()
    @Auth()
    create(@Body() createServiceDto: CreateTicketDto, @GetUser() user: User) {
      console.log(user)
      return this.ticketsService.create(createServiceDto, user);
    }

    @Get()
    findAll(@Query() paginationDto: PaginationDto) {
      return this.ticketsService.findAll(paginationDto);
    }
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.ticketsService.findOnePlain(id);
    }

    @Patch(':id')
    update(
      @Param('id', ParseUUIDPipe) id: string,
      @Body() updateTicketDto: UpdateTicketDto,
    ) {
      return this.ticketsService.update(id, updateTicketDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseUUIDPipe) id: string) {
      return this.ticketsService.remove(id);
    }
}
