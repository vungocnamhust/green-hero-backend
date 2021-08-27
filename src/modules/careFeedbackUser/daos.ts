import { FindManyOptions, getRepository, Not } from 'typeorm';
import connectionDB from '../connectDB';
import { CareFeedbackUser } from '../../entities/careFeedbackUser';
import { CareFeedbackUserCreateParamsType, CareFeedbackUserType } from '../../types/type.careFeedbackUser';
import CustomError from '../../errors/customError';
import codes from '../../errors/codes';
import configs from '../../configs';

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

const getCareFeedbacksByUserId = async (condition: { userId: number }) => {
  const careFeedbackRepository = getRepository(CareFeedbackUser)
  const feedbacks = await careFeedbackRepository.createQueryBuilder('care_feedback_user')
    .where(`care_feedback_user.userId = ${condition.userId}`)
    .leftJoinAndSelect('care_feedback_user.feedback', 'feedback', 'care_feedback_user.feedbackId = feedback.id')
    .leftJoinAndSelect('feedback.mediaList', 'media')
    .getMany();
  return feedbacks;
};

export default { create, createMany, getCareFeedbacksByUserId };
