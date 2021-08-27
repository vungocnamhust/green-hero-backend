import { FindManyOptions, getRepository, Not } from 'typeorm';
import connectionDB from '../connectDB';
import { CareFeedbackUser } from '../../entities/careFeedbackUser';
import { CareFeedbackUserCreateParamsType, CareFeedbackUserType } from '../../types/type.careFeedbackUser';
import CustomError from '../../errors/customError';
import codes from '../../errors/codes';

const create = async (data: CareFeedbackUserCreateParamsType) => {
  const careFeedbackUserRepository = getRepository(CareFeedbackUser);
  const careFeedbackUserData = {
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
    isDeleted: false,
  };
  const careFeedbackUser = careFeedbackUserRepository.create(careFeedbackUserData);
  return await careFeedbackUserRepository.save(careFeedbackUser);
};

const createMany = async (data: CareFeedbackUserCreateParamsType) => {
  let careFeedbackUserList = [];
  return await connectionDB
    .then(async (connection) => {
      const { feedbackId, userIds } = data;
      userIds.forEach((userId) => {
        const careFeedbackUser = new CareFeedbackUser();
        careFeedbackUser.userId = userId;
        careFeedbackUser.feedbackId = feedbackId;
        careFeedbackUserList.push(careFeedbackUser);
      });
      connection.manager.save(careFeedbackUserList);
    })
    .catch((e) => {
      console.log('err media: ', e);
      throw new CustomError(codes.DUPLICATE, e.message);
    });
};

export default { create, createMany };
