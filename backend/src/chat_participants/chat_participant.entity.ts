import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
import { User } from '../users/user.entity';
import { ChatRoom } from '../chat_rooms/chat_room.entity';

export enum chat_participant_roles {
  Owner = "owner",
  Admin = "admin",
  Guest = "guest"
}

@Entity('CHAT_PARTICIPANT')
export class ChatParticipant {
  @Column({
    type: 'enum',
    nullable: false,
    default: 'guest',
  })
  chat_pariticipant_role: chat_participant_roles

  @Column({ default: false, })
  is_banned: boolean;

  @Column({ default: false })
  is_muted: boolean;

  @Column({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  entrance_time: Date;
  
  @ManyToOne(() => User, (user) => user.chatParticipants)
  @JoinColumn({ name: 'user_id' })
  users: User;
  
  @ManyToOne(() => ChatRoom, (chatRoom) => chatRoom.chatParticipants)
  @JoinColumn({ name: 'chat_room_id' })
  chatRooms: ChatRoom;
}