"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { UserDTO } from "@/types/index";
import { AuthService } from "@/services/auth.service";
import { setAccessToken } from "@/services/authToken";

interface AuthContextType {
  user: UserDTO | null;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => void;
  loadUser: () => Promise<UserDTO> | Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserDTO | null>(null);
  const [loading, setLoading] = useState(true);

  //devolver user después de cada refresco de página
  useEffect(() => {
    setLoading(true)
    loadUser();
  }, []);

  async function loadUser() {
    try {
      const currentUser = await AuthService.me();

      setUser(currentUser);
    } catch (e) {
      console.log("me ERROR", e);
    } finally {
      setLoading(false);
    }
  }

  async function login() {
    const currentUser = await AuthService.me();

    setUser(currentUser);
  }

  function logout() {
    setUser(null);
    setAccessToken(null)
    AuthService.logout();
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        loadUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
