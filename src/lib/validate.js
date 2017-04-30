import validate from 'validate.js';
import { curry, map, values } from 'ramda';

function myValidate(constraints, params, error) {
  const result = validate(params, constraints);
  if (result) {
    const errors = values(result).map(x => x.join(', ')).join(', ');
    throw new error.errorFn(errors);
  }
  return params;
}

const isRequired    = { presence: true };
const primaryKey    = { presence: true, numericality: {onlyInteger: true, greaterThanOrEqualTo: 1}};

const loginConstraints = {
  username: isRequired,
  password: isRequired
};
const registerConstraints = {
  username: isRequired,
  password: isRequired
};

const newBlogConstraints = {
  title: isRequired,
  content: isRequired,
  username: isRequired
};
const modifiyBlogConstraints = {
  blogId: primaryKey,
  title: isRequired,
  content: isRequired,
  username: isRequired
};
const deleteBlogConstraints = {
  blogId: primaryKey,
  username: isRequired
};

const newCommentConstraints = {
  content: isRequired,
  username: isRequired
};
const modifiyCommentConstraints = {
  commentId: primaryKey,
  content: isRequired,
  username: isRequired
};
const deleteCommentConstraints = {
  commentId: primaryKey,
  username: isRequired
};

module.exports = {
  validate: curry(myValidate),
  loginConstraints,
  registerConstraints,
  newBlogConstraints,
  modifiyBlogConstraints,
  deleteBlogConstraints,
  newCommentConstraints,
  modifiyCommentConstraints,
  deleteCommentConstraints
};