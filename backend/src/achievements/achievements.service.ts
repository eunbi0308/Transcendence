import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAchievementDto } from './dto/create-achievement.dto';
import { UpdateAchievementDto } from './dto/update-achievement.dto';
import { Achievement } from './achievement.entity';

@Injectable()
export class AchievementsService {
  constructor(
    @InjectRepository(Achievement)
    private readonly usersRepository: Repository<Achievement>,
  ) {}

  async create(
    createAchievementDto: CreateAchievementDto,
    ): Promise<Achievement> {
        const userData =
            await this.usersRepository.create(
                createAchievementDto,
            );
    return this.usersRepository.save(userData);
  }

  async findAll(): Promise<Achievement[]> {
    return await this.usersRepository.find();
  }

  async findOne(achievement_id: number): Promise<Achievement> {
    const userData =
        await this.usersRepository.findOneBy({ achievement_id });
    if (!userData)
        throw new HttpException(
            'Achievement Not Found',
            404,
        );
        return userData;
  }

  async update(
    id: number,
    UpdateAchievementDto: UpdateAchievementDto,
  ): Promise<Achievement> {
    const existingAchievement = await this.findOne(id);
    const userData = this.usersRepository.merge(
        existingAchievement,
        UpdateAchievementDto,
    );
    return await this.usersRepository.save(
        userData,
    );
  }

  async remove(id: number): Promise<Achievement> {
    const existingAchievement = await this.findOne(id);
    return await this.usersRepository.remove(existingAchievement,);
  }
}