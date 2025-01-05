import { Logger } from '../../lib/utils/logger.js';
import * as ESLint from 'eslint';

export class ESLintService {
  public async lintAndFixFiles(filePaths: string | string[]) {
    try {
      // 1. Create an ESLint instance
      const eslint = new ESLint.ESLint({
        fix: true, // Enable auto-fixing
      });

      // 2. Lint files
      const results = await eslint.lintFiles(filePaths);

      // 3. Format the results
      const formatter = await eslint.loadFormatter('stylish');
      const resultText = formatter.format(results);

      // 4. Output results
      console.log(resultText);

      // 5. Apply fixes if any
      // await ESLint.outputFixes(results);
    } catch (error) {
      Logger.error('Error during linting:', error);
    }
  }
}
