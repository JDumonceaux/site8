/**
 * npm-package-json-lint configuration
 *
 * npm-package-json-lint is a tool to lint package.json files across the monorepo.
 * It is NOT an ESLint plugin but a separate linting tool that integrates into the
 * overall linting workflow.
 *
 * Configuration: .npmpackagejsonlintrc.json
 *
 * Commands:
 *   npm run lint:package-json       - Check all package.json files
 *   npm run lint:package-json:fix   - Auto-fix package.json issues
 *   npm run lint                     - Run all linting (includes package.json check)
 *   npm run lint:fix                 - Fix all issues (includes package.json fixes)
 *
 * For more info, see: https://npmpackagejsonlint.org/
 */

export default [];
