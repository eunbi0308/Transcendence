import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-chat_room.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(
    createUserDto: CreateUserDto,
    ): Promise<User> {
        const userData =
            await this.usersRepository.create(
                createUserDto,
            );
    return this.usersRepository.save(userData);
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(user_id: number): Promise<User> {
    const userData =
        await this.usersRepository.findOneBy({ user_id });
    if (!userData)
        throw new HttpException(
            'User Not Found',
            404,
        );
        return userData;
  }

  async update(
    id: number,
    UpdateUserDto: UpdateUserDto,
  ): Promise<User> {
    const existingUser = await this.findOne(id);
    const userData = this.usersRepository.merge(
        existingUser,
        UpdateUserDto,
    );
    return await this.usersRepository.save(
        userData,
    );
  }

  async remove(id: number): Promise<User> {
    const existingUser = await this.findOne(id);
    return await this.usersRepository.remove(existingUser,);
  }
}