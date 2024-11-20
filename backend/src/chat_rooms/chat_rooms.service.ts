import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateChatRoomDto } from './dto/create-chat_room.dto';
import { UpdateChatRoomDto } from './dto/update-chat_room.dto';
import { ChatRoom } from './chat_room.entity';
import { In } from 'typeorm';

export enum chat_room_types {
	Public = "public",
	Protected = "protected",
	Private = "private",
  Dm = "Dm"
}

@Injectable()
export class ChatRoomsService {
  constructor(
    @InjectRepository(ChatRoom)
    private readonly chatRoomsRepository: Repository<ChatRoom>,
  ) {}

  async create(
    createChatRoomDto: CreateChatRoomDto,
    ): Promise<ChatRoom> {
        const chatRoomData =
            await this.chatRoomsRepository.create(
                createChatRoomDto,
            );
    return this.chatRoomsRepository.save(chatRoomData);
  }

  async findAll(): Promise<ChatRoom[]> {
    return await this.chatRoomsRepository.find();
  }

  async findAllincludeParticipant(): Promise<ChatRoom[]> {
    return await this.chatRoomsRepository.find({
      relations: ['chatParticipants'],
    });
  }

  async findAllWithoutPrivate(): Promise<ChatRoom[]> {
    return await this.chatRoomsRepository.find({
      where: {
        chat_room_type: In(['public', 'protected']),
       },
    });
  }

  async findOne(id: number): Promise<ChatRoom> {
    const chatRoomData =
        await this.chatRoomsRepository.findOneBy({ id });
    if (!chatRoomData)
        throw new HttpException(
            'ChatRoom Not Found',
            404,
        );
        return chatRoomData;
  }

  async update(
    id: number,
    UpdateChatRoomDto: UpdateChatRoomDto,
  ): Promise<ChatRoom> {
    const existingChatRoom = await this.findOne(id);
    const chatRoomData = this.chatRoomsRepository.merge(
        existingChatRoom,
        UpdateChatRoomDto,
    );
    return await this.chatRoomsRepository.save(
        chatRoomData,
    );
  }

  async remove(id: number): Promise<ChatRoom> {
    const existingChatRoom = await this.findOne(id);
    return await this.chatRoomsRepository.remove(existingChatRoom,);
  }
}