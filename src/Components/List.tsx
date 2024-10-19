import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FaFolder } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoAddOutline } from "react-icons/io5";
import { deleteColumn, updateListName } from "../Redux/coloumnSlice";
import AddTask from "./AddTask";
import { AppDispatch, RootState } from "../store";
import { useSelector } from "react-redux";
import Task from "./Task";
import { ITask } from "../types";
import ConfirmationPopup from "./ConfirmationPopup";
import toast from "react-hot-toast";

interface IList {
  id: string;
  name: string;
}

interface Props {
  list: IList;
}

const List: React.FC<Props> = ({ list }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks } = useSelector((state: RootState) => state.tasks);
  const filteredTasks = tasks.filter((task) => task.listId === list.id);

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openEditInput, setOpenEditInput] = useState<boolean>(false);
  const [listname, setListname] = useState<string>(list.name);
  const [openConfirmationPopup, setOpenConfirmationPopup] =
    useState<boolean>(false);

  const togglePopup = () => {
    setOpenConfirmationPopup((prev) => !prev);
  };

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleDeleteList = () => {
    dispatch(deleteColumn(list.id));
    toast.success("List deleted successfully");
  };

  const updateName = () => {
    dispatch(updateListName({ listname, id: list.id }));
    setOpenEditInput(false);
  };

  return (
    <div className="max-h-[85vh] overflow-y-auto min-w-[350px]">
      <div
        key={list.id}
        className="border bg-blue-300 w-full p-2 flex items-center justify-between mb-2 rounded-md "
      >
        <div className="flex gap-2 items-center">
          <FaFolder />

          {/* click on listname to edit and press enter to see change */}
          {openEditInput ? (
            <input
              type="text"
              className="border w-full rounded-lg py-1 px-4 focus:outline-none bg-transparent"
              value={listname}
              onChange={(e) => setListname(e.target.value)}
              onKeyDown={(e: React.KeyboardEvent) => {
                if (e?.key === "Enter") {
                  e.preventDefault();
                  updateName();
                }
              }}
            />
          ) : (
            <p
              onClick={() => setOpenEditInput(true)}
              className="cursor-pointer font-semibold text-lg"
            >
              {list.name}
            </p>
          )}
        </div>
        <button
          onClick={togglePopup}
          className="hover:bg-gray-500 p-1 rounded-sm"
        >
          <MdDelete size={"19px"} />
        </button>
      </div>
      {filteredTasks.map((task: ITask) => (
        <Task task={task} />
      ))}
      <div
        className="w-full p-2 bg-slate-300 flex items-center justify-between cursor-pointer rounded-md hover:bg-slate-400"
        onClick={handleOpen}
      >
        <p>Add task</p>
        <IoAddOutline />
      </div>

      {openModal && <AddTask onClose={handleClose} listId={list.id} />}

      {/* openConfirmationPopup */}
      {openConfirmationPopup && (
        <ConfirmationPopup
          togglePopup={togglePopup}
          handleDelete={handleDeleteList}
        />
      )}
    </div>
  );
};

export default List;
