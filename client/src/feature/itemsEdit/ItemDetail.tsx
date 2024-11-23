import React from 'react';

import { IconMenu } from 'components/IconMenu/IconMenu';
import { IconMenuItem } from 'components/IconMenu/IconMenuItem';
import Input from 'components/Input/Input';
import { styled } from 'styled-components';

import type { ItemExt } from './useItemsEditPage';

type Props = {
  readonly getFieldValue: (lineId: number, fieldName: keyof ItemExt) => string;
  readonly item: ItemExt;
  readonly onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  readonly onDelete: (lineId: number) => void;
};

const ItemDetail = ({
  getFieldValue,
  item,
  onChange,
  onDelete,
}: Props): React.JSX.Element => {
  const handleOnDelete = React.useCallback(() => {
    onDelete(item.lineId);
  }, [item.lineId, onDelete]);

  const getDefaultProps = React.useCallback(
    (lineId: number, fieldName: keyof ItemExt) => ({
      'data-id': fieldName,
      'data-line': lineId,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e);
      },
      value: getFieldValue(lineId, fieldName),
    }),
    [getFieldValue, onChange],
  );

  return (
    <StyledRow
      $deleted={item.delete === true ? 'true' : 'false'}
      key={item.lineId}>
      <StyledOuterRow>
        <Input.Text
          {...getDefaultProps(item.lineId, 'name')}
          placeholder="Name"
        />
        <Input.Text
          {...getDefaultProps(item.lineId, 'location')}
          placeholder="Location"
        />
        <Input.Text
          {...getDefaultProps(item.lineId, 'official_url')}
          placeholder="Official URL"
        />
        <Input.Text
          {...getDefaultProps(item.lineId, 'description')}
          placeholder="Description"
        />
        <Input.Text
          {...getDefaultProps(item.lineId, 'artist')}
          list="artists"
          placeholder="Artist"
        />
        <Input.Text
          {...getDefaultProps(item.lineId, 'year')}
          placeholder="Year"
        />
        <Input.Text
          {...getDefaultProps(item.lineId, 'tags')}
          placeholder="Tags"
        />
        <IconMenu>
          <IconMenuItem onClick={handleOnDelete}>Delete</IconMenuItem>
          <IconMenuItem>{item.id}</IconMenuItem>
        </IconMenu>
      </StyledOuterRow>
    </StyledRow>
  );
};

export default ItemDetail;

const StyledRow = styled.div<{
  $deleted?: 'false' | 'true';
}>`
  display: flex;
  flex-direction: row;
  justify-content: left;
  width: 100%;
  padding: 10px 0;
  border-bottom: 1px solid var(--palette-samp);
  border: ${(props) =>
    props.$deleted === 'true' ? `1px solid var(--navbar-dark-3)` : undefined};
`;
const StyledOuterRow = styled.div`
  flex-grow: 1;
`;
