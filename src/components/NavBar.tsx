import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <div className="m-3">
      <div className="navbar bg-primary drop-shadow-xl rounded">
        <NavLink to={""} className="btn btn-ghost text-xl text-white">
          Intensive System
        </NavLink>
        <NavLink to={"/login"} className="btn btn-ghost text-xl text-white">
          Login
        </NavLink>
        <NavLink to={"/register"} className="btn btn-ghost text-xl text-white">
          Register
        </NavLink>
      </div>
    </div>
  );
}
