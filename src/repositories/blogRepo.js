import { camelifyOutKeys, snakeInCamelOut } from '../utilities/functionalUtil.js';

export default function blogRepo({ knex }) {

  return {
    byId     : camelifyOutKeys(byId),
    byUserId : camelifyOutKeys(byId),
    all      : camelifyOutKeys(all),
    create   : snakeInCamelOut(create),
    update   : snakeInCamelOut(update),
    del      : snakeInCamelOut(del)
  };

  async function all() {
    return await knex('blogs');
  }

  async function byUserId(username) {
    return await knex('blogs').where({ username });
  }

  async function byId(id) {
    return await knex('blogs')
      .where({ id })
      .first('*');
  }

  async function create(params) {
    return (await knex('blogs')
      .insert(params)
      .returning('*')
    )[0];
  }

  async function update(params) {
    return (await knex('blogs')
      .update(params)
      .where({ id: params.id })
      .returning('*')
    )[0];
  }

  async function del(params) {
    return (await knex('blogs')
      .del()
      .where({ id: params.id })
      .returning('*')
    )[0];
  }
}

