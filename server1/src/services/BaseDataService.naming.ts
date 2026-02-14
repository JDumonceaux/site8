export const deriveServiceName = (
  filePath: string,
  className: string,
  explicitServiceName?: string,
): string => {
  if (explicitServiceName) {
    return explicitServiceName;
  }

  if (className && className !== 'Object') {
    return className;
  }

  const pathParts = filePath.split(/[\\/]/);
  const fileName = pathParts[pathParts.length - 1] ?? 'DataService';
  return fileName.replace(/\.json$/, '');
};
