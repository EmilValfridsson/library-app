import axios from "axios";
import { Article } from "../types";

const API_BASEURL = "http://localhost:5588/api/articles";

export interface ArticleFormData {
  title: string;
  type: string;
  isborrowable: boolean;
  categoryId: string;
  id?: string | undefined;
  author?: string | undefined;
  nbrpages?: number | undefined;
  runtimeminutes?: number | undefined;
}

function articlesUrl(id?: string) {
  if (id) return `${API_BASEURL}/${id}`;
  return API_BASEURL;
}

export function getArticles() {
  return axios.get<Article[]>(articlesUrl());
}

export function getArticle(id: string) {
  return axios.get<Article>(articlesUrl(id));
}

export function saveArticle(article: ArticleFormData) {
  if (article.id) return axios.put(articlesUrl(article.id), article);
  if (article.type === "DVD" || article.type === "AudioBook") {
    return axios.post(articlesUrl() + "/item");
  }

  return axios.post(articlesUrl() + "/book");
}

export function deleteArticle(id: string) {
  return axios.delete(articlesUrl(id));
}
