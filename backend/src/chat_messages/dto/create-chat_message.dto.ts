import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateChatMessageDto {
    @ApiProperty({ description: 'Content of the message' })
    @IsNotEmpty()
    @IsString()
    content: string;

    @ApiProperty({ description: 'Time when the message was sent' })
    @IsNotEmpty()
    @IsString() // Change this to IsString
    sent_time: string; // Change this to string

    @ApiProperty({ description: 'ID of the user sending the message' })
    user_id: number;

    @ApiProperty({ description: 'ID of the chat room where the message is sent' })
    chat_room_id: number;
}
