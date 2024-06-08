import axios from "axios";
import { Article } from "../types";

export function getArticles() {
  return axios.get<Article[]>("http://localhost:5588/api/articles");
}
