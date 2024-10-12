import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Achievement } from '../achievements/achievement.entity';
import { ChatMessage } from '../chat_messages/chat_message.entity';
import { Friend } from '../friends/friend.entity';
import { Blocked } from 'blockeds/blocked.entity';
import { Game } from 'games/game.entity';
import { ChatParticipant } from 'chat_participants/chat_participant.entity';

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

  @OneToMany(() => Blocked, blocked => blocked.users)
  blockedUsers: Blocked[];

  @OneToMany(() => Blocked, blocked => blocked.blockedUsers)
  users: Blocked[];

  @OneToMany(() => ChatMessage, message => message.users)
  chatMessages: ChatMessage[];

  @OneToMany(() => ChatParticipant, participant => participant.users)
  chatParticipants: ChatParticipant[];

  @OneToMany(() => Friend, friend => friend.person1Users)
  friends1: Friend[];

  @OneToMany(() => Friend, friend => friend.person2Users)
  friends2: Friend[];

  @OneToMany(() => Game, game => game.player1Users)
  players1: Game[];

  @OneToMany(() => Game, game => game.player2Users)
  players2: Game[];

  @OneToMany(() => Game, game => game.player2Users)
  winners: Game[];
}
