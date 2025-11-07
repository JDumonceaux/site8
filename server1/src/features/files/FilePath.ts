const decodeFileUrl = (url: string): string => {
  const pathname = decodeURIComponent(new URL(url).pathname);
  if (process.platform === 'win32' && pathname.startsWith('/')) {
    return pathname.slice(1);
  }
  return pathname;
};

const joinPath = (...parts: string[]): string =>
  parts
    .map((p) => p.replace(/\\/g, '/'))
    .join('/')
    .replace(/\/+/g, '/');

const computeAppRootAbsolute = (): string => {
  const currPath = decodeFileUrl(import.meta.url);
  const serverDirName = 'server1';
  const index = currPath.indexOf(serverDirName);
  if (index === -1) {
    throw new Error(
      `Directory "${serverDirName}" not found in path: ${currPath}`,
    );
  }
  return currPath.substring(0, index);
};

const appRootAbsolute: string = computeAppRootAbsolute();

const FilePath = {
  getAppRoot: (): string => appRootAbsolute,

  getAppRootAbsolute: (): string => appRootAbsolute,

  getImageDirAbsolute: (): string =>
    joinPath(appRootAbsolute, 'client', 'public', 'images'),

  getDataDirAbsolute: (): string =>
    joinPath(appRootAbsolute, 'server1', 'data'),

  getDataDir: (fileName: string): string =>
    joinPath(FilePath.getDataDirAbsolute(), fileName),

  getClientRoot: (): string => joinPath(appRootAbsolute, 'client'),

  getServerRoot: (): string => joinPath(appRootAbsolute, 'server1'),

  getClientSrc: (): string => joinPath(appRootAbsolute, 'client', 'src'),

  getServerSrc: (): string => joinPath(appRootAbsolute, 'server1', 'src'),

  getClientTypes: (): string =>
    joinPath(appRootAbsolute, 'client', 'src', 'types'),

  getServerTypes: (): string =>
    joinPath(appRootAbsolute, 'server1', 'src', 'types'),

  getClientFeatures: (): string =>
    joinPath(appRootAbsolute, 'client', 'src', '@features'),

  getServerFeatures: (): string =>
    joinPath(appRootAbsolute, 'server1', 'src', '@features'),
};

export default FilePath;
