import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Achievement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "integer" })
  user_id: number;
}