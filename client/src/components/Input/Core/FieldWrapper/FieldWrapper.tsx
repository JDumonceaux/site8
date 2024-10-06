import React, { memo } from 'react';
import styled from 'styled-components';
import LabelBase, { LabelBaseProps } from '../LabelBase/LabelBase';
import Tooltip from '../Tooltip/Tooltip';
import { TooltipBaseProps } from '../Tooltip/TooltipBase';

type FieldWrapperProps = {
  readonly children: React.ReactNode;
  readonly description?: string;
  readonly id: string;
  readonly label?: string;
  readonly labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  readonly labelRef?: React.RefObject<HTMLLabelElement>;
  readonly requiredLabel?: string;
  readonly requiredLabelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  readonly showClear?: boolean;
  readonly showCounter?: boolean;
  readonly showError?: boolean;
  readonly showRequired?: boolean;
  readonly toolTipProps?: TooltipBaseProps;
} & Omit<LabelBaseProps, 'onChange'>;

const FieldWrapper = ({
  children,
  description,
  id,
  label,
  labelProps,
  labelRef,
  toolTipProps,
  ...rest
}: FieldWrapperProps): React.JSX.Element => (
  <StyledFormField id={id}>
    <LabelBase
      label={label}
      ref={labelRef}
      {...labelProps}
      description={description}
      endAdornment={<Tooltip.QuestionMark {...toolTipProps} />}
      required={rest.required}>
      {children}
    </LabelBase>
    {/* <StyledFoooter>
        <InputHelp helpText={helpText} {...helpProps} />
        <InputCounter
          id={counterId}
          maxLength={maxLength}
          showCounter={showCounter}
          characterCount={characterCount}
        />
      </StyledFoooter> */}
  </StyledFormField>
);

FieldWrapper.displayName = 'FieldWrapper';

export default memo(FieldWrapper);

export type { FieldWrapperProps };

const StyledFormField = styled.div`
  display: grid;
  margin-bottom: 16px;
`;
