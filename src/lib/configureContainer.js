import { createContainer, Lifetime } from 'awilix';
import knex from 'knex';

const productionModules = [
  // 'services/*.js',
  // 'repositories/*.js',
  ['middleware/errorHandler.js', Lifetime.SINGLETON]
];

const makeKnex = ({ dbConfig }) => knex(dbConfig);
const remotePostgres = {
  client: 'pg',
  connection: {
    host:     process.env.DATABASE_HOST,
    user:     process.env.DATABASE_USER,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    ssl:      true
  }
};

export default function getConfiguredContainer(modulesToLoad = productionModules) {
  const container = createContainer();

  container.registerValue({ dbConfig: remotePostgres });
  container.registerFunction({ knex: [makeKnex, { lifetime: Lifetime.SINGLETON }] });

  container.loadModules(modulesToLoad, {
    cwd: `${__dirname}/..`,
    formatName: 'camelCase',
    // When register module to container, register for lifetime of container
    registrationOptions: { lifetime: Lifetime.SCOPED }
  });

  return container;
}

