import React, { type JSX } from 'react';

import IconMenu from '@components/icon-menu-temp/IconMenu';
import IconMenuItem from '@components/icon-menu-temp/IconMenuItem';
import Input from '@components/input-temp/Input';
import type { ListItem } from '@shared/types';
import type { ImageAddExt } from './ImageAdd';
import styled from 'styled-components';

type Props = {
  readonly getFieldValue: (
    lineId: number,
    fieldName: keyof ImageAddExt,
  ) => string;
  readonly item: ImageAddExt;
  readonly names?: ListItem[];
  readonly onChange: (
    error: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;
  readonly onChangeCheckbox?: (
    lineId: string,
    fieldName: string,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  readonly onDelete: (lineId: number) => void;
};

const ImageDetail = ({
  getFieldValue,
  item,
  names,
  onChange,
  onChangeCheckbox,
  onDelete,
}: Props): JSX.Element => {
  const handleOnDelete = () => {
    onDelete(item.lineId);
  };

  const fileNameValue = getFieldValue(item.lineId, 'fileName');
  const folderValue = getFieldValue(item.lineId, 'folder');
  const itemIdValue = getFieldValue(item.lineId, 'itemId');
  const isSelected = getFieldValue(item.lineId, 'isSelected') === 'true';

  return (
    <StyledRow $deleted={item.delete ? 'true' : 'false'}>
      <StyledImgContainer>
        <StyledImg
          alt="unknown"
          src={item.src}
        />
      </StyledImgContainer>
      <StyledOuterRow>
        {item.isDuplicate ? <div>Duplicate Image</div> : null}
        <Input.Select
          data-id="itemId"
          data-line={item.lineId}
          dataList={names}
          value={itemIdValue}
          onChange={onChange}
          placeholder="Item"
        />
        <Input.Text
          data-id="fileName"
          data-line={item.lineId}
          value={fileNameValue}
          onChange={onChange}
          placeholder="File Name"
        />
        <Input.Text
          data-id="folder"
          data-line={item.lineId}
          value={folderValue}
          onChange={onChange}
          placeholder="Folder"
        />
        <IconMenu>
          <IconMenuItem onClick={handleOnDelete}>Delete</IconMenuItem>
          <IconMenuItem>{item.id}</IconMenuItem>
        </IconMenu>
        <Input.Checkbox
          checked={isSelected}
          fieldName="isSelected"
          label=""
          lineId={String(item.lineId)}
          onChange={
            onChangeCheckbox ??
            ((_lineId, _fieldName, event) => {
              onChange(event);
            })
          }
        />
      </StyledOuterRow>
    </StyledRow>
  );
};

ImageDetail.displayName = 'ImageDetail';
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
