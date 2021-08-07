import { IBaseEntity } from './baseEntity';

export interface IUser extends IBaseEntity {
  email: string;
  name: string;
  refresh_token: string;
}

export type IUserCreateProps = Pick<IUser, 'email' | 'name' | 'refresh_token'>;

export interface IUserCreateReq {
  authorization_code: string;
}

export type IUserGetRes = Pick<IUser, 'id' | 'email' | 'name' | 'created_at' | 'updated_at'>;
