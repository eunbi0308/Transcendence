import { PartialType } from '@nestjs/mapped-types';
import { CreateBlockedDto } from './create-blocked.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { DeepPartial } from 'typeorm';
import { User } from 'users/user.entity';

export class UpdateBlockedDto extends PartialType(CreateBlockedDto) {}