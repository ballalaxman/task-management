import React from "react";
import { IoCloseSharp } from "react-icons/io5";

interface Props {
  togglePopup: () => void;
  handleDelete: () => void;
}

const ConfirmationPopup: React.FC<Props> = ({ togglePopup, handleDelete }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ">
      <div className="w-[400px] bg-blue-300 rounded-lg">
        <div className="flex flex-row justify-between px-4 py-2 bg-blue rounded-ss-lg rounded-se-lg">
          <h2 className="text-gray-700 font-bold text-xl">Delete</h2>
          <IoCloseSharp
            className="cursor-pointer"
            size={"1.5rem"}
            onClick={togglePopup}
          />
        </div>
        <div className="bg-slate-200 shadow-lg rounded-ee-lg rounded-es-lg p-4 flex flex-col gap-8">
          <p className="text-xl font-bold  mx-auto">
            Are you really want to delete?
          </p>
          <div className="w-full flex items-center justify-end gap-2">
            <button
              className="hover:bg-white text-sm hover:bg py-2 px-4 rounded"
              onClick={togglePopup}
            >
              Close
            </button>
            <button
              className="bg-blue-700 hover:bg-blue-800 text-sm text-white py-2 px-4 rounded"
              onClick={handleDelete}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
