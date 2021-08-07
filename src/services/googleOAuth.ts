import { google } from 'googleapis';
import { IToken } from 'types/auth';

export class GoogleOAuth {
  private static instance: GoogleOAuth;
  static clientId = process.env.CLIENT_ID;
  static clientSecret = process.env.CLIENT_SECRET;
  static redirectURI = process.env.REDIRECT_URI;

  oAuthClient;
  tokens: IToken = {};

  static scopes = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/contacts.readonly',
  ];

  constructor() {
    this.oAuthClient = new google.auth.OAuth2(GoogleOAuth.clientId, GoogleOAuth.clientSecret, GoogleOAuth.redirectURI);
  }

  static createInstance = () => {
    if (!GoogleOAuth.instance) {
      GoogleOAuth.instance = new GoogleOAuth();
    }
    return GoogleOAuth.instance;
  };

  /**
   *
   */
  getOAuthUri = async (state?: string): Promise<string> => {
    return this.oAuthClient.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent',
      scope: GoogleOAuth.scopes,
      state: state,
    });
  };

  getOAuthTokenFromCode = async (authorizationCode: string): Promise<IToken> => {
    const res = await this.oAuthClient.getToken(authorizationCode);
    if (!res.tokens) {
      return this.tokens;
    }
    this.tokens = {
      access_token: res?.tokens?.access_token || '',
      refresh_token: res?.tokens?.refresh_token || '',
    };

    return this.tokens;
  };
}

export default GoogleOAuth.createInstance();
