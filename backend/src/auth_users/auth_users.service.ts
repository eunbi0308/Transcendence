import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { User } from '../users/user.entity';

export type User = any;

@Injectable()
export class AuthUsersService {
    constructor(@InjectRepository(User) private UserRepo: Repository<User>) {}

    async updateHashedRefreshToken(userId: number, hashedRefreshToken: string) {

    }

    async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
    }


}
