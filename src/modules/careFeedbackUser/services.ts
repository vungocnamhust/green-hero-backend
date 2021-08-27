import careFeedbackUserDao from './daos';
import { CareFeedbackUserCreateParamsType } from '../../types/type.careFeedbackUser';

const createMany = async (data: CareFeedbackUserCreateParamsType) => {
  return await careFeedbackUserDao.createMany(data);
};

export default { createMany };
