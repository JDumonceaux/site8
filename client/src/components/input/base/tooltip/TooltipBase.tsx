import type { JSX, ReactNode } from 'react';

import * as TooltipRadix from '@radix-ui/react-tooltip';
import { keyframes, styled } from 'styled-components';

export type TooltipBaseProps = {
  /** Tooltip arrow props */
  arrowProps?: TooltipRadix.TooltipArrowProps;
  /** Content to display inside the tooltip */
  content?: ReactNode;
  /** Delay before showing tooltip (ms), defaults to 0 */
  delayDuration?: number;
  /** Disable hoverable content in provider */
  isHoverableContentDisabled?: boolean;
  /** Props for the Tooltip.Root */
  tooltipProps?: TooltipRadix.TooltipProps;
  /** Element that triggers the tooltip */
  trigger?: ReactNode;
  /** Color for the trigger element */
  triggerColor?: string;
  /** Props for the Tooltip.Trigger */
  triggerProps?: TooltipRadix.TooltipTriggerProps;
};

const TooltipBase = ({
  arrowProps,
  content,
  tooltipProps,
  delayDuration = tooltipProps?.delayDuration ?? 0,
  isHoverableContentDisabled = false,
  trigger,
  triggerColor,
  triggerProps,
}: TooltipBaseProps): JSX.Element | null => {
  // Don’t render if no content or no trigger provided
  if (!content || !trigger) return null;

  return (
    <TooltipRadix.Provider disableHoverableContent={isHoverableContentDisabled}>
      <TooltipRadix.Root
        {...tooltipProps}
        delayDuration={delayDuration}
      >
        <StyledTrigger
          $color={triggerColor}
          {...triggerProps}
        >
          {trigger}
        </StyledTrigger>
        <TooltipRadix.Portal>
          <StyledContent>
            <StyledArrow {...arrowProps} />
            {content}
          </StyledContent>
        </TooltipRadix.Portal>
      </TooltipRadix.Root>
    </TooltipRadix.Provider>
  );
};

TooltipBase.displayName = 'TooltipBase';
export default TooltipBase;

const StyledTrigger = styled(TooltipRadix.Trigger)<{ $color?: string }>`
  display: inline-block;
  position: relative;
  padding: 0 4px;
  color: ${({ $color }) => $color ?? 'var(--text-primary-color)'};
  z-index: 1;
`;

const StyledArrow = styled(TooltipRadix.Arrow)`
  fill: var(--tooltip-arrow-color);
`;

const scaleIn = keyframes`
  from { opacity: 0; transform: scale(0); }
  to   { opacity: 1; transform: scale(1); }
`;

// Animations for content appearing
const slideUp = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
`;
const slideDown = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to   { opacity: 1; transform: translateY(0); }
`;
const slideLeftAndFade = keyframes`
  from { opacity: 0; transform: translateX(2px); }
  to   { opacity: 1; transform: translateX(0); }
`;
const slideRightAndFade = keyframes`
  from { opacity: 0; transform: translateX(-2px); }
  to   { opacity: 1; transform: translateX(0); }
`;
const slideUpAndFade = keyframes`
  from { opacity: 0; transform: translateY(2px); }
  to   { opacity: 1; transform: translateY(0); }
`;
const slideDownAndFade = keyframes`
  from { opacity: 0; transform: translateY(-2px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const StyledContent = styled(TooltipRadix.Content)`
  border-radius: var(--border-radius-xl);
  border: 1px solid var(--tooltip-border-color);
  padding: 6px 18px;
  font-size: var(--font-size-xs);
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

  &[data-side='top'] {
    animation-name: ${slideDown};
  }
  &[data-side='bottom'] {
    animation-name: ${slideUp};
  }
  &[data-side='left'][data-state='delayed-open'] {
    animation-name: ${slideRightAndFade};
  }
  &[data-side='right'][data-state='delayed-open'] {
    animation-name: ${slideLeftAndFade};
  }
  &[data-side='top'][data-state='delayed-open'] {
    animation-name: ${slideDownAndFade};
  }
  &[data-side='bottom'][data-state='delayed-open'] {
    animation-name: ${slideUpAndFade};
  }
`;
