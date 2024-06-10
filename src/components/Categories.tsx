import { toast } from "react-toastify";
import { useCategoryContext } from "../context/CategoryContext";
import { useUserContext } from "../context/UserContext";
import { useArticles } from "../hooks/useArticles";
import { useCategories } from "../hooks/useCatgories";
import { deleteCategory } from "../services/categoryService";

export default function Categories() {
  const { categories, setCategories } = useCategories();
  const { DEFAULT_CATEGORIES, handleCategory } = useCategoryContext();
  const { articles } = useArticles();
  const { user } = useUserContext();

  async function handleDelete(id: string) {
    const articlesInCategory = articles.find((a) => a.categoryId === id);
    if (articlesInCategory)
      return toast.error("Category must be empty from articles");
    const newCategories = categories.filter((c) => c.id !== id);
    setCategories(newCategories);
    await deleteCategory(id);
  }
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
            {user?.isAdmin && (
              <button
                className="text-right text-red-500 hover:text-red-700"
                onClick={() => handleDelete(c.id)}
              >
                X
              </button>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
