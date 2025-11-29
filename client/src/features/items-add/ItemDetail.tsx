import type { ChangeEvent, JSX } from 'react';

import IconMenu from '@components/icon-menu/IconMenu';
import IconMenuItem from '@components/icon-menu/IconMenuItem';
import Input from '@components/input/Input';
import type { KeyValue } from '@shared/types/KeyValue';
import type { ItemAddExt } from './ItemAdd';
import styled from 'styled-components';

type Props = {
  readonly item: ItemAddExt;
  readonly locations?: KeyValue[];
  readonly names?: KeyValue[];
  readonly onChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  readonly onDelete?: (lineId: number) => void;
  readonly periods?: KeyValue[];
};

const ItemDetail = ({
  item,
  locations,
  names,
  onChange,
  onDelete,
  periods,
}: Props): JSX.Element => {
  const handleOnDelete = () => {
    if (onDelete) {
      onDelete(item.lineId);
    }
  };

  return (
    <StyledRow key={item.lineId}>
      <StyledOuterRow>
        <Input.Text
          data-id="title"
          data-line={item.lineId}
          dataList={names ? { data: names, id: 'title' } : undefined}
          onChange={onChange}
          placeholder="Title"
        />
        <Input.Text
          data-id="year"
          data-line={item.lineId}
          onChange={onChange}
          placeholder="Year"
        />
        <Input.Text
          dataList={
            locations ? { data: locations, id: 'locations' } : undefined
          }
          data-id="location"
          data-line={item.lineId}
          onChange={onChange}
          placeholder="Location"
        />
        <Input.Text
          data-id="officialWebAddress"
          data-line={item.lineId}
          onChange={onChange}
          placeholder="Official Web Address"
        />
        <Input.TextArea
          data-id="description"
          data-line={item.lineId}
          onChange={onChange}
          placeholder="Description"
          rows={5}
        />
        <Input.Text
          data-id="artisticPeriod"
          data-line={item.lineId}
          dataList={periods ? { data: periods, id: 'periods' } : undefined}
          onChange={onChange}
          placeholder="Artistic Period"
        />
        <Input.Text
          data-id="tags"
          data-line={item.lineId}
          onChange={onChange}
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
