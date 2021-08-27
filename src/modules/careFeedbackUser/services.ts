import careFeedbackUserDao from './daos';
import { CareFeedbackUserCreateParamsType } from '../../types/type.careFeedbackUser';

const createMany = async (data: CareFeedbackUserCreateParamsType) => {
  return await careFeedbackUserDao.createMany(data);
};

const getCareFeedbacksByUserId = async (userId: number) => {
  return await careFeedbackUserDao.getCareFeedbacksByUserId({ userId });
};

export default { createMany, getCareFeedbacksByUserId };
