import { FiEdit } from "react-icons/fi";
import { ITask } from "../types";
import { useState } from "react";
import AddTask from "./AddTask";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { deleteTask } from "../Redux/taskSlice";
import ConfirmationPopup from "./ConfirmationPopup";
import toast from "react-hot-toast";

interface Props {
  task: ITask;
}

const Task: React.FC<Props> = ({ task }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openPopup, setOpenPopup] = useState<boolean>(false);

  const togglePopup = () => {
    setOpenPopup((prev) => !prev);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleDeleteTask = () => {
    dispatch(deleteTask(task.id));
    toast.success("Task Deleted");
    togglePopup();
  };

  return (
    <>
      <div
        key={task.id}
        className="bg-slate-100 cursor-pointer flex items-start justify-between p-2 border border-b mb-2 rounded-lg"
      >
        <div className="flex flex-col gap-2">
          <p className="text-base font-semibold">{task.name}</p>
          <p className="text-sm w-4/5">{task.description}</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleOpen}
            className="hover:bg-gray-400 p-1 rounded-sm"
          >
            <FiEdit />
          </button>
          <button
            onClick={togglePopup}
            className="hover:bg-gray-400 p-1 rounded-sm"
          >
            <MdDelete size={"18px"} />
          </button>
        </div>
      </div>
      {openModal && <AddTask taskData={task} onClose={handleClose} />}

      {/* Confirmation Popup */}
      {openPopup && (
        <ConfirmationPopup
          togglePopup={togglePopup}
          handleDelete={handleDeleteTask}
        />
      )}
    </>
  );
};

export default Task;
