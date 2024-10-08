import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { 
  DataSource, 
  Repository, 
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  EntityManager,
 } from 'typeorm';
import { USER } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectDataSource('USER')
    private dataSource: DataSource,
    @InjectEntityManager('USER')
    private entityManager: EntityManager,
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

  async createMany(users: USER[]) {
    const queryRunner = this.dataSource.createQueryRunner();
  
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.save(users[0]);
      await queryRunner.manager.save(users[1]);
  
      await queryRunner.commitTransaction();
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
  }
}

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return USER;
  }

  beforeInsert(event: InsertEvent<USER>) {
    console.log(`BEFORE USER INSERTED: `, event.entity);
  }
}
