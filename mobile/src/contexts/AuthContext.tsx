import { createContext, useState } from "react";
import api from "../services/api";
import { UserDTO } from "../types/UserDto";

type AuthContextDataProps = {
  user: UserDTO;
  signIn: (email: string, password: string) => Promise<void>;
  isLoadingUser: boolean;
};

type AuthContextProviderProps = {
  children: React.ReactNode;
};

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO);
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(false);

  async function signIn(email: string, password: string) {
    try {
      setIsLoadingUser(true);
      const { data } = await api.post("/sessions", { email, password });

      if (data.user && data.token) {
        setUser(data.user);
      }
    } catch (error) {
      console.log("Error on signIn", error);
    } finally {
      setIsLoadingUser(false);
    }
  }

  return (
    <AuthContext.Provider value={{ user, signIn, isLoadingUser }}>
      {children}
    </AuthContext.Provider>
  );
}
