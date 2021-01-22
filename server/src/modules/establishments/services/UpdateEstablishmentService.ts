import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEstablishmentsRepository from '../repositories/IEstablishmentsRepository';
import IEstablishmentDTO from '../dtos/IEstablishmentDTO';
import Establishment from '../infra/typeorm/entities/Establishment';
import IUsersRepository from '../../users/repositories/IUsersRepository';

@injectable()
class UpdateEstablishmentService {
  constructor(
    @inject('EstablishmentsRepository')
    private establishmentsRepository: IEstablishmentsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(
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
    }: Partial<IEstablishmentDTO>,
    establishmentId: string,
    userId: string,
  ): Promise<Establishment> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('User not authenticated.', 401);
    }

    const establishment = await this.establishmentsRepository.findById(
      establishmentId,
    );

    if (!establishment) {
      throw new AppError('Establishment does not exists exists.', 404);
    }

    if (name) establishment.name = name;
    if (phone) establishment.phone = phone;
    if (type) establishment.type = type;

    if (street) establishment.address.street = street;
    if (street_number) establishment.address.street_number = street_number;
    if (neighborhood) establishment.address.neighborhood = neighborhood;
    if (zipcode) establishment.address.zipcode = zipcode;
    if (city) establishment.address.city = city;
    if (state) establishment.address.state = state;

    await this.establishmentsRepository.save(establishment);

    return establishment;
  }
}

export default UpdateEstablishmentService;
