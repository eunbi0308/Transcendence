import {Entity, Column, OneToMany, PrimaryColumn} from 'typeorm';
import { Achievement } from '../achievements/achievement.entity';
import { ChatMessage } from '../chat_messages/chat_message.entity';
import { Friend } from '../friends/friend.entity';
import { Blocked } from '../blockeds/blocked.entity';
import { Game } from '../games/game.entity';
import { ChatParticipant } from '../chat_participants/chat_participant.entity';
import { IsOptional } from 'class-validator';

export enum user_status {
	Offline = "offline",
	Online = "online",
	Waiting = "waiting",
	Playing = "playing"
}

@Entity('USER')
export class User {
  @PrimaryColumn()
  id: number;

  @Column({ type: "bytea", nullable: false })
  @IsOptional()
  avatar: Buffer;

  @Column({ nullable: true })
  nickname: string;

  @Column({ default: false })
  enable_two_factor: boolean;

  @Column({ default: false })
  is_second_auth_done: boolean;

  @Column({ type: "smallint", nullable: true })
  second_auth_code: number;

  @Column({ nullable: false, })
  email: string;

  @Column({
			type: "int",
			nullable: false,
			default: 0 
	})
  @IsOptional()
  ladder_level: number;

  @Column({
	type: "enum",
	enum: user_status,
	default: 'offline',
  })
  @IsOptional()
  user_status: user_status;

  // Relationships
  @OneToMany(() => Achievement, achievement => achievement.user,)
  achievements: Achievement[];

  @OneToMany(() => Blocked, blocked => blocked.user)
  blockedUsers: Blocked[];

  @OneToMany(() => Blocked, blocked => blocked.blockedUser)
  users: Blocked[];

  @OneToMany(() => ChatMessage, message => message.user)
  chatMessages: ChatMessage[];

  @OneToMany(() => ChatParticipant, participant => participant.user)
  chatParticipants: ChatParticipant[];

  @OneToMany(() => Friend, friend => friend.person1User)
  friends1: Friend[];

  @OneToMany(() => Friend, friend => friend.person2User)
  friends2: Friend[];

  @OneToMany(() => Game, game => game.player1User)
  players1: Game[];

  @OneToMany(() => Game, game => game.player2User)
  players2: Game[];

  @OneToMany(() => Game, game => game.player2User)
  winners: Game[];
}
