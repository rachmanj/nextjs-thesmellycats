import { compare, hash } from 'bcryptjs';

export const passwordHash = async password => {
  const hashedPassword = await hash(password, 10);
  return hashedPassword;
};

export const passwordCheck = async (password, hashedPassword) => {
  const valid = await compare(password, hashedPassword);
  return valid;
};
