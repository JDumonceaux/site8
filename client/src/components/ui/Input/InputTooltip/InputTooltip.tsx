import { QuestionMarkCircledIcon } from '@radix-ui/react-icons';
import * as Tooltip from '@radix-ui/react-tooltip';
import { memo } from 'react';
import { keyframes, styled } from 'styled-components';

type InputTooltipProps = {
  // This should be translated
  readonly label?: string | undefined;
  readonly tooltipProps?: Tooltip.TooltipProps;
  readonly triggerProps?: Tooltip.TooltipTriggerProps;
  readonly arrowProps?: Tooltip.TooltipArrowProps;
};

const InputTooltip = ({
  label,
  tooltipProps,
  triggerProps,
  arrowProps,
}: InputTooltipProps): JSX.Element => {
  if (!label) {
    return <></>;
  }

  return (
    <Tooltip.Provider>
      <Tooltip.Root {...tooltipProps}>
        <Tooltip.Trigger {...triggerProps}>
          <QuestionMarkCircledIcon />
          {/* <StyledButton type="button">
            <HelpIcon />
          </StyledButton> */}
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <StyledContent>
            <StyledArrow {...arrowProps} />
            {label}
          </StyledContent>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

InputTooltip.displayName = 'InputTooltip';

export default memo(InputTooltip);
export type { InputTooltipProps };

const StyledButton = styled.button`
  font-family: inherit;
  border-radius: 100%;
  height: 35px;
  width: 35px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--palette-white);
  background-color: inherit;
  box-shadow: 0 2px 10px var(--tooltip-border-color);
  user-select: none;
  :hover {
    background-color: var(--tooltip-border-color);
  }
  :focus {
    box-shadow: 0 0 0 2px black;
  }
`;
const StyledArrow = styled(Tooltip.Arrow)`
  fill: var(--tooltip-arrow-color);
`;
const scaleIn = keyframes`
   from {
    opacity: 0;
    transform: scale(0);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;
const slideDown = keyframes`
   from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }}
    `;
const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }`;
const slideUpAndFade = keyframes`
  from {
    opacity: 0;
    transform: translateY(2px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }`;
const slideRightAndFade = keyframes`
  from {
    opacity: 0;
    transform: translateX(-2px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }`;
const slideDownAndFade = keyframes`
  from {
    opacity: 0;
    transform: translateY(-2px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }`;
const slideLeftAndFade = keyframes`
  from {
    opacity: 0;
    transform: translateX(2px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }`;
const StyledContent = styled(Tooltip.Content)`
  border-radius: 18px;
  border: 1px solid var(--tooltip-border-color);
  padding: 6px 18px;
  font-size: 0.8rem;
  line-height: 1;
  color: var(--tooltip-label-color);
  background-color: var(--tooltip-background-color, #000);
  box-shadow:
    var(--tooltip-border-color) 0px 10px 38px -10px,
    var(--tooltip-border-color) 0px 10px 20px -15px;
  user-select: none;
  will-change: transform, opacity;
  animation-duration: 400ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  animation-name: ${scaleIn};
  [data-side='top'] {
    animation-name: ${slideUp};
  }
  [data-side='bottom'] {
    animation-name: ${slideDown};
  }
  [data-state='delayed-open'][data-side='top'] {
    animation-name: ${slideDownAndFade};
  }
  [data-state='delayed-open'][data-side='right'] {
    animation-name: ${slideLeftAndFade};
  }
  [data-state='delayed-open'][data-side='bottom'] {
    animation-name: ${slideUpAndFade};
  }
  [data-state='delayed-open'][data-side='left'] {
    animation-name: ${slideRightAndFade};
  }
`;
