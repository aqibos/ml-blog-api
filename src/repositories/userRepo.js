import { camelifyOutKeys } from '../utilities/functionalUtil.js';

export default function UserRepo({ knex }) {

  return {
    byUsername: camelifyOutKeys(byUsername),
    byId: camelifyOutKeys(byId)
  };

  async function byUsername(username) {
    const x = await knex('users').where({ username });
    return x[0];
  }

  async function byId(id) {
    return await knex('users')
      .where({ id })
      .first('*')
      .returning('*');
  }
}
