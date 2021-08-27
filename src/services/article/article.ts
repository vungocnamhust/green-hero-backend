import { ArticleCreateParamsType, ArticleUpdateParamsType } from '../../types/type.article';
import articleDao from '../../daos/article/article';
import userService from '../../services/auth/auth';
import careArticleUserService from '../../services/careArticleUser/careArticleUser';

const createArticle = async (article: ArticleCreateParamsType) => {
  return await articleDao.createArticle(article);
};

const getArticlesByUserId = async (userId: number) => {
  const articles = await articleDao.getArticlesByUserId({ userId });
  return articles;
};

const getArticleById = async (id: number) => {
  const article = await articleDao.getArticleById(id);
  const relativeArticles = await articleDao.getArticlesByUserId({
    userId: article.userId,
    exceptArticleId: article.id,
    limit: 8,
  });
  return {
    article,
    relativeArticles,
  };
};

const updateArticleById = async (articleId: number, articleData: ArticleUpdateParamsType) => {
  return await articleDao.updateArticle(articleId, articleData);
};

// TODO: when CMS call API check done -> broadcastToUsers
const broadcastToUsers = async (articleId: number, userId: number) => {
  // Get all user who are near this location or like this article
  const users = await userService.findMany(["id"]);
  let userIds = [];
  users.forEach((user) => { if (user.id != userId) userIds.push(user.id) });
  console.log(userIds);
  console.log(articleId);
  await careArticleUserService.createMany({ articleId: articleId, userIds: userIds })
  return users;
}

export default { createArticle, getArticlesByUserId, getArticleById, updateArticleById, broadcastToUsers };
