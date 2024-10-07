import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { USER } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(USER)
    private userRepository: Repository<USER>,
  ) {}

  findAll(): Promise<USER[]> {
    return this.userRepository.find();
  }

  findOne(user_id: number): Promise<USER | null> {
    return this.userRepository.findOneBy({ user_id });
  }

  async remove(user_id: number): Promise<void> {
    await this.userRepository.delete(user_id);
  }
}