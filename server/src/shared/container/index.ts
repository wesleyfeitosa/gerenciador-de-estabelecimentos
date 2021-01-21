import { container } from 'tsyringe';

import './providers';
import '@modules/users/providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import EstablishmentsRepository from '@modules/establishments/infra/typeorm/repositories/EstablishmentsRepository';
import IEstablishmentsRepository from '@modules/establishments/repositories/IEstablishmentsRepository';
import IAddressesRepository from '@modules/establishments/repositories/IAddressesRepository';
import AddressesRepository from '@modules/establishments/infra/typeorm/repositories/AddressesRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
container.registerSingleton<IEstablishmentsRepository>(
  'EstablishmentsRepository',
  EstablishmentsRepository,
);
container.registerSingleton<IAddressesRepository>(
  'AddressesRepository',
  AddressesRepository,
);
