import { Test, TestingModule } from '@nestjs/testing';
import { UserRepo } from './user.repo';
import { KnexModule } from 'nest-knexjs';
import { KnexConfigService } from '../../config/knex';

describe('UserRepo', () => {
  let repo: UserRepo;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        KnexModule.forRootAsync({
          useClass: KnexConfigService,
        }),
      ],
      providers: [UserRepo],
    }).compile();

    repo = module.get<UserRepo>(UserRepo);
  });

  it('should be defined', () => {
    expect(repo).toBeDefined();
  });

  describe('findOne', () => {
    it('should return undefined', async () => {
      const response = await repo.findOne('email is not in db');
      expect(response).toBe(undefined);
    });

    it('should return internal server error', async () => {
      try {
        await repo.findOne('', 'knex' as any);
      } catch (e) {
        expect(e.message).toBe('Something went wrong!');
        expect(e.status).toBe(500);
      }
    });
  });

  describe('exist', () => {
    it('should return undefined', async () => {
      const response = await repo.exist('id is not in db');
      expect(response).toBe(undefined);
    });

    it('should return internal server error', async () => {
      try {
        await repo.exist('', 'knex' as any);
      } catch (e) {
        expect(e.message).toBe('Something went wrong!');
        expect(e.status).toBe(500);
      }
    });
  });
});
