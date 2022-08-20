import { Controller, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller()
@ApiBearerAuth('Authorization')
@UseGuards(JwtAuthGuard)
export class SecuredController {}
