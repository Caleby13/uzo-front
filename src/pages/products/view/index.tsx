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

interface IUser {
  _id: string;
  name: string;
  user_name: string;
  createdAt: string;
  __v: number;
}

interface IItem {
  _id: string;
  product: string;
  input: string;
  description: string;
  amount: number;
  unit_cost: number;
  total_cost: number;
  user: string;
  createdAt: string;
  __v: number;
}

interface IProduct {
  _id: string;
  name: string;
  customer_name: string;
  inputs_cost: number;
  labor: number;
  art: number;
  others: number;
  total_cost: number;
  sale_value: number;
  profit: number;
  user: IUser;
  items: IItem[];
  createdAt: string;
  __v: number;
}

export function ProductView() {
  const [keyword, setKeyword] = useState<string>("");
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const { token } = useAuth();

  const columns: GridColDef[] = [
    { field: "_id", headerName: "ID", flex: 0.06 },
    { field: "name", headerName: "Nome", flex: 0.3 },
    { field: "customer_name", headerName: "Cliente", flex: 0.3 },
    {
      field: "inputs_cost",
      headerName: "Custo dos insumos",
      type: "number",
      flex: 0.1,
    },
    {
      field: "labor",
      headerName: "Trabalho",
      type: "number",
      flex: 0.1,
    },
    {
      field: "art",
      headerName: "Arte",
      type: "number",
      flex: 0.1,
    },
    {
      field: "others",
      headerName: "Outros",
      type: "number",
      flex: 0.1,
    },
    {
      field: "total_cost",
      headerName: "Custo total",
      type: "number",
      flex: 0.1,
    },
    {
      field: "sale_value",
      headerName: "Preço de Venda",
      type: "number",
      flex: 0.1,
    },
    {
      field: "profit",
      headerName: "Lucro",
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

  const rows =
    keyword.length > 0 ? filter("name", keyword, products) : products;

  const history = useHistory();

  const goToUpdate = () => {
    currentId ? history.push(currentId) : toast.error("Selecione um produto");
  };
  const goToAdd = () => {
    history.push("null");
  };

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const client = api(token);
      const { data } = await client.get("/product");
      setProducts(data);
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
      await client.delete(`product/${currentId}`);
      toast.success("Produto deletado com sucesso");
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
      <Menu>
        <Grid type="container" justifyContent="flex-start">
          <TextField
            xs={9}
            placeHolder={"Insira o nome do Produto"}
            label={"Nome do Produto"}
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
