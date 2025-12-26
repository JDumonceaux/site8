/** @type {import("prettier").Options} */
export default {
  // Additional options for further consistency:
  arrowParens: 'always',               // Include parentheses around a sole arrow function parameter
  bracketSameLine: false,              // Place the closing bracket of multi-line JSX elements on new line
  bracketSpacing: true,                // Print spaces between brackets in object literals
  embeddedLanguageFormatting: 'auto',  // Format embedded code (e.g., CSS in HTML) automatically
  endOfLine: 'lf',                     // Use LF for consistent line endings
  htmlWhitespaceSensitivity: 'css',    // Respect CSS display property for HTML whitespace sensitivity
  printWidth: 80,                      // Wrap lines at 80 characters (soft limit, not strictly enforced)
  proseWrap: 'preserve',               // Do not reformat Markdown files automatically
  quoteProps: 'as-needed',             // Only quote object keys when required

  // Basic formatting rules
  semi: true,                          // Add semicolons at the end of statements
  singleAttributePerLine: true,        // Force one attribute per line in JSX/HTML for better readability
  singleQuote: true,                   // Use single quotes instead of double quotes
  tabWidth: 2,                         // Set the number of spaces per indentation level
  trailingComma: 'all',                // Use trailing commas wherever possible (multiline objects, arrays, and function parameters if supported)
  useTabs: false,                      // Use spaces instead of tabs for indentation

  // JSX & HTML
  jsxSingleQuote: false,               // Use double quotes in JSX attributes for consistency with HTML

  // Experimental Features
  experimentalTernaries: false,        // Disable experimental ternary formatting (opt-in when stable)

  // Vue-Specific
  vueIndentScriptAndStyle: false,      // Do not indent `<script>` and `<style>` tags in Vue files
};
