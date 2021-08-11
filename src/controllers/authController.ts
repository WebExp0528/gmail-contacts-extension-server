import { Request as ExpressReq } from 'express';
import { Controller, Get, Route, SuccessResponse, Query, Request, Path } from 'tsoa';

import { OperationError } from './../common/operationError';
import { UserService } from '../services/userService';
import { GoogleOAuth } from './../services/googleOAuth';

@Route('auth')
export class AuthController extends Controller {
  @Get('oauth/{email}')
  @SuccessResponse(302, 'Redirect')
  public async getAuthURI(@Request() request: ExpressReq, @Path('email') email: string): Promise<void> {
    if (!email) {
      throw new OperationError('INVALID_EMAIL', 400);
    }
    const uri = new GoogleOAuth().getOAuthUri(email);
    request?.res?.redirect(uri);
  }

  @Get('callback')
  public async authCallback(
    @Query('code') code: string,
    @Query('state') email: string,
    @Request() request: ExpressReq
  ): Promise<void> {
    const googleClient = new GoogleOAuth();
    const token = await googleClient.getOAuthTokenFromCode(code);
    googleClient.setToken(email, token);
    const { name } = await googleClient.getUser();
    const userService = new UserService();
    await userService.create({ name, email, refresh_token: token.refresh_token || '' });
    request?.res?.send(this.authResponseHTML()).end();
  }

  private authResponseHTML = () => {
    return `<!doctype html>

    <html lang="en" style="height: 100%;">
    
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
    
        <title>Auth Success</title>
        <meta name="description" content="Auth Success">
        <meta name="author" content="SitePoint">
    
        <meta property="og:title" content="Auth Success">
        <meta property="og:type" content="website">
    
        <style>
            body {
                height: 100%;
                position: relative;
            }
    
            .success {
                text-align: center;
                color: green;
                height: 200px;
                width: 400px;
                display: flex;
                justify-content: center;
                position: absolute;
                top: 0;
                bottom: 0;
                right: 0;
                left: 0;
                margin: auto;
                flex-direction: column;
            }
        </style>
    
        <script>
            var initTime = 10000
            function onClose() {
                setInterval( () => {
                    initTime -= 1000;
                    if ( initTime <= 0 ) {
                        window.close();
                    }
                    document.querySelector( ".auto-close-text" ).innerHTML = "This window will be closed in "+initTime / 1000+" seconds"
                }, 1000 )
            }
        </script>
    </head>
    
    <body onload="onClose()">
        <div class="success">
            <h1>Auth Success</h1>
            <p class="auto-close-text"></p>
        </div>
    
    </body>
    
    </html>`;
  };
}
