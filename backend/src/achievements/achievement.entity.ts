import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
import { User } from '../users/user.entity';

@Entity('ACHIEVEMENTS')
export class Achievement {
  @PrimaryGeneratedColumn()
  achievement_id: number;

  @ManyToOne(() => User, (user) => user.achievements)
  @JoinColumn({ name: 'user_id' })
  user_id: User;
}