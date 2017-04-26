export default function blogService({ blogRepo }) {

  return { getBlog, createBlog, updateBlog, deleteBlog };

  async function getBlog(queryConstraints) {
    const { id, userId } = queryConstraints;
    return id     ? await blogRepo.byId(id) :
           userId ? await blogRepo.userId(userId) :
                    await blogRepo.all();
  }

  async function createBlog(params) {
    // TODO: Validate params
    return await blogRepo.create(params);
  }

  async function updateBlog(params) {
    // TODO: Validate params
    const { blogId, username } = params;
    const isOwner = validateOwnership
    return await blogRepo.update(params);
  }

  async function deleteBlog(params) {
    // TODO: Validate params
    const isOwner = validateOwnership(params.blogId, params.userId);
    if (!isOwner) { /* TODO: Throw error */ }
    return await blogRepo.del(params);
  }

  async function validateOwnership(blogId, username) {
    const blog = await blogRepo.byId(blogId);
    return blog && blog.username === username;
  }

}
