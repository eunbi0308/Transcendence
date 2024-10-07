import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { USER } from './database/USER/user.entity'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      entities: [USER],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})

// @Module({
//   imports: [TypeOrmModule.forRoot(), UsersModule],
// })

export class AppModule {}
