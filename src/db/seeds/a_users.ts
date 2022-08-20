import { Knex } from 'knex';
import { UserInterface } from '../../modules/user/user.interface';
import { encrypt, generateRecordId } from '../../utils';
import { mockUser } from '../../modules/user/user.repo';
import { users_table } from '../migrations/20220819205703_create_users_table';

export async function seed(knex: Knex): Promise<void> {
  await knex(users_table).del();
  const raws = await generateRaws(10);
  console.table(raws);
  await knex().insert(raws).into(users_table);
}

const generateRaws = async (count): Promise<UserInterface[]> => {
  const data = [mockUser];
  for (let i = 1; i < count; i++) {
    data.push({
      id: generateRecordId(),
      name: 'John' + i,
      surname: 'Doe' + i,
      email: 'john.doe' + i + '@gmail.com',
      password: await encrypt('password'),
    });
  }
  return data;
};
