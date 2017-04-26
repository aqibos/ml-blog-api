export default async (ctx, next) => {

  const noSsl = ctx.request.headers['x-forwarded-proto'] !== 'https';
  const production = process.env.NODE_ENV === 'production';

  if (noSsl && production) {
    ctx.status = 403;
    ctx.body = {success: false, message: 'SSL is required!'};
  } else await next();
};

