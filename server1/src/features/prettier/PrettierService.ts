import * as prettier from 'prettier';

import { Logger } from '../../lib/utils/logger.js';

export class PrettierService {
  public async formatCode(code: string, filePath: string): Promise<string> {
    try {
      if (!code?.trim()) {
        Logger.warn('PrettierService: Empty code provided');
        return code;
      }

      if (!filePath?.trim()) {
        Logger.warn('PrettierService: Empty file path provided');
        return code;
      }

      const options = await prettier.resolveConfig(filePath);
      const formatted = await prettier.format(code, {
        ...(options ?? {}),
        filepath: filePath,
      });

      Logger.info(`PrettierService: Successfully formatted ${filePath}`);
      return formatted;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      Logger.error(
        `PrettierService: Error formatting code for ${filePath} - ${errorMessage}`,
        { error },
      );
      return code;
    }
  }
}
