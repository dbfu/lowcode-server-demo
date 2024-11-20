import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('column')
export class ColumnEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  modelId: number;
}