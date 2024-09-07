import { memo } from 'react';

type InputRadioProps = {
  readonly type?: 'radio';
};

const InputRadio = ({ type = 'radio' }: InputRadioProps): JSX.Element => (
  <input type={type}>Not implemeneted - use radio element</input>
);

InputRadio.displayName = 'InputRadio';

export default memo(InputRadio);
