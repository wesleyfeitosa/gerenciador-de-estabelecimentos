import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateEstablishmentAvatarService from '../../../services/UpdateEstablishmentAvatarService';

class EstablishmentsController {
  public async updateAvatar(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const establishment_id = request.body;

    const updateEstablishmentAvatar = container.resolve(
      UpdateEstablishmentAvatarService,
    );

    const user = await updateEstablishmentAvatar.execute({
      establishment_id,
      avatarFilename: request.file.filename,
    });

    return response.json(classToClass(user));
  }
}

export default EstablishmentsController;
