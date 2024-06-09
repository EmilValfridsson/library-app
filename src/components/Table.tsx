import { Link } from "react-router-dom";
import SearchBox from "./SearchBox";
import TableHead from "./TableHead";
import TableBody from "./TableBody";

export default function Table() {
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
        <TableBody />
      </table>
    </div>
  );
}
