import { memo } from 'react';

import { PhoneIcon as Icon } from 'components/icons/PhoneIcon';

type PhoneAdornmentProps = {
  readonly ref?: React.Ref<HTMLDivElement>;
};

const PhoneAdornment = ({ ref, ...rest }: PhoneAdornmentProps) => (
  <div data-testid="Phone icon" ref={ref} {...rest}>
    <Icon />
  </div>
);

PhoneAdornment.displayName = 'PhoneAdornment';

export default memo(PhoneAdornment);
