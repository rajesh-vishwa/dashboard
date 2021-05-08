import { User } from "../context/app-context";
import { USERS_TOKEN } from "../utils/constant";

const UserAPI = {
  login: async (email: string, password: string) => {
    try {
      const data: any = window.localStorage.getItem(USERS_TOKEN);
      if (data) {
        const users: User[] = JSON.parse(data);
        const findUser = users.find(
          (u) => u.email === email && u.password === password
        );
        return findUser;
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      return error;
    }
  },
};

export default UserAPI;
