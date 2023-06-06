import { StateCreator, create } from "zustand";
import userService, { User } from "../services/userService";
import { devtools } from "zustand/middleware";

export interface UserStateModel {
  currentUser: User | null;
  isAuthenticated: boolean | undefined;
  getCurrentUser: () => Promise<User | null>;
  login: (userName: string, password: string) => Promise<boolean | string>;
  logout: () => Promise<boolean | null>;
}

const storeDefinition: StateCreator<UserStateModel> = (set, get) => ({
  currentUser: null,
  isAuthenticated: undefined,
  getCurrentUser: async () => {
    try {
      const isAuthenticated = get().isAuthenticated;
      const currentUser = get().currentUser;
      if (isAuthenticated && currentUser) return currentUser;

      const user = await userService.getCurrentUser();
      set(() => ({ currentUser: user, isAuthenticated: user != null }));
      return user;
    } catch (error) {
      set(() => ({ isAuthenticated: false }));
      return Promise.reject(error);
    }
  },
  login: async (userName, password) => {
    try {
      const loggedUser = await userService.logIn(userName, password);
      if (loggedUser != null) {
        set(() => ({ currentUser: loggedUser, isAuthenticated: true }));
      }
      return true;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  logout: async () => {
    try {
      await userService.logOut();
      set(() => ({ currentUser: null, isAuthenticated: undefined }));
      return true;
    } catch (error) {
      return Promise.reject(error);
    }
  },
});
const useUserStore = create<UserStateModel>()(devtools(storeDefinition, { name: "UserStore" }));

export default useUserStore;
