import { AuthDTO, UserDTO, UserReqDto } from "@/types";
import { api } from "./api";

export const AuthService = {
  login(user: AuthDTO) {
    return api.post("/auth/login", user);
  },

  register(user: AuthDTO) {
    return api.post("/users/auth/register", user);
  },

  logout() {
    return api.post("/auth/logout");
  },
  async me(): Promise<UserDTO> {
    const { data } = await api.get<UserDTO>("/users/me");
    return data;
  },

  async update(user: UserReqDto | FormData): Promise<UserDTO> {
    
    const { data } = await api.put<UserDTO>("/users", user);
    return data;
  },
};
