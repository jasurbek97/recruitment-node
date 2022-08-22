import { Knex } from 'knex';
import { CarbonCertificateStatusEnum } from '../../modules/carbon-certificate/carbon-certificate.enum';

export const carbon_certificate_table = 'carbon_certificate';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(carbon_certificate_table, (table) => {
    table.string('id', 24).primary();
    table.string('country', 255).notNullable();
    table
      .enum('status', Object.values(CarbonCertificateStatusEnum))
      .notNullable();
    table
      .string('owner', 24)
      .nullable()
      .references('id')
      .inTable('users')
      .onDelete('cascade');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(carbon_certificate_table);
}
