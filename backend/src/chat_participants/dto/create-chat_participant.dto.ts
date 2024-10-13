import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsEnum, IsNumber, IsString, IsBoolean, } from 'class-validator';
import { DeepPartial } from 'typeorm';
import { User } from '../../users/user.entity';
import { PartialType } from '@nestjs/mapped-types';
import { chat_participant_roles, ChatParticipant } from '../../chat_participants/chat_participant.entity';

export class CreateChatParticipantDto extends PartialType(ChatParticipant){
    @ApiProperty({ description: 'chat participant role' })
    @IsEnum(chat_participant_roles)
    chat_pariticipant_role: chat_participant_roles;

    @ApiProperty({ description: 'is banned' })
    @IsBoolean()

    @ApiProperty({ description: 'is muted' })
    @IsBoolean()
    
    @ApiProperty({ description: 'entrance_time' })
    @IsDate()
    @IsNotEmpty()
    entrance_time: Date;
    
    // @ApiProperty({ description: 'user_id' })
    // @IsNotEmpty()
    // @IsNumber()
    // user_id: DeepPartial<User>;

    // @ApiProperty({ description: 'chat_room_id' })
    // @IsNotEmpty()
    // @IsNumber()
    // chat_room_id: DeepPartial<User>;

}