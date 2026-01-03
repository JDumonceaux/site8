import { type JSX, memo } from 'react';

import Input from '@components/ui/input/Input';
import StyledLink from '@components/ui/link/styled-link/StyledLink';
import type { MenuItem } from '@types';
import usePagesEdit from './usePagesEdit';
import styled from 'styled-components';

type PageRowProps = {
  item: MenuItem;
};

const PageRow = memo(({ item }: PageRowProps): JSX.Element => {
  const { getDefaultProps } = usePagesEdit();
  const isPage = item.type === 'page';
  const levelPrefix = (
    {
      menu: ' -- ',
      page: ' ---- ',
      root: '',
    } as const
  )[item.type];

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
          <Input.Text {...getDefaultProps(item.lineId ?? 0, 'parentId')} />
        )}
      </td>
      <td>
        <Input.Text {...getDefaultProps(item.lineId ?? 0, 'parentSeq')} />
      </td>
      <td>
        {item.type === 'page' ? null : (
          <>
            <label htmlFor={`parentSortby-${item.lineId ?? 0}`}>Sort by</label>
            <Input.Text
              {...getDefaultProps(item.lineId ?? 0, 'parentSortby')}
              id={`parentSortby-${item.lineId ?? 0}`}
              list={`sortTypes-${item.lineId ?? 0}`}
            />
            <datalist id={`sortTypes-${item.lineId ?? 0}`}>
              <option value="seq">Sequence</option>
              <option value="name">Name</option>
            </datalist>
          </>
        )}
      </td>
      <td>
        {item.type}
        {item.issue ? '-I' : ''} -{item.lineId ?? 0}
      </td>
    </StyledTr>
  );
});

PageRow.displayName = 'PageRow';
export default PageRow;

const StyledTr = styled.tr`
  td {
    padding: 3px 15px;
  }
`;
