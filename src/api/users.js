import { makeInvoker } from '../middleware/invocation';
import protect from '../middleware/protect';
// import { InvalidLogin } from '../lib/errors';

function makeUserApi({ userService }) {

  return { getUser, postUser };

  async function getUser(ctx) {
    ctx.body = await userService.getMe(ctx.session.userId);
    ctx.status = 200;
  }

  async function postUser(ctx) {
    ctx.body = await userService.createUser(ctx.request.body);
    ctx.status = 201;
  }

}

export default function(router) {
  const api = makeInvoker(makeUserApi);

  router.get('/users/me', protect, api('getUser'));
  router.post('/users', api('postUser'));
}
