import { memo } from 'react';

type InputRadioProps = {
  readonly type?: 'radio';
};

const InputRadio = ({ type = 'radio' }: InputRadioProps): React.JSX.Element => (
  <input type={type} value="Not implemeneted - use radio element" />
);

InputRadio.displayName = 'InputRadio';

export default memo(InputRadio);
