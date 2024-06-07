import { getArticles } from "../services/articleSerivce";

export default function Table() {
  const articles = getArticles();
  function titleAbbreviation(title: string) {
    const Abbreviation = title
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase();
    return Abbreviation;
  }
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
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
          {articles.map((a) => (
            <tr key={a.title}>
              <td>{`${a.title} (${titleAbbreviation(a.title)})`}</td>
              <td>{a.categoryId}</td>
              <td>{a.type}</td>
              <td>{a.isBorrowable ? "Yes" : "No"}</td>
              <td>{a.author || "-"}</td>
              <td>{a.nbrPages || "-"}</td>
              <td>{a.runTimeMinutes || "-"}</td>
              <td>
                <button className="btn btn-primary btn-sm">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
