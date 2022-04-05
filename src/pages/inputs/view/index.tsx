import { Button } from "../../../components/Button";
import { Grid } from "../../../components/Grid";
import { Title } from "../../../components/Title";
import { TextField } from "../../../components/TextField";
import { useHistory } from "../../../hooks/history";
import { useCallback, useEffect, useState } from "react";
import api from "../../../services/api";
import { TableGrid } from "../../../components/TableGrid";
import { GridColDef } from "@mui/x-data-grid";

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

  const columns: GridColDef[] = [
    { field: "_id", headerName: "ID", flex: 0.1 },
    { field: "name", headerName: "Nome", flex: 0.3 },
    { field: "amount", headerName: "Quantidade", type: "number", flex: 0.1 },
    {
      field: "yield",
      headerName: "Rendimento",
      type: "number",
      flex: 0.1,
    },
    {
      field: "value_package",
      headerName: "Valor",
      type: "number",
      flex: 0.1,
    },
    {
      field: "unit_cost",
      headerName: "Valor Unitario",
      type: "number",
      flex: 0.1,
    },
    {
      field: "createdAt",
      hide: true,
    },
    {
      field: "_v",
      hide: true,
    },
  ];

  const history = useHistory();
  const goBack = () => {
    history.goBack();
  };

  const goToAddUpdate = () => {
    history.push("5");
  };

  const loadData = useCallback(async () => {
    try {
      const { data } = await api.get("/inputs");
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
      <div
        style={{
          paddingBottom: "40px",
        }}
      >
        <Title>Insumos</Title>

        <Grid type={"container"} justifyContent={"flex-start"}>
          <TextField
            xs={9}
            placeHolder={"Insira o nome do insumo"}
            label={"Nome do insumo"}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <Grid type={"item"} xs={3}>
            <Button onClick={() => console.log()}>Buscar Registros</Button>
          </Grid>
        </Grid>
        <TableGrid columns={columns} rows={inputs} />
      </div>
      <div
        style={{
          position: "absolute",
          left: "5%",
          bottom: "10px",
          width: "90%",
        }}
      >
        <Grid type={"container"} justifyContent={"space-between"}>
          <Grid type={"item"} xs={8}>
            <Grid type={"container"} justifyContent={"flex-start"}>
              <Button onClick={goBack}>Incluir</Button>
              <Button onClick={goBack}>Alterar</Button>
              <Button onClick={goBack}>Excluir</Button>
            </Grid>
          </Grid>
          <Grid type={"item"} xs={1}>
            <Button onClick={goBack}>Voltar</Button>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
