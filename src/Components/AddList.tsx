import { useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { addColumn } from "../Redux/coloumnSlice";

const AddList = () => {
  const dispatch = useDispatch();
  const [clicked, setClicked] = useState<boolean>(false);
  const [columnName, setColumnName] = useState<string>("");

  const handleSave = () => {
    if (columnName.trim()) {
      dispatch(addColumn(columnName));
      setColumnName("");
      setClicked(false);
    }
  };

  return (
    <>
      <div className="flex-col gap-3 min-w-[350px]">
        <div
          className="w-full bg-slate-300 rounded-md p-2 flex items-center justify-between cursor-pointer border hover:bg-slate-400"
          onClick={() => setClicked(true)}
        >
          <p className="text-lg">Add new list</p>
          <IoAddOutline />
        </div>
        {clicked && (
          <div className="w-full bg-slate-300 px-2 py-4 flex flex-col gap-5 mt-4">
            <input
              type="text"
              placeholder="Enter List name"
              value={columnName}
              onChange={(e) => setColumnName(e.target.value)}
              className="border w-full rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="w-full flex items-center justify-end gap-3">
              <button
                className="hover:bg-white text-sm hover:bg py-2 px-4 rounded"
                onClick={() => setClicked(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-700 hover:bg-blue-800 text-sm text-white py-2 px-4 rounded"
                onClick={handleSave}
              >
                Create
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AddList;
