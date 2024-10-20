import path from 'path';
import { fileURLToPath } from 'url';

export const getAppRoot = () => path.dirname('/src/server.ts');

export const getAppRootAbsolute = () => {
  const currPath = fileURLToPath(import.meta.url);
  const iPos = currPath.indexOf('server1');
  return currPath.substring(0, iPos);
};

export const getImageDirAbsolute = () =>
  path.join(getAppRootAbsolute(), 'client', 'public', 'images');

export const getDataDirAbsolute = () =>
  path.join(getAppRootAbsolute(), 'server1', 'data');

export const getDataDir = (fileName: string) =>
  path.join(getDataDirAbsolute(), fileName);
