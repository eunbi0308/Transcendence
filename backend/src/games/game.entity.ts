import { Entity, ManyToOne, JoinColumn, Column, PrimaryColumn} from 'typeorm';
import { User } from '../users/user.entity';

@Entity('GAME')
export class Game {

  @PrimaryColumn()
  player1_user_id: number;
  
  @PrimaryColumn()
  player2_user_id: number;

  @PrimaryColumn()
  winner_user_id: number;
  
  @ManyToOne(() => User, (user) => user.players1)
  @JoinColumn({ name: 'player1_user_id' })
  player1User: User;

  @ManyToOne(() => User, (user) => user.players2)
  @JoinColumn({ name: 'player2_user_id' })
  player2User: User;

  @ManyToOne(() => User, (user) => user.winners)
  @JoinColumn({ name: 'winner_user_id' })
  winner: User;

  @Column({ nullable: false, default: false, })
  is_ladder_game: boolean;  
}
