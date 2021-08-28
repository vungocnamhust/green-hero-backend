import { Login, Register, User } from '../../types/type.admin';
import userDao from './daos';
import { compareBcrypt, generateAccessToken, generateSalt, hashBcrypt } from './heplers';
import CustomError from '../../errors/customError';
import codes from '../../errors/codes';

const register = async (dataRegister: Register) => {
  const { email, name, password } = dataRegister;
  const salt = generateSalt(10);
  const hashPassword = (await hashBcrypt(password, salt)) as string;
  const user = await userDao.createUser({ email, password: hashPassword, name });
  return user;
};

const login = async (dataLogin: Login) => {
  const { email, password } = dataLogin;
  const user: User = await userDao.findUser({ email });
  if (!user) throw new CustomError(codes.USER_NOT_FOUND);
  const isCorrectPassword = await compareBcrypt(password, user.password);
  if (!isCorrectPassword) throw new CustomError(codes.WRONG_PASSWORD);
  const userId = user.id;
  const token = await generateAccessToken(userId);
  return {
    ...user,
    token,
  };
};

export default { register, login };
