import { verify } from 'jsonwebtoken';
import AppError from '../../../shared/errors/AppError';
import authConfig from '../../../config/auth';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function isAuthenticated(req, res, next): void {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    throw new AppError('JWT tokwn is missing.');
  }

  const [, token] = authHeader.split(' ');

  try {
    const decodeToken = verify(token, authConfig.jwt.secret);

    const { sub } = decodeToken as ITokenPayload;

    req.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT Token.');
  }
}
