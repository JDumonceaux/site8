import React from 'react';
import { IconMenu } from 'components/IconMenu/IconMenu';
import { IconMenuItem } from 'components/IconMenu/IconMenuItem';
import { styled } from 'styled-components';
import Input from 'components/Input/Input';
import { ImageItemForm } from './useImagesEditPage';

type Props = {
  readonly item: ImageItemForm;
  readonly onDelete: (localId: number) => void;
  readonly getFieldValue: (
    localId: number,
    fieldName: keyof ImageItemForm,
  ) => string;
  readonly onChange: (
    localId: number,
    fieldName: keyof ImageItemForm,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
};

const ImageItem = ({
  item,
  onDelete,
  getFieldValue,
  onChange,
}: Props): React.JSX.Element => {
  const handleOnDelete = (localId: number) => {
    onDelete(localId);
  };

  const getDefaultProps = (
    localId: number,
    fieldName: keyof ImageItemForm,
  ) => ({
    id: `${fieldName as string}-(${localId})`,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      onChange(localId, fieldName, e),
    value: getFieldValue(localId, fieldName),
  });

  return (
    <StyledRow $deleted={item.delete ? 'true' : 'false'} key={item.localId}>
      <StyledImgContainer>
        <StyledImg alt={item.name} src={item.src} />
      </StyledImgContainer>
      <StyledOuterRow>
        {item.isDuplicate ? <div>Duplicate Image</div> : null}

        <Input.Text
          {...getDefaultProps(item.localId, 'name')}
          placeholder="Name"
        />
        <Input.Text
          {...getDefaultProps(item.localId, 'fileName')}
          placeholder="File Name"
        />
        <Input.Text
          {...getDefaultProps(item.localId, 'folder')}
          placeholder="Folder"
        />
        <Input.Text
          {...getDefaultProps(item.localId, 'location')}
          placeholder="Location"
        />
        <Input.Text
          {...getDefaultProps(item.localId, 'official_url')}
          placeholder="Official URL"
        />
        <Input.Text
          {...getDefaultProps(item.localId, 'description')}
          placeholder="Description"
        />
        <Input.Text
          {...getDefaultProps(item.localId, 'artist')}
          placeholder="Artist"
        />
        <Input.Text
          {...getDefaultProps(item.localId, 'year')}
          placeholder="Year"
        />
        <Input.Text
          {...getDefaultProps(item.localId, 'tags')}
          placeholder="Tags"
        />
        <IconMenu>
          <IconMenuItem onClick={() => handleOnDelete(item.localId)}>
            Delete
          </IconMenuItem>
          <IconMenuItem>{item.id}</IconMenuItem>
        </IconMenu>
        <Input.Checkbox
          id="selected"
          value={getFieldValue(item.localId, 'isSelected')}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange(item.localId, 'isSelected', e)
          }
        />
      </StyledOuterRow>
    </StyledRow>
  );
};

export default ImageItem;

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
