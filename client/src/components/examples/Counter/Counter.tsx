import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../data/store";
import {
  decrement,
  // increment,
  // incrementByAmount,
  incrementAsync,
} from "../../data/counter/counterSlice";

const Counter = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div>
      <h2>{count}</h2>
      <div>
        <button onClick={() => dispatch(incrementAsync(1))}>Increment</button>
        <button onClick={() => dispatch(decrement())}>Decrement</button>
      </div>
    </div>
  );
};

export default Counter;
