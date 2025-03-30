/** @type {import("prettier").Options} */
export default {
  // Additional options for further consistency:
  arrowParens: 'always',               // Always include parentheses around arrow function parameters
  bracketSameLine: true,               // Place the closing bracket of multi-line JSX elements on the same line
  bracketSpacing: true,                // Print spaces between brackets in object literals
  embeddedLanguageFormatting: 'auto',  // Format embedded code (e.g., CSS in HTML) automatically
  endOfLine: 'auto',                   // Maintain existing line endings
  htmlWhitespaceSensitivity: 'css',    // Respect CSS display property for HTML whitespace sensitivity
  printWidth: 80,                      // Wrap lines at 80 characters
  proseWrap: 'preserve',               // Do not reformat markdown text automatically
  quoteProps: 'as-needed',             // Only quote object keys when required

  // Basic formatting rules
  semi: true,                          // Add semicolons at the end of statements
  singleAttributePerLine: false,       // Allow multiple attributes per line in JSX
  singleQuote: true,                   // Use single quotes instead of double quotes
  tabWidth: 2,                         // Set the number of spaces per indentation level
  trailingComma: 'all',                // Use trailing commas wherever possible (multiline objects/arrays)
};
