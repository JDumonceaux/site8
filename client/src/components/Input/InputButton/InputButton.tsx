import React, { memo } from 'react'; 

type InputButtonProps = {
  readonly type?: 'button' | 'reset' | 'submit';
};

const InputButton = ({ type = 'button' }: InputButtonProps): React.JSX.Element => (
  <input type={type}>Not implemeneted - use button element</input>
);

InputButton.displayName = 'InputButton';

export default memo(InputButton);
