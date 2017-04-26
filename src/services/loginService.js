import { validatePassword } from '../utilities/password';

export default function loginService({ userRepo }) {

  return { authenticate, authenticateByUserId };

  async function authenticate(email, password) {
    const user = await userRepo.byEmail(email);
    const correctPassword = user && validatePassword(password, user.password);
    return correctPassword ? user : null;
  }

  async function authenticateByUserId(userId) {
    return userId ? await userRepo.byId(userId) : null;
  }

}
