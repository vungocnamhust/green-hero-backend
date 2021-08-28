import express from 'express';
import asyncMiddleware from '../middlewares/async';
import articleController from '../modules/article/controllers';
const router = express.Router();

router.post('/admins/:userId/articles', asyncMiddleware(articleController.createArticle));
router.put('/admins/:userId/articles/:articleId', asyncMiddleware(articleController.updateArticleById));
router.get('/admins/:userId/articles', asyncMiddleware(articleController.getArticles));
router.get('/articles/:articleId', asyncMiddleware(articleController.getArticleById));

export default router;
