import { Module } from '@nestjs/common';
import { CarbonCertificateService } from './carbon-certificate.service';
import { CarbonCertificateController } from './carbon-certificate.controller';
import { CarbonCertificateRepo } from './carbon-certificate.repo';

@Module({
  controllers: [CarbonCertificateController],
  providers: [CarbonCertificateService, CarbonCertificateRepo],
})
export class CarbonCertificateModule {}
