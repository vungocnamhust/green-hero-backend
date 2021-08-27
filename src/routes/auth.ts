import express from 'express';
import auth from '../controllers/auth/auth';
import asyncMiddleware from '../middlewares/async';

const router = express.Router();

router.post('/auth/register', asyncMiddleware(auth.register));
router.get('/user', asyncMiddleware(auth.find));

export default router;
