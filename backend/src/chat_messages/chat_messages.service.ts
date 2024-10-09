import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateChatMessageDto } from './dto/create-chat_message.dto';
import { UpdateChatMessageDto } from './dto/update-chat_message.dto';
import { ChatMessage } from './chat_message.entity';

@Injectable()
export class ChatMessagesService {
  constructor(
    @InjectRepository(ChatMessage)
    private readonly usersRepository: Repository<ChatMessage>,
  ) {}

  async create(
    createChatMessageDto: CreateChatMessageDto,
    ): Promise<ChatMessage> {
        const userData =
            await this.usersRepository.create(
                createChatMessageDto,
            );
    return this.usersRepository.save(userData);
  }

  async findAll(): Promise<ChatMessage[]> {
    return await this.usersRepository.find();
  }

  // async findOne(user_id: number): Promise<ChatMessage> {
  //   const userData =
  //       await this.usersRepository.findOneBy({ user_id });
  //   if (!userData)
  //       throw new HttpException(
  //           'ChatMessage Not Found',
  //           404,
  //       );
  //       return userData;
  // }

  async findByUserId(userId: number): Promise<ChatMessage[]> {
    return this.createQueryBuilder('chatMessage')
    .where('chatMessage.user_id = :userId')
    .setParameter('userId', userId)
    .getMany();
  }

  async findByChatRoomId(chatRoomId: number): Promise<ChatMessage[]> {
    return this.createQueryBuilder('chatMessage')
      .where('chatMessage.chat_room_id = :chatRoomId')
      .setParameter('chatRoomId', chatRoomId)
      .getMany();
  }

  async update(
    id: number,
    UpdateChatMessageDto: UpdateChatMessageDto,
  ): Promise<ChatMessage> {
    const existingChatMessage = await this.findByChatRoomId(id);
    const chatMessageData = this.chatMessagesRepository.merge(
        existingChatMessage,
        UpdateChatMessageDto,
    );
    return await this.usersRepository.save(
      chatMessageData,
    );
  }

  async remove(id: number): Promise<ChatMessage> {
    const existingChatMessage = await this.findByChatRoomId(id);
    return await this.chatMessagesRepository.remove(existingChatMessage,);
  }
}