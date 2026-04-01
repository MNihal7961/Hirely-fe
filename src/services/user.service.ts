import type { User } from "../types";
import apiClient from "./apiClient";

class UserService {
  async getCurrentUser(): Promise<User | null> {
    try {
      const response = await apiClient.get("/user/me");
      return response.data;
    } catch (error: any) {
      console.error("Error fetching current user:", error);
      return null;
    }
  }
}

const userService = new UserService();
export default userService;
