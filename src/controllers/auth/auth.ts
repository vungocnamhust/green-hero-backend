import authService from '../../services/auth/auth';
import { User } from '../../types/type.auth';

const register = async (req, res) => {
  const { phone, name, province, district, ward, address } = req.body;
  const user: User = (await authService.register({ phone, name, province, district, ward, address })) as User;
  return res.status(200).json({
    result: user,
  });
};

const find = async (req, res) => {
  const { phone } = req.body;
  const user: User = (await authService.find({ phone })) as User;
  return res.status(200).json({
    result: user,
  });
};

export default { register, find };
