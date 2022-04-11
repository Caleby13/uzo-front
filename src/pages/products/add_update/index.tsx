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

interface IItem {
  input: string;
  description: string;
  amount: number;
  unit_cost: number;
  total_cost: number;
}

interface IProductAddUpdate {
  name: string;
  customer_name: string;
  inputs_cost: number;
  labor: number;
  art: number;
  others: number;
  total_cost: number;
  sale_value: number;
  profit: number;
  items?: IItem[];
}

export function ProductAddUpdate() {
  const [product, setProduct] = useState<IProductAddUpdate>({
    name: "",
    customer_name: "",
    inputs_cost: 0,
    labor: 0,
    art: 0,
    others: 0,
    total_cost: 0,
    sale_value: 0,
    profit: 0,
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
      const { data } = await client.get<IProductAddUpdate>(`/product/${id}`);
      if (!!data) {
        setProduct({
          name: data.name,
          customer_name: data.customer_name,
          inputs_cost: data.inputs_cost,
          labor: data.labor,
          art: data.art,
          others: data.others,
          total_cost: data.total_cost,
          sale_value: data.sale_value,
          profit: data.profit,
          items: data.items,
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
        await client.post("/product", product);
        toast.success("Produto cadastrado com sucesso");
      } else {
        await client.put(`/product/${id}`, product);
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
          ? "Cadastro de produto"
          : `Alterar produto ${product.name}`
      }
    >
      <Grid type="container" justifyContent="flex-start">
        <TextField
          defaultValue={`${product.name}`}
          label="Nome"
          placeHolder="Nome"
          xs={6}
          onChange={(e) =>
            setProduct((prev) => ({ ...prev, name: e.target.value }))
          }
        />
        <TextField
          defaultValue={`${product.customer_name}`}
          label="Cliente"
          placeHolder="Cliente"
          xs={6}
          onChange={(e) =>
            setProduct((prev) => ({ ...prev, customer_name: e.target.value }))
          }
        />
        <TextField
          defaultValue={`${product.labor}`}
          label="Serviço"
          placeHolder="Serviço"
          type="number"
          xs={6}
          onChange={(e) =>
            setProduct((prev) => ({
              ...prev,
              labor: Number(e.target.value),
              profit:
                prev.sale_value -
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
          defaultValue={`${product.art}`}
          label="Arte"
          placeHolder="Arte"
          type="number"
          xs={6}
          onChange={(e) =>
            setProduct((prev) => ({
              ...prev,
              art: Number(e.target.value),
              profit:
                prev.sale_value -
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
        />
        <TextField
          defaultValue={`${product.others}`}
          label="Outros"
          placeHolder="Outros"
          type="number"
          xs={6}
          onChange={(e) =>
            setProduct((prev) => ({
              ...prev,
              others: Number(e.target.value),
              profit:
                prev.sale_value -
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
          defaultValue={`${product.inputs_cost}`}
          label="Custo dos insumos"
          placeHolder="Custo dos insumos"
          type="number"
          xs={6}
          disabled
        />
        <TextField
          defaultValue={`${product.total_cost}`}
          label="Custo total"
          placeHolder="Custo total"
          type="number"
          xs={6}
          disabled
        />
        <TextField
          defaultValue={`${product.sale_value}`}
          label="Valor de venda"
          placeHolder="Valor de venda"
          type="number"
          xs={6}
          onChange={(e) =>
            setProduct((prev) => ({
              ...prev,
              sale_value: Number(e.target.value),
              profit: Number(e.target.value) - prev.total_cost,
            }))
          }
        />
        <TextField
          defaultValue={`${product.profit}`}
          label="Lucro"
          placeHolder="Lucro"
          type="number"
          xs={6}
          disabled
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
