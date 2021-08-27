import { FindManyOptions, getRepository, Not } from 'typeorm';
import connectionDB from '../connectDB';
import { CareArticleUser } from '../../entities/careArticleUser';
import { CareArticleUserCreateParamsType, CareArticleUserType } from '../../types/type.careArticleUser';
import CustomError from '../../errors/customError';
import codes from '../../errors/codes';

const create = async (data: CareArticleUserCreateParamsType) => {
  const careArticleUserRepository = getRepository(CareArticleUser);
  const careArticleUserData = {
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
    isDeleted: false,
  };
  const careArticleUser = careArticleUserRepository.create(careArticleUserData);
  return await careArticleUserRepository.save(careArticleUser);
};

const createMany = async (data: CareArticleUserCreateParamsType) => {
  let careArticleUserList = [];
  return await connectionDB
    .then(async (connection) => {
      const { articleId, userIds } = data;
      userIds.forEach((userId) => {
        const careArticleUser = new CareArticleUser();
        careArticleUser.userId = userId;
        careArticleUser.articleId = articleId;
        careArticleUserList.push(careArticleUser);
      });
      connection.manager.save(careArticleUserList);
    })
    .catch((e) => {
      console.log('err media: ', e);
      throw new CustomError(codes.DUPLICATE, e.message);
    });
};

export default { create, createMany };
