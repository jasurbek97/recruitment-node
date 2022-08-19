import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { KnexConfigService } from './config/knex';
import { KnexModule } from 'nest-knexjs';

@Module({
  imports: [
    KnexModule.forRootAsync({
      useClass: KnexConfigService,
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
