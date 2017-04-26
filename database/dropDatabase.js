import 'colors';
import { knex } from './dbConfig';

knex.schema.dropTableIfExists('comments')
  .then(() => knex.schema.dropTableIfExists('blogs'))
  .then(() => knex.schema.dropTableIfExists('users'))
  .then(function() {
    console.log('Successfully dropped all tables'.green);
    knex.destroy();
  })
  .catch(function(err) {
    console.log('Uh oh, something went wrong!\n'.red, err);
    knex.destroy();
  });
