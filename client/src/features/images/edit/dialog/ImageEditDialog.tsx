import type { JSX } from 'react';
import { useEffect, useMemo, useState } from 'react';

import Button from '@components/button/Button';
import Dialog from '@components/dialog/Dialog';
import ClearAdornment from '@components/input/base/adornments/ClearAdornment';
import Input from '@components/input/Input';
import type { Image } from '@site8/shared';
import {
  CheckboxLabel,
  CheckboxRow,
  DeleteButtonGroup,
  FooterButtons,
  Form,
  FormField,
  ImagePreview,
  ImagePreviewContainer,
  Label,
  ScrollableContent,
  Select,
  SuggestButtonRow,
  WarningText,
} from './ImageEditDialog.styles';

type ImageEditDialogProps = {
  readonly availableFolders: readonly string[];
  readonly image: Image | null;
  readonly isDeleting?: boolean;
  readonly isOpen: boolean;
  readonly isSaving?: boolean;
  readonly onClose: () => void;
  readonly onDelete: (image: Image) => void;
  readonly onSave: (
    image: Image,
    targetFolder: string,
    targetFileName: string,
  ) => void;
};

const getFileNameFromSource = (source: string): string => {
  const segments = source.split('/').filter(Boolean);
  return segments.at(-1) ?? '';
};

const getFileExtension = (fileName: string): string => {
  const match = /(\.[^./\\]+)$/.exec(fileName);
  return match?.[1] ?? '';
};

const hasExtensionChanged = (
  originalFileName: string,
  nextFileName: string,
): boolean => {
  return (
    getFileExtension(originalFileName).toLowerCase() !==
    getFileExtension(nextFileName).toLowerCase()
  );
};

const toSuggestedFileName = (
  title: string,
  currentFileName: string,
): string => {
  const baseName = title.trim().toLowerCase().replaceAll(/\s+/g, '_');
  const extension = getFileExtension(currentFileName);
  return `${baseName}${extension}`;
};

