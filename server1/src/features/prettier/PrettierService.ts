import { Logger } from '../../lib/utils/logger.js';
import * as prettier from 'prettier';

export class PrettierService {
  public async formatCode(code: string, filePath: string) {
    try {
      const options = await prettier.resolveConfig(filePath);
      const formatted = await prettier.format(code, {
        ...options,
        filepath: filePath,
      });

      return formatted;
    } catch (error) {
      Logger.error('Error formatting code:', error);
      return code; // Return the original code if formatting fails
    }
  }
}
