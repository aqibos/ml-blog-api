import { Unauthorized } from '../lib/errors';

export default async function(ctx, next) {
  const { loginService } = ctx.state.container.cradle;
  const loggedinuser = await loginService.authenticateByUsername(ctx.session.username);
  if (!loggedinuser) throw new Unauthorized.errorFn(Unauthorized.message);
  return next();

}
