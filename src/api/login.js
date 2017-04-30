import { makeInvoker } from '../middleware/invocation';
import { InvalidLogin } from '../lib/errors';

function makeLoginApi({ loginService }) {

  return { login, logout };

  async function login(ctx) {
    const { username, password } = ctx.request.body;
    const matchingUser = await loginService.authenticate(username, password);
    if (!matchingUser) throw new InvalidLogin.errorFn(InvalidLogin.message);

    ctx.session.user = matchingUser; // Add session vars
    ctx.session.username = matchingUser.username;

    ctx.body = matchingUser;
    ctx.status = 200;
  }

  async function logout(ctx) {
    const loggedInUser = ctx.session.user;
    if (loggedInUser) {
      ctx.session.user = null;
      ctx.session.username = null;
    }
    ctx.body = { success: true };
    ctx.status = 200;
  }

}

export default function(router) {
  const api = makeInvoker(makeLoginApi);

  router.post('/login', api('login'));
  router.delete('/logout', api('logout'));
}
