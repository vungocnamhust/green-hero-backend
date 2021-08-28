import { ArticleCreateParamsType, ArticleUpdateParamsType } from '../../types/type.article';
import articleDao from './daos';

const createArticle = async (article: ArticleCreateParamsType) => {
  const newArticle = await articleDao.createArticle(article);
  const articleRes = await articleDao.getArticleById(newArticle.id);
  return articleRes;
};

const getArticlesByUserId = async (userId: number) => {
  const articles = await articleDao.getArticlesByUserId({ userId });
  return articles;
};

const getArticleById = async (id: number) => {
  const article = await articleDao.getArticleById(id);
  const relativeArticles = await articleDao.getArticlesByUserId({
    userId: article.adminId,
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

export default { createArticle, getArticlesByUserId, getArticleById, updateArticleById };
