import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateChatParticipantDto } from './dto/create-chat_participant.dto';
import { UpdateChatParticipantDto } from './dto/update-chat_participant.dto';
import { ChatParticipant } from './chat_participant.entity';

@Injectable()
export class ChatParticipantsService {
  constructor(
    @InjectRepository(ChatParticipant)
    private readonly chatParticipantsRepository: Repository<ChatParticipant>,
  ) {}

  async create(
    createChatParticipantDto: CreateChatParticipantDto,
    ): Promise<ChatParticipant> {
    const chatParticipantData =
      await this.chatParticipantsRepository.create(
        createChatParticipantDto,
      );
    return this.chatParticipantsRepository.save(chatParticipantData);
  }

  async findAll(): Promise<ChatParticipant[]> {
    return await this.chatParticipantsRepository.find();
  }

  async findByChatRoomId(id: number): Promise<ChatParticipant[]> {
    const chatRoomData =
        await this.chatParticipantsRepository.find({
          where: { chatRoom: { id } },
        });
    if (!chatRoomData)
      throw new HttpException(
        'ChatParticipant Not Found',
        404,
      );
    return chatRoomData;
  }

  async findByUserId(userId: number): Promise<ChatParticipant> {
    const userData =
        await this.chatParticipantsRepository.findOne({ 
          where: { user: { id: userId }},
         });
    if (!userData)
        throw new HttpException(
            'ChatParticipant Not Found',
            404,
        );
        return userData;
  }

  async update(id: number, updateChatParticipantDto: UpdateChatParticipantDto,): Promise<ChatParticipant> {
    const existingChatParticipant = await this.findByUserId(id);
    const chatParticipantData = this.chatParticipantsRepository.merge(
        existingChatParticipant,
        updateChatParticipantDto,
    );
    return await this.chatParticipantsRepository.save(
        chatParticipantData,
    );
  }

  async remove(chat_room_id: number): Promise<ChatParticipant[]> {
    const existingChatParticipant = await this.findByChatRoomId( chat_room_id );
    return await this.chatParticipantsRepository.remove(existingChatParticipant,);
  }
}