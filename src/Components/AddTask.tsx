import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { addTask, updateTask } from "../Redux/taskSlice";
import { useSelector } from "react-redux";
import { IoCloseSharp } from "react-icons/io5";
import { ITask } from "../types";
import toast from "react-hot-toast";

interface Props {
  onClose: () => void;
  taskData?: ITask;
  listId?: string;
}

const AddTask: React.FC<Props> = ({ taskData, onClose, listId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { list } = useSelector((state: RootState) => state.list);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid }
  } = useForm<ITask>({
    defaultValues: {
      name: "",
      description: "",
      listId: listId ?? ""
    },
    mode: "all"
  });

  const onSubmit: SubmitHandler<ITask> = async (data) => {
    const payload = {
      ...data,
      ...(!taskData?.id && { id: uuidv4() })
    };
    const createUpdateAction = taskData?.id ? updateTask : addTask;
    dispatch(createUpdateAction(payload));
    onClose();
    const toastmsg = taskData?.id
      ? "Task Updated Successfully"
      : "Task Added Successfully";
    toast.success(toastmsg);
    if (!taskData?.id) {
      reset();
    } else {
      onClose();
    }
  };

  useEffect(() => {
    if (taskData?.id) {
      console.log(taskData);
      reset(taskData);
    }
  }, [taskData?.id]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="w-[600px] bg-blue-300 rounded-lg">
        <div className="flex flex-row justify-between px-4 py-2 bg-blue rounded-ss-lg rounded-se-lg">
          <h2 className="text-gray-700 font-bold text-xl">
            {taskData?.id ? "Update Task" : "Add Task"}
          </h2>
          <IoCloseSharp
            className="cursor-pointer"
            size={"1.5rem"}
            onClick={onClose}
          />
        </div>
        <div className="bg-slate-200 shadow-lg rounded-ee-lg rounded-es-lg p-4 flex flex-col gap-4">
          <form
            className="flex flex-col gap-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="">
              <input
                type="text"
                placeholder="Enter Task *"
                className="border w-full rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("name", { required: "Task name is required" })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <textarea
              rows={4}
              placeholder="Enter description"
              className="border w-full rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("description")}
            />

            <div className="">
              <select
                className={`border w-full rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white ${
                  listId ? `bg-gray-400` : ""
                }`}
                {...register("listId", { required: "List is required" })}
                disabled={!!listId}
              >
                <option value="" disabled selected hidden>
                  Select list *
                </option>
                {list?.map((option, index) => (
                  <option key={index} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
              {errors.listId && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.listId.message}
                </p>
              )}
            </div>
            <div className="w-full flex justify-end mt-5 gap-2">
              <button
                className="hover:bg-white text-sm hover:bg py-2 px-4 rounded"
                onClick={onClose}
              >
                Close
              </button>
              <button
                className={`bg-blue-700 hover:bg-blue-800 text-sm text-white py-1.5 px-4 rounded ${
                  !isValid
                    ? "bg-gray-500 hover:bg-gray-500 cursor-not-allowed"
                    : ""
                }`}
                type="submit"
                disabled={!isValid}
              >
                {taskData?.id ? "Update" : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
