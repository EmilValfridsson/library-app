import { useCategoryContext } from "../context/CategoryContext";
import { useSearchContext } from "../context/SearchContext";

export default function SearchBox() {
  const { setSearchValue, searchValue } = useSearchContext();
  const { setSelectedCategory, DEFAULT_CATEGORIES } = useCategoryContext();

  function onChange(value: string) {
    setSearchValue(value);
    setSelectedCategory(DEFAULT_CATEGORIES);
  }

  return (
    <input
      className="input input-bordered w-full max-w-xs"
      placeholder="Search..."
      value={searchValue}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
