import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import CategoryProvider from "./context/CategoryContext";

function App() {
  return (
    <>
      <CategoryProvider>
        <NavBar />
        <Outlet />
      </CategoryProvider>
    </>
  );
}

export default App;
