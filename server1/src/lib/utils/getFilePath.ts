import path from 'path';
import { fileURLToPath } from 'url';

// import.meta.dirname  // Absolute path to the current file
// import.meta.url      // Absolute URL to the current file
// import.meta.filename // Filename of the current file

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// export const getFilePath = (fileName: string) =>
//   path.resolve(__dirname, `../../../data/${fileName}`);

export const getAppRoot = () => path.dirname(`/src/server.ts`);
export const getAppRootAbsolute = () => {
  // Absolute path to the current file (compiled version - dist)
  // \\server1\\dist\\lib\\utils\\getFilePath.js
  const currPath = fileURLToPath(import.meta.url);
  // Remove excess path
  const iPos = currPath.indexOf('server1');
  return currPath.substring(0, iPos);
};
export const getImageDirAbsolute = () => {
  return getAppRootAbsolute() + 'clien\\public\\images';
};
//   fileURLToPath(`../../$(getRoot()/client/public/images`);
// export const getFileName = () => __filename;
// export const getDirName = () => __dirname;
