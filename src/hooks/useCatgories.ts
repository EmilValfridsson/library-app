import { useEffect, useState } from "react";
import { getCategories } from "../services/categoryService";
import { Category } from "../types";

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    async function fetch() {
      const { data: categories } = await getCategories();
      setCategories(categories);
    }
    fetch();
  }, []);

  return categories;
}
