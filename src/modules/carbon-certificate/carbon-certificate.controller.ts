import { Body, Controller, HttpCode, Inject, Post } from '@nestjs/common';
import { CarbonCertificateService } from './carbon-certificate.service';
import { SecuredController } from '../secured.controller';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../common/current-user.decorator';
import { UserInterface } from '../user/user.interface';
import { CarbonCertificateInterface } from './carbon-certificate.interface';
import { TransferCertificateDto } from './carbon-certificate.dto';

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

  @ApiOperation({
    summary:
      'Transfer my own Carbon certificate to the another existing user (based on the User ID parameter)',
  })
  @ApiBody({ type: TransferCertificateDto })
  @Post('transfer')
  @HttpCode(200)
  transfer(
    @Body() payload: TransferCertificateDto,
    @CurrentUser() user: UserInterface,
  ): Promise<CarbonCertificateInterface> {
    return this.carbonCertificateService.transfer(payload, user);
  }
}
