import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Autocomplete from "../../components/Autocomplete";
import { Button } from "../../components/Button";
import { Grid } from "../../components/Grid";
import { Loading } from "../../components/Loading";
import { TextField } from "../../components/TextField";
import { Title } from "../../components/Title";
import { useAuth } from "../../hooks/auth";
import api from "../../services/api";

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

  const { login } = useAuth();

  const loadData = useCallback(async () => {
    try {
      const client = api();
      const { data } = await client.get("/user");
      setUsers(data);
    } catch (error) {
      toast.warn("A api ainda esta iniciando, recarregue a página");
    }
  }, []);

  const handleSubmit = useCallback(async () => {
    setLoading(true);
    login(user, password);
    setLoading(false);
  }, [user, password]);

  useEffect(() => {
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
            xs={4}
            value={user}
            onChange={(event, newValue) => {
              setUser(`${newValue.label}`);
            }}
          />
        </Grid>
        <Grid type={"container"} justifyContent={"center"}>
          <TextField
            xs={4}
            variant={"outlined"}
            type={"password"}
            placeHolder={"Insira a senha"}
            label={"Senha"}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Grid>
        <Grid type={"container"} justifyContent={"center"}>
          <Button xs={3} onClick={handleSubmit}>
            Logar
          </Button>
        </Grid>
      </div>
    </div>
  );
}
