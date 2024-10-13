import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn} from 'typeorm';
import { User } from '../users/user.entity';
import { ChatRoom } from '../chat_rooms/chat_room.entity';

@Entity('CHAT_MESSAGE')
export class ChatMessage {
  @Column({ type: 'text', nullable: false, })
  content: string;
  
  @Column({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  sent_time: Date;

  @PrimaryColumn()
  user_id: number;

  @PrimaryColumn()
  chat_room_id: number;
  
  @ManyToOne(() => User, (user) => user.chatMessages)
  @JoinColumn({ name: 'user_id' })
  user: User;
  
  @ManyToOne(() => ChatRoom, (chatRoom) => chatRoom.chatMessages)
  @JoinColumn({ name: 'chat_room_id' })
  chatRoom: ChatRoom;
}