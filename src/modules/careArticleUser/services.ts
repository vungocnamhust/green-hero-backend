import careArticleUserDao from './daos';
import { CareArticleUserCreateParamsType } from '../../types/type.careArticleUser';

const createMany = async (data: CareArticleUserCreateParamsType) => {
  return await careArticleUserDao.createMany(data);
};

export default { createMany };
