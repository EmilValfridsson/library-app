import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../services";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    auth.logout();
    navigate("/");
  }, []);

  return <></>;
}
export default Logout;
