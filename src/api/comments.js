import { makeInvoker } from '../middleware/invocation';
import protect from '../middleware/protect';
import querystring from 'querystring';
// import { InvalidLogin } from '../lib/errors';

function makeCommentApi({ commentService }) {

  return { getComment, postComment, putComment, deleteComment };

  async function getComment(ctx) {
    const qs = querystring.parse(ctx.querystring);
    ctx.body = await commentService.getComment(qs);
    ctx.status = 200;
  }

  async function postComment(ctx) {
    ctx.body = await commentService.createComment(ctx.request.body);
    ctx.status = 201;
  }

  async function putComment(ctx) {
    ctx.body = await commentService.updateComment(ctx.request.body);
    ctx.status = 200;
  }

  async function deleteComment(ctx) {
    ctx.body = await commentService.deleteComment(ctx.request.body);
    ctx.status = 200; // TODO: Look up HTTP code for delete
  }
}

export default function(router) {
  const api = makeInvoker(makeCommentApi);

  // TODO: Assumes that anyone can see blogs
  router.get('/comments', api('getComment'));
  router.post('/comments', protect, api('postComment'));
  router.put('/comments', protect, api('putComment'));
  router.delete('/comments', protect, api('deleteComment'));
}
