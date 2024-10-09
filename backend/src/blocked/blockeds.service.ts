import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBlockedDto } from './dto/create-blocked.dto';
import { UpdateBlockedDto } from './dto/update-blocked.dto';
import { Blocked } from './blocked.entity';

@Injectable()
export class BlockedsService {
  constructor(
    @InjectRepository(Blocked)
    private readonly usersRepository: Repository<Blocked>,
  ) {}

  async create(
    createBlockedDto: CreateBlockedDto,
    ): Promise<Blocked> {
        const userData =
            await this.usersRepository.create(
                createBlockedDto,
            );
    return this.usersRepository.save(userData);
  }

  async findAll(): Promise<Blocked[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: number): Promise<Blocked> {
    const userData =
        await this.usersRepository.findOneBy({ id });
    if (!userData)
        throw new HttpException(
            'Blocked Not Found',
            404,
        );
        return userData;
  }

  async update(
    id: number,
    UpdateBlockedDto: UpdateBlockedDto,
  ): Promise<Blocked> {
    const existingBlocked = await this.findOne(id);
    const userData = this.usersRepository.merge(
        existingBlocked,
        UpdateBlockedDto,
    );
    return await this.usersRepository.save(
        userData,
    );
  }

  async remove(id: number): Promise<Blocked> {
    const existingBlocked = await this.findOne(id);
    return await this.usersRepository.remove(existingBlocked,);
  }
}