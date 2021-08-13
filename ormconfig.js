const basePath = process.env.NODE_ENV === 'development' ? 'src/database' : 'build/database';

const baseOptions = {
  cli: {
    migrationsDir: '${basePath}/migrations',
    entitiesDir: '${basePath}/entities',
  },
  host: process.env.DB_HOST,
  logging: false,
  entities: [`${__dirname}/${basePath}/entities/**/*.ts`],
  migrations: [`${__dirname}/${basePath}/migrations/*.ts`],
  password: process.env.DB_PASS,
  port: 5432,
  type: 'postgres',
  username: process.env.DB_USER,
  autoLoadEntities: true,
  name: process.env.DB_NAME,
  database: process.env.DB_NAME,
  synchronize: true,
  ssl: {
    rejectUnauthorized: false,
  },
};

module.exports = [
  Object.assign({}, baseOptions, {
    synchronize: true,
    logging: process.env.LOG === '1',
  }),
];
