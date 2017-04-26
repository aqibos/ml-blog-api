const statusMaps = [
];

export default function makeErrorHandler() {
  return async function errorHandler(ctx, next) {
    try {
      await next();
    } catch (e) {
      console.log('ERROR=====', e);
      console.log('ERROR JSON=====', JSON.stringify(e, null, 2));
      const matchedErr = statusMaps.find(x => e instanceof x[0]);
      ctx.status = matchedErr ? matchedErr[1] : 500;
      // if (process.argv.indexOf('--showerr') !== -1) console.log(e);
      const errResponse = {success: false, message: `${e.name}: ${e.message}`, data: e.data};
      ctx.body = errResponse;
    }
  };
}

