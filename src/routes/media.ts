import express from 'express';
import asyncMiddleware from '../middlewares/async';
import mediaController from '../modules/media/controllers';

const router = express.Router();

router.get('/media/:type/:filePath', asyncMiddleware(mediaController.getMedia));

export default router;
