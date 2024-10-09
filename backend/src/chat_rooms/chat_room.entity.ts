import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ChatMessage } from '../chat_messages/chat_message.entity';

export enum chat_room_types {
	Public = "public",
	Protected = "protected",
	Private = "private"
}

@Entity('CHAT_ROOM')
export class ChatRoom {
  @PrimaryGeneratedColumn()
  chat_room_id: number;
  
  @Column({ nullable: false })
  title: string;
  
  @Column()
  password: string;

  @Column({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  creation_date: Date;

  @Column({
	type: "enum",
	enum: chat_room_types,
	default: 'public',
  })
  chat_room_type: chat_room_types;

  // Relationships
  @OneToMany(() => ChatMessage, chatMessage => chatMessage.chat_room_id)
  chatMessage: ChatMessage[];

}