import { getRepository, Repository } from 'typeorm';

import ICreateEstablishmentDTO from '@modules/establishments/dtos/ICreateEstablishmentDTO';
import IEstablishmentsRepository from '@modules/establishments/repositories/IEstablishmentsRepository';
import Establishment from '../entities/Establishment';

class EstablishmentsRepository implements IEstablishmentsRepository {
  private ormRepository: Repository<Establishment>;

  constructor() {
    this.ormRepository = getRepository(Establishment);
  }

  public async find(): Promise<Establishment[]> {
    const establishments = await this.ormRepository.find({});

    return establishments;
  }

  public async findById(id: string): Promise<Establishment | undefined> {
    const findEstablishment = await this.ormRepository.findOne(id);

    return findEstablishment;
  }

  public async search(city: string, state: string): Promise<Establishment[]> {
    const establishments = await this.ormRepository.find();

    const establishmentsFiltered = establishments.filter(
      establishment =>
        establishment.address.city === city &&
        establishment.address.state === state,
    );

    return establishmentsFiltered;
  }

  public async create({
    name,
    phone,
    type,
    address,
    avatar,
  }: ICreateEstablishmentDTO): Promise<Establishment> {
    const establishment = this.ormRepository.create({
      name,
      phone,
      type,
      address,
      avatar,
    });

    return establishment;
  }

  public async save(establishment: Establishment): Promise<Establishment> {
    return this.ormRepository.save(establishment);
  }

  public async remove(establishment: Establishment): Promise<void> {
    await this.ormRepository.remove(establishment);
  }
}

export default EstablishmentsRepository;
