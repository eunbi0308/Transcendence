import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
import { User } from '../users/user.entity';

@Entity('CHAT_MESSAGE')
export class ChatMessage {
  @Column({ type: 'text', nullable: false, })
  content: string;
  
  @Column({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  sent_time: Date;
  
  @ManyToOne(() => User, (user) => user.chatMessage)
  @JoinColumn({ name: 'user_id' })
  user_id: User;
  
  @ManyToOne(() => ChatRoom, (chatRoom) => chatRoom.chatMessage)
  @JoinColumn({ name: 'chat_room_id' })
  chat_room_id: number;
}