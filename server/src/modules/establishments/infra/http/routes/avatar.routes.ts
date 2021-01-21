import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/UploadConfig';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import AvatarController from '../controllers/AvatarController';

const routes = Router();
const upload = multer(uploadConfig.multer);
const avatarController = new AvatarController();

routes.use(ensureAuthenticated);

routes.patch('/', upload.single('avatar'), avatarController.updateAvatar);

export default routes;
