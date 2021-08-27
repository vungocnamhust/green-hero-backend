import { FindManyOptions, getRepository, Not } from 'typeorm';
import configs from '../../configs';
import { Article } from '../../entities/article';
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
  const article = await articleRepository.findOne({
    id: id,
    isDeleted: false,
  });
  return article;
};

const getArticlesByUserId = async (condition: { userId: number; exceptArticleId?: number; limit?: number }) => {
  const articleRepository = getRepository(Article);
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
      alias: "article",
      leftJoinAndSelect: {
        media: "article.mediaList",
      },
    }
  } as FindManyOptions<Article>;
  if (condition.exceptArticleId) {
    (conditionQuery as any).where.id = Not(condition.exceptArticleId);
  }
  const articles = await articleRepository.find(conditionQuery);
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

export default { createArticle, getArticleById, getArticlesByUserId, updateArticle };
