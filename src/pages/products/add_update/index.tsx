import AddCircleIcon from "@mui/icons-material/AddCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import BackspaceIcon from "@mui/icons-material/Backspace";
import { Divider } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Autocomplete from "../../../components/Autocomplete";
import { Button } from "../../../components/Button";
import { Grid } from "../../../components/Grid";
import { Loading } from "../../../components/Loading";
import { Menu } from "../../../components/Menu";
import { TableGrid } from "../../../components/TableGrid";
import { TextField } from "../../../components/TextField";
import { useAuth } from "../../../hooks/auth";
import { useHistory } from "../../../hooks/history";
import api from "../../../services/api";

interface IItem {
  _id: string;
  input?: IInput;
  description: string;
  amount: string;
  unit_cost: number;
  total_cost: number;
}

interface IProductAddUpdate {
  name: string;
  customer_name: string;
  inputs_cost: number;
  labor: number;
  art: number;
  others: string;
  total_cost: number;
  sale_value: string;
  profit: number;
  items: IItem[];
}

interface IInput {
  _id: string;
  name: string;
  unit_cost: number;
}

export function ProductAddUpdate() {
  const [item, setItem] = useState<IItem>({
    _id: "0",
    description: "",
    amount: "1",
    unit_cost: 0,
    total_cost: 0,
  });

  const [product, setProduct] = useState<IProductAddUpdate>({
    name: "",
    customer_name: "",
    inputs_cost: 0,
    labor: 0,
    art: 0,
    others: "0",
    total_cost: 0,
    sale_value: "0",
    profit: 0,
    items: [],
  });

  const [items, setItems] = useState<IItem[]>([]);

  const [inputs, setInputs] = useState<IInput[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentId, setCurrentId] = useState(null);

  const columns: GridColDef[] = [
    { field: "_id", headerName: "ID", hide: true, flex: 0.06 },
    { field: "name", headerName: "Nome", flex: 0.3 },
    { field: "description", headerName: "Descri????o", flex: 0.1 },
    {
      field: "amount",
      headerName: "Quantidade",
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
      field: "total_cost",
      headerName: "Valor Total",
      type: "number",
      flex: 0.1,
    },
  ];

  const { id } = useParams();

  const { token } = useAuth();

  const history = useHistory();
  const goBack = () => {
    history.goBack();
  };

  const loadProduct = useCallback(async () => {
    if (id !== "null") {
      try {
        const client = api(token);
        const { data } = await client.get<IProductAddUpdate>(`/product/${id}`);
        if (!!data) {
          setProduct({
            name: data.name,
            customer_name: data.customer_name,
            inputs_cost: data.inputs_cost,
            labor: data.labor,
            art: data.art,
            others: `${data.others}`,
            total_cost: data.total_cost,
            sale_value: `${data.sale_value}`,
            profit: data.profit,
            items: [],
          });

          setItems(data.items);
        }
      } catch (error) {
        toast.error("Erro ao carregar o produto");
      }
    }
  }, []);

  const loadInputs = useCallback(async () => {
    try {
      const client = api(token);
      const { data } = await client.get("/input");
      setInputs(data);
    } catch (error) {
      toast.error("Erro ao carregar os insumos");
    }
  }, []);

  const loadData = useCallback(async () => {
    await Promise.all([loadProduct(), loadInputs()]);
  }, []);

  const handleAddOrUpdate = async () => {
    try {
      setLoading(true);
      if (!product.name) {
        toast.error("Descreva o nome do produto antes de salvar");
        return;
      }

      if (!items[0]) {
        toast.error("Insira pelo menos 1 insumo do produto antes de salvar");
        return;
      }
      const client = api(token);

      const newProduct = {
        ...product,
        items: items.map((item) => ({
          input: item.input?._id,
          description: item.description,
          amount: item.amount,
          unit_cost: item.unit_cost,
          total_cost: item.total_cost,
        })),
      };

      if (id === "null") {
        await client.post("/product", newProduct);
        toast.success("Produto cadastrado com sucesso");
      } else {
        await client.put(`/product/${id}`, newProduct);
        toast.success("Produto atualizado com sucesso");
      }
      goBack();
    } catch (err: any) {
      const message = err?.response?.data?.error || "Erro";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const rows = items.map((item) => ({
    _id: item._id,
    name: item.input?.name,
    description: item.description,
    amount: item.amount,
    unit_cost: item.unit_cost,
    total_cost: item.total_cost,
  }));

  const handleClearItem = () => {
    setItem({
      _id: `${items.length + 1}`,
      description: "",
      amount: "1",
      unit_cost: 0,
      total_cost: 0,
    });

    setCurrentId(null);
  };

  const handleChangeItem = () => {
    const index = items.findIndex((item) => item._id === currentId);
    const itemsCopy = [...items];
    setItem(itemsCopy[index]);
  };

  const handleDeleteItem = () => {
    if (currentId === null) {
      toast.error("Selecione um insumo para excluir");
      return;
    }
    const index = items.findIndex((item) => item._id === currentId);
    const itemsCopy = [...items];
    itemsCopy.splice(index, 1);
    setItems(itemsCopy);

    const inputs_cost = itemsCopy.reduce((total, ac) => {
      return total + ac.total_cost;
    }, 0);

    setProduct((prev) => ({
      ...prev,
      inputs_cost,
      profit:
        Number(prev.sale_value) -
        (prev.labor + prev.art + Number(prev.others) + inputs_cost),
      total_cost: prev.labor + prev.art + Number(prev.others) + inputs_cost,
    }));
    setCurrentId(null);
  };

  const handleAddItem = () => {
    if (!item.input?._id) {
      toast.error("Selecione um insumo para incluir");
      return;
    }
    const index = items.findIndex((item) => item._id === currentId);
    if (index >= 0) {
      const itemsCopy = [...items];
      itemsCopy[index] = item;
      setItems(itemsCopy);

      const inputs_cost = itemsCopy.reduce((total, ac) => {
        return total + ac.total_cost;
      }, 0);

      setProduct((prev) => ({
        ...prev,
        inputs_cost,
        profit:
          Number(prev.sale_value) -
          (prev.labor + prev.art + Number(prev.others) + inputs_cost),
        total_cost: prev.labor + prev.art + Number(prev.others) + inputs_cost,
      }));
    } else {
      const itemsCopy = [...items];
      itemsCopy.push(item);
      setItems(itemsCopy);

      const inputs_cost = itemsCopy.reduce((total, ac) => {
        return total + ac.total_cost;
      }, 0);

      setProduct((prev) => ({
        ...prev,
        inputs_cost,
        profit:
          Number(prev.sale_value) -
          (prev.labor + prev.art + Number(prev.others) + inputs_cost),
        total_cost: prev.labor + prev.art + Number(prev.others) + inputs_cost,
      }));
    }

    handleClearItem();
  };

  useEffect(() => {
    loadData();
  }, []);

  console.log(item);

  if (loading) {
    return <Loading />;
  }
  return (
    <Menu
      namePage={
        id === "null"
          ? "Cadastro de produto"
          : `Alterar produto ${product.name}`
      }
    >
      <Grid type="container" justifyContent="flex-start">
        <TextField
          defaultValue={`${product.name}`}
          label="Nome"
          placeHolder="Nome"
          xs={5}
          onChange={(e) =>
            setProduct((prev) => ({ ...prev, name: e.target.value }))
          }
        />
        <TextField
          defaultValue={`${product.customer_name}`}
          label="Cliente"
          placeHolder="Cliente"
          xs={3}
          onChange={(e) =>
            setProduct((prev) => ({ ...prev, customer_name: e.target.value }))
          }
        />
        {/* <TextField
          defaultValue={product.labor.toFixed(2)}
          label="Servi??o"
          placeHolder="Servi??o"
          type="number"
          xs={2}
          onChange={(e) =>
            setProduct((prev) => ({
              ...prev,
              labor: Number(e.target.value),
              profit:
                Number(prev.sale_value) -
                (Number(e.target.value) +
                  prev.art +
                  prev.others +
                  prev.inputs_cost),
              total_cost:
                Number(e.target.value) +
                prev.art +
                prev.others +
                prev.inputs_cost,
            }))
          }
        />
        <TextField
          defaultValue={product.art.toFixed(2)}
          label="Arte"
          placeHolder="Arte"
          type="number"
          xs={2}
          onChange={(e) =>
            setProduct((prev) => ({
              ...prev,
              art: Number(e.target.value),
              profit:
                Number(prev.sale_value) -
                (prev.labor +
                  Number(e.target.value) +
                  prev.others +
                  prev.inputs_cost),
              total_cost:
                prev.labor +
                Number(e.target.value) +
                prev.others +
                prev.inputs_cost,
            }))
          }
        /> */}
        <TextField
          defaultValue={`${product.others}`}
          label="Outros"
          placeHolder="Outros"
          type="number"
          xs={2}
          onChange={(e) =>
            setProduct((prev) => ({
              ...prev,
              others: e.target.value,
              profit:
                Number(prev.sale_value) -
                (prev.labor +
                  prev.art +
                  Number(e.target.value) +
                  prev.inputs_cost),
              total_cost:
                prev.labor +
                prev.art +
                Number(e.target.value) +
                prev.inputs_cost,
            }))
          }
        />
        <TextField
          defaultValue={product.inputs_cost.toFixed(2)}
          label="Custo dos insumos"
          placeHolder="Custo dos insumos"
          type="number"
          xs={2}
          disabled
        />
        <TextField
          defaultValue={product.total_cost.toFixed(2)}
          label="Custo total"
          placeHolder="Custo total"
          type="number"
          xs={2}
          disabled
        />
        <TextField
          defaultValue={`${product.sale_value}`}
          label="Valor de venda"
          placeHolder="Valor de venda"
          type="number"
          xs={2}
          onChange={(e) =>
            setProduct((prev) => ({
              ...prev,
              sale_value: e.target.value,
              profit: Number(e.target.value) - prev.total_cost,
            }))
          }
        />
        <TextField
          defaultValue={product.profit.toFixed(2)}
          label="Lucro"
          placeHolder="Lucro"
          type="number"
          xs={2}
          disabled
        />

        <Button xs={1} onClick={handleAddOrUpdate}>
          <CheckIcon fontSize="large" color="primary" />
        </Button>
        <Button xs={1} onClick={goBack}>
          <CancelIcon fontSize="large" color="primary" />
        </Button>
      </Grid>

      <div style={{ margin: "15px auto" }}>
        <Divider />
      </div>
      <Grid type="container" justifyContent="flex-start">
        <Autocomplete
          label={"Insumo"}
          placeholder={"Insira o nome do insumo"}
          options={inputs.map((input) => ({
            id: input._id,
            label: input.name,
            unit_cost: input.unit_cost,
          }))}
          xs={4}
          value={item.input?.name || ""}
          onChange={(event, newValue) => {
            setItem((prev) => ({
              ...prev,
              input: {
                _id: newValue?.id || 0,
                name: newValue?.label || 0,
                unit_cost: newValue?.unit_cost || 0,
              },
              unit_cost: newValue?.unit_cost || 0,
              total_cost: !!newValue?.unit_cost
                ? Number(item.amount) * newValue.unit_cost
                : 0,
            }));
          }}
        />
        <TextField
          defaultValue={`${item.description}`}
          label="Descri????o"
          placeHolder="Descri????o"
          xs={2}
          onChange={(e) =>
            setItem((prev) => ({ ...prev, description: e.target.value }))
          }
        />
        <TextField
          defaultValue={`${item.amount}`}
          label="Quantidade"
          placeHolder="Quantidade"
          type="number"
          xs={1}
          onChange={(e) =>
            setItem((prev) => ({
              ...prev,
              amount: e.target.value,
              total_cost: Number(e.target.value) * prev.unit_cost,
            }))
          }
        />
        <TextField
          defaultValue={item.unit_cost.toFixed(2)}
          label="Valor unitario"
          placeHolder="Valor unitario"
          type="number"
          xs={1}
          disabled
        />
        <TextField
          defaultValue={item.total_cost.toFixed(2)}
          label="Valor total"
          placeHolder="Valor total"
          type="number"
          xs={1}
          disabled
        />
        <Button xs={1} onClick={handleAddItem}>
          <AddCircleIcon fontSize="medium" color="primary" />
        </Button>
        <Button xs={1} onClick={handleClearItem}>
          <BackspaceIcon fontSize="medium" color="primary" />
        </Button>
        <Button xs={1} onClick={handleDeleteItem}>
          <DeleteIcon fontSize="medium" color="primary" />
        </Button>
      </Grid>
      <TableGrid
        columns={columns}
        rows={rows}
        onRowClick={setCurrentId}
        onRowDoubleClick={handleChangeItem}
      />
    </Menu>
  );
}
