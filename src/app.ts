import express, { Response as ExResponse, Request as ExRequest } from 'express';
import swaggerUi from 'swagger-ui-express';
import { RegisterRoutes } from './routes';
import { GoogleOAuth } from './services/googleOAuth';

export const app = express();

// Use body parser to read sent json payloads
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const options = {
  swaggerOptions: {
    oauth2RedirectUrl: GoogleOAuth.redirectURI,
    oauth: {
      clientId: GoogleOAuth.clientId,
      clientSecret: GoogleOAuth.clientSecret,
    },
  },
};

console.log('~~~~ options', process.env.CLIENT_ID);

app.use('/docs', swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
  return res.send(swaggerUi.generateHTML(await import('./swagger.json'), options));
});

RegisterRoutes(app);
