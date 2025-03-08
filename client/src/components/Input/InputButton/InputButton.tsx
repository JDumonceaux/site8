import { memo } from 'react';

type InputButtonProps = {
  readonly type?: 'button' | 'reset' | 'submit';
};

const InputButton = ({
  type = 'button',
}: InputButtonProps): React.JSX.Element => (
  <input type={type} value="Not implemeneted - use button element" />
);

InputButton.displayName = 'InputButton';

export default memo(InputButton);
