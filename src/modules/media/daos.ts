import { getRepository } from 'typeorm';
import { Media } from '../../entities/media';
import codes from '../../errors/codes';
import CustomError from '../../errors/customError';
import connectionDB from '../connectDB';
import { MediaCreate, MediaType } from '../../types/type.media';

const create = async (data: MediaCreate) => {
  return await connectionDB
    .then(async (connection) => {
      const { url, type, articleId } = data;
      const media = new Media();
      media.url = url;
      media.type = type;
      media.articleId = articleId;
      return connection.manager.save(media);
    })
    .catch((e) => {
      console.log('err media: ', e);
      throw new CustomError(codes.DUPLICATE, e.message);
    });
};

const createMany = async (data: MediaCreate[]) => {
  let mediaList = [];
  return await connectionDB
    .then(async (connection) => {
      data.forEach((mediaData) => {
        const { url, type, articleId } = mediaData;
        const media = new Media();
        media.url = url;
        media.type = type;
        media.articleId = articleId;
        mediaList.push(media);
      });
      connection.manager.save(mediaList);
    })
    .catch((e) => {
      console.log('err media: ', e);
      throw new CustomError(codes.DUPLICATE, e.message);
    });
};

const find = async (dataFind: { url: string }) => {
  const mediaReposity = getRepository(Media);
  let media: MediaType;

  if (dataFind.url) {
    media = await mediaReposity.findOne({
      where: {
        url: dataFind.url,
      },
    });
  }
  return media;
};

const findAll = async (dataFind: { articleId: number }) => {
  const mediaReposity = getRepository(Media);
  let mediaList: MediaType[];

  if (dataFind.articleId) {
    mediaList = await mediaReposity.find({
      where: { articleId: dataFind.articleId },
    });
  }
  return mediaList;
};

export default { create, createMany, find, findAll };
