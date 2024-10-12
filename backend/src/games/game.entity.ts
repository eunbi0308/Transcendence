import { Entity, ManyToOne, JoinColumn, Column} from 'typeorm';
import { User } from '../users/user.entity';

@Entity('GAME')
export class Game {

  @ManyToOne(() => User, (user) => user.players1)
  @JoinColumn({ name: 'user_id' })
  player1Users: User[];

  @ManyToOne(() => User, (user) => user.players2)
  @JoinColumn({ name: 'user_id' })
  player2Users: User[];

  @ManyToOne(() => User, (user) => user.winners)
  @JoinColumn({ name: 'user_id' })
  winners: User[];

  @Column({ length: length, nullable: false, default: false, })
  is_ladder_game: boolean;  
}
