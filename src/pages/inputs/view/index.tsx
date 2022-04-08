import AddCircleIcon from "@mui/icons-material/AddCircle";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { GridColDef } from "@mui/x-data-grid";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "../../../components/Button";
import { Grid } from "../../../components/Grid";
import { Loading } from "../../../components/Loading";
import { IOptions, Menu } from "../../../components/Menu";
import { TableGrid } from "../../../components/TableGrid";
import { TextField } from "../../../components/TextField";
import { useAuth } from "../../../hooks/auth";
import { useHistory } from "../../../hooks/history";
import api from "../../../services/api";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

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
  const [loading, setLoading] = useState(false);
  const [currentId, setCurrentId] = useState(null);

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

  const handleDelete = async () => {
    try {
      setLoading(true);
      const client = api(token);
      const { data } = await client.delete(`input/${currentId}`);
      console.log(data);
      toast.success("Deletado com sucesso");
    } catch (err) {
      toast.error("Erro");
    } finally {
      setLoading(false);
    }
  };

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const client = api(token);
      const { data } = await client.get("/input");
      console.log(data);
      setInputs(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, []);

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

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <Menu options={menu}>
        <Grid type="container" justifyContent="flex-start">
          <TextField
            xs={10}
            placeHolder={"Insira o nome do insumo"}
            label={"Nome do insumo"}
            onChange={(e) => setKeyword(e.target.value)}
            variant={"outlined"}
          />
          <Button size={"large"} xs={1}>
            <SearchIcon />
          </Button>
        </Grid>
        <TableGrid columns={columns} rows={inputs} onRowClick={setCurrentId} />
      </Menu>
    </>
  );
}
