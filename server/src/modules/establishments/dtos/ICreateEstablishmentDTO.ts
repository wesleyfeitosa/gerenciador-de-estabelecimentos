import Address from '../infra/typeorm/entities/Address';

export default interface ICreateEstablishmentDTO {
  name: string;
  phone: string;
  type: string;
  address: Address;
}
