import isAuthenticated from '@modules/users/middlewares/isAuthenticated';
import Router from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import OrdersController from '../controllers/OrdersController';

const OrdesRouter = Router();
const ordersController = new OrdersController();

OrdesRouter.use(isAuthenticated);

OrdesRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required,
    },
  }),
  ordersController.show,
);

OrdesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      custome_id: Joi.string().uuid().required(),
      products: Joi.required(),
    },
  }),
  ordersController.create,
); //Criação dos produtos

export default OrdesRouter;
