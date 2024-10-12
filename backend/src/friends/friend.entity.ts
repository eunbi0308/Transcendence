import { Entity, ManyToOne, JoinColumn} from 'typeorm';
import { User } from '../users/user.entity';

@Entity('FRIENDS')
export class Friend {

  @ManyToOne(() => User, (user) => user.friends1)
  @JoinColumn({ name: 'user_id' })
  person1Users: User[];

  @ManyToOne(() => User, (user) => user.friends2)
  @JoinColumn({ name: 'user_id' })
  person2Users: User[];
}