import { Button } from "../../../components/Button";
import { Grid } from "../../../components/Grid";
import { Title } from "../../../components/Title";
import { TextField } from "../../../components/TextField";
import { useHistory } from "../../../hooks/history";
import { useCallback, useEffect, useState } from "react";
import api from "../../../services/api";

interface IInput {
  _id: string;
  name: string;
  amount: number;
  yield: number;
  value_package: number;
  unit_cost: number;
  createdAt: string;
  __v: number;
}

export function InputView() {
  const [keyword, setKeyword] = useState<string>("");
  const [inputs, setInputs] = useState<IInput[]>([]);

  const history = useHistory();
  const goBack = () => {
    history.goBack();
  };

  const goToAddUpdate = () => {
    history.push("5");
  };

  const loadData = useCallback(async () => {
    try {
      const { data } = await api.get("/user");
      setInputs(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, []);

  console.log(inputs);

  return (
    <>
      <Title>Insumos</Title>

      <Grid type={"container"} justifyContent={"flex-start"}>
        <TextField
          xs={7}
          placeHolder={"Insira o nome do insumo"}
          label={"Nome do insumo"}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <Grid type={"item"} xs={5}>
          <Button onClick={() => console.log()}>Buscar Registros</Button>
        </Grid>
      </Grid>
      <Grid type={"container"}>
        <Grid type={"item"} xs={4}>
          <Button onClick={goBack}>Ir para tela anterior</Button>
        </Grid>
      </Grid>
    </>
  );
}
