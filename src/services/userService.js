import { encodePassword } from '../utilities/password';

export default function userService({ userRepo }) {

  return { getMe, createUser };

  async function getMe(userId) {
    return await userRepo.byId(userId);
  }

  async function createUser(params) {
    // TODO: Validate
    // TOOD: Encode password
    return await userRepo.create(params);
  }

}
