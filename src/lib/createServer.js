import Koa from 'koa';
import Router from 'koa-router';
import convert from 'koa-convert';
import session from 'koa-session';
import respond from 'koa-respond';
import bodyParser from 'koa-bodyparser';
import cors from 'kcors';
import createApis from './createApis';
import getConfiguredContainer from './configureContainer';
import notFoundHandler from '../middleware/notFound';
import containerScope from '../middleware/containerScope';
import onlyAllowSsl from '../middleware/onlyAllowSsl';

const containerInstance = getConfiguredContainer();

export default async function createServer(container = containerInstance) {
  const app = new Koa();
  const router = new Router();
  app.use(onlyAllowSsl);

  app.use(respond()); // adds ctx.ok(), ctx.notFound(), etc..
  app.use(convert(cors({ credentials: true })));
  app.use(bodyParser());
  app.use(container.cradle.errorHandler);

  app.keys = [process.env.COOKIE_SECRET];
  app.use(convert(session({key: 'ml-blog', maxAge: 864000000000}, app)));

  // Adds middleware that creates a new container Scope for each request.
  app.use(containerScope(container));

  // Create the API's.
  createApis(router, container);

  // Install routes
  app.use(router.allowedMethods());
  app.use(router.routes());

  // Default handler when nothing stopped the chain.
  app.use(notFoundHandler);

  return app;
}

