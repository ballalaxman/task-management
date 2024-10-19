import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

interface List {
  id: string;
  name: string;
}

interface ListState {
  list: List[];
}

const initialState: ListState = {
  list: []
};

const columnsSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    addColumn(state, action: PayloadAction<string>) {
      const newList: List = {
        id: uuidv4(),
        name: action.payload
      };
      state.list.push(newList);
    },
    deleteColumn(state, action: PayloadAction<string>) {
      state.list = state.list.filter((list) => list.id !== action.payload);
    },
    updateListName(
      state,
      action: { payload: { listname: string; id: string } }
    ) {
      state.list = state.list.map((list) =>
        list.id === action.payload.id
          ? { ...list, name: action.payload.listname }
          : list
      );
    }
  }
});

export const { addColumn, deleteColumn, updateListName } = columnsSlice.actions;
export const columnsReducer = columnsSlice.reducer;
