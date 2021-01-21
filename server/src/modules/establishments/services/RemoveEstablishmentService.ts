import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEstablishmentsRepository from '../repositories/IEstablishmentsRepository';
import IUsersRepository from '../../users/repositories/IUsersRepository';

@injectable()
class RemoveEstablishmentService {
  constructor(
    @inject('EstablishmentsRepository')
    private establishmentsRepository: IEstablishmentsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(userId: string, establishmentId: string): Promise<void> {
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

    await this.establishmentsRepository.remove(establishment);
  }
}

export default RemoveEstablishmentService;
