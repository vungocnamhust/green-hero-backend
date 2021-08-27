import { FindConditions, getRepository } from 'typeorm';
import { User } from '../../entities/user';
import codes from '../../errors/codes';
import CustomError from '../../errors/customError';
import { Register } from '../../types/type.auth';
import connectionDB from '../connectDB';
import { User as UserType } from '../../types/type.auth';

const create = async (dataRegister: Register) => {
  return await connectionDB
    .then(async (connection) => {
      const { name, phone, province, district, ward, address } = dataRegister;
      const user = new User();
      user.name = name;
      user.phone = phone;
      user.province = province;
      user.district = district;
      user.ward = ward;
      user.address = address;
      return connection.manager.save(user);
    })
    .catch((e) => {
      console.log('err user: ', e);
      throw new CustomError(codes.DUPLICATE, e.message);
    });
};

const find = async (dataFind: { phone?: string; id?: number }) => {
  const userReposity = getRepository(User);
  let user: UserType;
  if (dataFind.phone) {
    user = await userReposity.findOne({
      where: {
        phone: dataFind.phone,
      },
    });
  } else if (dataFind.id) {
    user = await userReposity.findOne({
      where: {
        id: dataFind.id,
      },
    });
  }
  return user;
};

const findMany = async (dataFind: { where?: FindConditions<User>, select?: (keyof User)[] }) => {
  const userReposity = getRepository(User);
  let users: UserType[];
  if (dataFind.where && dataFind.select) {
    users = await userReposity.find({ where: dataFind.where, select: dataFind.select });
  } else if (dataFind.where) {
    users = await userReposity.find({ where: dataFind.where });
  }
  else if (dataFind.select) {
    users = await userReposity.find({ select: dataFind.select });
  }
  else {
    users = await userReposity.find({});
  }
  return users;
}

export default { create, find, findMany };
