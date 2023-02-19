import uploadConfig from '@config/upload';
import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import UsersController from '../controllers/UserController';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';
import multer from 'multer';
import UserAvatarController from '../controllers/UserAvatarController';

const UserAvatarController = new UserAvatarController();
const userRouter = Router();
const userController = new UsersController();

const upload = multer(uploadConfig.multer);

userRouter.get('/', isAuthenticated, userController.index);

userRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required,
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  userController.create,
);

userRouter.patch(
  '/avatar',
  isAuthenticated,
  upload.single('avatar', UserAvatarController.update),
);

export default userRouter;
