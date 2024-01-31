import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  import { TicketImage } from './ticket-image.entity';
import { User } from 'src/auth/entities/user.entity';
  
  @Entity('tickets')
  export class Ticket {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    applicant: string;
  
    @Column('text', {
    })
    title: string;

    @Column({
      type: 'text',
      nullable: true,
    })
    description: string;


    @Column({
      type: 'date',
      default: () => 'CURRENT_DATE',
    })
    openingdate: string;

    @Column('text')
    type: string;

    @Column('text',{ nullable: true })
    category?: string;
    

    @Column({type:'text',
    default: 'Nuevo',
  })
    state: string;
    
    
    @Column({ type: 'text',
    default: 'Publico en General',})
    location?:string;
    
    @Column({ type: 'text',
    default: 'Juan Diego Mendoza',})
    technical?: string;


    @Column('text', {
      unique: true,
    })
    slug: string;
  
    @OneToMany(() => TicketImage, (ticketImage) => ticketImage.ticket, {
      cascade: true,
      eager: true,
    })
    images?: TicketImage[];

    @ManyToOne(()=> User, (user)=> user.ticket, {eager: true})
    user: User;
  

  
    @BeforeInsert()
    checkSlugInsert() {
      if (!this.slug) this.slug = this.title;
      this.slug = this.slug
        .toLocaleLowerCase()
        .replaceAll(' ', '_')
        .replaceAll("'", '');
    }
    @BeforeInsert()
    checkTypeInsert() {
      if(this.type)
      this.type = this.type.toLocaleLowerCase();
    }
    @BeforeInsert()
    checkCategoryInsert() {
      if(this.category)
      this.category = this.category.toLocaleLowerCase();
    }

    @BeforeInsert()
    checkStateInsert() {
      if(this.state)
      this.state = this.state.toLocaleLowerCase();
    }

    @BeforeInsert()
    checkLocationInsert() {
      if(this.location)
      this.location = this.location.toLocaleLowerCase();
    }

    @BeforeInsert()
    checkTechnicalInsert() {
      if(this.technical)
      this.technical = this.technical.toLocaleLowerCase();
    }
    
    
  
    @BeforeUpdate()
    checkSlugUpdate() {
      this.slug = this.slug
        .toLocaleLowerCase()
        .replaceAll(' ', '_')
        .replaceAll("'", '');
    }
  }
  