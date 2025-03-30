import { type FC, memo } from 'react';

import styled from 'styled-components';

export type EndAdornmentProps = {
  readonly children?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

const EndAdornment: FC<EndAdornmentProps> = memo(
  ({ children, ...rest }: EndAdornmentProps): null | React.JSX.Element => {
    if (!children) {
      return null;
    }

    // const isString = (value) =>
    //   typeof value === 'string' || value instanceof String;
    // const isNumber = (value) =>
    //   typeof value === 'number' || value instanceof Number;
    // const isBoolean = (value) =>
    //   typeof value === 'boolean' || value instanceof Boolean;

    // if (isString || isNumber || isBoolean) {
    return (
      <>
        <StyledDiv {...rest}>{children}</StyledDiv>
        <StyledVLine />
      </>
    );
    // }

    // if (React.isValidElement(children)) {
    //   return (
    //     <>
    //       {children}
    //       <StyledVLine />
    //     </>
    //   );
    // }
    // throw new Error('Invalid type passed as child.');
  },
);

EndAdornment.displayName = 'EndAdornments';

export default EndAdornment;

const StyledDiv = styled.div`
  color: var(--input-adornment);
  margin-left: 8px;
  margin-right: 8px;
`;
const StyledVLine = styled.div`
  background-color: var(--input-adornment);
  width: 1px;
  height: 60%;
`;
