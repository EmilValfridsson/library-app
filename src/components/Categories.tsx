import { useCategoryContext } from "../context/CategoryContext";
import { useCategories } from "../hooks/useCatgories";

export default function Categories() {
  const categories = useCategories();
  const { DEFAULT_CATEGORIES, handleCategory } = useCategoryContext();

  return (
    <ul className="m-3 p-4 bg-primary w-40 rounded text-black">
      <button
        className="text-xl hover:underline"
        onClick={() => handleCategory(DEFAULT_CATEGORIES)}
      >
        All Categories
      </button>
      {categories.map((c) => (
        <li key={c.id} className="py-2">
          <div className="flex justify-between">
            <button
              className="hover:underline"
              onClick={() => handleCategory(c)}
            >
              {c.name}
            </button>
            <button className="text-right text-red-500 hover:text-red-700">
              X
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
