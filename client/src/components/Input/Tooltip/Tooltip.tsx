import * as TooltipRadix from '@radix-ui/react-tooltip';
import React, { memo } from 'react';
import { keyframes, styled } from 'styled-components';

type TooltipProps = {
  // This should be translated
  readonly content: React.ReactNode;
  readonly trigger?: React.ReactNode;
  readonly tooltipProps?: TooltipRadix.TooltipProps;
  readonly triggerProps?: TooltipRadix.TooltipTriggerProps;
  readonly arrowProps?: TooltipRadix.TooltipArrowProps;
  readonly children?: never;
};

const Tooltip = ({
  content,
  trigger,
  tooltipProps,
  triggerProps,
  arrowProps,
}: TooltipProps): JSX.Element => {
  if (!content) {
    return <></>;
  }

  return (
    <TooltipRadix.Provider>
      <TooltipRadix.Root {...tooltipProps}>
        <TooltipRadix.Trigger {...triggerProps}>{trigger}</TooltipRadix.Trigger>
        <StyledContent>
          <StyledArrow {...arrowProps} />
          {content}
        </StyledContent>
      </TooltipRadix.Root>
    </TooltipRadix.Provider>
  );
};

Tooltip.displayName = 'Tooltip';

export default memo(Tooltip);
export type { TooltipProps };

const StyledArrow = styled(TooltipRadix.Arrow)`
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
const StyledContent = styled(TooltipRadix.Content)`
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
