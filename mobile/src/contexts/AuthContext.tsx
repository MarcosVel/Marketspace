import { createContext, useEffect, useState } from "react";
import api from "../services/api";
import {
  storageAuthTokenGet,
  storageAuthTokenRemove,
  storageAuthTokenSave,
} from "../storage/storageAuthToken";
import {
  storageUser,
  storageUserGet,
  storageUserRemove,
} from "../storage/storageUser";
import { UserDTO } from "../types/UserDto";

type AuthContextDataProps = {
  user: UserDTO;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
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

  function userAndTokenUpdate(userData: UserDTO, token: string) {
    try {
      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      setUser(userData);
    } catch (error) {
      console.log("Error on userAndTokenUpdate", error);
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post("/sessions", { email, password });

      if (data.user && data.token && data.refresh_token) {
        setIsLoadingUser(true);

        await storageUser(data.user);
        await storageAuthTokenSave(data.token, data.refresh_token);

        userAndTokenUpdate(data.user, data.token);
      }
    } catch (error) {
      console.log("Error on signIn", error);
    } finally {
      setIsLoadingUser(false);
    }
  }

  async function loadUserData() {
    try {
      setIsLoadingUser(true);

      const userLogged = await storageUserGet();
      const { token } = await storageAuthTokenGet();

      if (userLogged && token) {
        userAndTokenUpdate(userLogged, token);
      }
    } catch (error) {
      console.log("Error on loadUserData", error);
    } finally {
      setIsLoadingUser(false);
    }
  }

  async function signOut() {
    try {
      setIsLoadingUser(true);

      setUser({} as UserDTO);

      await storageUserRemove();
      await storageAuthTokenRemove();
    } catch (error) {
      console.log("Error on signOut", error);
    } finally {
      setIsLoadingUser(false);
    }
  }

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <AuthContext.Provider value={{ user, signIn, isLoadingUser, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
