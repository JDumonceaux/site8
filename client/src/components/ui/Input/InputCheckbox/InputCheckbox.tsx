import { memo } from 'react';

type InputCheckboxProps = {
  readonly type?: 'checkbox';
};

const InputCheckbox = ({
  type = 'checkbox',
}: InputCheckboxProps): JSX.Element => (
  <input type={type}>Not implemeneted - use checkbox element</input>
);

InputCheckbox.displayName = 'InputCheckbox';

export default memo(InputCheckbox);
