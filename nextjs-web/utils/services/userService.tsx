import Cookies from 'js-cookie';
import { IUser } from '../../models/user';

export class UserService {
  static getUser(): IUser | undefined {
    const user: string | undefined = Cookies.get('user');

    return user ? (JSON.parse(user) as IUser) : undefined;
  }
}
