import { UserInterface } from '../user/user.interface';

export const getPayload = (user: UserInterface) => {
  return {
    id: user.id,
    name: user.name,
    surname: user.surname,
    email: user.email,
  };
};
