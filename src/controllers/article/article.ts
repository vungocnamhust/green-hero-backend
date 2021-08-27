import codes from '../../errors/codes';
import CustomError from '../../errors/customError';
import articleService from '../../services/article/article';
import mediaService from '../../services/media/media';
import userService from '../../services/auth/auth';
import fs from 'fs';
import { MediaCreate } from '../../types/type.media';
import { userInfo } from 'node:os';

const createArticle = async (req, res) => {
  const { content, avatar, location } = req.body;
  const title = "Phản ánh ô nhiễm nguồn nước ";
  const description = "Phản ánh";
  // const currentUserId = req.user.id;
  const currentUserId = req.params.userId;
  const mediaList = [];
  const mediaRecordList = Array<MediaCreate>();

  // TODO: send image to AI server
  if (req.files) {
    for (let index = 0; index < req.files.length; index++) {
      const file = req.files[index];
      console.log("before read file");
      var img = fs.readFileSync(file.path);
      var encode_image = img.toString("base64");

      // Define a JSONobject for the image attributes for sending to AI server
      var media = {
        contentType: file.mimetype,
        image: Buffer.from(encode_image, "base64"),
      };
      mediaList.push(media);
      console.log("before read file");
      console.log(JSON.stringify(file));
    }
  }

  // TODO: create media records for evidence of report
  const article = await articleService.createArticle({ title, description, content, avatar, location, userId: currentUserId });
  delete article.userId;

  // Storing all media in database
  if (req.files) {
    for (let index = 0; index < req.files.length; index++) {
      const file = req.files[index];
      let mediaRecord = {
        url: file.filename,
        type: file.mimetype,
        articleId: article.id
      };
      mediaRecordList.push(mediaRecord);
    }
    await mediaService.createMany(mediaRecordList);
  }
  res.status(200).json({
    status: 'success',
    result: {
      "article": article,
    },
  });
};

const getArticles = async (req, res) => {
  const currentUserId = req.params.userId;
  // const currentUserId: number = req.user?.id;
  // if (!currentUserId) {
  //   throw new CustomError(codes.NOT_FOUND);
  // }
  // if (Number(currentUserId) !== Number(userIdParams)) {
  //   throw new CustomError(codes.UNAUTHORIZED);
  // }
  const articles = await articleService.getArticlesByUserId(currentUserId);
  res.status(200).json({
    status: 'success',
    result: {
      "articles": articles,
    },
  });
};

const getArticleById = async (req, res) => {
  const id: number = req.params.articleId;
  const userIdParams = req.params.userId;
  const currentUserId: number = req.user?.id;
  if (!currentUserId) {
    throw new CustomError(codes.NOT_FOUND);
  }
  if (Number(currentUserId) !== Number(userIdParams)) {
    throw new CustomError(codes.UNAUTHORIZED);
  }
  const response = await articleService.getArticleById(id);
  if (Number(currentUserId) !== Number(response.article.userId)) {
    throw new CustomError(codes.UNAUTHORIZED);
  }
  res.status(200).json({
    status: 'success',
    result: response,
  });
};

const updateArticleById = async (req, res) => {
  const id: number = req.params.articleId;
  const userIdParams = req.params.userId;
  const currentUserId: number = req.user?.id;
  if (!currentUserId) {
    console.log('hello');
    throw new CustomError(codes.NOT_FOUND);
  }
  if (Number(currentUserId) !== Number(userIdParams)) {
    throw new CustomError(codes.UNAUTHORIZED);
  }
  const article = await articleService.updateArticleById(id, req.body);
  if (Number(currentUserId) !== Number(article.userId)) {
    throw new CustomError(codes.UNAUTHORIZED);
  }
  res.status(200).json({
    status: 'success',
    result: article,
  });
};

const broadcastToUsers = async (req, res) => {
  const articleId = Number.parseInt(req.params.articleId);
  const userId = Number.parseInt(req.params.userId);
  const user = userService.find({ id: userId });
  if (!user) {
    throw new CustomError(codes.USER_NOT_FOUND);
  }
  const article = articleService.getArticleById(articleId);
  if (!article) {
    throw new CustomError(codes.NOT_FOUND);
  }
  await articleService.broadcastToUsers(articleId, userId);
  res.status(200).json({
    status: 'success',
  });
}

const getAllArticles = async (req, res) => {

}

export default { createArticle, getAllArticles, getArticles, getArticleById, updateArticleById, broadcastToUsers };
