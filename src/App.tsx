import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import CategoryProvider from "./context/CategoryContext";
import SearchProvider from "./context/SearchContext";
import SortProvider from "./context/sortContext";

function App() {
  return (
    <>
      <SearchProvider>
        <CategoryProvider>
          <SortProvider>
            <NavBar />
            <Outlet />
          </SortProvider>
        </CategoryProvider>
      </SearchProvider>
    </>
  );
}

export default App;
