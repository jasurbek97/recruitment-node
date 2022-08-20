import * as dotenv from 'dotenv';
import { Knex } from 'knex';

dotenv.config();

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      user: 'username',
      port: 5432,
      password: 'password',
      database: 'recruitment_node',
    },
    migrations: {
      directory: __dirname + '/migrations',
    },
    seeds: {
      directory: __dirname + '/seeds',
    },
  } as Knex.Config,
};
