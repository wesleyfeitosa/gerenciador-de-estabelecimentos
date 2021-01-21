import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IEstablishmentsRepository from '../repositories/IEstablishmentsRepository';
import Establishment from '../infra/typeorm/entities/Establishment';

interface IRequest {
  establishment_id: string;
  avatarFilename: string;
}

@injectable()
class UpdateEstablishmentAvatarService {
  constructor(
    @inject('EstablishmentsRepository')
    private establishmentsRepository: IEstablishmentsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    establishment_id,
    avatarFilename,
  }: IRequest): Promise<Establishment> {
    const establishment = await this.establishmentsRepository.findById(
      establishment_id,
    );

    if (!establishment) {
      throw new AppError('Establishment does not exists.', 404);
    }

    if (establishment.avatar) {
      this.storageProvider.deleteFile(
        establishment.avatar,
        'establishment_avatars',
      );
    }

    const filename = await this.storageProvider.saveFile(
      avatarFilename,
      'establishment_avatars',
    );

    establishment.avatar = filename;

    await this.establishmentsRepository.save(establishment);

    return establishment;
  }
}

export default UpdateEstablishmentAvatarService;
