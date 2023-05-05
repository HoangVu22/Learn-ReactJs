import { useReducer } from "react";
import "./App.css";

// 1.Init state
const initState = 0;

// 2.Analyza actions
const DOWN_ACTION = "down";
const UP_ACTION = "up";

// 3.Create reducer
const reducer = (state, action) => {
  console.log("reducer running...");

  switch (action) {
    case DOWN_ACTION:
      return state - 1;
    case UP_ACTION:
      return state + 1;
    default:
      throw new Error("Invalid action");
  }
};

function UseReducer() {
  const [count, dispatch] = useReducer(reducer, initState);

  return (
    <div className="App" style={{ padding: "0 20px" }}>
      <h1>{count}</h1>
      <button onClick={() => dispatch(DOWN_ACTION)}>Down</button>
      <button onClick={() => dispatch(UP_ACTION)}>Up</button>
    </div>
  );
}

export default UseReducer;
