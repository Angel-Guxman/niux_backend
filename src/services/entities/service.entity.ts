import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';
 
  
  @Entity({ name: 'services' })
  export class Service {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column('text', {
      unique: true,
    })
    title: string;
  
    @Column({
      type: 'text',
      nullable: true,
    })
    description: string;
  
    @Column('text', {
      unique: true,
    })
    slug: string;
  
    @Column('text', {
      default: "Recomendado",
    })
    tags: string;

    @Column('boolean', {
      default: true,
    })
    isActive: boolean;
  
    @Column('text', { nullable: true })
    image: string; // Nueva columna para la imagen
  
    @BeforeInsert()
    checkSlugInsert() {
      if (!this.slug) this.slug = this.title;
      this.slug = this.slug
        .toLocaleLowerCase()
        .replaceAll(' ', '_')
        .replaceAll("'", '');
    }
  
    @BeforeUpdate()
    checkSlugUpdate() {
      this.slug = this.slug
        .toLocaleLowerCase()
        .replaceAll(' ', '_')
        .replaceAll("'", '');
    }
  }
  