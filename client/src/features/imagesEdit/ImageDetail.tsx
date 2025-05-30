import { memo, useCallback, useMemo } from 'react';

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

const ImageDetail = memo(
  ({
    getFieldValue,
    item,
    names,
    onChange,
    onDelete,
  }: Props): React.JSX.Element => {
    const handleOnDelete = useCallback(() => {
      onDelete(item.lineId);
    }, [item.lineId, onDelete]);

    const getDefaultProps = useCallback(
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

    const getDefaultPropsSelect = useCallback(
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

    // Memoize the props objects to ensure stable references
    const fileNameProps = useMemo(
      () => getDefaultProps(item.lineId, 'fileName'),
      [getDefaultProps, item.lineId],
    );

    const folderProps = useMemo(
      () => getDefaultProps(item.lineId, 'folder'),
      [getDefaultProps, item.lineId],
    );

    const itemIdProps = useMemo(
      () => getDefaultPropsSelect(item.lineId, 'itemId'),
      [getDefaultPropsSelect, item.lineId],
    );

    const memoizedInputSelect = useMemo(
      () => (
        <Input.Select {...itemIdProps} dataList={names} placeholder="Item" />
      ),
      [itemIdProps, names],
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
          {memoizedInputSelect}
          <Input.Text {...fileNameProps} placeholder="File Name" />
          <Input.Text {...folderProps} placeholder="Folder" />
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
  },
);

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
