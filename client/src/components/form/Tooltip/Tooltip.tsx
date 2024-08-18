import { styled } from 'styled-components';

type TooltipProps = {
  readonly children: React.ReactNode;
  readonly text: string;
};

export const Tooltip = ({ children, text }: TooltipProps): JSX.Element => {
  return (
    <StyledDiv>
      {children}
      <span>{text}</span>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  > span {
    position: relative;
    display: inline-block;
    visibility: hidden;
    background-color: black;
    color: white;
    font-size: 12px;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    position: absolute;
    z-index: 1;
    top: 100%;
    left: 50%;
    margin-top: 5px;
    margin-left: -60px;
    opacity: 0;
    transition: opacity 0.3s;
  }
  > span:hover {
      visibility: visible;
      opacity: 1;
    }
  }
`;
