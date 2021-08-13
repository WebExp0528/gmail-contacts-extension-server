const path = require('path');
const dotenv = require('dotenv').config({ path: path.resolve(__dirname, './.env') });

module.exports = {
  apps: [
    {
      name: 'gmail-server',
      script: './build/server.js', // Your entry point
      instances: 1,
      max_memory_restart: '2G',
      env: {
        NODE_ENV: 'production',
        PORT: '8080',
        ...dotenv.parsed,
      },
    },
  ],
};
