import path from 'path';
import { fileURLToPath } from 'url';

class FilePath {
  static getAppRoot() {
    return path.dirname('/src/server.ts');
  }

  static getAppRootAbsolute() {
    const currPath = fileURLToPath(import.meta.url);
    const iPos = currPath.indexOf('server1');
    return currPath.substring(0, iPos);
  }

  static getImageDirAbsolute() {
    return path.join(this.getAppRootAbsolute(), 'client', 'public', 'images');
  }

  static getDataDirAbsolute() {
    return path.join(this.getAppRootAbsolute(), 'server1', 'data');
  }

  static getDataDir(fileName: string) {
    return path.join(this.getDataDirAbsolute(), fileName);
  }

  static getClientRoot() {
    return path.join(this.getAppRootAbsolute(), 'client');
  }

  static getServerRoot() {
    return path.join(this.getAppRootAbsolute(), 'server1');
  }

  static getClientSrc() {
    return path.join(this.getAppRootAbsolute(), 'client', 'src');
  }

  static getServerSrc() {
    return path.join(this.getAppRootAbsolute(), 'server1', 'src');
  }

  static getClientTypes() {
    return path.join(this.getAppRootAbsolute(), 'client', 'src', 'types');
  }

  static getServerTypes() {
    return path.join(this.getAppRootAbsolute(), 'server1', 'src', 'types');
  }

  static getClientFeatures() {
    return path.join(this.getAppRootAbsolute(), 'client', 'src', 'features');
  }

  static getServerFeatures() {
    return path.join(this.getAppRootAbsolute(), 'server1', 'src', 'features');
  }
}

export default FilePath;
