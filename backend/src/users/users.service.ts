import {HttpException, Inject, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import JwtConfig from "../auth/config/jwt.config";
import {ConfigType} from "@nestjs/config";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private jwt: JwtService,
    @Inject(JwtConfig.KEY)
    private jwtConfig: ConfigType<typeof JwtConfig>,
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

  async findOne(id: number): Promise<User> {
    const userData =
        await this.usersRepository.findOneBy({ id });
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

  async signToken(id: number): Promise<string> {
    const payload = { sub: id };
    const token = await this.jwt.signAsync(payload, {
      expiresIn: this.jwtConfig.signOptions.expiresIn,
      secret: this.jwtConfig.secret,
    });
    return token;
  }

}