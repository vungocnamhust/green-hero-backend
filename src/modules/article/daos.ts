import { getRepository } from 'typeorm';
import configs from '../../configs';
import { Article } from '../../entities/article';
import { Admin as User } from '../../entities/admin';
import { ArticleCreateParamsType, ArticleType, ArticleUpdateParamsType } from '../../types/type.article';

const createArticle = async (data: ArticleCreateParamsType) => {
  const articleRepository = getRepository(Article);
  const articleData = {
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
    isDeleted: false,
  };
  const article = articleRepository.create(articleData);
  return await articleRepository.save(article);
};

const getArticleById = async (id: number) => {
  const articleRepository = getRepository(Article);
  const article = await articleRepository
    .createQueryBuilder('a')
    .where(`a.id = ${id} and a.isDeleted = false`)
    .getOne();
  return article;
};

const getArticlesByUserId = async (condition: { userId: number; exceptArticleId?: number; limit?: number }) => {
  const articleRepository = getRepository(Article);
  let whereConditionGetArticle = `a.adminId = ${condition.userId} and a.isDeleted = false`;
  if (condition.exceptArticleId) {
    whereConditionGetArticle += ` and a.id != ${condition.exceptArticleId}`;
  }
  const articles = await articleRepository
    .createQueryBuilder('a')
    .where(whereConditionGetArticle)
    .orderBy('a.createdAt', 'DESC')
    .take(condition.limit || configs.MAX_RECORDS_PER_REQ)
    .getMany();
  return articles;
};

const updateArticle = async (articleId: number, data: ArticleUpdateParamsType) => {
  const articleRepository = getRepository(Article);
  const articleData = {
    ...data,
    updatedAt: new Date(),
  };
  await articleRepository.update(articleId, articleData);
  const article: ArticleType = await articleRepository.findOne(articleId);
  return article;
};

const getArticlesByTagId = async (tagId: number, userId: number) => {
  const articleRepository = getRepository(Article);
  const articles = await articleRepository
    .createQueryBuilder('a')
    .where(`a.adminId = ${userId} and a.isDeleted = false`)
    .getMany();
  return articles;
};

const getArticlesByUserIdFilterByTag = async (condition: { userId: number; limit?: number }) => {
  const userRepository = getRepository(User);
  const data = await userRepository
    .createQueryBuilder('u')
    .leftJoinAndSelect('u.tags', 't')
    .leftJoinAndSelect('t.articles', 'a')
    .where(`a.adminId = ${condition.userId} and a.isDeleted = false`);
  return data;
};

const getAllArticles = async (limit: number, offset: number) => {
  const userRepository = getRepository(Article);
  const data = await userRepository
    .createQueryBuilder('a')
    .orderBy('a.createdAt', 'DESC')
    .skip(offset || 0)
    .take(limit || configs.MAX_RECORDS_PER_REQ)
    .getMany();
  return data;
}

export default {
  createArticle,
  getArticleById,
  getArticlesByUserId,
  updateArticle,
  getArticlesByTagId,
  getArticlesByUserIdFilterByTag,
  getAllArticles,
};
