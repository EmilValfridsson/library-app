import axios from "axios";
import { Category } from "../types";
import { BASE_URL } from "../constants";

interface CategoryFormData {
  id?: string;
  name: string;
}

const API_ENDPOINT = `${BASE_URL}/api/categories`;

function categoryUrl(id?: string) {
  if (id) return `${API_ENDPOINT}/${id}`;
  return API_ENDPOINT;
}

export function getCategories() {
  return axios.get<Category[]>(categoryUrl());
}

export function getCategory(id: string) {
  return axios.get<Category>(categoryUrl(id));
}

export function saveCategory(category: CategoryFormData) {
  if (category.id)
    return axios.put<Category>(categoryUrl(category.id), category);

  return axios.post<Category>(categoryUrl(), category);
}
export function deleteCategory(id: string) {
  return axios.delete<Category>(categoryUrl(id));
}
