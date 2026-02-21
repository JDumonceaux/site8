export type FormValidationResult = {
  readonly fileNameMessages?: {
    readonly warning?: string;
  };
  readonly hasValidationErrors: boolean;
  readonly isValid: boolean;
};

export type ParsedImagePaste = {
  readonly description?: string;
  readonly title?: string;
};

const parseInlineField = (
  lineValue: string,
  fieldName: 'description' | 'title',
): string | undefined => {
  const normalizedLine = lineValue.trim();
  const prefix = `${fieldName}:`;

  if (!normalizedLine.toLowerCase().startsWith(prefix)) {
    return undefined;
  }

  const parsedValue = normalizedLine.slice(prefix.length).trim();
  return parsedValue || undefined;
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
  if (!source.startsWith('/images/')) {
    return 'Root';
  }

  const relativePath = source.replace(/^\/images\//, '');
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
  targetFolder,
}: {
  readonly hasImage: boolean;
  readonly isWorking: boolean;
  readonly originalFileName: string;
  readonly targetFileName: string;
  readonly targetFolder: string;
}): FormValidationResult => {
  const hasTargetFileName = Boolean(targetFileName.trim());
  const extensionChanged =
    hasTargetFileName && hasExtensionChanged(originalFileName, targetFileName);
  const fileNameMessages = extensionChanged
    ? EXTENSION_WARNING_MESSAGES
    : undefined;

  const isValid =
    hasImage && Boolean(targetFolder) && !extensionChanged && !isWorking;
  const hasValidationErrors =
    !hasImage || !Boolean(targetFolder) || extensionChanged;

  return {
    ...(fileNameMessages ? { fileNameMessages } : {}),
    hasValidationErrors,
    isValid,
  };
};

export const parseImagePaste = (value: string): ParsedImagePaste => {
  const lines = value.replaceAll('\r\n', '\n').split('\n');
  const titleLines: string[] = [];
  const descriptionLines: string[] = [];
  let section: 'description' | 'title' | null = null;

  for (const line of lines) {
    const trimmed = line.trim();

    const inlineTitle = parseInlineField(trimmed, 'title');
    if (inlineTitle) {
      titleLines.push(inlineTitle);
      section = null;
      continue;
    }

    const inlineDescription = parseInlineField(trimmed, 'description');
    if (inlineDescription) {
      descriptionLines.push(inlineDescription);
      section = null;
      continue;
    }

    if (/^title\s*:?$/i.test(trimmed)) {
      section = 'title';
      continue;
    }

    if (/^description\s*:?$/i.test(trimmed)) {
      section = 'description';
      continue;
    }

    if (section === 'title') {
      if (trimmed) {
        titleLines.push(trimmed);
      }
      continue;
    }

    if (section === 'description') {
      descriptionLines.push(line.trimEnd());
    }
  }

  const title = titleLines.join(' ').trim();
  const description = descriptionLines.join('\n').trim();

  return {
    ...(description ? { description } : {}),
    ...(title ? { title } : {}),
  };
};
