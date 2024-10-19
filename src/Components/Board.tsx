import AddList from "./AddList";
import { useSelector } from "react-redux";
import { RootState } from "../store";

import List from "./List";

const Board = () => {
  const { list } = useSelector((state: RootState) => state.list);

  return (
    <main className="w-4/5 mx-auto mt-20 pt-4 flex gap-4 items-start min-h-[91vh] justify-start overflow-x-auto overflow-y-hidden">
      {list.map((column) => (
        <List list={column} key={column.id} />
      ))}
      <AddList />
    </main>
  );
};

export default Board;
