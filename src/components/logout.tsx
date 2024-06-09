import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../services";
import { useUserContext } from "../context/UserContext";

function Logout() {
  const navigate = useNavigate();
  const { setUser } = useUserContext();

  useEffect(() => {
    auth.logout();
    navigate("/");
    setUser(null);
  }, []);

  return <></>;
}
export default Logout;
