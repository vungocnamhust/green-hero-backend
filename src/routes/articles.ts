import express from 'express';
import multer from 'multer';
import asyncMiddleware from '../middlewares/async';
import articleController from '../modules/article/controllers';
const router = express.Router();

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.' + file.mimetype.split('/')[1]);
  },
});

var upload = multer({ storage: storage });

router.post('/users/:userId/articles', upload.array('files'), asyncMiddleware(articleController.createArticle));
router.put('/users/:userId/articles/:articleId', asyncMiddleware(articleController.updateArticleById));
router.get('/users/:userId/articles', asyncMiddleware(articleController.getArticles));
router.get('/users/:userId/articles/:articleId', asyncMiddleware(articleController.getArticleById));
router.post('/users/:userId/articles/:articleId/broadcast', asyncMiddleware(articleController.broadcastToUsers));

// CMS
router.get('/articles', asyncMiddleware(articleController.getAllArticles));

// AI
router.get('/webhook/articles', asyncMiddleware(articleController.getAllArticles));

export default router;
