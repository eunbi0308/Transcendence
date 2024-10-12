import { PartialType } from '@nestjs/mapped-types';
import { CreateChatParticipantDto } from './create-chat_participant.dto';

export class UpdateChatParticipantDto extends PartialType(CreateChatParticipantDto) {}