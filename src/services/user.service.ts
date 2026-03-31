import apiClient from "./apiClient";

class UserService {
    async getCurrentUser() {
        const response =await apiClient.get("/user/me");
        console.log("🚀 ~ UserService ~ getCurrentUser ~ response:", response)
        return response.data;
    }
}

const userService = new UserService();
export default userService;