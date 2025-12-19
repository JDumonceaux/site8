import * as ESLint from 'eslint';

import { Logger } from '../../utils/logger.js';

export class ESLintService {
  public async lintAndFixFiles(
    filePaths: string | string[],
  ): Promise<ESLint.ESLint.LintResult[]> {
    try {
      if (!filePaths || (Array.isArray(filePaths) && filePaths.length === 0)) {
        Logger.warn('ESLintService: No file paths provided');
        return [];
      }

      const eslint = new ESLint.ESLint({
        fix: true,
      });

      const results = await eslint.lintFiles(filePaths);

      const formatter = await eslint.loadFormatter('stylish');
      const resultText = formatter.format(results);

      Logger.info('ESLintService: Lint results', { resultText });

      await ESLint.ESLint.outputFixes(results);

      const fileCount = Array.isArray(filePaths) ? filePaths.length : 1;
      Logger.info(`ESLintService: Successfully linted ${fileCount} file(s)`);

      return results;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      const pathsStr = Array.isArray(filePaths)
        ? filePaths.join(', ')
        : filePaths;
      Logger.error(
        `ESLintService: Error linting files [${pathsStr}] - ${errorMessage}`,
        error,
      );
      throw error;
    }
  }
}
