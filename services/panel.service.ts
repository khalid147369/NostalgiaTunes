import { AuthDTO, UserDTO } from "@/types";
import { api } from "./api";

export const PanelService = {
  getAllUsers() {
    return api.get("/users");
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
};
