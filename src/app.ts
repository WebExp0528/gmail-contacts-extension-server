import express, { Response as ExResponse, Request as ExRequest } from 'express';
import swaggerUi from 'swagger-ui-express';
import { RegisterRoutes } from './routes';
import { GoogleOAuth } from './services/googleOAuth';

export const app = express();

// Use body parser to read sent json payloads
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const options = {
  oauth: {
    clientId: GoogleOAuth.clientId,
    clientSecret: GoogleOAuth.clientSecret,
    appName: 'Gmail Extension',
    scopeSeparator: ',',
  },
};

app.use('/docs', swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
  return res.send(swaggerUi.generateHTML(await import('./swagger.json'), undefined, options));
});

RegisterRoutes(app);
