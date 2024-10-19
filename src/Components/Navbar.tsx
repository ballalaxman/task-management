import { useState } from "react";
import AddTask from "./AddTask";

const Navbar = () => {
  const [openModal, setOpenModal] = useState<boolean>();

  const handleOpen = () => {
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpenModal(false);
  };
  return (
    <div className="w-full h-20 bg-blue-300 flex items-center justify-center fixed top-0 left-0">
      <nav className="w-4/5 mx-auto flex items-center justify-between">
        <h1 className="text-center text-2xl font-bold text-gray-800 p-4">
          TASK MANAGEMENT BOARD
        </h1>
        <button
          className="bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded text-base font-semibold"
          onClick={handleOpen}
        >
          Add Task
        </button>
      </nav>
      {openModal && <AddTask onClose={handleClose} />}
    </div>
  );
};

export default Navbar;
