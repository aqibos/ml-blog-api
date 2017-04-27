import { makeInvoker } from '../middleware/invocation';
import protect from '../middleware/protect';
import { InvalidLogin } from '../lib/errors';

function makeLoginApi({ loginService }) {

  return { login, logout };

  async function login(ctx) {
    const { username, password } = ctx.request.body;
    console.log('Calling POST /login', JSON.stringify(ctx.request.body, null, 2));
    const matchingUser = await loginService.authenticate(username, password);
    if (!matchingUser) throw new InvalidLogin.errorFn(InvalidLogin.message);

    // Set session vars
    ctx.session.user = matchingUser;
    ctx.session.userId = matchingUser.id;

    ctx.body = matchingUser;
    ctx.status = 200;
  }

  async function logout(ctx) {
    const loggedInUser = ctx.session.user;
    if (loggedInUser) {
      ctx.session.user = null;
      ctx.session.userId = null;
    }
    ctx.noContent();
  }

}

export default function(router) {
  const api = makeInvoker(makeLoginApi);

  router.post('/login', api('login'));
  router.delete('/logout', api('logout'));
}
