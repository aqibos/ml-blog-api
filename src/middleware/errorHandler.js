import {
  Unauthorized,
  InvalidLogin,
  DuplicateUsername,
  InvalidRegistration,
  InvalidOwnerError,
  InvalidBlog,
  InvalidBlogUpdate,
  InvalidBlogDeletion,
  InvalidComment,
  InvalidCommentUpdate,
  InvalidCommentDeletion
} from '../lib/errors';

const statusMaps = [
  [Unauthorized.errorFn, 401],
  [InvalidLogin.errorFn, 422],
  [DuplicateUsername.errorFn, 422],
  [InvalidRegistration.errorFn, 422],
  [InvalidOwnerError.errorFn, 422],
  [InvalidBlog.errorFn, 422],
  [InvalidBlogUpdate.errorFn, 422],
  [InvalidBlogDeletion.errorFn, 422],
  [InvalidComment.errorFn, 422],
  [InvalidCommentUpdate.errorFn, 422],
  [InvalidCommentDeletion.errorFn, 422]
];

export default function makeErrorHandler() {
  return async function errorHandler(ctx, next) {
    try {
      await next();
    } catch (e) {
      console.log('Raw Error:\n', e);
      console.log('Error as JSON:\n', JSON.stringify(e, null, 2));
      const matchedErr = statusMaps.find(x => e instanceof x[0]);
      ctx.status = matchedErr ? matchedErr[1] : 500;
      const errResponse = {
        success: false, name: e.name, message: `${e.message}`, data: e.data
      };
      ctx.body = errResponse;
    }
  };
}

