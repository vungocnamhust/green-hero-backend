import authService from './services';
import { User } from '../../types/type.admin';

const register = async (req, res) => {
  const { email, password, name } = req.body;
  const user: User = (await authService.register({ email, password, name })) as User;
  delete user.password;
  return res.status(200).json({
    status: 'success',
    result: user,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user: User = (await authService.login({ email, password })) as User;
  delete user.password;
  return res.status(200).json({
    status: 'success',
    result: user,
  });
};

export default { register, login };
