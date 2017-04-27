import { validatePassword } from '../utilities/password';

export default function loginService({ userRepo }) {

  return { authenticate, authenticateByUsername };

  async function authenticate(username, password) {
    const user = await userRepo.byUsername(username);
    const correctPassword = user && validatePassword(password, user.password);
    return correctPassword ? user : null;
  }

  async function authenticateByUsername(username) {
    return username ? await userRepo.byUsername(username) : null;
  }

}
