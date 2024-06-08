import axios from "axios";
import { Category } from "../types";

export function getCategories() {
  return axios.get<Category[]>("http://localhost:5588/api/categories");
}
