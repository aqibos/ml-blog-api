export function makeInvoker (fn) {
  return function makeMemberInvoker(methodToInvoke) {
    return function memberInvoker(ctx, ...rest) {
      const result = fn(ctx.state.container.cradle);
      return result[methodToInvoke](ctx, ...rest);
    };
  };
}
