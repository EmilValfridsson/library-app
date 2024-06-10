import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import CategoryProvider from "./context/CategoryContext";
import SearchProvider from "./context/SearchContext";

import UserProvider from "./context/UserContext";
import SortProvider from "./context/SortContext";

function App() {
  return (
    <>
      <UserProvider>
        <SearchProvider>
          <CategoryProvider>
            <SortProvider>
              <NavBar />
              <Outlet />
            </SortProvider>
          </CategoryProvider>
        </SearchProvider>
      </UserProvider>
    </>
  );
}

export default App;
