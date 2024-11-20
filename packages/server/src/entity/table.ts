import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('table')
export class TableEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;
}