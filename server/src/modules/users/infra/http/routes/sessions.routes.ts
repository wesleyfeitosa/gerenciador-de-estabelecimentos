import { Router } from 'express';

import authValidation from '@modules/users/infra/http/validations/AuthValidation';
import AuthController from '@modules/users/infra/http/controllers/AuthController';

const routes = Router();
const authController = new AuthController();

routes.post('/register', authValidation.register, authController.register);
routes.post('/login', authValidation.login, authController.login);

export default routes;
