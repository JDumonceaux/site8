import React, { memo, useEffect, useRef } from 'react';

import * as TooltipRadix from '@radix-ui/react-tooltip';
import { keyframes, styled } from 'styled-components';

type TooltipBaseProps = {
  readonly arrowProps?: TooltipRadix.TooltipArrowProps;
  readonly children?: never;
  // This should be translated
  readonly content?: React.ReactNode;
  readonly ref?: React.RefObject<HTMLElement>;
  readonly tabStop?: boolean;
  readonly tooltipProps?: TooltipRadix.TooltipProps;
  readonly trigger?: React.ReactNode;
  readonly triggerColor?: string;
  readonly triggerProps?: TooltipRadix.TooltipTriggerProps;
};

const TooltipBase = ({
  arrowProps,
  content,
  ref,
  tabStop = false,
  tooltipProps,
  trigger,
  triggerColor,
  triggerProps,
}: TooltipBaseProps): React.ReactNode => {
  const elementRef: React.RefObject<React.ReactNode> = useRef(null);

  // React doesn't support inert - so you have to do it this way
  useEffect(() => {
    if (elementRef.current && !tabStop) {
      //    elementRef.current.inert = true;
      elementRef.current.setAttribute('tabindex', '-1');
    }
  }, []);

  if (!content) {
    return null;
  }

  return (
    <TooltipRadix.Provider>
      <TooltipRadix.Root {...tooltipProps}>
        <StyledTrigger $color={triggerColor} {...triggerProps} ref={elementRef}>
          {trigger}
        </StyledTrigger>
        <StyledContent>
          <StyledArrow {...arrowProps} />
          {content}
        </StyledContent>
      </TooltipRadix.Root>
    </TooltipRadix.Provider>
  );
};

TooltipBase.displayName = 'TooltipBase';

export default memo(TooltipBase);
export type { TooltipBaseProps };

const StyledTrigger = styled(TooltipRadix.Trigger)<{
  $color?: string;
}>`
  color: ${(props) => props.$color ?? 'var(--text-primary-color)'};
`;
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
