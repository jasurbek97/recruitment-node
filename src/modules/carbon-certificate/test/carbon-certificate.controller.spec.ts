import { Test, TestingModule } from '@nestjs/testing';
import { CarbonCertificateController } from '../carbon-certificate.controller';
import { CarbonCertificateService } from '../carbon-certificate.service';
import { CarbonCertificateRepo } from '../carbon-certificate.repo';
import { KnexModule } from 'nest-knexjs';
import { KnexConfigService } from '../../../config/knex';
import { CarbonCertificateInterface } from '../carbon-certificate.interface';
import { CarbonCertificateStatusEnum } from '../carbon-certificate.enum';
import { mockUser } from '../../user/user.repo';

export const carbonCertificate: CarbonCertificateInterface[] = [
  {
    id: 'string',
    country: 'string',
    status: CarbonCertificateStatusEnum.owned,
    owner: 'user_id',
  },
];
describe('CarbonCertificateController', () => {
  let controller: CarbonCertificateController;
  let service: CarbonCertificateService;
  let repo: CarbonCertificateRepo;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        KnexModule.forRootAsync({
          useClass: KnexConfigService,
        }),
      ],
      controllers: [CarbonCertificateController],
      providers: [CarbonCertificateService, CarbonCertificateRepo],
    }).compile();

    controller = module.get<CarbonCertificateController>(
      CarbonCertificateController,
    );
    service = module.get<CarbonCertificateService>(CarbonCertificateService);
    repo = module.get<CarbonCertificateRepo>(CarbonCertificateRepo);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('repo should be defined', () => {
    expect(repo).toBeDefined();
  });

  describe('list', () => {
    it('should return list of carbon certificates', async () => {
      const result: CarbonCertificateInterface[] = [
        {
          id: 'string',
          country: 'string',
          status: CarbonCertificateStatusEnum.available,
          owner: null,
        },
      ];

      jest.spyOn(service, 'list').mockImplementation(async () => result);
      expect(await controller.list()).toBe(result);
    });
  });

  describe('listOfOwnCertificates', () => {
    it('should return list of own carbon certificates', async () => {
      jest
        .spyOn(service, 'listOfOwnCertificates')
        .mockImplementation(async () => carbonCertificate);
      expect(await controller.listOfOwnCertificates(mockUser)).toBe(
        carbonCertificate,
      );
    });
  });
});
