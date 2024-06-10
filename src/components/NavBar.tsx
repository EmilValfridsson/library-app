import { NavLink } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

export default function NavBar() {
  const { user } = useUserContext();

  return (
    <div className="m-3">
      <div className="navbar bg-primary drop-shadow-xl rounded text-black">
        <NavLink to={""} className="btn btn-ghost text-xl">
          ILB
        </NavLink>
        {!user ? (
          <>
            <NavLink to={"/login"} className="btn btn-ghost text-xl">
              Login
            </NavLink>
            <NavLink to={"/register"} className="btn btn-ghost text-xl">
              Register
            </NavLink>
          </>
        ) : (
          <>
            <a className="btn btn-ghost text-xl">{user.name}</a>
            <NavLink to={"/logout"} className="btn btn-ghost text-xl">
              Logout
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
}
