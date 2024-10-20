import { Test, TestingModule } from '@nestjs/testing';
import { AuthUsersService } from './auth_users.service';

describe('AuthUsersService', () => {
  let service: AuthUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthUsersService],
    }).compile();

    service = module.get<AuthUsersService>(AuthUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
