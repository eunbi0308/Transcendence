import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Achievement } from '../achievements/achievement.entity';

export enum user_status {
	Offline = "offline",
	Online = "online",
	Waiting = "waiting",
	Playing = "playing"
}

@Entity('USER')
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ type: "bytea" })
  avatar: Buffer;

  @Column({ nullable: false })
  nickname: string;

  @Column({ default: false })
  is_second_auth_done: boolean;

  @Column({ type: "smallint", nullable: true })
  second_auth_code: number;

  @Column({ nullable: false, })
  second_auth_email: string;

  @Column({
			type: "int",
			nullable: false,
			default: 0 
	})
  ladder_level: number;

  @Column({
	type: "enum",
	enum: user_status,
	default: 'offline',
  })
  user_status: user_status;

  // Relationships
  @OneToMany(() => Achievement, achievement => achievement.user_id)
  achievements: Achievement[];

  // @OneToMany(() => Blocked, blocked => blocked.user)
  // blockedUsers: Blocked[];

  // @OneToMany(() => ChatMessage, message => message.user)
  // chatMessages: ChatMessage[];

  // @OneToMany(() => ChatParticipant, participant => participant.user)
  // chatParticipants: ChatParticipant[];

  // @OneToMany(() => Friend, friend => friend.person1)
  // friends1: Friend[];

  // @OneToMany(() => Friend, friend => friend.person2)
  // friends2: Friend[];

  // @OneToMany(() => Game, game => game.player1)
  // gamesAsPlayer1: Game[];

  // @OneToMany(() => Game, game => game.player2)
  // gamesAsPlayer2: Game[];

  // @OneToMany(() => Game, game => game.winner)
  // gamesAsWinner: Game[];
}