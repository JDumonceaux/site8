import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { DotsVerticalIcon } from '@radix-ui/react-icons';
import { styled } from 'styled-components';

export const IconMenu = (): JSX.Element => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button aria-label="Customise options" type="button">
          <DotsVerticalIcon />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <StyledMenuContent side="right" sideOffset={5}>
          <StyledMenuItem>Delete Item</StyledMenuItem>
        </StyledMenuContent>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

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
`;

const StyledMenuItem = styled(DropdownMenu.Item)`
  font-size: 13px;
  line-height: 1;
  color: var(--violet-11);
  border-radius: 3px;
  display: flex;
  align-items: center;
  height: 25px;
  padding: 0 5px;
  position: relative;
  padding-left: 25px;
  user-select: none;
  outline: none;
`;
// const StyledLabel = styled.label`
//   padding-fight: 15px;
//   color: var(--palette-text);
//   font-size: inherit;
// `;
// const StyledSwitchRoot = styled(RadixSwitch.Root)`
//   width: 42px;
//   height: 25px;
//   background-color: #dcdcdc;
//   border-radius: 9999px;
//   position: relative;
//   box-shadow: 0 2px 10px #dcdcdc;
//   -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
//   :focus {
//     box-shadow: 0 0 0 2px black;
//   }
//   [data-state='checked'] {
//     background-color: black;
//   }
// `;
// const StyledSwitchThumb = styled(RadixSwitch.Thumb)`
//   display: block;
//   width: 21px;
//   height: 21px;
//   background-color: red;
//   border-radius: 9999px;
//   box-shadow: 0 2px 2px #dcdcdc;
//   transition: transform 100ms;
//   transform: translateX(2px);
//   will-change: transform;
//   [data-state='checked'] {
//     transform: translateX(19px);
//   }
// `;
