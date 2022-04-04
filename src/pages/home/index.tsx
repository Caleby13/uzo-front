import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";

export function Home() {
  const navigate = useNavigate();

  const goToInputs = () => {
    navigate("/inputs");
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
