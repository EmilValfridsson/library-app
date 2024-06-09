import { PropsWithChildren, createContext, useContext, useState } from "react";

interface ISearchContext {
  searchValue: string;
  setSearchValue(searchValue: string): void;
}

const SearchContext = createContext({} as ISearchContext);

export default function SearchProvider({ children }: PropsWithChildren) {
  const [searchValue, setSearchValue] = useState<string>("");

  const value: ISearchContext = {
    searchValue,
    setSearchValue,
  };
  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
}
export function useSearchContext() {
  return useContext(SearchContext);
}
