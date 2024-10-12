import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Achievement } from '../achievements/achievement.entity';
import { ChatMessage } from '../chat_messages/chat_message.entity';
import { Friend } from '../friends/friend.entity';

export enum user_status {
	Offline = "offline",
	Online = "online",
	Waiting = "waiting",
	Playing = "playing"
}

@Entity('USER')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

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
  @OneToMany((type) => Achievement, achievement => achievement.users, {
    cascade: true,
  })
  achievements: Achievement[];

  // @OneToMany(() => Blocked, blocked => blocked.user)
  // blockedUsers: Blocked[];

  @OneToMany(() => ChatMessage, message => message.users)
  chatMessages: ChatMessage[];

  // @OneToMany(() => ChatParticipant, participant => participant.user)
  // chatParticipants: ChatParticipant[];

  @OneToMany(() => Friend, friend => friend.person1Users)
  friends1: Friend[];

  @OneToMany(() => Friend, friend => friend.person2Users)
  friends2: Friend[];

  // @OneToMany(() => Game, game => game.player1)
  // gamesAsPlayer1: Game[];

  // @OneToMany(() => Game, game => game.player2)
  // gamesAsPlayer2: Game[];

  // @OneToMany(() => Game, game => game.winner)
  // gamesAsWinner: Game[];
}