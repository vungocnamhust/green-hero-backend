import express from 'express';
import multer from 'multer';
import asyncMiddleware from '../middlewares/async';
import feedbackController from '../modules/feedback/controllers';
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

router.post('/feedbacks', upload.array('files'), asyncMiddleware(feedbackController.createFeedback));
router.put('/users/:userId/feedbacks/:feedbackId', asyncMiddleware(feedbackController.updateFeedbackById));
router.get('/users/:userId/feedbacks', asyncMiddleware(feedbackController.getFeedbacks));
router.get('/users/:userId/feedbacks/:feedbackId', asyncMiddleware(feedbackController.getFeedbackById));

// CMS
router.get('/feedbacks', asyncMiddleware(feedbackController.getAllFeedbacks));
router.post('/users/:userId/feedbacks/:feedbackId/broadcast', asyncMiddleware(feedbackController.broadcastToUsers));

export default router;
