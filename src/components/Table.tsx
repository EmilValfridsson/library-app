import { useCategoryContext } from "../context/CategoryContext";
import { useArticles } from "../hooks/useArticles";
import { titleAbbreviation } from "../utils";

export default function Table() {
  const { articles } = useArticles();
  const { selectedCategory } = useCategoryContext();

  let filteredArticles = articles;

  if (selectedCategory.id) {
    filteredArticles = articles.filter(
      (a) => a.categoryId === selectedCategory.id
    );
  } else {
    filteredArticles = articles;
  }
  console.log(selectedCategory);
  return (
    <div className="overflow-x-auto text-white">
      <button className="btn btn-primary rounded mt-3">New Article</button>
      <button className="btn btn-primary rounded mt-3 ml-3">Checkout</button>
      <button className="btn btn-primary rounded mt-3 ml-3">Cart</button>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Type</th>
            <th>Borrowable</th>
            <th>Author</th>
            <th>Pages</th>
            <th>Minutes</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredArticles.map((a) => (
            <tr key={a.id}>
              <td>{`${a.title} (${titleAbbreviation(a.title)})`}</td>
              <td>{a.category.name}</td>
              <td>{a.type}</td>
              <td>{a.isborrowable ? "Yes" : "No"}</td>
              <td>{a.author || "-"}</td>
              <td>{a.nbrpages || "-"}</td>
              <td>{a.runtimeminutes || "-"}</td>
              <td>
                <button className="btn btn-primary btn-sm rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
