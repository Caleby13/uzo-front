import { Divider, IconButton } from "@material-ui/core";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { GridColDef } from "@mui/x-data-grid";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "../../../components/Button";
import { Grid } from "../../../components/Grid";
import { Loading } from "../../../components/Loading";
import { Menu } from "../../../components/Menu";
import { TableGrid } from "../../../components/TableGrid";
import { TextField } from "../../../components/TextField";
import { useAuth } from "../../../hooks/auth";
import { useHistory } from "../../../hooks/history";
import api from "../../../services/api";
import { filter } from "../../../utils/filter";
import { toFixedNumber } from "../../../utils/toFixedNumber";

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

  const formatNumber2 = toFixedNumber(2);
  const formatNumber4 = toFixedNumber(4);

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
      valueFormatter: formatNumber2,
      flex: 0.1,
    },
    {
      field: "unit_cost",
      headerName: "Valor Unitario",
      type: "number",
      valueFormatter: formatNumber4,
      flex: 0.1,
    },
    { field: "provider", headerName: "Fornecedor", flex: 0.2 },

    {
      field: "createdAt",
      hide: true,
    },
    {
      field: "_v",
      hide: true,
    },
  ];

  const rows = keyword.length > 0 ? filter("name", keyword, inputs) : inputs;

  const history = useHistory();

  const goToUpdate = () => {
    currentId ? history.push(currentId) : toast.error("Selecione um insumo");
  };
  const goToAdd = () => {
    history.push("null");
  };

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const client = api(token);
      const { data } = await client.get("/input");
      setInputs(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDelete = async () => {
    try {
      setLoading(true);
      const client = api(token);
      await client.delete(`input/${currentId}`);
      toast.success("Insumo eletado com sucesso");
    } catch (err) {
      toast.error("Erro");
    } finally {
      loadData();
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
    <>
      <Menu namePage="Insumos">
        <Grid type="container" justifyContent="flex-start">
          <TextField
            xs={9}
            placeHolder={"Insira o nome do insumo"}
            label={"Nome do insumo"}
            onChange={(e) => setKeyword(e.target.value)}
            variant={"outlined"}
          />
          <Button xs={1} onClick={goToAdd}>
            <AddCircleIcon fontSize="large" color="primary" />
          </Button>
          <Button xs={1} onClick={goToUpdate}>
            <ChangeCircleIcon fontSize="large" color="primary" />
          </Button>
          <Button xs={1} onClick={handleDelete}>
            <DeleteIcon fontSize="large" color="primary" />
          </Button>
        </Grid>
        <Divider style={{ margin: "2px 0" }} />
        <TableGrid
          columns={columns}
          rows={rows}
          onRowClick={setCurrentId}
          onRowDoubleClick={goToUpdate}
        />
      </Menu>
    </>
  );
}
