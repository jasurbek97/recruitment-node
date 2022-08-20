import { Inject, Injectable } from '@nestjs/common';
import { UserInterface } from '../user/user.interface';
import { CarbonCertificateRepo } from './carbon-certificate.repo';
import { CarbonCertificateInterface } from './carbon-certificate.interface';

@Injectable()
export class CarbonCertificateService {
  @Inject() private readonly carbonCertificateRepo: CarbonCertificateRepo;

  list(): Promise<CarbonCertificateInterface[]> {
    return this.carbonCertificateRepo.list();
  }

  listOfOwnCertificates({
    id,
  }: UserInterface): Promise<CarbonCertificateInterface[]> {
    return this.carbonCertificateRepo.listOfOwnCertificates(id);
  }
}
