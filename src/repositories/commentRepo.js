import { camelifyOutKeys, snakeInCamelOut } from '../utilities/functionalUtil.js';
import { merge, omit, pipe } from 'ramda';

export default function commentRepo({ knex }) {

  return {
    byId:       camelifyOutKeys(byId),
    byBlogId:   camelifyOutKeys(byBlogId),
    byUsername: camelifyOutKeys(byUsername),
    all:        camelifyOutKeys(all),
    create:     snakeInCamelOut(create),
    update:     snakeInCamelOut(update),
    del:        snakeInCamelOut(del),
    delByBlogId: snakeInCamelOut(delByBlogId)
  };

  async function all() {
    return await knex('comments').orderBy('datetime', 'asc');
  }

  async function byBlogId(blogId) {
    return await knex('comments')
    .where({ post_id: blogId })
    .orderBy('datetime', 'asc');
  }

  async function byUsername(username) {
    return await knex('comments')
    .where({ username });
  }

  async function byId(id) {
    return await knex('comments')
      .where({ id })
      .first('*');
  }

  async function create(params) {
    const post_id = parseInt(params.blog_id); // Must use snake case in repo
    const modifiedParams = pipe(omit(['blog_id']), merge({ post_id }))(params);
    return (await knex('comments')
      .insert(modifiedParams)
      .returning('*')
    )[0];
  }

  async function update(params) {
    return (await knex('comments')
      .update({ content: params.content })
      .where({ id: params.comment_id })
      .returning('*')
    )[0];
  }

  async function del(params) {
    return (await knex('comments')
      .del()
      .where({ id: params.comment_id })
      .returning('*')
    )[0];
  }

  async function delByBlogId(blogId) {
    return (await knex('comments')
      .del()
      .where({ post_id: blogId })
      .returning('*')
    )[0];
  }
}