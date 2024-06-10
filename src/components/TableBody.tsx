import { Link } from "react-router-dom";
import { textAbbreviation } from "../utils";
import { useArticles } from "../hooks/useArticles";
import { useCategoryContext } from "../context/CategoryContext";
import { useSearchContext } from "../context/SearchContext";
import { borrowArticle, deleteArticle } from "../services/articleSerivce";
import _ from "lodash";
import { useUserContext } from "../context/UserContext";
import { useSortContext } from "../context/SortContext";

export default function TableBody() {
  const { articles, setArticles } = useArticles();
  const { selectedCategory } = useCategoryContext();
  const { searchValue } = useSearchContext();
  const { sortCriteria } = useSortContext();
  const { user } = useUserContext();

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
            <Link className="hover:underline" to={`newarticle/${a.id}`}>
              {textAbbreviation(a.title)}
            </Link>
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
          <td>{a.isBorrowable ? "Yes" : "No"}</td>
          <td>{a.author || "-"}</td>
          <td>{a.nbrPages || "-"}</td>
          <td>{a.runTimeMinutes || "-"}</td>
          <td>{a.borrower || "-"}</td>
          <td>{a.borrowDate || "-"}</td>
          {user && (
            <>
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
                {!a.borrower && a.isBorrowable && (
                  <Link
                    to={`borrow/${a.id}`}
                    className="btn btn-primary btn-sm rounded"
                  >
                    Borrow
                  </Link>
                )}
                {a.borrower && !a.isBorrowable && (
                  <button
                    onClick={() => handleReturn(a.id)}
                    className="btn btn-success btn-sm rounded"
                  >
                    return
                  </button>
                )}
              </td>
            </>
          )}
        </tr>
      ))}
    </tbody>
  );
}
