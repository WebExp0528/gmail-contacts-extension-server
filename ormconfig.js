const baseOptions = {
  cli: {
    migrationsDir: 'src/database/migrations',
    entitiesDir: 'src/database/entities',
  },
  host: process.env.DB_HOST,
  logging: false,
  entities: [`${__dirname}/src/database/entities/**/*.ts`],
  migrations: [`${__dirname}/src/database/migrations/*.ts`],
  password: process.env.DB_PASS,
  port: 5432,
  type: 'postgres',
  username: process.env.DB_USER,
  autoLoadEntities: true,
  name: process.env.DB_NAME,
  database: process.env.DB_NAME,
  synchronize: true,
};

module.exports = [
  Object.assign({}, baseOptions, {
    synchronize: true,
    logging: process.env.LOG === '1',
  }),
];
