import AddCircleIcon from "@mui/icons-material/AddCircle";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { GridColDef } from "@mui/x-data-grid";
import { useCallback, useEffect, useState } from "react";
import { IOptions, Menu } from "../../../components/Menu";
import { TableGrid } from "../../../components/TableGrid";
import { TextField } from "../../../components/TextField";
import { useAuth } from "../../../hooks/auth";
import { useHistory } from "../../../hooks/history";
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
  const { token } = useAuth();

  const columns: GridColDef[] = [
    { field: "_id", headerName: "ID", flex: 0.06 },
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
      const client = api(token);
      const { data } = await client.get("/input");
      console.log(data);
      setInputs(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, []);

  console.log(inputs);

  const menu: IOptions[] = [
    {
      name_page: "Incluir",
      icon: <AddCircleIcon />,
      redirect: "/users",
      hide: false,
    },
    {
      name_page: "Alterar",
      icon: <ChangeCircleIcon />,
      redirect: "/inputs",
      hide: false,
    },
    {
      name_page: "Excluir",
      icon: <DeleteIcon />,
      redirect: "/products",
      hide: false,
    },
  ];

  return (
    <>
      <Menu options={menu}>
        <TextField
          xs={12}
          placeHolder={"Insira o nome do insumo"}
          label={"Nome do insumo"}
          onChange={(e) => setKeyword(e.target.value)}
          variant={"outlined"}
        />

        <TableGrid columns={columns} rows={inputs} />
      </Menu>
    </>
  );
}
