import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/UploadConfig';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import AvatarController from '../controllers/AvatarController';
import AvatarValidation from '../validations/AvatarValidation';

const routes = Router();
const upload = multer(uploadConfig.multer);
const avatarController = new AvatarController();

routes.use(ensureAuthenticated);

routes.patch(
  '/:establishment_id',
  upload.single('avatar'),
  AvatarValidation.updateAvatar,
  avatarController.updateAvatar,
);

export default routes;
