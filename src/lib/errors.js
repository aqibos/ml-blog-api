import customError from 'custom-error';

const Unauthorized = makeError(
  'Unauthorized',
  'You must be logged in.'
);
const InvalidLogin = makeError(
  'InvalidLogin',
  'Username/password combination is incorrect'
);
const DuplicateUsername = makeError(
  'DuplicateUsername',
  'This username is taken. Please try a different one.'
);
const InvalidRegistration = makeError(
  'InvalidRegistration',
  'Registration could not be completed. Please check username and password'
);
const InvalidOwnerError = makeError(
  'InvalidOnwerError',
  'You must be the author of this content.'
);
const InvalidBlog = makeError(
  'InvalidBlog',
  'Could not create blog.'
);
const InvalidBlogUpdate = makeError(
  'InvalidBlogEdit',
  'Could not modify this blog.'
);
const InvalidBlogDeletion = makeError(
  'InvalidBlogDeletion',
  'Could not delete this blog.'
);
const InvalidComment = makeError(
  'InvalidComment',
  'Could not create comment.'
);
const InvalidCommentUpdate = makeError(
  'InvalidCommentEdit',
  'Could not modify this comment.'
);
const InvalidCommentDeletion = makeError(
  'InvalidCommentDeletion',
  'Could not delete this comment.'
);

function makeError(name, message) {
  return { errorFn: customError(name), message };
}

module.exports = {
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
};
