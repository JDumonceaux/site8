const decodeFileUrl = (url: string): string => {
  const pathname = decodeURIComponent(new URL(url).pathname);
  if (process.platform === 'win32' && pathname.startsWith('/')) {
    return pathname.slice(1);
  }
  return pathname;
};

const joinPath = (...parts: string[]): string =>
  parts
    .map((p) => p.replaceAll('\\', '/'))
    .join('/')
    .replaceAll(/\/+/g, '/');

const computeAppRootAbsolute = (): string => {
  const currentPath = decodeFileUrl(import.meta.url);
  const serverDirName = 'server';
  const index = currentPath.indexOf(serverDirName);
  if (index === -1) {
    throw new Error(
      `Directory "${serverDirName}" not found in path: ${currentPath}`,
    );
  }
  return currentPath.slice(0, Math.max(0, index));
};

const appRootAbsolute: string = computeAppRootAbsolute();

const FilePath = {
  getAppRoot: (): string => appRootAbsolute,

  getAppRootAbsolute: (): string => appRootAbsolute,

  getDataDir: (fileName: string): string =>
    joinPath(FilePath.getDataDirAbsolute(), fileName),

  getDataDirAbsolute: (): string => joinPath(appRootAbsolute, 'server', 'data'),

  getImageDirAbsolute: (): string =>
    joinPath(appRootAbsolute, 'client', 'public', 'images'),

  getPagesDir: (fileName: string): string =>
    joinPath(FilePath.getDataDirAbsolute(), 'pages', fileName),

  getServerRoot: (): string => joinPath(appRootAbsolute, 'server'),
};

export default FilePath;
