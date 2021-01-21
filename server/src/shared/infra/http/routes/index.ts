import { NextFunction, Request, Response, Router } from 'express';

import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import establishmentsRouter from '@modules/establishments/infra/http/routes/establishments.routes';
import avatarRouter from '@modules/establishments/infra/http/routes/avatar.routes';
import searchRouter from '@modules/establishments/infra/http/routes/search.routes';

const routes = Router();

routes.use((request: Request, response: Response, next: NextFunction) => {
  const date = new Date();
  // eslint-disable-next-line no-console
  console.log(
    `Requisição feita - ${date.getHours()}:${`0${date.getMinutes()}`.slice(
      -2,
    )}_${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
  );

  next();
});

routes.use('/sessions', sessionsRouter);
routes.use('/users', usersRouter);

routes.use('/establishments', establishmentsRouter);
routes.use('/avatar', avatarRouter);
routes.use('/search', searchRouter);

export default routes;
