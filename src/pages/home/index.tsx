import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();
  const goToInputs = () => {
    navigate("/inputsview");
  };
  const goToProducts = () => {
    navigate("/products");
  };
  return (
    <>
      <Button children={"Insumos"} onClick={goToInputs} />
      <Button children={"Produtos"} onClick={goToProducts} />
    </>
  );
}
