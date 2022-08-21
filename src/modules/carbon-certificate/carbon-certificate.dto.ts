import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { TransferCertificateInterface } from './carbon-certificate.interface';

export class TransferCertificateDto implements TransferCertificateInterface {
  @ApiProperty({ default: '630024adbcfb05627f059113' })
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @MaxLength(24)
  carbon_certificate_id: string;

  @ApiProperty({ default: '630024acbcfb05627f0590e8' })
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @MaxLength(24)
  recipient_user_id: string;
}
