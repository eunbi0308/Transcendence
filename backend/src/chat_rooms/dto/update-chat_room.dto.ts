import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-chat_room.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}