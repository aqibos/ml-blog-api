import 'colors';
import { knex, addTimestamps } from './dbConfig';

knex.schema.createTable('users', function(table) {
  table.increments();
  table.string('username', 1024);
  table.unique('username');
  table.string('password', 1024);
  addTimestamps(table);
})
.then(function() {
  console.log('Successfully created table \'users\'\n'.green);
  return knex.schema.createTable('blogs', function(table) {
    table.increments();
    table.string('username', 1024);
    // TODO: Ask if can rename to user_id
    table.foreign('username').references('username').inTable('users');
    table.string('title', 2048);
    table.text('content');
    addTimestamps(table);
  });
})
.then(function() {
  console.log('Successfully created table \'blogs\'\n'.green);
  return knex.schema.createTable('comments', function(table) {
    table.increments();
    table.integer('post_id');
    // TODO: Ask if can rename to blog_id
    table.foreign('post_id').references('id').inTable('blogs');
    table.string('username', 1024);
    // TODO: Ask if can rename to user_id
    table.foreign('username').references('username').inTable('users');
    table.text('content');
    addTimestamps(table);
  });
})
.then(function() {
  console.log('Successfully created table \'comments\'\n'.green);
  knex.destroy();
})
.catch(function(err) {
  console.log('Uh oh, something went wrong!\n'.red, err);
  knex.destroy();
});

