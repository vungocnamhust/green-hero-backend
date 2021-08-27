import codes from '../../errors/codes';
import CustomError from '../../errors/customError';
import feedbackService from './services';
import mediaService from '../media/services';
import userService from '../auth/services';
import fs from 'fs';
import { MediaCreate } from '../../types/type.media';
const fetch = require("node-fetch");
import FormData from 'form-data';
import { URLSearchParams } from 'url';

const createFeedback = async (req, res) => {
  const { content, avatar, location } = req.body;
  const title = 'Phản ánh ô nhiễm nguồn nước ';
  const description = 'Phản ánh';
  // const currentUserId = req.user.id;
  const currentUserId = req.params.userId;
  const mediaList = [];
  const mediaRecordList = Array<MediaCreate>();

  // TODO: send image to AI server
  // if (req.files) {
  //   for (let index = 0; index < req.files.length; index++) {
  //     const file = req.files[index];
  //     console.log('before read file');
  //     var img = fs.readFileSync(file.path);
  //     var encode_image = img.toString('base64');

  //     // Define a JSONobject for the image attributes for sending to AI server
  //     var media = {
  //       contentType: file.mimetype,
  //       image: Buffer.from(encode_image, 'base64'),
  //     };
  //     mediaList.push(media);
  //     console.log('before read file');
  //     console.log(JSON.stringify(file));
  //   }
  // }
  sendImageToAIServer(req.files[0]);

  // TODO: create media records for evidence of report
  const feedback = await feedbackService.createFeedback({
    title,
    description,
    content,
    avatar,
    location,
    userId: currentUserId,
  });
  delete feedback.userId;

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
};

const getFeedbacks = async (req, res) => {
  const currentUserId = req.params.userId;
  // const currentUserId: number = req.user?.id;
  // if (!currentUserId) {
  //   throw new CustomError(codes.NOT_FOUND);
  // }
  // if (Number(currentUserId) !== Number(userIdParams)) {
  //   throw new CustomError(codes.UNAUTHORIZED);
  // }
  const feedbacks = await feedbackService.getFeedbacksByUserId(currentUserId);
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

const broadcastToUsers = async (req, res) => {
  const feedbackId = Number.parseInt(req.params.feedbackId);
  const userId = Number.parseInt(req.params.userId);
  const user = userService.find({ id: userId });
  if (!user) {
    throw new CustomError(codes.USER_NOT_FOUND);
  }
  const feedback = feedbackService.getFeedbackById(feedbackId);
  if (!feedback) {
    throw new CustomError(codes.NOT_FOUND);
  }
  await feedbackService.broadcastToUsers(feedbackId, userId);
  res.status(200).json({
    status: 'success',
  });
};

const getAllFeedbacks = async (req, res) => { };

async function postData(url = '', data = {}) {
  var formData = new FormData();
  formData.append('img', fs.createReadStream('./uploads/files-1630047983857.jpeg'));
  // formData.append("img", data["img"]);
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body: formData
  });
  console.log("+++++++++++++++++++++response.json()+++++++++++++++++++++");
  console.log(response.json());
  return response.json(); // parses JSON response into native JavaScript objects
}

function sendImageToAIServer(file) {
  postData("http://localhost:5000/api/validate", { img: file })
    .then(response => response.json())
    .then(data => console.log(data));
}

export default { createFeedback, getAllFeedbacks, getFeedbacks, getFeedbackById, updateFeedbackById, broadcastToUsers };
