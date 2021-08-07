import { IUser, IUserCreateReq } from 'types/user';
import { BaseService } from './_base';
import { OperationError } from '../common/operationError';
import { HttpStatusCode } from '../common/httpStatusCode';
import { UserRepository } from '../database/repositories/user';

export class UsersService extends BaseService<UserRepository, IUser> {
  constructor() {
    const repo = new UserRepository();
    super(repo);
  }

  public async getByEmail(email: string): Promise<IUser> {
    const result = await this.repository.findOne({
      where: {
        email,
      },
    });
    if (!result) {
      throw new OperationError('NOT_FOUND', HttpStatusCode.NOT_FOUND);
    }

    return result;
  }

  public async create({ authorization_code }: IUserCreateReq) {
    try {
      return await this.repository.create({
        email: 'test@test.com',
        name: 'asdfasdf',
        refresh_token: 'address',
      });
    } catch (err) {
      throw new OperationError('UNKNOWN_ERROR', HttpStatusCode.INTERNAL_SERVER_ERROR);
    }
  }
}
