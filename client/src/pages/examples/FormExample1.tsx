import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../services/state/store';
import { increment } from '../../services/state/examples/counterSlice';

import './formExample1.css';

function FormExample1() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch<AppDispatch>();

  const onHandleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch(increment(event.target.value));
  };

  return (
    <main className='main'>
      <div>
        <div className='adorned-input-container'>
          <span className='start-adornment'>@</span>
          <input
            type='text'
            className='adorned-input'
            placeholder='Enter text'
            value={count + 1}
            onChange={onHandleChange}
          />
          <span className='end-adornment'>#</span>
        </div>
      </div>
    </main>
  );
}

export default FormExample1;
