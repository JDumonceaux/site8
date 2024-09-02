import { memo } from 'react';

import { AccessibleIcon } from '@radix-ui/react-accessible-icon';
import { CrossCircledIcon as Icon } from '@radix-ui/react-icons';
import * as Toggle from '@radix-ui/react-toggle';
import { ToggleProps } from '@radix-ui/react-toggle';

type DeleteAdornmentProps = {
  readonly ref?: React.Ref<HTMLButtonElement>;
} & ToggleProps;

const DeleteAdornment = ({ ref, ...rest }: DeleteAdornmentProps) => {
  return (
    <Toggle.Root {...rest} ref={ref}>
      <AccessibleIcon label="Clear contents">
        <Icon />
      </AccessibleIcon>
    </Toggle.Root>
  );
};

DeleteAdornment.displayName = 'DeleteAdornment';

export default memo(DeleteAdornment);
export type { DeleteAdornmentProps };
