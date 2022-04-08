import { useParams } from "react-router-dom";

export function UserAddUpdate() {
  const { id } = useParams();

  return <div>{`UserAddUpdate ${id}`}</div>;
}
