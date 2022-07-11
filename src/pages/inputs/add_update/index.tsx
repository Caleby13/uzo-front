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

interface IInputAddUpdate {
  name: string;
  amount: string;
  yield: string;
  value_package: string;
  unit_cost: string;
  provider: string;
}

export function InputAddUpdate() {
  const [input, setInput] = useState<IInputAddUpdate>({
    name: "",
    amount: "",
    yield: "0",
    unit_cost: "0",
    value_package: "0",
    provider: "",
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
      const { data } = await client.get<IInputAddUpdate>(`/input/${id}`);
      if (!!data) {
        setInput({
          amount: data.amount,
          name: data.name,
          provider: data.provider,
          unit_cost: data.unit_cost,
          value_package: data.value_package,
          yield: data.yield,
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
      if (!input.name) {
        toast.error("Insira o nome do insumo");
        return;
      }
      if (!input.yield) {
        toast.error("Insira o rendimento por pacote do insumo");
        return;
      }
      if (!input.value_package) {
        toast.error("Insira o valor do pacote do insumo");
        return;
      }
      setLoading(true);
      const client = api(token);
      if (id === "null") {
        await client.post("/input", input);
        toast.success("Insumo cadastrado com sucesso");
      } else {
        await client.put(`/input/${id}`, input);
        toast.success("Insumo atualizado com sucesso");
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
        id === "null" ? "Cadastro de insumo" : `Alterar insumo ${input.name}`
      }
    >
      <Grid type="container" justifyContent="flex-start">
        <TextField
          defaultValue={`${input.name}`}
          label="Nome"
          placeHolder="Nome"
          xs={6}
          onChange={(e) =>
            setInput((prev) => ({ ...prev, name: e.target.value }))
          }
        />
        <TextField
          defaultValue={`${input.amount}`}
          label="Quantidade/Pacote"
          placeHolder="Quantidade/Pacote"
          xs={6}
          onChange={(e) =>
            setInput((prev) => ({
              ...prev,
              amount: e.target.value,
            }))
          }
        />
        <TextField
          defaultValue={`${input.yield}`}
          label="Redimento por pacote"
          placeHolder="Redimento por pacote"
          type="number"
          xs={6}
          onChange={(e) =>
            setInput((prev) => ({
              ...prev,
              yield: e.target.value,
              unit_cost: `${
                Number(input.value_package) / Number(e.target.value) ===
                Infinity
                  ? 0
                  : Number(input.value_package) / Number(e.target.value)
              }`,
            }))
          }
        />
        <TextField
          defaultValue={`${input.value_package}`}
          label="Valor do pacote"
          placeHolder="Valor do pacote"
          type="number"
          xs={6}
          onChange={(e) => {
            console.log(
              Number(e.target.value),
              Number(input.yield),
              Number(e.target.value) / Number(input.yield)
            );
            setInput((prev) => ({
              ...prev,
              value_package: e.target.value,
              unit_cost: `${
                Number(e.target.value) / Number(input.yield) === Infinity
                  ? 0
                  : Number(e.target.value) / Number(input.yield)
              }`,
            }));
          }}
        />

        <TextField
          defaultValue={`${input.unit_cost}`}
          label="Custo unitário"
          placeHolder="Custo unitário"
          type="number"
          xs={6}
          disabled
        />

        <TextField
          defaultValue={`${input.provider}`}
          label="Fornecedor"
          placeHolder="Fornecedor"
          xs={6}
          onChange={(e) =>
            setInput((prev) => ({ ...prev, provider: e.target.value }))
          }
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
