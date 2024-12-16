import React from 'react';

import { IconMenu } from 'components/IconMenu/IconMenu';
import { IconMenuItem } from 'components/IconMenu/IconMenuItem';
import Input from 'components/Input/Input';
import { styled } from 'styled-components';
import type { KeyValue } from 'types/KeyValue';

import type { ItemAddExt } from './ItemAdd';

type Props = {
  readonly artists?: KeyValue[];
  readonly getFieldValue: (
    lineId: number,
    fieldName: keyof ItemAddExt,
  ) => string;
  readonly item: ItemAddExt;
  readonly locations?: KeyValue[];
  readonly names?: KeyValue[];
  readonly onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  readonly onDelete?: (lineId: number) => void;
  readonly periods?: KeyValue[];
};

const ItemDetail = ({
  artists,
  getFieldValue,
  item,
  locations,
  names,
  onChange,
  onDelete,
  periods,
}: Props): React.JSX.Element => {
  const handleOnDelete = React.useCallback(() => {
    if (onDelete) {
      onDelete(item.lineId);
    }
  }, [item.lineId, onDelete]);

  const getDefaultProps = React.useCallback(
    (lineId: number, fieldName: keyof ItemAddExt) => ({
      autocomplete: 'off',
      'data-id': fieldName,
      'data-line': lineId,
      onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      ) => {
        onChange(e);
      },
      value: getFieldValue(lineId, fieldName),
    }),
    [getFieldValue, onChange],
  );

  return (
    <StyledRow key={item.lineId}>
      <StyledOuterRow>
        <Input.Text
          {...getDefaultProps(item.lineId, 'name')}
          dataList={{ data: names, id: 'names' }}
          placeholder="Name"
        />
        <Input.Text
          {...getDefaultProps(item.lineId, 'location')}
          dataList={{ data: locations, id: 'locations' }}
          placeholder="Location"
        />
        <Input.Text
          {...getDefaultProps(item.lineId, 'official_url')}
          placeholder="Official URL"
        />
        <Input.TextArea
          {...getDefaultProps(item.lineId, 'description')}
          placeholder="Description"
          rows={5}
        />
        <Input.Text
          {...getDefaultProps(item.lineId, 'artist')}
          dataList={{ data: artists, id: 'artists' }}
          placeholder="Artist"
        />
        <Input.Text
          {...getDefaultProps(item.lineId, 'year')}
          placeholder="Year"
        />
        <Input.Text
          {...getDefaultProps(item.lineId, 'period')}
          dataList={{ data: periods, id: 'periods' }}
          placeholder="Period"
        />
        <Input.Text
          {...getDefaultProps(item.lineId, 'tags')}
          placeholder="Tags"
        />
        <IconMenu>
          <IconMenuItem onClick={handleOnDelete}>Delete</IconMenuItem>
          <IconMenuItem>{item.lineId}</IconMenuItem>
        </IconMenu>
      </StyledOuterRow>
    </StyledRow>
  );
};

export default ItemDetail;

const StyledRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  width: 100%;
  padding: 10px 0;
  border-bottom: 1px solid var(--palette-samp);
`;
const StyledOuterRow = styled.div`
  flex-grow: 1;
`;
