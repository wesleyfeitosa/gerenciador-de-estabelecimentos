import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import SearchController from '../controllers/SearchController';
import SearchValidation from '../validations/SearchValidation';

const routes = Router();
const searchController = new SearchController();

routes.use(ensureAuthenticated);

routes.get('/', SearchValidation.search, searchController.search);

export default routes;
