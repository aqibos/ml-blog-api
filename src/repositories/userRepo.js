import { camelifyOutKeys } from '../utilities/functionalUtil.js';

export default function userRepo({ knex }) {

  return {
    byUsername: camelifyOutKeys(byUsername),
    byId: camelifyOutKeys(byId)
  };

  async function byUsername(username) {
    return await knex('users')
      .where({ username })
      .first('*')
  }

  async function byId(id) {
    return await knex('users')
      .where({ id })
      .first('*');
  }

  async function create(params) {
    return (await knex('users')
      .insert(params)
      .returning('*')
    )[0];
  }
}
