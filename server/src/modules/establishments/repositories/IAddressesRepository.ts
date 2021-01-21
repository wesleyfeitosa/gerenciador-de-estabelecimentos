import ICreateAddressDTO from '../dtos/ICreateAddressDTO';
import Address from '../infra/typeorm/entities/Address';

export default interface IAddressesRepository {
  create(data: ICreateAddressDTO): Promise<Address>;
  save(address: Address): Promise<Address>;
}
