import User from 'database/models/user.model';

export const userExist = async email => {
  const checkUser = await User.findOne({ email });
  if (checkUser) return true;
  return false;
};

export const findUserByEmail = async email => {
  return await User.findOne({ email });
};
