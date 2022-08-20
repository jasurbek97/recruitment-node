import { Knex } from 'knex';
import { carbon_certificate_table } from '../migrations/20220819205906_create_carbon_certificate_table';
import { CarbonCertificateInterface } from '../../modules/carbon-certificate/carbon-certificate.interface';
import { generateRecordId } from '../../utils';
import { CarbonCertificateStatusEnum } from '../../modules/carbon-certificate/carbon-certificate.enum';
import { users_table } from '../migrations/20220819205703_create_users_table';

export async function seed(knex: Knex): Promise<void> {
  await knex(carbon_certificate_table).del();
  const user_ids = await knex(users_table).select('id').limit(5);
  const raws = await generateRaws(100, user_ids);
  console.table(raws);
  await knex(carbon_certificate_table).insert(raws);
}

const generateRaws = async (
  count: number,
  user_ids: string[],
): Promise<CarbonCertificateInterface[]> => {
  const countries = [
    'Canada',
    'Japan',
    'Germany',
    'Switzerland',
    'Australia',
    'United States',
    'New Zealand',
    'United Kingdom',
  ];
  const data = [];

  for (let i = 1; i <= count; i++) {
    const item = {
      id: generateRecordId(),
      country: countries[Math.floor(Math.random() * countries.length)],
      status: CarbonCertificateStatusEnum.available,
      owner: null,
    };
    if (i > 30 && i < 60) {
      item.status = CarbonCertificateStatusEnum.owned;
      item.owner = user_ids[Math.floor(Math.random() * user_ids.length)]['id'];
    } else if (i > 60) {
      item.status = CarbonCertificateStatusEnum.transferred;
      item.owner = user_ids[Math.floor(Math.random() * user_ids.length)]['id'];
    }

    data.push(item);
  }
  return data;
};
