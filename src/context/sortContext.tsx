import { PropsWithChildren, createContext, useContext, useState } from "react";
import { SortCriteria } from "../types";

interface SortContext {
  sortCriteria: SortCriteria;
  setSortCriteria(SortCriteria: SortCriteria): void;
  handleSort(key: string): void;
}
const DEFAULT_SORT: SortCriteria = {
  key: "category.name",
  order: "asc",
};

const SortContext = createContext({} as SortContext);

export default function SortProvider({ children }: PropsWithChildren) {
  const [sortCriteria, setSortCriteria] = useState<SortCriteria>(DEFAULT_SORT);

  function handleSort(key: string) {
    setSortCriteria((prevCriteria) => ({
      key,
      order: prevCriteria.order === "asc" ? "desc" : "asc",
    }));
  }

  const value: SortContext = {
    sortCriteria,
    setSortCriteria,
    handleSort,
  };
  return <SortContext.Provider value={value}>{children}</SortContext.Provider>;
}
export function useSortContext() {
  return useContext(SortContext);
}
