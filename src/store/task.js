import { createSlice } from "@reduxjs/toolkit";
import todoService from "../services/todosService";
import { setError } from "./error";

const initialState = { entities: [], isLoading: true };

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    resived(state, action) {
      state.entities = action.payload;
      state.isLoading = false;
    },
    update(state, action) {
      const elementIndex = state.entities.findIndex(
        (el) => el.id === action.payload.id
      );
      state.entities[elementIndex] = {
        ...state.entities[elementIndex],
        ...action.payload,
      };
    },
    remove(state, action) {
      state.entities = state.entities.filter(
        (el) => el.id !== action.payload.id
      );
    },
    addTask(state, action) {
      state.entities.push(action.payload);
      state.isLoading = false;
    },
    taskRequested(state) {
      state.isLoading = true;
    },
    taskRequestFailed(state) {
      state.isLoading = false;
    },
  },
});
const { actions, reducer: taskReducer } = taskSlice;
const { update, remove, resived, taskRequested, taskRequestFailed, addTask } =
  actions;

export const completedTask = (id) => (dispatch, getState) => {
  dispatch(update({ id, completed: true }));
};

export const loadTasks = () => async (dispatch) => {
  dispatch(taskRequested());
  try {
    const data = await todoService.fetch();
    dispatch(resived(data));
  } catch (error) {
    dispatch(taskRequestFailed());
    dispatch(setError(error.message));
  }
};

export const titleChange = (id) => {
  return update({ id: id, title: `New title for ${id}` });
};
export const taskDeleted = (id) => {
  return remove({ id });
};

export const getTasks = () => (state) => state.tasks.entities;

export const getTasksLoadingStatus = () => (state) => state.tasks.isLoading;

export const createTasks = () => async (dispatch) => {
  try {
    const data = await todoService.fetchPost();
    dispatch(addTask(data));
  } catch (error) {
    console.log("error");
  }
};

export default taskReducer;
