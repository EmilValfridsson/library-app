import { useCategoryContext } from "../context/CategoryContext";
import { useArticles } from "../hooks/useArticles";
import { titleAbbreviation } from "../utils";
import _ from "lodash";
import { Link } from "react-router-dom";
import { borrowArticle, deleteArticle } from "../services/articleSerivce";
import SearchBox from "./SearchBox";
import { useSearchContext } from "../context/SearchContext";
import TableHead from "./TableHead";
import { useSortContext } from "../context/sortContext";

export default function Table() {
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
    <div className="overflow-x-auto text-white">
      <Link to="newcategory" className="btn btn-primary rounded mt-3">
        New Category
      </Link>
      <Link to="newarticle" className="btn btn-primary rounded m-3">
        New Article
      </Link>
      <SearchBox />

      <table className="table">
        <TableHead />
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
      </table>
    </div>
  );
}
