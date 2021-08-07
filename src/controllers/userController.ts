import express from 'express';
import { IUserCreateReq, IUserGetRes } from 'types/user';
import { Body, Controller, Get, Path, Post, Route, Security, SuccessResponse, Request } from 'tsoa';
import { UsersService } from '../services/userService';

@Security('basic')
@Route('users')
export class UsersController extends Controller {
  @Get('{email}')
  public async getUser(@Path() email: string, @Request() request: express.Request): Promise<IUserGetRes> {
    console.log('~~~~~ request', request);
    return new UsersService().getByEmail(email);
  }

  @SuccessResponse('201', 'Created') // Custom success response
  @Post()
  public async createUser(@Body() requestBody: IUserCreateReq): Promise<void> {
    this.setStatus(201); // set return status 201
    new UsersService().create(requestBody);
    return;
  }
}
