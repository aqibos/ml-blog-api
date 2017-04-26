export default function makeContainerScopeMiddleware(container) {
  return (ctx, next) => {
    const scope = container.createScope();
    ctx.state.container = scope;

    return next();
  };
}
