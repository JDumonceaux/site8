import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { DotsVerticalIcon } from '@radix-ui/react-icons';
import { styled } from 'styled-components';

type Props = {
  readonly children?: React.ReactNode;
};

export const IconMenu = ({ children }: Props): React.JSX.Element => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <StyledButton aria-label="Customise options" type="button">
          <DotsVerticalIcon />
        </StyledButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <StyledMenuContent align="start" side="right" sideOffset={5}>
          {children}
        </StyledMenuContent>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

const StyledButton = styled.button`
  font-family: inherit;
  border-radius: 100%;
  height: 35px;
  width: 35px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--violet-11);
  background-color: white;
  box-shadow: 0 2px 10px var(--black-a7);
`;
const StyledMenuContent = styled(DropdownMenu.Content)`
  min-width: 220px;
  background-color: var(--palette-grey-10);
  border-radius: 6px;
  border: 1px solid var(--palette-samp);
  padding: 5px;
  box-shadow:
    0px 10px 38px -10px rgba(22, 23, 24, 0.35),
    0px 10px 20px -15px rgba(22, 23, 24, 0.2);
  animation-duration: 400ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
  z-index: 20;
`;
