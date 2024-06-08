import { PropsWithChildren, createContext, useContext, useState } from "react";
import { Category } from "../types";

interface CategoryContextType {
  DEFAULT_CATEGORIES: Category;
  selectedCategory: Category;
  setSelectedCategory(selectedCategory: Category): void;
  handleCategory(category: Category): void;
}

const CategoryContext = createContext({} as CategoryContextType);

export default function CategoryProvider({ children }: PropsWithChildren) {
  const DEFAULT_CATEGORIES: Category = {
    id: "",
    name: "All Categories",
  };

  const [selectedCategory, setSelectedCategory] = useState(DEFAULT_CATEGORIES);

  function handleCategory(category: Category) {
    setSelectedCategory(category);
  }
  const value: CategoryContextType = {
    DEFAULT_CATEGORIES,
    selectedCategory,
    setSelectedCategory,
    handleCategory,
  };
  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
}
export function useCategoryContext() {
  return useContext(CategoryContext);
}
