import { FindManyOptions, getRepository, Not } from 'typeorm';
import configs from '../../configs';
import { Feedback } from '../../entities/feedback';
import { FeedbackCreateParamsType, FeedbackType, FeedbackUpdateParamsType } from '../../types/type.feedback';

const createFeedback = async (data: FeedbackCreateParamsType) => {
  const feedbackRepository = getRepository(Feedback);
  const feedbackData = {
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
    isDeleted: false,
  };
  const feedback = feedbackRepository.create(feedbackData);
  return await feedbackRepository.save(feedback);
};

const getFeedbackById = async (id: number) => {
  const feedbackRepository = getRepository(Feedback);
  const feedback = await feedbackRepository.findOne({
    id: id,
    isDeleted: false,
  });
  return feedback;
};

const getFeedbacksByUserId = async (condition: { userId: number; exceptFeedbackId?: number; limit?: number }) => {
  const feedbackRepository = getRepository(Feedback);
  const conditionQuery = {
    where: {
      userId: condition.userId,
      isDeleted: false,
    },
    order: {
      createdAt: 'DESC',
    },
    take: condition.limit || configs.MAX_RECORDS_PER_REQ,
    join: {
      alias: "feedback",
      leftJoinAndSelect: {
        media: "feedback.mediaList",
      },
    }
  } as FindManyOptions<Feedback>;
  if (condition.exceptFeedbackId) {
    (conditionQuery as any).where.id = Not(condition.exceptFeedbackId);
  }
  const feedbacks = await feedbackRepository.find(conditionQuery);
  return feedbacks;
};

const updateFeedback = async (feedbackId: number, data: FeedbackUpdateParamsType) => {
  const feedbackRepository = getRepository(Feedback);
  const feedbackData = {
    ...data,
    updatedAt: new Date(),
  };
  await feedbackRepository.update(feedbackId, feedbackData);
  const feedback: FeedbackType = await feedbackRepository.findOne(feedbackId);
  return feedback;
};

const getAllFeedbacks = async (condition: { limit?: number; offset?: number }) => {
  const feedbackRepository = getRepository(Feedback);
  const conditionQuery = {
    where: {
      isDeleted: false,
    },
    order: {
      createdAt: 'DESC',
    },
    skip: condition.offset || 0,
    take: condition.limit || configs.MAX_RECORDS_PER_REQ,
    join: {
      alias: "feedback",
      leftJoinAndSelect: {
        media: "feedback.mediaList",
      },
    }
  } as FindManyOptions<Feedback>;

  const feedbacks = await feedbackRepository.find(conditionQuery);
  return feedbacks;
}

export default { createFeedback, getFeedbackById, getFeedbacksByUserId, updateFeedback, getAllFeedbacks };
