import { Controller, HttpCode, Inject, Post } from '@nestjs/common';
import { CarbonCertificateService } from './carbon-certificate.service';
import { SecuredController } from '../secured.controller';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../common/current-user.decorator';
import { UserInterface } from '../user/user.interface';
import { CarbonCertificateInterface } from './carbon-certificate.interface';

@Controller('carbon-certificate')
@ApiTags('Carbon Certificate')
export class CarbonCertificateController extends SecuredController {
  @Inject() private readonly carbonCertificateService: CarbonCertificateService;

  @ApiOperation({ summary: 'List of available Carbon certificates (no owner)' })
  @Post('list')
  @HttpCode(200)
  list(): Promise<CarbonCertificateInterface[]> {
    return this.carbonCertificateService.list();
  }

  @ApiOperation({
    summary: 'List of owned Carbon certificates (owned by current user)',
  })
  @Post('own-certificate-list')
  @HttpCode(200)
  listOfOwnCertificates(
    @CurrentUser() user: UserInterface,
  ): Promise<CarbonCertificateInterface[]> {
    return this.carbonCertificateService.listOfOwnCertificates(user);
  }
}
