import express from 'express';
import asyncMiddleware from '../middlewares/async';
import mediaController from '../controllers/media/media';

const router = express.Router();

router.get('/media/:type/:filePath', asyncMiddleware(mediaController.getMedia));

export default router;