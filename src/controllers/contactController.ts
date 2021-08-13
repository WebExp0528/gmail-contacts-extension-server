import { Controller, Get, Route, Security, Request } from 'tsoa';

import { IRequest } from '../types/general';
import { GoogleOAuth } from './../services/googleOAuth';
import { IContacts } from '../types/contacts';

@Security('basic')
@Route('contacts')
export class ContactController extends Controller {
  @Get('list')
  public async getContactList(@Request() request: IRequest): Promise<IContacts[]> {
    const user = request.user;
    const googleOAuth = new GoogleOAuth();
    googleOAuth.setToken(user.email, { refresh_token: user.refresh_token });
    const contacts = googleOAuth.getContacts();
    return contacts;
  }
}
