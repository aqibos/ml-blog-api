import { encodePassword } from '../utilities/password';
import { validate, registerConstraints } from '../lib/validate';
import { InvalidRegistration, DuplicateUsername } from '../lib/errors';

export default function userService({ userRepo }) {

  return { getMe, createUser };

  async function getMe(userId) {
    return await userRepo.byId(userId);
  }

  async function createUser(params) {
    validate(registerConstraints, params, InvalidRegistration);
    const alreadyExists = userRepo.byUsername(params.username);
    if (alreadyExists) throw new DuplicateUsername.errorFn(DuplicateUsername.message);
    const encryptedPassword = encodePassword(params.password);
    return await userRepo.create({
      username: params.username,
      password: encryptedPassword
    });
  }

}
