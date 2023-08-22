import { Entity, Column, PrimaryGeneratedColumn, Generated } from 'typeorm';

@Entity()
export class CategoryTable {
  @PrimaryGeneratedColumn()
  @Generated('increment')
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, length: 225 })
  description: string;
}
