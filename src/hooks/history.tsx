import { useNavigate } from "react-router-dom";

export const useHistory = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const push = (route: string) => {
    navigate(route);
  };

  return { goBack, push };
};
