// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Parse from "parse/dist/parse.min.js";

export interface User {
  id: string;
  username: string;
  email: string;
}

class UserService {
  getCurrentUser = async (): Promise<User | null> => {
    try {
      const res = await Parse.User.current();
      if (res != null) {
        return {
          username: res.get("username"),
          email: res.get("email"),
          id: res.get("id"),
        } as User;
      }
      return null;
    } catch (error) {
      console.log((error as Error).message);
      return null;
    }
  };
  logIn = async (userName: string, password: string): Promise<User | null> => {
    try {
      await Parse.User.logIn(userName, password);
      return await this.getCurrentUser();
    } catch (error) {
      console.log((error as Error).message);
      return Promise.reject(error);
    }
  };
  logOut = async (): Promise<boolean> => {
    try {
      await Parse.User.logOut();
      return Promise.resolve(true);
    } catch (error) {
      console.log((error as Error).message);
      return Promise.reject(error);
    }
  };
}
const userService = new UserService();
export default userService;
