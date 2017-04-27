import { camelifyOutKeys, snakeInCamelOut } from '../utilities/functionalUtil.js';

export default function userRepo({ knex }) {

  return {
    byUsername: camelifyOutKeys(byUsername),
    byId: camelifyOutKeys(byId),
    create: snakeInCamelOut(create)
  };

  async function byUsername(username) {
    return await knex('users')
      .where({ username })
      .select('*')
      .first('*');
  }

  async function byId(id) {
    return await knex('users')
      .where({ id })
      .select('*')
      .first('*');
  }

  async function create(params) {
    return (await knex('users')
      .insert(params)
      .returning('*')
    )[0];
  }
}
