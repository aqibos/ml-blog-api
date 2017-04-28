import {
  InvalidOwnerError,
  InvalidBlog,
  InvalidBlogUpdate,
  InvalidBlogDeletion
} from '../lib/errors';
import {
  validate,
  newBlogConstraints,
  modifiyBlogConstraints,
  deleteBlogConstraints
} from '../lib/validate';

export default function blogService({ blogRepo }) {

  return { getBlog, createBlog, updateBlog, deleteBlog };

  async function getBlog(queryConstraints) {
    const { id, userId } = queryConstraints;
    return id     ? await blogRepo.byId(id) :
           userId ? await blogRepo.userId(userId) :
                    await blogRepo.all();
  }

  async function createBlog(params) {
    validate(newBlogConstraints, params, InvalidBlog);
    return await blogRepo.create(params);
  }

  async function updateBlog(params) {
    validate(modifiyBlogConstraints, params, InvalidBlogUpdate);
    const { blogId, username } = params;
    const isOwner = await validateOwnership(blogId, username);
    if (!isOwner) throw new InvalidOwnerError.errorFn(InvalidOwnerError.message);
    return await blogRepo.update(params);
  }

  async function deleteBlog(params) {
    validate(deleteBlogConstraints, params, InvalidBlogDeletion);
    const { blogId, username } = params;
    const isOwner = await validateOwnership(blogId, username);
    if (!isOwner) throw new InvalidOwnerError.errorFn(InvalidOwnerError.message);
    return await blogRepo.del(params);
  }

  async function validateOwnership(blogId, username) {
    const blog = await blogRepo.byId(blogId);
    return blog && blog.username === username;
  }

}
