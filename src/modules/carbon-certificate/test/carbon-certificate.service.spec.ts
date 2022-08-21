import { Test, TestingModule } from '@nestjs/testing';
import { CarbonCertificateService } from '../carbon-certificate.service';
import { CarbonCertificateRepo } from '../carbon-certificate.repo';
import { KnexModule } from 'nest-knexjs';
import { KnexConfigService } from '../../../config/knex';
import { carbonCertificate } from './carbon-certificate.controller.spec';
import { mockUser, UserRepo } from '../../user/user.repo';
import { UserModule } from '../../user/user.module';

describe('CarbonCertificateService', () => {
  let service: CarbonCertificateService;
  let repo: CarbonCertificateRepo;
  let userRepo: UserRepo;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        KnexModule.forRootAsync({
          useClass: KnexConfigService,
        }),
        UserModule,
      ],
      providers: [CarbonCertificateService, CarbonCertificateRepo],
    }).compile();

    module.get<UserModule>(UserModule);
    service = module.get<CarbonCertificateService>(CarbonCertificateService);
    repo = module.get<CarbonCertificateRepo>(CarbonCertificateRepo);
    userRepo = module.get<UserRepo>(UserRepo);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('repo should be defined', () => {
    expect(repo).toBeDefined();
  });

  describe('list', () => {
    it('should return list of carbon certificates', async () => {
      jest
        .spyOn(repo, 'list')
        .mockImplementation(async () => carbonCertificate);
      const response = await service.list();
      expect(response).toStrictEqual(carbonCertificate);
    });
  });

  describe('listOfOwnCertificates', () => {
    it('should return list of own carbon certificates', async () => {
      jest
        .spyOn(repo, 'listOfOwnCertificates')
        .mockImplementation(async () => carbonCertificate);
      const response = await service.listOfOwnCertificates(mockUser);
      expect(response).toStrictEqual(carbonCertificate);
    });
  });

  describe('transfer', () => {
    it('should return carbon certificate not found', async () => {
      try {
        jest.spyOn(repo, 'exist').mockImplementation(async () => undefined);
        const data = {
          recipient_user_id: '',
          carbon_certificate_id: '',
        };
        await service.transfer(data, mockUser);
      } catch (e) {
        expect(e.message).toBe('Carbon Certificate not found!');
        expect(e.status).toBe(404);
      }
    });

    it('should return recipient user not found', async () => {
      try {
        jest
          .spyOn(repo, 'exist')
          .mockImplementation(async () => carbonCertificate[0]);

        jest.spyOn(userRepo, 'exist').mockImplementation(async () => undefined);
        const data = {
          recipient_user_id: '',
          carbon_certificate_id: '',
        };
        await service.transfer(data, mockUser);
      } catch (e) {
        expect(e.message).toBe('Recipient user not found!');
        expect(e.status).toBe(404);
      }
    });

    it('should return transferred carbon certificate', async () => {
      jest
        .spyOn(repo, 'exist')
        .mockImplementation(async () => carbonCertificate[0]);

      const { password, ...recipient } = mockUser;
      jest.spyOn(userRepo, 'exist').mockImplementation(async () => recipient);
      jest
        .spyOn(repo, 'update')
        .mockImplementation(async () => carbonCertificate[0]);

      const data = {
        recipient_user_id: '',
        carbon_certificate_id: '',
      };
      const response = await service.transfer(data, mockUser);
      carbonCertificate[0].owner = recipient;
      expect(response).toBe(carbonCertificate[0]);
    });
  });
});
