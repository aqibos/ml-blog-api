import {
  curry, fromPairs, is, isArrayLike, isEmpty, keys, length,
  map, pipe, toPairs
} from 'ramda';
import changeCase from 'change-case';

const realObj = o => !is(Array, o) && !isEmpty(keys(o));
const isNested = x => realObj(x) && length(keys(x));
const nestedTransformKeys = curry((transform, x) => {
  if (!isNested(x)) return x;
  return pipe(
    toPairs,
    map(y => [transform(y[0]), nestedTransformKeys(transform, y[1])]),
    fromPairs
  )(x);
});
const snakeifyKeys = nestedTransformKeys(changeCase.snake);
const camelifyKeys = nestedTransformKeys(changeCase.camel);
const camelifyOutKeys = fn => {
  return async function(args) {
    const ret = await fn(args);
    return isArrayLike(ret) ? map(camelifyKeys, ret) :
           is(Object, ret)  ? camelifyKeys(ret) :
           ret;
  };
};
const snakeInCamelOut = fn => {
  return async function(args) {
    const snakedParams = snakeifyKeys(args);
    const resp = await fn(snakedParams);
    const cameledOut = camelifyKeys(resp);
    return cameledOut;
  };
};

export { camelifyOutKeys, snakeInCamelOut };
