import React, { createContext, ReactNode, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";
import { isAuthenticated } from "../services/auth";

interface IAuth {
  authenticated: boolean;
  user: {
    user_name: string;
    password: string;
  } | null;
  login: (user_name: string, password: string) => void;
  logout: () => void;
  token: string;
}

export const AuthContext = createContext({} as any);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = React.useState<{
    user_name: string;
    password: string;
  } | null>(null);
  const navigate = useNavigate();

  const login = async (user_name: string, password: string) => {
    try {
      const client = api();
      const { data } = await client.post("/authenticate", {
        user_name,
        password,
      });
      setUser({ user_name, password });

      if (!!data?.token) {
        localStorage.setItem("token", JSON.stringify(data));
        navigate("/");
        toast.success(`${data.user.name} seu login realizado com sucesso`);
      }
    } catch (err: any) {
      console.log(err);
      const message = err?.response?.data?.error || "Erro";
      toast.error(message);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const objectToken = localStorage.getItem("token") || null;
  const token = objectToken ? JSON.parse(objectToken).token : null;

  return (
    <AuthContext.Provider
      value={{ authenticated: isAuthenticated(), user, login, logout, token }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const { authenticated, user, login, logout, token }: IAuth =
    useContext(AuthContext);

  return { authenticated, user, login, logout, token };
};
