import React from 'react';

import IconMenu from 'components/IconMenu/IconMenu';
import IconMenuItem from 'components/IconMenu/IconMenuItem';
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

  const handleFieldChange = React.useCallback(
    (
      lineId: number,
      fieldName: keyof ItemAddExt,
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      onChange(e, lineId, fieldName);
    },
    [onChange],
  );

  return (
    <StyledRow key={item.lineId}>
      <StyledOuterRow>
        <Input.Text
          data={names}
          fieldName="title"
          id="title"
          lineId={item.lineId}
          onChange={handleFieldChange}
          placeholder="Title"
        />
        <Input.Text
          fieldName="year"
          lineId={item.lineId}
          onChange={handleFieldChange}
          placeholder="Year"
        />
        <Input.Text
          data={locations}
          fieldName="location"
          id="locations"
          lineId={item.lineId}
          onChange={handleFieldChange}
          placeholder="Location"
        />
        <Input.Text
          fieldName="officialWebAddress"
          lineId={item.lineId}
          onChange={handleFieldChange}
          placeholder="Official Web Address"
        />
        <Input.TextArea
          fieldName="description"
          lineId={item.lineId}
          onChange={handleFieldChange}
          placeholder="Description"
          rows={5}
        />
        <Input.Text
          data={periods}
          fieldName="artisticPeriod"
          id="periods"
          lineId={item.lineId}
          onChange={handleFieldChange}
          placeholder="Artistic Period"
        />
        <Input.Text
          fieldName="tags"
          lineId={item.lineId}
          onChange={handleFieldChange}
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
