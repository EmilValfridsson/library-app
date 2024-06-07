import { getCategories } from "../services/categoryService";

export default function Categories() {
  const categories = getCategories();

  return (
    <ul className="m-3 menu bg-primary w-56 rounded text-white">
      {categories.map((c) => (
        <li>
          <a>{c.name}</a>
        </li>
      ))}
    </ul>
  );
}
