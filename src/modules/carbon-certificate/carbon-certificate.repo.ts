import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';
import { carbon_certificate_table } from '../../db/migrations/20220819205906_create_carbon_certificate_table';
import { CarbonCertificateInterface } from './carbon-certificate.interface';

@Injectable()
export class CarbonCertificateRepo {
  private table = carbon_certificate_table;

  constructor(@InjectConnection() private readonly knex: Knex) {}

  subQuery(knex = this.knex) {
    return knex
      .select(
        knex.raw([
          'c.id as id',
          'country',
          'status',
          `case
           when u.id is not null then jsonb_build_object(
                   'id', u.id,
                   'name', name,
                   'surname', surname,
                   'email', email
               ) end as owner`,
        ]),
      )
      .from(`${this.table} as c`)
      .leftJoin('users as u', 'u.id', 'c.owner');
  }

  async list(knex = this.knex): Promise<CarbonCertificateInterface[] | []> {
    try {
      return await this.subQuery(knex);
    } catch (e) {
      throw new InternalServerErrorException('Something went wrong!');
    }
  }

  async listOfOwnCertificates(
    user_id: string,
    knex = this.knex,
  ): Promise<CarbonCertificateInterface[] | []> {
    try {
      return await this.subQuery(knex).whereRaw(`owner = '${user_id}'`);
    } catch (e) {
      throw new InternalServerErrorException('Something went wrong!');
    }
  }
}
