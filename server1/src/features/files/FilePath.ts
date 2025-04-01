import path from 'path';
import { fileURLToPath } from 'url';

class FilePath {
  private static readonly appRootAbsolute: string =
    FilePath.computeAppRootAbsolute();

  private static computeAppRootAbsolute(): string {
    const currPath = fileURLToPath(import.meta.url);
    const serverDirName = 'server1';
    const index = currPath.indexOf(serverDirName);
    if (index === -1) {
      throw new Error(
        `Directory "${serverDirName}" not found in path: ${currPath}`,
      );
    }
    return currPath.substring(0, index);
  }

  public static getAppRoot(): string {
    return this.appRootAbsolute;
  }

  public static getAppRootAbsolute(): string {
    return this.appRootAbsolute;
  }

  public static getImageDirAbsolute(): string {
    return path.join(this.appRootAbsolute, 'client', 'public', 'images');
  }

  public static getDataDirAbsolute(): string {
    return path.join(this.appRootAbsolute, 'server1', 'data');
  }

  public static getDataDir(fileName: string): string {
    return path.join(this.getDataDirAbsolute(), fileName);
  }

  public static getClientRoot(): string {
    return path.join(this.appRootAbsolute, 'client');
  }

  public static getServerRoot(): string {
    return path.join(this.appRootAbsolute, 'server1');
  }

  public static getClientSrc(): string {
    return path.join(this.appRootAbsolute, 'client', 'src');
  }

  public static getServerSrc(): string {
    return path.join(this.appRootAbsolute, 'server1', 'src');
  }

  public static getClientTypes(): string {
    return path.join(this.appRootAbsolute, 'client', 'src', 'types');
  }

  public static getServerTypes(): string {
    return path.join(this.appRootAbsolute, 'server1', 'src', 'types');
  }

  public static getClientFeatures(): string {
    return path.join(this.appRootAbsolute, 'client', 'src', 'features');
  }

  public static getServerFeatures(): string {
    return path.join(this.appRootAbsolute, 'server1', 'src', 'features');
  }
}

export default FilePath;
