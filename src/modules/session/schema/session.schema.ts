import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Generated,
  BeforeInsert,
} from 'typeorm';

@Entity()
export class SessionTable {
  @PrimaryGeneratedColumn()
  @Generated('increment')
  id: number;

  @Column({ nullable: false, name: 'session_id' })
  sessionId: string;

  @Column({ nullable: false, name: 'user_id' })
  userId: number;

  @Column({
    nullable: false,
    name: 'expiresAt',
  })
  expires_at: Date;

  @BeforeInsert()
  setDefaultExpiresAt() {
    this.expires_at = new Date(Date.now() + 10 * 1000); // 10 seconds for testing
  }
}
