import { useState } from "react";
import { useCategoryContext } from "../context/CategoryContext";
import { useArticles } from "../hooks/useArticles";
import { titleAbbreviation } from "../utils";
import _ from "lodash";

import { SortCriteria, TextColumn } from "../types";

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
  const { articles } = useArticles();
  const { selectedCategory } = useCategoryContext();
  const [sortCriteria, setSortCriteria] = useState<SortCriteria>(DEFAULT_SORT);

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
      <button className="btn btn-primary rounded mt-3">New Article</button>
      <button className="btn btn-primary rounded mt-3 ml-3">Checkout</button>
      <button className="btn btn-primary rounded mt-3 ml-3">Cart</button>
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
              <td>{`${a.title} (${titleAbbreviation(a.title)})`}</td>
              <td>{a.category.name}</td>
              <td>{a.type}</td>
              <td>{a.isborrowable ? "Yes" : "No"}</td>
              <td>{a.author || "-"}</td>
              <td>{a.nbrpages || "-"}</td>
              <td>{a.runtimeminutes || "-"}</td>
              <td>{a.borrow || "-"}</td>
              <td>{a.borrowDate || "-"}</td>
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
