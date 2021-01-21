import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import IndexEstablishmentsService from '@modules/establishments/services/IndexEstablishmentsService';
import UpdateEstablishmentService from '@modules/establishments/services/UpdateEstablishmentService';
import RemoveEstablishmentService from '@modules/establishments/services/RemoveEstablishmentService';
import IEstablishmentDTO from '@modules/establishments/dtos/IEstablishmentDTO';
import CreateEstablishmentService from '@modules/establishments/services/CreateEstablishmentService';

class EstablishmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const indexEstablishments = container.resolve(IndexEstablishmentsService);

    const establishments = await indexEstablishments.execute();

    return response.json(classToClass(establishments));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      phone,
      type,
      street,
      street_number,
      neighborhood,
      zipcode,
      city,
      state,
    }: IEstablishmentDTO = request.body;
    const userId = request.user.id;

    const updateEstablishment = container.resolve(CreateEstablishmentService);

    const establishment = await updateEstablishment.execute(
      {
        name,
        phone,
        type,
        street,
        street_number,
        neighborhood,
        zipcode,
        city,
        state,
      },
      userId,
    );

    return response.json(classToClass(establishment));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const {
      establishment_id,
      name,
      phone,
      type,
      street,
      street_number,
      neighborhood,
      zipcode,
      city,
      state,
    } = request.body;
    const userId = request.user.id;

    const updateEstablishment = container.resolve(UpdateEstablishmentService);

    const establishment = await updateEstablishment.execute(
      {
        name,
        phone,
        type,
        street,
        street_number,
        neighborhood,
        zipcode,
        city,
        state,
      },
      establishment_id,
      userId,
    );

    return response.json(classToClass(establishment));
  }

  public async remove(request: Request, response: Response): Promise<Response> {
    const admin_id = request.user.id;
    const { establishment_id } = request.params;

    const removeEstablishment = container.resolve(RemoveEstablishmentService);

    await removeEstablishment.execute(admin_id, establishment_id);

    return response.status(204).json();
  }
}

export default EstablishmentsController;
