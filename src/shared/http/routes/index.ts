import passwordRouter from '@modules/users/routes/password.routes';
import profileRouter from '@modules/users/routes/profile.route';
import { Router } from 'express';
import productsRouter from '../../../modules/products/routes/products.routes';
import sessionsRouter from '../../../modules/users/routes/sessions.route';
import userRouter from '../../../modules/users/routes/user.routes';

const routes = Router();

// '/products/:id --> entre outros caminhos definidos!
routes.use('/products', productsRouter);
routes.use('/user', userRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);

Router.arguments('/sessions', sessionsRouter);

routes.get('/', (req, res) => {
  return res.json({ message: 'Hello Dev' });
});

export default routes;
