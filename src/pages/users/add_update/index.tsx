import { useCallback, useEffect, useMemo, useState } from "react";
import { Grid } from "../../../components/Grid";
import { IOptions, Menu } from "../../../components/Menu";
import { TextField } from "../../../components/TextField";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";
import api from "../../../services/api";
import { useAuth } from "../../../hooks/auth";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Loading } from "../../../components/Loading";
import { Button } from "../../../components/Button";
import { useHistory } from "../../../hooks/history";

interface IUserAddUpdate {
  name: string;
  user_name: string;
  password: string;
}

export function UserAddUpdate() {
  const [user, setUser] = useState<IUserAddUpdate>({
    name: "",
    password: "",
    user_name: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const { id } = useParams();

  const { token } = useAuth();

  const history = useHistory();
  const goBack = () => {
    history.goBack();
  };

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const client = api(token);
      const { data } = await client.get<IUserAddUpdate>(`/user/${id}`);
      if (!!data) {
        setUser({
          name: data.name,
          password: data.password,
          user_name: data.user_name,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleAddOrUpdate = async () => {
    try {
      setLoading(true);
      const client = api(token);
      if (id === "null") {
        await client.post("/user", user);
        toast.success("Usuário cadastrado com sucesso");
      } else {
        await client.put(`/user/${id}`, user);
        toast.success("Usuário atualizado com sucesso");
      }
      goBack();
    } catch (err: any) {
      const message = err?.response?.data?.error || "Erro";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <Menu
      namePage={
        id === "null"
          ? "Cadastro de usuário"
          : `Alterar usuário ${user.user_name}`
      }
    >
      <Grid type="container" justifyContent="flex-start">
        <TextField
          defaultValue={`${user.name}`}
          label="Nome"
          placeHolder="Nome"
          xs={6}
          onChange={(e) =>
            setUser((prev) => ({ ...prev, name: e.target.value }))
          }
        />
        <TextField
          defaultValue={`${user.user_name}`}
          label="Login"
          placeHolder="Login"
          xs={6}
          onChange={(e) =>
            setUser((prev) => ({ ...prev, user_name: e.target.value }))
          }
        />
        <TextField
          defaultValue={`${user.password}`}
          label="Senha"
          placeHolder="Senha"
          type="password"
          xs={6}
          onChange={(e) =>
            setUser((prev) => ({ ...prev, password: e.target.value }))
          }
        />
      </Grid>
      <div style={{ bottom: "10px" }}>
        <Grid type="container">
          <Button xs={2} onClick={handleAddOrUpdate}>
            <CheckIcon fontSize="large" color="primary" />
          </Button>
          <Button xs={2} onClick={goBack}>
            <CancelIcon fontSize="large" color="primary" />
          </Button>
        </Grid>
      </div>
    </Menu>
  );
}
