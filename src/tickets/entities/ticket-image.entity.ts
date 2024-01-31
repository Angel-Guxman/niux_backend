import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Ticket } from './ticket.entity';

@Entity('ticket_image')
export class TicketImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  url: string;

  @ManyToOne(() => Ticket, (ticket) => ticket.images, {
    onDelete: 'CASCADE',
  })
  ticket: Ticket;
}
