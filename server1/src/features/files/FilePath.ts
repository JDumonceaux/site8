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

  getClientFeatures: (): string =>
    joinPath(appRootAbsolute, 'client', 'src', '@features'),

  getClientRoot: (): string => joinPath(appRootAbsolute, 'client'),

  getClientSrc: (): string => joinPath(appRootAbsolute, 'client', 'src'),

  getClientTypes: (): string =>
    joinPath(appRootAbsolute, 'client', 'src', 'types'),

  getDataDir: (fileName: string): string =>
    joinPath(FilePath.getDataDirAbsolute(), fileName),

  getDataDirAbsolute: (): string =>
    joinPath(appRootAbsolute, 'server1', 'data'),

  getImageDirAbsolute: (): string =>
    joinPath(appRootAbsolute, 'client', 'public', 'images'),

  getServerFeatures: (): string =>
    joinPath(appRootAbsolute, 'server1', 'src', '@features'),

  getServerRoot: (): string => joinPath(appRootAbsolute, 'server1'),

  getServerSrc: (): string => joinPath(appRootAbsolute, 'server1', 'src'),

  getServerTypes: (): string =>
    joinPath(appRootAbsolute, 'server1', 'src', 'types'),
};

export default FilePath;
