import type { JSX } from 'react';
import { useMemo, useRef, useState } from 'react';

import Button from '@components/button/Button';
import Dialog from '@components/dialog/Dialog';
import ClearAdornment from '@components/input/base/adornments/ClearAdornment';
import Input from '@components/input/Input';
import type { Image } from '@site8/shared';
import useIdentifyImage from '../../useIdentifyImage';
import {
  getFileNameFromSource,
  getFolderLabelFromSource,
  parseImagePaste,
  toSuggestedFileName,
  validateEditForm,
} from './image-edit-dialog.utils';
import {
  DeleteButtonGroup,
  FooterButtons,
  FooterMessageArea,
  FooterSection,
  Form,
  FormField,
  IdentifyStatusSection,
  ImagePreview,
  ImagePreviewContainer,
  ScrollableContent,
  SuggestAdornmentButton,
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
    description: string,
  ) => void;
};

const DELETE_CONFIRM_FIELD = 'confirmDelete';
const DELETE_CONFIRM_LINE = 'image-edit';

type IdentifyStatus = 'error' | 'idle' | 'returned' | 'sent';

const getImageDescription = (image: Image | null): string => {
  if (!image) {
    return '';
  }

  const { description } = image as Record<string, unknown>;
  return typeof description === 'string' ? description : '';
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

  const [targetFolderInput, setTargetFolderInput] = useState<null | string>(
    null,
  );
  const [pasteInput, setPasteInput] = useState('');
  const [titleValueInput, setTitleValueInput] = useState<null | string>(null);
  const [descriptionInput, setDescriptionInput] = useState<null | string>(null);
  const [targetFileNameInput, setTargetFileNameInput] = useState<null | string>(
    null,
  );
  const [identifyStatus, setIdentifyStatus] = useState<IdentifyStatus>('idle');
  const [identifyStatusMessage, setIdentifyStatusMessage] = useState('');
  const [isDeleteConfirmed, setIsDeleteConfirmed] = useState(false);
  const [deleteWarning, setDeleteWarning] = useState<string>('');
  const confirmDeleteFieldRef = useRef<HTMLDivElement>(null);
  const { identifyImage, isPending: isIdentifying } = useIdentifyImage();

  const selectableFolders = availableFolders.includes(currentFolder)
    ? availableFolders
    : [currentFolder, ...availableFolders];
  const targetFolderOptions = selectableFolders.map((folder) => ({
    key: folder,
    value: folder,
  }));
  const defaultTargetFolder = currentFolder;
  const targetFolder = targetFolderInput ?? defaultTargetFolder;
  const titleValue = titleValueInput ?? image?.title ?? '';
  const imageDescription = getImageDescription(image);
  const descriptionValue = descriptionInput ?? imageDescription;
  const originalFileName = image ? getFileNameFromSource(image.src) : '';
  const targetFileName = targetFileNameInput ?? originalFileName;

  const resetLocalState = (): void => {
    setTargetFolderInput(null);
    setPasteInput('');
    setTitleValueInput(null);
    setDescriptionInput(null);
    setTargetFileNameInput(null);
    setIdentifyStatus('idle');
    setIdentifyStatusMessage('');
    setIsDeleteConfirmed(false);
    setDeleteWarning('');
  };

  const isWorking = isSaving || isDeleting;
  const canDelete = Boolean(image) && !isWorking;
  const validation = validateEditForm({
    hasImage: Boolean(image),
    isWorking,
    originalFileName,
    targetFileName,
    targetFolder,
  });
  const canSave = validation.isValid;
  const identifyStatusTone =
    identifyStatus === 'error'
      ? 'error'
      : identifyStatus === 'returned'
        ? 'success'
        : 'info';
  const showIdentifyStatus = identifyStatus !== 'idle';

  return (
    <Dialog
      footer={
        <FooterSection>
          <FooterMessageArea aria-live="polite">
            {validation.hasValidationErrors ? 'Please correct errors' : null}
          </FooterMessageArea>
          {showIdentifyStatus ? (
            <IdentifyStatusSection
              $tone={identifyStatusTone}
              aria-live="polite"
            >
              {identifyStatusMessage}
            </IdentifyStatusSection>
          ) : null}
          <FooterButtons>
            <DeleteButtonGroup>
              <Button
                disabled={!canDelete}
                onClick={() => {
                  if (!isDeleteConfirmed) {
                    setDeleteWarning(
                      'Please check "Confirm delete?" before deleting.',
                    );
                    requestAnimationFrame(() => {
                      confirmDeleteFieldRef.current?.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center',
                      });

                      const checkbox = document.querySelector(
                        '#image-delete-confirm',
                      );

                      if (checkbox instanceof HTMLInputElement) {
                        checkbox.focus();
                      }
                    });
                    return;
                  }

                  if (image) {
                    resetLocalState();
                    onDelete(image);
                  }
                }}
                variant="ghost"
              >
                Delete
              </Button>
            </DeleteButtonGroup>
            <Button
              disabled={!image || isWorking || isIdentifying}
              onClick={() => {
                if (!image) {
                  return;
                }

                setIdentifyStatus('sent');
                setIdentifyStatusMessage('Identify request sent...');

                void (async (): Promise<void> => {
                  try {
                    const result = await identifyImage({ src: image.src });
                    const parsed = parseImagePaste(result.result);

                    const identifiedTitle = result.title ?? parsed.title;
                    const identifiedDescription =
                      result.description ?? parsed.description;

                    if (identifiedTitle) {
                      setTitleValueInput(identifiedTitle);
                    }

                    if (identifiedDescription) {
                      setDescriptionInput(identifiedDescription);
                    }

                    setIdentifyStatus('returned');
                    setIdentifyStatusMessage(result.result);
                  } catch (error) {
                    const errorMessage =
                      error instanceof Error ? error.message : String(error);
                    const isTimeoutOrAbort = /timeout|abort/i.test(
                      errorMessage,
                    );

                    setIdentifyStatus('error');
                    setIdentifyStatusMessage(
                      isTimeoutOrAbort
                        ? 'Identify request timed out. Please try again.'
                        : `Identify error: ${errorMessage}`,
                    );
                  }
                })();
              }}
              variant="secondary"
            >
              Identify
            </Button>
            <Button
              onClick={() => {
                resetLocalState();
                onClose();
              }}
              variant="secondary"
            >
              Cancel
            </Button>
            <Button
              disabled={!canSave}
              onClick={() => {
                if (!validation.isValid) {
                  return;
                }

                if (image) {
                  const saveFileName =
                    targetFileName.trim() || originalFileName;
                  resetLocalState();
                  onSave(image, targetFolder, saveFileName, descriptionValue);
                }
              }}
              variant="primary"
            >
              Save
            </Button>
          </FooterButtons>
        </FooterSection>
      }
      isOpen={isOpen}
      label="Edit Image"
      onOpenChange={(open) => {
        if (!open) {
          resetLocalState();
          onClose();
        }
      }}
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
            <Input.TextArea
              id="image-edit-paste"
              label="Paste"
              onChange={(event) => {
                const nextPasteInput = event.target.value;
                setPasteInput(nextPasteInput);

                const parsed = parseImagePaste(nextPasteInput);
                if (parsed.title) {
                  setTitleValueInput(parsed.title);
                }

                if (parsed.description) {
                  setDescriptionInput(parsed.description);
                }
              }}
              rows={5}
              value={pasteInput}
            />
          </FormField>

          <FormField>
            <Input.Text
              endAdornment={
                titleValue ? (
                  <ClearAdornment
                    ariaLabel="Clear title"
                    label="Clear title"
                    onClick={() => {
                      setTitleValueInput('');
                    }}
                  />
                ) : null
              }
              id="image-edit-title"
              isRequired
              label="Title"
              readOnly
              value={titleValue}
            />
          </FormField>

          <FormField>
            <Input.TextArea
              id="image-edit-description"
              label="Description"
              onChange={(event) => {
                setDescriptionInput(event.target.value);
              }}
              rows={3}
              value={descriptionValue}
            />
          </FormField>

          <FormField>
            <Input.Text
              disabled
              id="image-edit-src"
              isPathStyle
              label="Source"
              readOnly
              value={image?.src ?? ''}
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
                      setTargetFileNameInput('');
                    }}
                  />
                ) : null
              }
              footerEndAdornment={
                <SuggestAdornmentButton
                  onClick={() => {
                    const currentFileName = image
                      ? getFileNameFromSource(image.src)
                      : targetFileName;
                    setTargetFileNameInput(
                      toSuggestedFileName(titleValue, currentFileName),
                    );
                  }}
                  type="button"
                >
                  Suggest
                </SuggestAdornmentButton>
              }
              id="image-edit-file-name"
              label="New Filename"
              messages={validation.fileNameMessages}
              onChange={(event) => {
                setTargetFileNameInput(event.target.value);
              }}
              value={targetFileName}
            />
          </FormField>

          <FormField>
            <Input.Text
              disabled
              id="image-edit-current-folder"
              isPathStyle
              label="Current Folder"
              readOnly
              value={currentFolder}
            />
          </FormField>

          <FormField>
            <Input.Select
              dataList={targetFolderOptions}
              id="image-edit-target-folder"
              label="Target Folder"
              onChange={(event) => {
                setTargetFolderInput(event.target.value);
              }}
              value={targetFolder}
            />
          </FormField>

          <FormField ref={confirmDeleteFieldRef}>
            <Input.Checkbox
              checked={isDeleteConfirmed}
              fieldName={DELETE_CONFIRM_FIELD}
              id="image-delete-confirm"
              label="Confirm delete?"
              lineId={DELETE_CONFIRM_LINE}
              onChange={(_lineId, _fieldName, event) => {
                setIsDeleteConfirmed(event.target.checked);
                setDeleteWarning('');
              }}
            />
            {deleteWarning ? <WarningText>{deleteWarning}</WarningText> : null}
          </FormField>
        </Form>
      </ScrollableContent>
    </Dialog>
  );
};

export default ImageEditDialog;
