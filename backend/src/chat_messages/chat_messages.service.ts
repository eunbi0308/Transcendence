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

  async create(createChatMessageDto: CreateChatMessageDto): Promise<ChatMessage> {
    // Create a new ChatMessage instance from the DTO
    const chatMessageData = this.chatMessagesRepository.create({
      ...createChatMessageDto,
      sent_time: new Date(createChatMessageDto.sent_time), // Convert sent_time string to Date object
    });

    // Save the new chat message to the database
    return await this.chatMessagesRepository.save(chatMessageData);
  }

  async findAll(): Promise<ChatMessage[]> {
    return await this.chatMessagesRepository.find();
  }

  async findByChatRoomId(chatRoomId: number): Promise<ChatMessage[]> {
    const chatRoomData = await this.chatMessagesRepository.find({
      where: { chatRoom: { id: chatRoomId } },
    });

    // If no messages are found, throw a 404 exception
    if (!chatRoomData.length) {
      throw new HttpException('ChatMessage Not Found', 404);
    }
    
    return chatRoomData;
  }

  async remove(chatRoomId: number): Promise<ChatMessage[]> {
    // Find all messages in the specified chat room
    const existingChatMessages = await this.findByChatRoomId(chatRoomId);

    // Remove the messages from the database
    return await this.chatMessagesRepository.remove(existingChatMessages);
  }
}
