import { CarbonCertificateStatusEnum } from './carbon-certificate.enum';

export interface CarbonCertificateInterface {
  id: string;
  country: string;
  status: CarbonCertificateStatusEnum;
  owner: any;
}
