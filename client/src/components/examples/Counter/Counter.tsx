import { useDispatch, useSelector } from 'react-redux';

import { increment } from '../../../services/state/examples/counterSlice';
import { AppDispatch, RootState } from '../../../services/state/store';

export const Counter = (): JSX.Element => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div>
      <h2>{count}</h2>
      <div>
        <button onClick={() => dispatch(increment('1'))}>Increment</button>
        {/* <button onClick={() => dispatch(decrement())}>Decrement</button> */}
      </div>
    </div>
  );
};
