// eslint-disable-next-line
const dotenv = require('dotenv');
dotenv.config();
import { getDbConnection } from './database';

import { app } from './app';

const port = process.env.PORT || 8000;

console.log('~~~~~~ redirect uri', process.env.REDIRECT_URI);

getDbConnection()
  .then(async (conn) => {
    await conn.runMigrations();
    app.listen(port, () => console.log(`Gmail Server is listening at http://localhost:${port}`));
  })
  .catch((error) => {
    console.error(error);
    throw error;
  });
