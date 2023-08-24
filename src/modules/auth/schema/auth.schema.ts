import { Entity, Column, PrimaryGeneratedColumn, Generated } from 'typeorm';

@Entity()
export class AuthTable {
  @PrimaryGeneratedColumn()
  @Generated('increment')
  id: number;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;
}
