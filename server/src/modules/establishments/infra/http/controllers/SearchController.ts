import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SearchEstablishmentsService from '@modules/establishments/services/SearchEstablishmentsService';

class SearchController {
  public async search(request: Request, response: Response): Promise<Response> {
    const { city, state } = request.query;

    const searchEstablishments = container.resolve(SearchEstablishmentsService);

    const establishments = await searchEstablishments.execute(
      city as string,
      state as string,
    );

    return response.json(classToClass(establishments));
  }
}

export default SearchController;
