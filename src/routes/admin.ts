import express from 'express';
import auth from '../modules/admin/controllers';
import asyncMiddleware from '../middlewares/async';

const router = express.Router();

router.post('/admins/register', asyncMiddleware(auth.register));
router.post('/admins/login', asyncMiddleware(auth.login));

export default router;
