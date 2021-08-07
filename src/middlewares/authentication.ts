import { Request } from 'express';
import { IUser } from 'types/user';
import { UsersService } from '../services/userService';

export async function expressAuthentication(request: Request, securityName: string, scopes?: string[]): Promise<IUser> {
  if (securityName === 'basic' && request.headers.authorization) {
    const email = request.headers.authorization;
    const user = new UsersService().getByEmail(email);
    const result = user ? Promise.resolve(user) : Promise.reject({});
    // request.user = user;
    return result;
  }

  return Promise.reject({});
}

export default expressAuthentication;
