import { FileService } from '../services/FileService.js';

export class ServiceFactory {
  public static getFileService() {
    return new FileService();
  }
}
