import { validatePassword } from '../utilities/password';

export default function loginService({ userRepo }) {

  return { authenticate, authenticateByUserId };

  async function authenticate(username, password) {
    const user = await userRepo.byUsername(username);
    const correctPassword = user && validatePassword(password, user.password);
    return correctPassword ? user : null;
  }

  async function authenticateByUserId(userId) {
    return userId ? await userRepo.byId(userId) : null;
  }

}
