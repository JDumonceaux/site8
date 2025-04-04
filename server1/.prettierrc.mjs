/** @type {import("prettier").Options} */
export default {
  // Additional options for further consistency:
  arrowParens: 'always',               // Include parentheses around a sole arrow function parameter
  bracketSameLine: true,               // Place the closing bracket of multi-line JSX elements (JSX only) on the same line
  bracketSpacing: true,                // Print spaces between brackets in object literals
  embeddedLanguageFormatting: 'auto',  // Format embedded code (e.g., CSS in HTML) automatically
  endOfLine: 'lf',                     // Use LF for consistent line endings
  htmlWhitespaceSensitivity: 'css',    // Respect CSS display property for HTML whitespace sensitivity
  printWidth: 80,                      // Wrap lines at 80 characters (soft limit, not strictly enforced)
  proseWrap: 'preserve',               // Do not reformat Markdown files automatically
  quoteProps: 'as-needed',             // Only quote object keys when required

  // Basic formatting rules
  semi: true,                          // Add semicolons at the end of statements
  singleAttributePerLine: false,       // (JSX/HTML) Allow multiple attributes per line
  singleQuote: true,                   // Use single quotes instead of double quotes
  tabWidth: 2,                         // Set the number of spaces per indentation level
  trailingComma: 'all',                // Use trailing commas wherever possible (multiline objects, arrays, and function parameters if supported)

  // Suggested additions:
  jsxSingleQuote: false,               // Use double quotes in JSX attributes for consistency with HTML
  rangeStart: 0,                       // Format code starting from the beginning of the file
  rangeEnd: Infinity,                  // Format code until the end of the file
  requirePragma: false,                // Do not require a special comment (pragma) to format files
  insertPragma: false,                 // Do not insert a special comment (pragma) at the top of formatted files
  vueIndentScriptAndStyle: false,      // Do not indent `<script>` and `<style>` tags in Vue files
  plugins: [],                         // Specify additional plugins if needed (e.g., for custom languages or frameworks)
};
