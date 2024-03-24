import { styled } from 'styled-components';

type StyledTableProps = {
  readonly children?: React.ReactNode;
};

const StyledTable = ({ children }: StyledTableProps): JSX.Element => {
  return <STable>{children}</STable>;
};

const StyledTableHead = styled.thead``;

const StyledTableRow = styled.tr``;

StyledTable.Head = StyledTableHead;
StyledTable.Row = StyledTableRow;

export default StyledTable;

const STable = styled.table`
  color: black;
  background-color: white;
  input {
    border: 1px solid black;
  }
`;
