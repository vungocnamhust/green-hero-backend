import { MediaGet, MediaCreate, MediaListGet } from '../../types/type.media';
import mediaDao from './daos';
import fs from 'fs';
const createMany = async (data: MediaCreate[]) => {
  return await mediaDao.createMany(data);
};

const find = async (data: MediaGet) => {
  const { url } = data;
  const media = await mediaDao.find({ url });
  return media;
};

const getFeedbackMediaFiles = async (data: MediaListGet) => {
  let mediaList = [];
  let { feedbackId } = data;
  const mediaListData = await mediaDao.findAll({ feedbackId });
  mediaListData.forEach((media) => {
    if (!media) {
      return null;
    }
    var file = fs.readFileSync(media.url);
    mediaList.push(file);
  });
  return mediaList;
};

// const getFeedbacksMediaFiles = async (data: MediaListGet[]) => {
//     let mediaList = [];
//     let { feedbackId } = data
//     const mediaListData = await mediaDao.findAll({ feedbackId });
//     mediaListData.forEach((media) => {
//         if (!media) {
//             return null;
//         }
//         var img = fs.readFileSync(media.url);
//         mediaList.push(img);
//     });
//     return mediaList;
// }
export default { createMany, find, getFeedbackMediaFiles };
