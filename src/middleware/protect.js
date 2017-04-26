// import { Unauthorized } from '../lib/errors';

export default async function(ctx, next) {

  // const { loginService } = ctx.state.container.cradle;
  // const loggedInUser = await loginService.authenticateByUserId(ctx.session.userId);
  // if (!loggedInUser) throw new Unauthorized.errorFn(Unauthorized.message);
  return next();

}
