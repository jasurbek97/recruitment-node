import { Injectable } from '@nestjs/common';
import { KnexModuleOptions } from 'nest-knexjs/dist/interfaces/knex-options.interface';
import { KnexOptionsFactory } from 'nest-knexjs/dist/interfaces/knex-options-factory.interface';
import { Knex } from 'knex';
import {
  DB_HOST,
  DB_NAME,
  DB_PASS,
  DB_PORT,
  DB_USER,
  MAX_POOL,
} from '../../env';

@Injectable()
export class KnexConfigService implements KnexOptionsFactory {
  createKnexOptions(): Promise<KnexModuleOptions> | KnexModuleOptions {
    return {
      config: {
        client: 'postgresql',
        connection: {
          host: DB_HOST,
          user: DB_USER,
          port: DB_PORT,
          password: DB_PASS,
          database: DB_NAME,
        },
        pool: {
          min: 1,
          max: MAX_POOL,
        },
      } as Knex.Config,
      retryAttempts: 10,
      retryDelay: 10,
    };
  }
}
