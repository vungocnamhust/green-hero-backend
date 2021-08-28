import codes from '../../errors/codes';
import CustomError from '../../errors/customError';
import feedbackService from './services';
import mediaService from '../media/services';
import userService from '../auth/services';
import fs from 'fs';
import { MediaCreate } from '../../types/type.media';
const fetch = require('node-fetch');
import FormData from 'form-data';
import careFeedbackUserService from '../careFeedbackUser/services';
import configs from '../../configs';
const AI_DOMAIN = process.env.AI_DOMAIN;

// App
const createFeedback = async (req, res) => {
  const { content, avatar, location, province, district, ward, address, userPhone, userName } = req.body;
  const title = 'Phản ánh ô nhiễm nguồn nước ';
  const description = 'Phản ánh';
  const user = await userService.register({ phone: userPhone, name: userName });
  const currentUserId = user.id;
  console.log(currentUserId);
  const mediaList = [];
  const mediaRecordList = Array<MediaCreate>();

  // TODO: send image to AI server
  sendImageToAIServer(req.files).then(async (response) => {
    console.log('success:', response);
    if(response.results.filter(
      (item) => item == 'relevant'
    ).length < response.results.length/2) {
      return res.status(200).json({
        status: "fail",
        message: "Ảnh của bạn không liên quan đến ô nhiễm môi trường"
      })
    }
    const feedback = await feedbackService.createFeedback({
      title,
      description,
      content,
      avatar,
      location,
      userName,
      userPhone,
      province,
      district,
      ward,
      address,
      userId: currentUserId,
    });
  
    // Storing all media in database
    if (req.files) {
      for (let index = 0; index < req.files.length; index++) {
        const file = req.files[index];
        let mediaRecord = {
          url: file.filename,
          type: file.mimetype,
          feedbackId: feedback.id,
        };
        mediaRecordList.push(mediaRecord);
      }
      await mediaService.createMany(mediaRecordList);
    }
    res.status(200).json({
      status: 'success',
      result: {
        feedback: feedback,
      },
    });
  })
  .catch((err) => {
    console.log('error', console.log(err));
    return res.status(200).json({
      status: "fail",
      message: "Đã có lỗi xảy ra"
    })
  });

  // TODO: create media records for evidence of report
  
};

// App 
const getFeedbacks = async (req, res) => {
  const currentUserId = req.params.userId;
  let feedbacks = [];
  const careFeedbacks = await careFeedbackUserService.getCareFeedbacksByUserId(currentUserId);
  careFeedbacks.forEach((careFeedback) => {
    feedbacks.push(careFeedback.feedback);
  });
  feedbacks.sort((x, y) => {
    if (x.createdAt.getTime() > y.createdAt.getTime()) return 1;
    else return 0;
  });
  res.status(200).json({
    status: 'success',
    result: {
      feedbacks: feedbacks,
    },
  });
};

const getFeedbackById = async (req, res) => {
  const id: number = req.params.feedbackId;
  const userIdParams = req.params.userId;
  const currentUserId: number = req.user?.id;
  if (!currentUserId) {
    throw new CustomError(codes.NOT_FOUND);
  }
  if (Number(currentUserId) !== Number(userIdParams)) {
    throw new CustomError(codes.UNAUTHORIZED);
  }
  const response = await feedbackService.getFeedbackById(id);
  if (Number(currentUserId) !== Number(response.feedback.userId)) {
    throw new CustomError(codes.UNAUTHORIZED);
  }
  res.status(200).json({
    status: 'success',
    result: response,
  });
};

const updateFeedbackById = async (req, res) => {
  const id: number = req.params.feedbackId;
  const userIdParams = req.params.userId;
  const currentUserId: number = req.user?.id;
  if (!currentUserId) {
    console.log('hello');
    throw new CustomError(codes.NOT_FOUND);
  }
  if (Number(currentUserId) !== Number(userIdParams)) {
    throw new CustomError(codes.UNAUTHORIZED);
  }
  const feedback = await feedbackService.updateFeedbackById(id, req.body);
  if (Number(currentUserId) !== Number(feedback.userId)) {
    throw new CustomError(codes.UNAUTHORIZED);
  }
  res.status(200).json({
    status: 'success',
    result: feedback,
  });
};

// App
const broadcastToUsers = async (req, res) => {
  const feedbackId = Number.parseInt(req.params.feedbackId);
  const feedback = feedbackService.getFeedbackById(feedbackId);
  if (!feedback) {
    throw new CustomError(codes.NOT_FOUND);
  }
  await feedbackService.broadcastToUsers(feedbackId);
  res.status(200).json({
    status: 'success',
  });
};

// CMS
const getAllFeedbacks = async (req, res) => {
  let { limit, offset } = req.params;
  if (!limit) {
    limit = configs.MAX_RECORDS_PER_REQ;
  }
  if (!offset) {
    offset = 0;
  }
  const feedbacks = await feedbackService.getAllFeedbacks({ limit: limit, offset: offset });
  const totalFeedback = await feedbackService.count();
  res.status(200).json({
    status: 'success',
    feedbacks: feedbacks,
    pagination: {
      total: totalFeedback,
      limit: limit,
      offset: offset,
    },
  });
};

async function postData(url = '', data: { files: any[] }) {
  var formData = new FormData();
  // formData.append('img', fs.createReadStream('./uploads/files-1630047983857.jpeg'));
  data.files.forEach((file) => {
    formData.append('img', fs.createReadStream(file.path));
  });
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
      ...formData.getHeaders(),
    },
    body: formData,
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

// AI
const sendImageToAIServer = (files: any[]) => {
  return postData('http://green-hero-ai.herokuapp.com/api/validate', { files })
};

export default { createFeedback, getAllFeedbacks, getFeedbacks, getFeedbackById, updateFeedbackById, broadcastToUsers };
