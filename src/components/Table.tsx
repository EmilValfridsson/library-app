import { useState } from "react";
import { useCategoryContext } from "../context/CategoryContext";
import { useArticles } from "../hooks/useArticles";
import { titleAbbreviation } from "../utils";
import _ from "lodash";

import { SortCriteria, TextColumn } from "../types";
import { Link } from "react-router-dom";
import { deleteArticle } from "../services/articleSerivce";

const DEFAULT_SORT: SortCriteria = {
  key: "category.name",
  order: "asc",
};

const headers: TextColumn[] = [
  { label: "Title", key: "title" },
  { label: "Category", key: "category.name" },
  { label: "Type", key: "type" },
  { label: "Borrowable", key: "isborrowable" },
  { label: "Author", key: "author" },
  { label: "Pages", key: "nbrPages" },
  { label: "Minutes", key: "runtimeminutes" },
  { label: "Borrower", key: "borrower" },
  { label: "BorrowDate", key: "borrowDate" },
];

export default function Table() {
  const { articles, setArticles } = useArticles();
  const { selectedCategory } = useCategoryContext();
  const [sortCriteria, setSortCriteria] = useState<SortCriteria>(DEFAULT_SORT);

  async function handleDelete(id: string) {
    const newArticles = articles.filter((a) => a.id !== id);
    setArticles(newArticles);
    await deleteArticle(id);
  }

  let filteredArticles = articles;

  if (selectedCategory.id) {
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
  function handleSort(key: string) {
    setSortCriteria((prevCriteria) => ({
      key,
      order: prevCriteria.order === "asc" ? "desc" : "asc",
    }));
  }
  function renderSortIcon(column: TextColumn) {
    if (column.key !== sortCriteria.key) return null;
    if (sortCriteria.order === "asc")
      return <i className="fa-solid fa-sort-down pl-2"></i>;
    return <i className="fa-solid fa-sort-up pl-2"></i>;
  }
  return (
    <div className="overflow-x-auto text-white">
      <Link to="newcategory" className="btn btn-primary rounded mt-3">
        New Category
      </Link>
      <Link to="newarticle" className="btn btn-primary rounded m-3">
        New Article
      </Link>

      <table className="table">
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header.key} onClick={() => handleSort(header.key)}>
                {header.label}
                {renderSortIcon(header)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedArticles.map((a) => (
            <tr key={a.id}>
              <td>
                <Link to={`newarticle/${a.id}`}>{`${
                  a.title
                } (${titleAbbreviation(a.title)})`}</Link>
              </td>
              <td>
                <Link to={`newcategory/${a.categoryId}`}>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
