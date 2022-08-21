import { CarbonCertificateStatusEnum } from './carbon-certificate.enum';

export interface CarbonCertificateInterface {
  id: string;
  country: string;
  status: CarbonCertificateStatusEnum;
  owner: any;
}

export interface TransferCertificateInterface {
  recipient_user_id: string;
  carbon_certificate_id: string;
}
