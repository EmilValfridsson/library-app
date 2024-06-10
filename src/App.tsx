import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import CategoryProvider from "./context/CategoryContext";
import SearchProvider from "./context/SearchContext";

import UserProvider from "./context/UserContext";
import SortProvider from "./context/SortContext";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <UserProvider>
        <SearchProvider>
          <CategoryProvider>
            <SortProvider>
              <NavBar />
              <Outlet />
              <ToastContainer />
            </SortProvider>
          </CategoryProvider>
        </SearchProvider>
      </UserProvider>
    </>
  );
}

export default App;
