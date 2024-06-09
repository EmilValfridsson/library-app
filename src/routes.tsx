import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MainPage from "./pages/MainPage";
import Logout from "./components/logout";
import ArticleFormPage from "./pages/ArticleFormPage";
import CategoryFormPage from "./pages/CategoryFormPage";
import BorrowFormPage from "./pages/BorrowFormPage";

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      { path: "/", element: <MainPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "logout", element: <Logout /> },
      { path: "newarticle", element: <ArticleFormPage /> },
      { path: "newcategory", element: <CategoryFormPage /> },
      { path: "newarticle/:id", element: <ArticleFormPage /> },
      { path: "newcategory/:id", element: <CategoryFormPage /> },
      { path: "borrow/:id", element: <BorrowFormPage /> },
    ],
  },
]);

export default router;
