import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()  // Marks this class as an entity
export class Bike {
  @PrimaryGeneratedColumn('uuid')  // Auto-generated UUID for each bike
  id: string;

  @Column()  // String column for make
  make: string;

  @Column()  // String column for model
  model: string;

  @Column()  // Number column for year
  year: number;

  @Column()  // String column for type
  type: string;
}