import { inject, injectable } from 'tsyringe';
import Establishment from '../infra/typeorm/entities/Establishment';
import IEstablishmentsRepository from '../repositories/IEstablishmentsRepository';

@injectable()
class SearchEstablishmentsService {
  constructor(
    @inject('EstablishmentsRepository')
    private establishmentsRepository: IEstablishmentsRepository,
  ) {}

  public async execute(city: string, state: string): Promise<Establishment[]> {
    const establishments = await this.establishmentsRepository.search(
      city,
      state,
    );

    return establishments;
  }
}

export default SearchEstablishmentsService;
