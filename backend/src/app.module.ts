// import { ConfigurableModuleBuilder, Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
// import { USER } from './database/USER/user.entity';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { UserService } from './database/USER/user.service';

// @Module({
//   imports: [
//     TypeOrmModule.forRoot({
//       type: 'postgres',
//       host: 'postgres',
//       port: 5432,
//       username: 'user',
//       password: 'user123',
//       database: 'postgres',
//       entities: [USER],
//       synchronize: true,
//       autoLoadEntities: true
//     }),
//     TypeOrmModule.forFeature([USER], 'USER'),
//     TypeOrmModule.forRootAsync({
//       imports: [ConfigModule],
//       useFactory: (configService: ConfigService) => ({
//         type: 'postgres',
//         host: 'postgres',
//         port: 5432,
//         username: configService.get('DB_USERNAME'),
//         password: configService.get('DB_PASSWORD'),
//         database: configService.get('DB_DATABASE_NAME'),
//       }),
//       inject: [ConfigService],
//     })
//   ],
//   controllers: [AppController],
//   providers: [AppService],
// })
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { Controller } from '@nestjs/common';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE_NAME,
      entities: [],
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
