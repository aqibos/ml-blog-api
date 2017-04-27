import { makeInvoker } from '../middleware/invocation';
import protect from '../middleware/protect';
import querystring from 'querystring';
import { merge } from 'ramda';

function makeBlogApi({ blogService }) {

  return { getBlog, postBlog, putBlog, deleteBlog };

  async function getBlog(ctx) {
    const qs = querystring.parse(ctx.querystring);
    ctx.body = await blogService.getBlog(qs);
    ctx.status = 200;
  }

  async function postBlog(ctx) {
    ctx.body = await blogService.createBlog(usernameWithParams(ctx));
    ctx.status = 201;
  }

  async function putBlog(ctx) {
    ctx.body = await blogService.updateBlog(usernameWithParams(ctx));
    ctx.status = 200;
  }

  async function deleteBlog(ctx) {
    ctx.body = await blogService.deleteBlog(usernameWithParams(ctx));
    ctx.status = 200; // TODO: Look up HTTP code for delete
  }

  // TODO: Move to util -- also used by src/api/comments.js
  function usernameWithParams(ctx) {
    return merge(ctx.request.body, { username: ctx.session.username });
  }
}

export default function(router) {
  const api = makeInvoker(makeBlogApi);

  // TODO: Assumes that anyone can see blogs
  router.get('/blogs', api('getBlog'));
  router.post('/blogs', protect, api('postBlog'));
  router.put('/blogs', protect, api('putBlog'));
  router.delete('/blogs', protect, api('deleteBlog'));
}

