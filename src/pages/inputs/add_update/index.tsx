import { useCallback, useMemo, useState } from "react";
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

interface IInputAddUpdate {
  name: string;
  amount: string;
  yield: number;
  value_package: number;
  unit_cost: number;
  provider: string;
}

export function InputAddUpdate() {
  const [input, setInput] = useState<IInputAddUpdate>({
    name: "",
    amount: "",
    yield: 0,
    unit_cost: 0,
    value_package: 0,
    provider: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const { id } = useParams();

  const { token } = useAuth();

  const handleAddOrUpdate = async () => {
    try {
      setLoading(true);
      const client = api(token);
      if (id === "null") {
        await client.post("/input", input);
      } else {
        await client.put(`/input/${id}`, input);
      }
    } catch (err: any) {
      const message = err?.response?.data?.error || "Erro";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const menu: IOptions[] = [
    {
      name_page: "Confirmar",
      icon: <CheckIcon />,
      redirect: "/inputs",
      hide: false,
      onClick: handleAddOrUpdate,
    },
    {
      name_page: "Cancelar",
      icon: <CancelIcon />,
      redirect: "/inputs",
      hide: false,
    },
  ];

  console.log(input);

  if (loading) {
    return <Loading />;
  }
  return (
    <Menu options={menu}>
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
              yield: Number(e.target.value),
              unit_cost: input.value_package / Number(e.target.value),
            }))
          }
        />
        <TextField
          defaultValue={`${input.value_package}`}
          label="Valor do pacote"
          placeHolder="Valor do pacote"
          type="number"
          xs={6}
          onChange={(e) =>
            setInput((prev) => ({
              ...prev,
              value_package: Number(e.target.value),
              unit_cost: Number(e.target.value) / input.yield,
            }))
          }
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
    </Menu>
  );
}
