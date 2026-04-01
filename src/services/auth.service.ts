import type { User } from "../types";
import apiClient from "./apiClient";

class AuthService {
  async signInWithGoogle(email: string, name: string): Promise<User | null> {
    try {
      const response = await apiClient.post("/auth/google", { email, name });
      return response.data;
    } catch (error) {
      console.error("Google authentication failed:", error);
      return null;
    }
  }

  async signOut() {
    try {
      const response = await apiClient.post("/auth/logout");
      return response.data;
    } catch (error) {
      console.error("Sign out failed:", error);
      return null;
    }
  }
}

const authService = new AuthService();

export default authService;
