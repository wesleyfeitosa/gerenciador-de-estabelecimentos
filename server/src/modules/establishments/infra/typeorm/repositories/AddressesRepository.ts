import { getRepository, Repository } from 'typeorm';

import IAddressesRepository from '@modules/establishments/repositories/IAddressesRepository';
import ICreateAddressDTO from '@modules/establishments/dtos/ICreateAddressDTO';
import Address from '../entities/Address';

class AddressesRepository implements IAddressesRepository {
  private ormRepository: Repository<Address>;

  constructor() {
    this.ormRepository = getRepository(Address);
  }

  public async create({
    street,
    street_number,
    neighborhood,
    zipcode,
    city,
    state,
  }: ICreateAddressDTO): Promise<Address> {
    const address = this.ormRepository.create({
      street,
      street_number,
      neighborhood,
      zipcode,
      city,
      state,
    });

    return address;
  }

  public async save(address: Address): Promise<Address> {
    return this.ormRepository.save(address);
  }
}

export default AddressesRepository;
