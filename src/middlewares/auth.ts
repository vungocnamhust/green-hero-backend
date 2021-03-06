import codes from '../errors/codes';
import CustomError from '../errors/customError';
import { verifyAccessToken } from '../modules/admin/heplers';

const authMiddleware = async (req, res, next) => {
  if (req.path.includes('/admins') && !req.path.includes('/admins/login') && !req.path.includes('/admins/register')) {
    const { authorization } = req.headers;
    if (!authorization) throw new CustomError(codes.UNAUTHORIZED);

    const [tokenType, accessToken] = authorization.split(' ');

    if (tokenType !== 'Bearer') throw new CustomError(codes.UNAUTHORIZED);

    const user = await verifyAccessToken(accessToken);
    req.user = user;
    if (['/auths/logout', '/auths/verify'].includes(req.path)) {
      req.accessToken = accessToken;
    }
  }

  return next();
};

export default authMiddleware;
