import { Link } from "react-router-dom";
import { titleAbbreviation } from "../utils";
import { useArticles } from "../hooks/useArticles";
import { useCategoryContext } from "../context/CategoryContext";
import { useSearchContext } from "../context/SearchContext";
import { useSortContext } from "../context/sortContext";
import { borrowArticle, deleteArticle } from "../services/articleSerivce";
import _ from "lodash";

export default function TableBody() {
  const { articles, setArticles } = useArticles();
  const { selectedCategory } = useCategoryContext();
  const { searchValue } = useSearchContext();
  const { sortCriteria } = useSortContext();

  async function handleDelete(id: string) {
    const newArticles = articles.filter((a) => a.id !== id);
    setArticles(newArticles);
    await deleteArticle(id);
  }

  let filteredArticles = articles;

  if (searchValue) {
    filteredArticles = articles.filter((a) =>
      Object.values(a)
        .join(" ")
        .toLowerCase()
        .includes(searchValue.toLowerCase())
    );
  } else if (selectedCategory.id) {
    filteredArticles = articles.filter(
      (a) => a.categoryId === selectedCategory.id
    );
  } else {
    filteredArticles = articles;
  }

  const sortedArticles = _.orderBy(
    filteredArticles,
    [sortCriteria.key],
    [sortCriteria.order]
  );
  async function handleReturn(id: string) {
    console.log(id);
    const returnedArticle = articles.map((a) => {
      if (a.id === id) {
        return {
          ...a,
          borrower: null,
          borrowDate: null,
          isBorrowable: true,
        };
      }
      return a;
    });
    await borrowArticle(id);
    setArticles(returnedArticle);
  }
  return (
    <tbody>
      {sortedArticles.map((a) => (
        <tr key={a.id}>
          <td>
            <Link className="hover:underline" to={`newarticle/${a.id}`}>{`${
              a.title
            } (${titleAbbreviation(a.title)})`}</Link>
          </td>
          <td>
            <Link
              className="hover:underline"
              to={`newcategory/${a.categoryId}`}
            >
              {a.category.name}
            </Link>
          </td>
          <td>{a.type}</td>
          <td>{a.isborrowable ? "Yes" : "No"}</td>
          <td>{a.author || "-"}</td>
          <td>{a.nbrpages || "-"}</td>
          <td>{a.runtimeminutes || "-"}</td>
          <td>{a.borrower || "-"}</td>
          <td>{a.borrowDate || "-"}</td>
          <td>
            <button
              onClick={() => handleDelete(a.id)}
              className="btn btn-primary btn-sm rounded"
            >
              Delete
            </button>
          </td>
          <td>
            {a.type === "Dictionary" && (
              <button className="btn btn-primary btn-sm rounded" disabled>
                Not Loanable
              </button>
            )}
            {!a.borrower && a.isborrowable && (
              <Link
                to={`borrow/${a.id}`}
                className="btn btn-primary btn-sm rounded"
              >
                Borrow
              </Link>
            )}
            {a.borrower && !a.isborrowable && (
              <button
                onClick={() => handleReturn(a.id)}
                className="btn btn-success btn-sm rounded"
              >
                return
              </button>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  );
}
