import { IMAGE_BASE } from '@lib/utils/constants';

export type FormValidationResult = {
  readonly fileNameMessages?: {
    readonly warning?: string;
  };
  readonly hasValidationErrors: boolean;
  readonly isValid: boolean;
};

const EXTENSION_WARNING_MESSAGES = {
  warning: 'File extension cannot be changed',
} as const;

const getFileExtension = (fileName: string): string => {
  const match = /\.[^./\\]+$/.exec(fileName);
  return match?.[0] ?? '';
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

export const getFileNameFromSource = (source: string): string => {
  const segments = source.split('/').filter(Boolean);
  return segments.at(-1) ?? '';
};

export const toSuggestedFileName = (
  title: string,
  currentFileName: string,
): string => {
  const baseName = title.trim().toLowerCase().replaceAll(/\s+/g, '_');
  const extension = getFileExtension(currentFileName);
  return `${baseName}${extension}`;
};

export const getFolderLabelFromSource = (source: string): string => {
  if (!source.startsWith(IMAGE_BASE)) {
    return 'Root';
  }

  const relativePath = source.slice(IMAGE_BASE.length + 1);
  const segments = relativePath.split('/').filter(Boolean);
  if (segments.length <= 1) {
    return 'Root';
  }

  return segments.slice(0, -1).join('/');
};

export const validateEditForm = ({
  hasImage,
  isWorking,
  originalFileName,
  targetFileName,
  title,
}: {
  readonly hasImage: boolean;
  readonly isWorking: boolean;
  readonly originalFileName: string;
  readonly targetFileName: string;
  readonly title: string;
}): FormValidationResult => {
  const hasTitle = Boolean(title.trim());
  const hasTargetFileName = Boolean(targetFileName.trim());
  const extensionChanged =
    hasTargetFileName && hasExtensionChanged(originalFileName, targetFileName);
  const fileNameMessages = extensionChanged
    ? EXTENSION_WARNING_MESSAGES
    : undefined;

  const isValid = hasImage && hasTitle && !extensionChanged && !isWorking;
  const hasValidationErrors = !hasImage || !hasTitle || extensionChanged;

  return {
    ...(fileNameMessages ? { fileNameMessages } : {}),
    hasValidationErrors,
    isValid,
  };
};
