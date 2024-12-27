import React from 'react';

import { IconMenu } from 'components/IconMenu/IconMenu';
import { IconMenuItem } from 'components/IconMenu/IconMenuItem';
import Input from 'components/Input/Input';
import { styled } from 'styled-components';
import type { ListItem } from 'types';

import type { ImageAddExt } from './ImageAdd';

type Props = {
  readonly getFieldValue: (
    lineId: number,
    fieldName: keyof ImageAddExt,
  ) => string;
  readonly item: ImageAddExt;
  readonly names?: ListItem[];
  readonly onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;
  readonly onDelete: (lineId: number) => void;
};

const ImageDetail = ({
  getFieldValue,
  item,
  names,
  onChange,
  onDelete,
}: Props): React.JSX.Element => {
  const handleOnDelete = React.useCallback(() => {
    onDelete(item.lineId);
  }, [item.lineId, onDelete]);

  const getDefaultProps = React.useCallback(
    (lineId: number, fieldName: keyof ImageAddExt) => ({
      'data-id': fieldName,
      'data-line': lineId,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e);
      },
      value: getFieldValue(lineId, fieldName),
    }),
    [getFieldValue, onChange],
  );

  const getDefaultPropsSelect = React.useCallback(
    (lineId: number, fieldName: keyof ImageAddExt) => ({
      'data-id': fieldName,
      'data-line': lineId,
      onChange: (e: React.ChangeEvent<HTMLSelectElement>) => {
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
      <StyledImgContainer>
        <StyledImg alt="unknown" src={item.src} />
      </StyledImgContainer>
      <StyledOuterRow>
        {item.isDuplicate ? <div>Duplicate Image</div> : null}
        <Input.Select
          {...getDefaultPropsSelect(item.lineId, 'itemId')}
          dataList={names}
          placeholder="Item"
        />
        <Input.Text
          {...getDefaultProps(item.lineId, 'fileName')}
          placeholder="File Name"
        />
        <Input.Text
          {...getDefaultProps(item.lineId, 'folder')}
          placeholder="Folder"
        />
        <IconMenu>
          <IconMenuItem onClick={handleOnDelete}>Delete</IconMenuItem>
          <IconMenuItem>{item.id}</IconMenuItem>
        </IconMenu>
        <Input.Checkbox
          checked={getFieldValue(item.lineId, 'isSelected') === 'true'}
          data-id="isSelected"
          data-line={item.lineId}
          onChange={onChange}
          value="x"
        />
      </StyledOuterRow>
    </StyledRow>
  );
};

export default ImageDetail;

const StyledImgContainer = styled.div`
  display: flex;
  margin-right: 20px;
  width: 250px;
`;
const StyledImg = styled.img`
  max-width: 250px;
  max-height: 250px;
  width: auto;
  height: auto;
`;
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
