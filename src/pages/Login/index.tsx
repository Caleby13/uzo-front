import { ListItem } from "@material-ui/core";
import { useCallback, useEffect, useState } from "react";
import Autocomplete from "../../components/Autocomplete";
import { Button } from "../../components/Button";
import { Grid } from "../../components/Grid";
import { TextField } from "../../components/TextField";
import { Title } from "../../components/Title";
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

  const loadData = useCallback(async () => {
    try {
      const { data } = await api.get("/user");
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div
      style={{
        marginTop: "10%",
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
          xs={5}
          value={user}
          onChange={(event, newValue) => {
            setUser(`${newValue.label}`);
          }}
        />
      </Grid>
      <Grid type={"container"} justifyContent={"center"}>
        <TextField
          xs={5}
          variant={"outlined"}
          type={"password"}
          placeHolder={"Insira a senha"}
          label={"Senha"}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Grid>
      <Grid type={"container"} justifyContent={"center"}>
        <Grid type={"item"} xs={5}>
          <Button onClick={() => console.log()}>Logar</Button>
        </Grid>
      </Grid>
    </div>
  );
}
