import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/UploadConfig';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import EstablishmentsController from '../controllers/EstablishmentsController';
import EstablishmentsValidation from '../validations/EstablishmentsValidation';

const routes = Router();
const upload = multer(uploadConfig.multer);
const establishmentsController = new EstablishmentsController();

routes.use(ensureAuthenticated);

routes.post(
  '/',
  upload.single('avatar'),
  EstablishmentsValidation.create,
  establishmentsController.create,
);
routes.get('/', establishmentsController.index);
routes.put(
  '/',
  EstablishmentsValidation.update,
  establishmentsController.update,
);
routes.delete(
  '/:establishment_id',
  EstablishmentsValidation.remove,
  establishmentsController.remove,
);

export default routes;
