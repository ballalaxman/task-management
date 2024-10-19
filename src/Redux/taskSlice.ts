import { createSlice } from "@reduxjs/toolkit";

interface Task {
  id: string;
  name: string;
  description: string;
  listId: string;
}

interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: []
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask(state, action: { payload: Task }) {
      state.tasks.push(action.payload);
    },
    deleteTask(state, action: { payload: string }) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    updateTask(state, action: { payload: Task }) {
      state.tasks = state.tasks.map((task) =>
        task.id === action.payload.id ? action.payload : task
      );
    }
  }
});

export const { addTask, deleteTask, updateTask } = taskSlice.actions;
export const taskReducer = taskSlice.reducer;
