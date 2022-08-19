import ObjectID from 'bson-objectid';
import * as bcrypt from 'bcrypt';

export const generateRecordId = () => new ObjectID().toString();

const saltOrRounds = 10;
export const encrypt = async (password: string): Promise<string> =>
  await bcrypt.hash(password, saltOrRounds);

export const isMatch = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};
