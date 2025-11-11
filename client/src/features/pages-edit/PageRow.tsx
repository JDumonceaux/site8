import type { JSX } from 'react';

import Input from '@/components/input/Input';
import StyledLink from '@/components/link/styled-link/StyledLink';
import styled from 'styled-components';
import type { MenuItem } from '../../types';

type PageRowProps = {
  getDefaultProps: (lineId: string, field: string) => any;
  item: MenuItem;
};

const PageRow = ({
  getDefaultProps,
  item,
}: PageRowProps): JSX.Element | null => {
  const isPage = item.type === 'page';
  const levelPrefix =
    {
      menu: ' -- ',
      page: ' ---- ',
    }[item.type] || '';

  return (
    <StyledTr>
      <td>
        {isPage ? (
          <StyledLink to={`/admin/page/edit/${item.id}`}>{item.id}</StyledLink>
        ) : (
          item.id
        )}
      </td>
      <td>
        <StyledLink to={item.toComplete ?? ''}>
          {levelPrefix}
          {item.name}
        </StyledLink>
      </td>
      <td>
        {item.type === 'root' ? null : (
          <Input.Text {...getDefaultProps(item.lineId, 'parentId')} />
        )}
      </td>
      <td>
        <Input.Text {...getDefaultProps(item.lineId, 'parentSeq')} />
      </td>
      <td>
        {item.type === 'page' ? null : (
          <>
            <Input.Text
              {...getDefaultProps(item.lineId, 'parentSortby')}
              list="sortTypes"
            />
            <datalist id="sortTypes">
              <option value="seq" />
              <option value="name" />
            </datalist>
          </>
        )}
      </td>
      <td>
        {item.type}
        {item.issue ? '-I' : ''} -{item.lineId}
      </td>
    </StyledTr>
  );
};

PageRow.displayName = 'PageRow';
export default PageRow;

const StyledTr = styled.tr`
  td {
    padding: 3px 15px;
  }
`;
