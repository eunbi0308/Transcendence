import { Entity, ManyToOne, JoinColumn, Column} from 'typeorm';
import { User } from '../users/user.entity';

@Entity('BLOCKED')
export class Blocked {

  @Column({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  blocked_time: Date;

  @ManyToOne(() => User, (user) => user.blockedUsers)
  @JoinColumn({ name: 'user_id' })
  blockedUsers: User[];

  @ManyToOne(() => User, (user) => user.users)
  @JoinColumn({ name: 'user_id' })
  users: User[];
}