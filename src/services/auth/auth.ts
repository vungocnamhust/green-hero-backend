import { Register, User, UserGet } from '../../types/type.auth';
import userDao from '../../daos/user/user';

const register = async (dataRegister: Register) => {
  const { phone, name, province, district, ward, address } = dataRegister;
  const userExist = await userDao.find({ phone: phone });
  if (userExist) {
    return userExist;
  }
  const user = await userDao.create({ phone, name, province, district, ward, address });
  return user;
};

const find = async (data: UserGet) => {
  const { phone, id } = data;
  var user;
  if (phone) {
    user = await userDao.find({ phone: phone });
  } else if (id) {
    user = await userDao.find({ id: id });
  }
  return user;
};

const findMany = async (select?: (keyof User)[]) => {
  const users = await userDao.findMany({ select: select });
  return users;
}

export default { register, find, findMany };
