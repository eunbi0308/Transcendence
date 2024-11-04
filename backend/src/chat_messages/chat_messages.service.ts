import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateChatMessageDto } from './dto/create-chat_message.dto';
import { ChatMessage } from './chat_message.entity';

@Injectable()
export class ChatMessagesService {
  constructor(
    @InjectRepository(ChatMessage)
    private readonly chatMessagesRepository: Repository<ChatMessage>,
  ) {}

  async create(
    createChatMessageDto: CreateChatMessageDto,
    ): Promise<ChatMessage> {
    const chatMessageData =
      await this.chatMessagesRepository.create(
        createChatMessageDto,
      );
    return this.chatMessagesRepository.save(chatMessageData);
  }

  async findAll(): Promise<ChatMessage[]> {
    return await this.chatMessagesRepository.find();
  }

  async findByUserId(userId: number) {
    return this.chatMessagesRepository.find({
        where: { user_id: userId },
    });
}

  async findByChatRoomId(id: number): Promise<ChatMessage[]> {
    const chatRoomData =
        await this.chatMessagesRepository.find({
          where: { chatRoom: { id } },
        });
    if (!chatRoomData)
      throw new HttpException(
        'ChatMessage Not Found',
        404,
      );
    return chatRoomData;
  }

  async findByUserIdAndChatRoomId(userId: number, chatRoomId: number) {
    return this.chatMessagesRepository.find({
        where: {
            user_id: userId,
            chat_room_id: chatRoomId,
        },
    });
}

  async remove(chat_room_id: number): Promise<ChatMessage[]> {
    const existingChatMessage = await this.findByChatRoomId( chat_room_id );
    return await this.chatMessagesRepository.remove(existingChatMessage,);
  }
}