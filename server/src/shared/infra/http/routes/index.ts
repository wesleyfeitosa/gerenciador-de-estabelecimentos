import { NextFunction, Request, Response, Router } from 'express';

import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';

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

export default routes;
