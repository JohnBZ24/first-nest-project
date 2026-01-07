import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
@Entity({ name: 'url' })
export class Url {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar' })
  originalUrl: string;

  @Column({ type: 'varchar', length: 2048, nullable: true })
  newUrl?: string;

  @CreateDateColumn()
  createdAt: Date;

  constructor(partial: Partial<Url>) {
    Object.assign(this, partial);
  }
}
