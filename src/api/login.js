import { makeInvoker } from '../middleware/invocation';
import protect from '../middleware/protect';
// import { InvalidLogin } from '../lib/errors';

function makeLoginApi({ loginService }) {

  return { login, logout };

  async function login(ctx) {
    const { email, password } = ctx.request.body;
    const matchingUser = await loginService.authenticate(email, password);
    if (!matchingUser) { /* Throw invalid login error */ return; }

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
    ctx.noContent(); // HTTP: 204
  }

}

export default function(router) {
  const api = makeInvoker(makeLoginApi);

  router.post('/login', api('login'));
  router.delete('/logout', api('logout'));
}
