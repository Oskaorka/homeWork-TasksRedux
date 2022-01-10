export function thunk({ getState, dispatch }) {
  return function wrapDispatch(next) {
    return function handleAction(action) {
      //   console.log(typeof action);
      if (typeof action === "function") {
        // console.log("function");
        action(dispatch, getState);
      } else {
        return next(action);
      }
    };
  };
}
