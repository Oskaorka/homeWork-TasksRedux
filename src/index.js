import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import {
  titleChange,
  taskDeleted,
  completedTask,
  getTasks,
  loadTasks,
  getTasksLoadingStatus,
  createTasks,
} from "./store/task";
import configureStore from "./store/store";
import { Provider, useSelector, useDispatch } from "react-redux";
import { getError } from "./store/error";

const store = configureStore();
const App = () => {
  const state = useSelector(getTasks());
  const isLoading = useSelector(getTasksLoadingStatus());
  const error = useSelector(getError());
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadTasks());
    // dispatch(createTasks());
  }, []);

  const changeTitle = (taskId) => {
    // console.log(state.tasks.entities);
    dispatch(titleChange(taskId));
  };
  const deletedTask = (taskId) => {
    dispatch(taskDeleted(taskId));
  };
  if (isLoading) {
    return <h1>Loading</h1>;
  }
  if (error) {
    return <p>{error}</p>;
  }
  // const BtnAddTask = () => {
  const handleClick = (params) => {
    // const data =
    // createTasks();
    dispatch(createTasks());
    // console.log(state);
    // console.log(data);
    // dispatch(loadTasks());
  };
  // return
  // };
  return (
    <>
      <h1>React-Redux</h1>
      <button onClick={handleClick}>Add tasks</button>
      <p>
        {state[state.length - 1].id} {state[state.length - 1].title}
      </p>
      <ul>
        {state.map((el) => (
          <li key={el.id}>
            {/* {el.id === 201 ? console.log("yes") : console.log("non")} */}
            <p>{el.title}</p>
            <p>{`Completed: ${el.completed}`}</p>
            <button onClick={() => dispatch(completedTask(el.id))}>
              completed Task
            </button>
            <button onClick={() => changeTitle(el.id)}>changeTitle</button>
            <button onClick={() => deletedTask(el.id)}>DELETE</button>
            <hr />
          </li>
        ))}
      </ul>
    </>
  );
};

// export default BtnAddTask;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <BtnAddTask /> */}
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
