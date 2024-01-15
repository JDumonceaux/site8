import { useDispatch, useSelector } from "react-redux";
import {
  increment,
  // decrement,
} from "../../../services/state/examples/counterSlice";
import { AppDispatch, RootState } from "../../../services/state/store";

const Counter = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div>
      <h2>{count}</h2>
      <div>
        <button onClick={() => dispatch(increment("1"))}>Increment</button>
        {/* <button onClick={() => dispatch(decrement())}>Decrement</button> */}
      </div>
    </div>
  );
};

export default Counter;
