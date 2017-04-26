import 'colors';
const dbConfig = {
  host     : process.env.DATABASE_HOST,
  user     : process.env.DATABASE_USER,
  database : process.env.DATABASE_NAME,
  password : process.env.DATABASE_PASSWORD,
  ssl      : true
};
const remotePostgres = { client: 'pg', connection: dbConfig };

// const isDevDb = dbConfig.database === '';
console.log('Database Config'.yellow, dbConfig);
// console.log(isDevDb
//   ? 'YOU\'RE ON THE DEV DATATBASE'.green
//   : 'YOU\'RE ON THE PROD DATATBASE'.red
// );
const knex = require('knex')(remotePostgres);

module.exports = {
  knex,
  addTimestamps: function(table) {
    table.timestamp('datetime').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
  }
};

