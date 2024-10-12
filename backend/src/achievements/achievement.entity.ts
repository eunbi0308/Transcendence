import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
import { User } from '../users/user.entity';

@Entity('ACHIEVEMENTS')
export class Achievement {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => User, (user) => user.achievements)
  @JoinColumn({ name: 'user_id' })
  users: User[];
}