import { NavLink } from "react-router-dom";
import { auth } from "../services";
import { User } from "../types";
import { useEffect, useState } from "react";

export default function NavBar() {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const user = auth.getCurrentUser();
    setUser(user);
  }, []);

  return (
    <div className="m-3">
      <div className="navbar bg-primary drop-shadow-xl rounded text-black">
        <NavLink to={""} className="btn btn-ghost text-xl">
          ILB
        </NavLink>
        {!user && (
          <NavLink to={"/login"} className="btn btn-ghost text-xl">
            Login
          </NavLink>
        )}
        {user && (
          <>
            <a className="btn btn-ghost text-xl">{user.name}</a>
            <NavLink to={"/logout"} className="btn btn-ghost text-xl">
              Logout
            </NavLink>
          </>
        )}

        <NavLink to={"/register"} className="btn btn-ghost text-xl">
          Register
        </NavLink>
      </div>
    </div>
  );
}
