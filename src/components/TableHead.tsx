import { useSortContext } from "../context/SortContext";
import { TextColumn } from "../types";

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

export default function TableHead() {
  const { sortCriteria, handleSort } = useSortContext();

  function renderSortIcon(column: TextColumn) {
    if (column.key !== sortCriteria.key) return null;
    if (sortCriteria.order === "asc")
      return <i className="fa-solid fa-sort-down pl-2"></i>;
    return <i className="fa-solid fa-sort-up pl-2"></i>;
  }

  return (
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
  );
}
