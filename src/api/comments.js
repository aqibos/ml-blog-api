import { makeInvoker } from '../middleware/invocation';
import protect from '../middleware/protect';
import querystring from 'querystring';
import { merge } from 'ramda';

function makeCommentApi({ commentService }) {

  return { getComment, postComment, putComment, deleteComment };

  async function getComment(ctx) {
    const qs = querystring.parse(ctx.querystring);
    ctx.body = await commentService.getComment(qs);
    ctx.status = 200;
  }

  async function postComment(ctx) {
    ctx.body = await commentService.createComment(usernameWithParams(ctx));
    ctx.status = 201;
  }

  async function putComment(ctx) {
    ctx.body = await commentService.updateComment(usernameWithParams(ctx));
    ctx.status = 200;
  }

  async function deleteComment(ctx) {
    ctx.body = await commentService.deleteComment(usernameWithParams(ctx));
    ctx.status = 200; // TODO: Look up HTTP code for delete
  }

  // TODO: Move to util -- also used by src/api/blogs.js
  function usernameWithParams(ctx) {
    return merge(ctx.request.body, { username: ctx.session.username });
  }
}


export default function(router) {
  const api = makeInvoker(makeCommentApi);

  // TODO: Assumes that anyone can see comments
  router.get('/comments', api('getComment'));
  router.post('/comments', protect, api('postComment'));
  router.put('/comments', protect, api('putComment'));
  router.delete('/comments', protect, api('deleteComment'));
}