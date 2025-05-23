import type { FC } from 'react';

import Input from 'components/Input/Input';
import StyledLink from 'components/Link/StyledLink/StyledLink';
import styled from 'styled-components';
import type { MenuItem } from 'types';

type PageRowProps = {
  getDefaultProps: (lineId: string, field: string) => any;
  item: MenuItem;
};

export const PageRow: FC<PageRowProps> = ({ getDefaultProps, item }) => {
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
        {item.type !== 'root' && (
          <Input.Text {...getDefaultProps(item.lineId, 'parentId')} />
        )}
      </td>
      <td>
        <Input.Text {...getDefaultProps(item.lineId, 'parentSeq')} />
      </td>
      <td>
        {item.type !== 'page' && (
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

const StyledTr = styled.tr`
  td {
    padding: 3px 15px;
  }
`;
