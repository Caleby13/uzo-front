import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Autocomplete from "../../components/Autocomplete";
import { Button } from "../../components/Button";
import { Grid } from "../../components/Grid";
import { Loading } from "../../components/Loading";
import { TextField } from "../../components/TextField";
import { Title } from "../../components/Title";
import api from "../../services/api";
import { isAuthenticated } from "../../services/auth";

interface IUsers {
  _id: string;
  name: string;
  user_name: string;
  createdAt: string;
  __v: number;
}

export function Login() {
  const [users, setUsers] = useState<IUsers[]>([]);
  const [user, setUser] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const loadData = useCallback(async () => {
    try {
      const { data } = await api.get("/user");
      setUsers(data);
    } catch (error) {
      toast.warn("A api ainda esta iniciando, recarregue a página");
    }
  }, []);

  const login = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await api.post("/authenticate", {
        user_name: user,
        password,
      });

      if (!!data?.token) {
        localStorage.setItem("token", JSON.stringify(data));
        toast.success(`${data.user.name} seu login realizado com sucesso`);
      }
      if (authenticated()) {
        navigate("/home");
      }
    } catch (err) {
      const message = err?.response?.data?.error || "Erro";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, [user, password]);

  const authenticated = useCallback(() => {
    return isAuthenticated();
  }, []);

  useEffect(() => {
    if (authenticated()) {
      navigate("/home");
    }
    loadData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div
      style={{
        height: "100vh",
      }}
    >
      <div
        style={{
          position: "relative",
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <Title>Login</Title>
        <Grid type={"container"} justifyContent={"center"}>
          <Autocomplete
            label={"Usuário"}
            placeholder={"Insira o nome do usuário"}
            options={users.map((user) => ({
              id: user._id,
              label: user.user_name,
            }))}
            xs={10}
            value={user}
            onChange={(event, newValue) => {
              setUser(`${newValue.label}`);
            }}
          />
        </Grid>
        <Grid type={"container"} justifyContent={"center"}>
          <TextField
            xs={10}
            variant={"outlined"}
            type={"password"}
            placeHolder={"Insira a senha"}
            label={"Senha"}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Grid>
        <Grid type={"container"} justifyContent={"center"}>
          <Grid type={"item"} xs={5}>
            <Button onClick={login}>Logar</Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
