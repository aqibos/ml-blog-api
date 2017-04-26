export default function commentService({ commentRepo }) {

  return { getComment, createComment, updateComment, deleteComment };

  async function getComment(queryConstraints) {
    const { id, userId } = queryConstraints;
    return id     ? await commentRepo.byId(id) :
           userId ? await commentRepo.userId(userId) :
                    await commentRepo.all();
  }

  async function createComment(params) {
    // TODO: Validate params
    return await commentRepo.create(params);
  }

  async function updateComment(params) {
    // TODO: Validate params
    // TODO: Validate ownership
    return await commentRepo.update(params);
  }

  async function deleteComment(params) {
    // TODO: Validate params
    // TODO: Validate ownership
    return await commentRepo.del(params);
  }

  async function validateOwnership() {

  }
}
