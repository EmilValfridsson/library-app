import Categories from "../components/Categories";
import Table from "../components/Table";

export default function MainPage() {
  return (
    <div className="flex">
      <Categories />
      <Table />
    </div>
  );
}
