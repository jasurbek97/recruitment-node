import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserInterface } from '../user/user.interface';
import { CarbonCertificateRepo } from './carbon-certificate.repo';
import {
  CarbonCertificateInterface,
  TransferCertificateInterface,
} from './carbon-certificate.interface';
import { UserRepo } from '../user/user.repo';
import { CarbonCertificateStatusEnum } from './carbon-certificate.enum';

@Injectable()
export class CarbonCertificateService {
  @Inject() private readonly carbonCertificateRepo: CarbonCertificateRepo;
  @Inject() private readonly userRepo: UserRepo;

  list(): Promise<CarbonCertificateInterface[]> {
    return this.carbonCertificateRepo.list();
  }

  listOfOwnCertificates({
    id,
  }: UserInterface): Promise<CarbonCertificateInterface[]> {
    return this.carbonCertificateRepo.listOfOwnCertificates(id);
  }

  async transfer(
    { carbon_certificate_id, recipient_user_id }: TransferCertificateInterface,
    { id }: UserInterface,
  ) {
    const certificate = await this.carbonCertificateRepo.exist(
      carbon_certificate_id,
      id,
    );

    if (!certificate) {
      throw new NotFoundException('Carbon Certificate not found!');
    }

    const recipient = await this.userRepo.exist(recipient_user_id);
    if (!recipient) {
      throw new NotFoundException('Recipient user not found!');
    }

    const data = {
      owner: recipient_user_id,
      status: CarbonCertificateStatusEnum.transferred,
    };
    const updated_certificate = await this.carbonCertificateRepo.update(
      carbon_certificate_id,
      data,
    );
    updated_certificate['owner'] = recipient;
    return updated_certificate;
  }
}
