import ICreateEstablishmentDTO from '../dtos/ICreateEstablishmentDTO';
import Establishment from '../infra/typeorm/entities/Establishment';

export default interface IEstablishmentsRepository {
  find(): Promise<Establishment[]>;
  findById(id: string): Promise<Establishment | undefined>;
  search(city: string, state: string): Promise<Establishment[]>;
  create(data: ICreateEstablishmentDTO): Promise<Establishment>;
  save(user: Establishment): Promise<Establishment>;
  remove(establishment: Establishment): Promise<void>;
}
