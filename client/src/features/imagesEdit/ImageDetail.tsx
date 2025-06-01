import React from 'react';
import IconMenu from 'components/IconMenu/IconMenu';
import IconMenuItem from 'components/IconMenu/IconMenuItem';
import Input from 'components/Input/Input';
import styled from 'styled-components';
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
        <StyledImg alt="unknown" src={item.src} />
      </StyledImgContainer>
      <StyledOuterRow>
        {item.isDuplicate && <div>Duplicate Image</div>}
        <Input.Select
          data-id="itemId"
          data-line={item.lineId}
          onChange={onChange}
          value={itemIdValue}
          dataList={names}
          placeholder="Item"
        />
        <Input.Text
          data-id="fileName"
          data-line={item.lineId}
          onChange={onChange}
          value={fileNameValue}
          placeholder="File Name"
        />
        <Input.Text
          data-id="folder"
          data-line={item.lineId}
          onChange={onChange}
          value={folderValue}
          placeholder="Folder"
        />
        <IconMenu>
          <IconMenuItem onClick={handleOnDelete}>Delete</IconMenuItem>
          <IconMenuItem>{item.id}</IconMenuItem>
        </IconMenu>
        <Input.Checkbox
          checked={isSelected}
          data-id="isSelected"
          data-line={item.lineId}
          onChange={onChange}
          value="x"
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
