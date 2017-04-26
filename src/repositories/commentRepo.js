import { camelifyOutKeys, snakeInCamelOut } from '../utilities/functionalUtil.js';

export default function commentRepo({ knex }) {

  return {
    byId     : camelifyOutKeys(byId),
    byUserId : camelifyOutKeys(byId),
    all      : camelifyOutKeys(all),
    create   : snakeInCamelOut(create),
    update   : snakeInCamelOut(update),
    del      : snakeInCamelOut(del)
  };

  async function all() {
    return await knex('comments');
  }

  async function byUserId(username) {
    return await knex('comments').where({ username });
  }

  async function byId(id) {
    return await knex('comments')
      .where({ id })
      .first('*');
  }

  async function create(params) {
    return (await knex('comments')
      .insert(params)
      .returning('*')
    )[0];
  }

  async function update(params) {
    return (await knex('comments')
      .update(params)
      .where({ id: params.id })
      .returning('*')
    )[0];
  }

  async function del(params) {
    return (await knex('comments')
      .del()
      .where({ id: params.id })
      .returning('*')
    )[0];
  }
}

