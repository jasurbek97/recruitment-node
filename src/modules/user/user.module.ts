import { Module } from '@nestjs/common';
import { UserRepo } from './user.repo';

@Module({
  providers: [UserRepo],
  exports: [UserRepo],
})
export class UserModule {}
