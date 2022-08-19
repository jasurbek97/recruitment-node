import { Test, TestingModule } from '@nestjs/testing';
import { UserRepo } from './user.repo';

describe('UserRepo', () => {
  let repo: UserRepo;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserRepo],
    }).compile();

    repo = module.get<UserRepo>(UserRepo);
  });

  it('should be defined', () => {
    expect(repo).toBeDefined();
  });
});
