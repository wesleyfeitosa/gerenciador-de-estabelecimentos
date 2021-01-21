import { inject, injectable } from 'tsyringe';
import Establishment from '../infra/typeorm/entities/Establishment';
import IEstablishmentsRepository from '../repositories/IEstablishmentsRepository';

@injectable()
class IndexEstablishmentsService {
  constructor(
    @inject('EstablishmentsRepository')
    private establishmentsRepository: IEstablishmentsRepository,
  ) {}

  public async execute(): Promise<Establishment[]> {
    const establishments = await this.establishmentsRepository.find();

    return establishments;
  }
}

export default IndexEstablishmentsService;
