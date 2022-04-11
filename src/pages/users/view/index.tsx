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

export function UserView() {
  const [keyword, setKeyword] = useState<string>("");
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const { token } = useAuth();

  const columns: GridColDef[] = [
    { field: "_id", headerName: "ID", flex: 0.06 },
    { field: "name", headerName: "Nome", flex: 0.3 },
    { field: "user_name", headerName: "Login", flex: 0.3 },
    {
      field: "createdAt",
      hide: true,
    },
    {
      field: "_v",
      hide: true,
    },
  ];

  const rows = keyword.length > 0 ? filter("name", keyword, users) : users;

  const history = useHistory();

  const goToUpdate = () => {
    currentId ? history.push(currentId) : toast.error("Selecione um usuário");
  };
  const goToAdd = () => {
    history.push("null");
  };

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const client = api(token);
      const { data } = await client.get("/user");
      setUsers(data);
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
      await client.delete(`user/${currentId}`);
      toast.success("Usuário eletado com sucesso");
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
      <Menu namePage="Usuários">
        <Grid type="container" justifyContent="flex-start">
          <TextField
            xs={9}
            placeHolder={"Insira o nome do usuário"}
            label={"Nome do usuário"}
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
