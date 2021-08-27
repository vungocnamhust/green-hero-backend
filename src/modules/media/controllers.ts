import fs from 'fs';

const getMedia = (req, res) => {
    const fileType = req.params.type;
    const filePath = "./uploads/" + req.params.filePath;
    const audioStream = fs.createReadStream(filePath);
    const fileStat = fs.statSync(filePath);
    if (fileType == "image") {
        res.setHeader('Content-Type', 'image/jpeg');
        res.setHeader('Content-Length', fileStat.size);
        res.setHeader('Accept-Ranges', 'bytes');
    } else if (fileType == "video") {
        res.setHeader('Content-Type', 'video/mp4');
        res.setHeader('Content-Length', fileStat.size);
        res.setHeader('Accept-Ranges', 'bytes');
    }
    audioStream.pipe(res);
};

export default {
    getMedia,
};