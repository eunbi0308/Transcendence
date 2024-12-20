import {HttpException, Inject, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import JwtConfig from "../config/jwt.config";
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

  async checkToken(id: number): Promise<string> {
    const payload = { sub: id };
    const token = await this.jwt.signAsync(payload, {
      expiresIn: this.jwtConfig.signOptions.expiresIn,
      secret: this.jwtConfig.checkSecret,
    });
    return token;
  }

  async getUserIdFromCookie(token: any): Promise<number> {
    if (!token) {
        throw new HttpException('No JWT token found', 401);
    }
    const decodedToken = this.jwt.decode(token);
    if (!decodedToken || typeof decodedToken !== 'object') {
        throw new HttpException('Invalid JWT token', 401);
    }

    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    if (decodedToken.exp < currentTime) {
    throw new HttpException('JWT token has expired', 401);
    }

    return decodedToken.sub;
  }

  async setTwoFactorAuthenticationSecret(secret: string, userId: number): Promise<UpdateResult> {
    return this.usersRepository.update(userId, {
      two_factor_auth_secret: secret,
    });
  }

  async turnOnTwoFactorAuthentication(userId: number): Promise<UpdateResult> {
    return await this.usersRepository.update(userId, {
      enable_two_factor: true,
    });
  }

  async turnOffTwoFactorAuthentication(userId: number): Promise<UpdateResult> {
    return await this.usersRepository.update(userId, {
      // 유저가 2fa 활성화 여부를 끄게 되면 시크릿값또한 null로 수정하여 준다.
      two_factor_auth_secret: null,
      enable_two_factor: false,
    })
  }
}