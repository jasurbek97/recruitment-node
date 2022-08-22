import { Knex } from 'knex';

export const users_table = 'users';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(users_table, (table) => {
    table.string('id', 24).primary();
    table.string('name', 255).notNullable();
    table.string('surname', 255).nullable();
    table.string('email', 255).unique().index().notNullable();
    table.string('password', 100).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(users_table);
}
