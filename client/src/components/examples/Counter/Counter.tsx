import { useDispatch, useSelector } from 'react-redux';

import { increment } from '../../../services/state/examples/counterSlice';
import { AppDispatch, RootState } from '../../../services/state/store';

export const Counter = (): JSX.Element => {
  const selector = (state: RootState) => state.counter;
  const count = useSelector(selector).value;
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div>
      <h2>{count}</h2>
      <div>
        <button onClick={() => dispatch(increment('1'))} type="button">
          Increment
        </button>
        {/* <button onClick={() => dispatch(decrement())}>Decrement</button> */}
      </div>
    </div>
  );
};
