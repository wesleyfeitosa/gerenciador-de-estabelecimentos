import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IEstablishmentsRepository from '../repositories/IEstablishmentsRepository';
import Establishment from '../infra/typeorm/entities/Establishment';
import IEstablishmentDTO from '../dtos/IEstablishmentDTO';
import IAddressesRepository from '../repositories/IAddressesRepository';
import IUsersRepository from '../../users/repositories/IUsersRepository';

@injectable()
class CreateEstablishmentService {
  constructor(
    @inject('EstablishmentsRepository')
    private establishmentsRepository: IEstablishmentsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
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
      avatar,
    }: IEstablishmentDTO,
    userId: string,
  ): Promise<Establishment> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('User does not exists exists.', 404);
    }

    const address = await this.addressesRepository.create({
      street,
      street_number,
      neighborhood,
      zipcode,
      city,
      state,
    });

    await this.addressesRepository.save(address);

    const filename = await this.storageProvider.saveFile(
      avatar,
      'establishment_avatars',
    );

    const establishment = await this.establishmentsRepository.create({
      name,
      phone,
      type,
      address,
      avatar: filename,
    });

    await this.establishmentsRepository.save(establishment);

    return establishment;
  }
}

export default CreateEstablishmentService;
