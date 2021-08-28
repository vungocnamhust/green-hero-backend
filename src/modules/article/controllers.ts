import codes from '../../errors/codes';
import CustomError from '../../errors/customError';
import articleService from './services';

const createArticle = async (req, res) => {
  const { title, description, content, avatar } = req.body;
  const currentUserId = req.user.id;
  const userIdParams = req.params.userId;
  if (Number(currentUserId) !== Number(userIdParams)) {
    throw new CustomError(codes.UNAUTHORIZED);
  }
  const article = await articleService.createArticle({ title, description, content, avatar, adminId: currentUserId });
  delete article.adminId;
  res.status(200).json({
    status: 'success',
    result: article,
  });
};

const getArticles = async (req, res) => {
  const userIdParams = req.params.userId;
  const currentUserId: number = req.user?.id;
  if (!currentUserId) {
    throw new CustomError(codes.NOT_FOUND);
  }
  if (Number(currentUserId) !== Number(userIdParams)) {
    throw new CustomError(codes.UNAUTHORIZED);
  }
  const articles = await articleService.getArticlesByUserId(currentUserId);
  res.status(200).json({
    status: 'success',
    result: articles,
  });
};

const getArticleById = async (req, res) => {
  const id: number = req.params.articleId;
  const response = await articleService.getArticleById(id);
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
    throw new CustomError(codes.NOT_FOUND);
  }
  if (Number(currentUserId) !== Number(userIdParams)) {
    throw new CustomError(codes.UNAUTHORIZED);
  }
  const tagIds = req.body.tagIds;
  const dataUpdate = req.body;
  delete dataUpdate.tagIds;
  const article = await articleService.updateArticleById(id, dataUpdate);
  if (Number(currentUserId) !== Number(article.adminId)) {
    throw new CustomError(codes.UNAUTHORIZED);
  }
  res.status(200).json({
    status: 'success',
    result: article,
  });
};

export default { createArticle, getArticles, getArticleById, updateArticleById };
