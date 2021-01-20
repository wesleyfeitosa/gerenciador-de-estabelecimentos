import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import IndexUsersService from '../../../services/IndexUsersService';

class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const indexUsers = container.resolve(IndexUsersService);

    const users = await indexUsers.execute();

    return response.json(classToClass(users));
  }
}

export default UsersController;
