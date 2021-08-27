import express from 'express';
import multer from 'multer';
import asyncMiddleware from '../middlewares/async';
import articleController from '../controllers/article/article';
const router = express.Router();
import fs from 'fs';

const getImage = (req, res) => {
    console.log("+++++++++++++");
    console.log(req.path);
    console.log(req.params.filePath);
    const filePath = "./uploads/files-1629911257265.jpeg";//req.params.filePath;
    const audioStream = fs.createReadStream(filePath);
    const fileStat = fs.statSync(filePath);

    res.setHeader('Content-Type', 'image/jpeg');
    res.setHeader('Content-Length', fileStat.size);
    res.setHeader('Accept-Ranges', 'bytes');
    audioStream.pipe(res);
};

router.get('/images/files-1629911257265.jpeg', asyncMiddleware(getImage));

export default router;
