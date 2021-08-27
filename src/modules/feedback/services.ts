import { FeedbackCreateParamsType, FeedbackUpdateParamsType } from '../../types/type.feedback';
import feedbackDao from './daos';
import userService from '../auth/services';
import careFeedbackUserService from '../careFeedbackUser/services';

const createFeedback = async (feedback: FeedbackCreateParamsType) => {
  return await feedbackDao.createFeedback(feedback);
};

const getFeedbacksByUserId = async (userId: number) => {
  const feedbacks = await feedbackDao.getFeedbacksByUserId({ userId });
  return feedbacks;
};

const getFeedbackById = async (id: number) => {
  const feedback = await feedbackDao.getFeedbackById(id);
  const relativeFeedbacks = await feedbackDao.getFeedbacksByUserId({
    userId: feedback.userId,
    exceptFeedbackId: feedback.id,
    limit: 8,
  });
  return {
    feedback,
    relativeFeedbacks,
  };
};

const updateFeedbackById = async (feedbackId: number, feedbackData: FeedbackUpdateParamsType) => {
  return await feedbackDao.updateFeedback(feedbackId, feedbackData);
};

// TODO: when CMS call API check done -> broadcastToUsers
const broadcastToUsers = async (feedbackId: number, userId: number) => {
  // Get all user who are near this location or like this feedback
  const users = await userService.findMany(['id']);
  let userIds = [];
  users.forEach((user) => {
    if (user.id != userId) userIds.push(user.id);
  });
  console.log(userIds);
  console.log(feedbackId);
  await careFeedbackUserService.createMany({ feedbackId: feedbackId, userIds: userIds });
  return users;
};

export default { createFeedback, getFeedbacksByUserId, getFeedbackById, updateFeedbackById, broadcastToUsers };