const getFolderLabelFromSource = (source: string): string => {
  if (!source.startsWith('/images/')) {
    return 'Root';
  }

  const relativePath = source.replace(/^\/images\//, '');
  const segments = relativePath.split('/').filter(Boolean);
  if (segments.length <= 2) {
    return 'Root';
  }

  const folderParts = segments.slice(1, -1);
  return folderParts
    .map((part) =>
      part
        .split(/[_-]/)
        .filter(Boolean)
        .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
        .join(' '),
    )
    .join(' / ');
};

const ImageEditDialog = ({
  availableFolders,
  image,
  isDeleting = false,
  isOpen,
  isSaving = false,
  onClose,
  onDelete,
  onSave,
}: ImageEditDialogProps): JSX.Element => {
  const currentFolder = useMemo(
    () => (image ? getFolderLabelFromSource(image.src) : 'Root'),
    [image],
  );

  const [targetFolder, setTargetFolder] = useState<string>('');
  const [titleValue, setTitleValue] = useState<string>('');
  const [targetFileName, setTargetFileName] = useState<string>('');
  const [isDeleteConfirmed, setIsDeleteConfirmed] = useState(false);
  const [deleteWarning, setDeleteWarning] = useState<string>('');

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setIsDeleteConfirmed(false);
    setDeleteWarning('');
    setTitleValue(image?.title ?? '');
    setTargetFileName(image ? getFileNameFromSource(image.src) : '');

    if (availableFolders.includes(currentFolder)) {
      setTargetFolder(currentFolder);
      return;
    }

    setTargetFolder(availableFolders[0] ?? '');
  }, [availableFolders, currentFolder, isOpen]);

  const isWorking = isSaving || isDeleting;
  const canDelete = Boolean(image) && !isWorking;
  const originalFileName = image ? getFileNameFromSource(image.src) : '';
  const extensionChanged = hasExtensionChanged(
    originalFileName,
    targetFileName,
  );
  const canSave =
    Boolean(image) &&
    Boolean(targetFolder) &&
    Boolean(targetFileName.trim()) &&
    !extensionChanged &&
    !isWorking;

  return (
    <Dialog
      footer={
        <FooterButtons>
          <DeleteButtonGroup>
            <Button
              disabled={!canDelete}
              onClick={() => {
                if (!isDeleteConfirmed) {
                  setDeleteWarning(
                    'Please check "Confirm delete?" before deleting.',
                  );
                  return;
                }

                if (image) {
                  onDelete(image);
                }
              }}
              variant="secondary"
            >
              Delete
            </Button>
          </DeleteButtonGroup>
          <Button
            onClick={onClose}
            variant="secondary"
          >
            Cancel
          </Button>
          <Button
            disabled={!canSave}
            onClick={() => {
              if (extensionChanged) {
                return;
              }

              if (image) {
                onSave(image, targetFolder, targetFileName.trim());
              }
            }}
            variant="primary"
          >
            Save
          </Button>
        </FooterButtons>
      }
      isOpen={isOpen}
      label="Edit Image"
      onOpenChange={onClose}
      size="md"
    >
      <ScrollableContent>
        <Form>
          <ImagePreviewContainer>
            {image ? (
              <ImagePreview
                alt={image.alt}
                loading="lazy"
                src={image.src}
              />
            ) : null}
          </ImagePreviewContainer>

          <FormField>
            <Input.Text
              endAdornment={
                titleValue ? (
                  <ClearAdornment
                    ariaLabel="Clear title"
                    label="Clear title"
                    onClick={() => {
                      setTitleValue('');
                    }}
                  />
                ) : null
              }
              id="image-edit-title"
              label="Title"
              readOnly
              value={titleValue}
            />
          </FormField>

          <FormField>
            <Input.Text
              disabled
              id="image-edit-src"
              label="Source"
              readOnly
              value={image?.src ?? ''}
            />
          </FormField>

          <FormField>
            <Input.Text
              disabled
              id="image-edit-current-folder"
              label="Current Folder"
              readOnly
              value={currentFolder}
            />
          </FormField>

          <FormField>
            <Input.Text
              endAdornment={
                targetFileName ? (
                  <ClearAdornment
                    ariaLabel="Clear filename"
                    label="Clear filename"
                    onClick={() => {
                      setTargetFileName('');
                    }}
                  />
                ) : null
              }
              id="image-edit-file-name"
              label="New Filename"
              onChange={(event) => {
                setTargetFileName(event.target.value);
              }}
              value={targetFileName}
            />
            <SuggestButtonRow>
              <Button
                onClick={() => {
                  const currentFileName = image
                    ? getFileNameFromSource(image.src)
                    : targetFileName;
                  setTargetFileName(
                    toSuggestedFileName(titleValue, currentFileName),
                  );
                }}
                size="xs"
                variant="secondary"
              >
                Suggest
              </Button>
            </SuggestButtonRow>
            {extensionChanged ? (
              <WarningText>File extension cannot be changed</WarningText>
            ) : null}
          </FormField>

          <FormField>
            <Label htmlFor="image-edit-target-folder">Target Folder</Label>
            <Select
              id="image-edit-target-folder"
              onChange={(event) => {
                setTargetFolder(event.target.value);
              }}
              value={targetFolder}
            >
              {availableFolders.map((folder) => (
                <option
                  key={folder}
                  value={folder}
                >
                  {folder}
                </option>
              ))}
            </Select>
          </FormField>

          <FormField>
            <CheckboxRow>
              <CheckboxLabel htmlFor="image-delete-confirm">
                <input
                  checked={isDeleteConfirmed}
                  id="image-delete-confirm"
                  onChange={(event) => {
                    setIsDeleteConfirmed(event.target.checked);
                    setDeleteWarning('');
                  }}
                  type="checkbox"
                />
                Confirm delete?
              </CheckboxLabel>
            </CheckboxRow>
            {deleteWarning ? <WarningText>{deleteWarning}</WarningText> : null}
          </FormField>
        </Form>
      </ScrollableContent>
    </Dialog>
  );
};

export default ImageEditDialog;
