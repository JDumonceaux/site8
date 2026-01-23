/** @type {import("prettier").Options} */
export default {
  // ----------------------------------------------------------------------------
  // Brackets & Parentheses
  // ----------------------------------------------------------------------------
  arrowParens: 'always',               // Always include parentheses around arrow function parameters
  bracketSameLine: false,              // Place the closing bracket of multi-line JSX elements on new line (React best practice)
  bracketSpacing: true,                // Print spaces between brackets in object literals
  // ----------------------------------------------------------------------------
  // Embedded Languages
  // ----------------------------------------------------------------------------
  embeddedLanguageFormatting: 'auto',  // Format embedded code (e.g., CSS in HTML) automatically
  // ----------------------------------------------------------------------------
  // Line Endings
  // ----------------------------------------------------------------------------
  endOfLine: 'lf',                     // Use LF line endings for consistency across platforms
  // ----------------------------------------------------------------------------
  // Experimental Features
  // ----------------------------------------------------------------------------
  experimentalTernaries: false,        // Disable experimental ternary formatting (opt-in when stable)
  // ----------------------------------------------------------------------------
  // JSX & HTML
  // ----------------------------------------------------------------------------
  htmlWhitespaceSensitivity: 'css',    // Respect CSS display property for HTML whitespace sensitivity
  jsxSingleQuote: false,               // Use double quotes in JSX attributes (React convention)
  // ----------------------------------------------------------------------------
  // File-Specific Overrides
  // ----------------------------------------------------------------------------
  overrides: [
    {
      // Ensure consistent formatting for JavaScript module config files
      files: '*.mjs',
      options: {
        semi: true,
        singleQuote: true,
        trailingComma: 'all',
      },
    },
    {
      files: '*.json',
      options: {
        printWidth: 120,               // Allow longer lines in JSON files
        trailingComma: 'none',         // No trailing commas in JSON (not valid JSON)
      },
    },
    {
      files: '*.md',
      options: {
        printWidth: 100,               // Wider lines for markdown
        proseWrap: 'always',           // Wrap markdown at printWidth
      },
    },
    {
      files: '*.yml',
      options: {
        singleQuote: false,            // Use double quotes in YAML
      },
    },
    {
      files: '*.css',
      options: {
        singleQuote: false,            // Use double quotes in CSS
      },
    },
  ],
  // ----------------------------------------------------------------------------
  // Line Length & Wrapping
  // ----------------------------------------------------------------------------
  printWidth: 80,                      // Wrap lines at 80 characters
  proseWrap: 'preserve',               // Do not reformat markdown text automatically
  quoteProps: 'as-needed',             // Only quote object keys when required
  // ----------------------------------------------------------------------------
  // Quotes & Punctuation
  // ----------------------------------------------------------------------------
  semi: true,                          // Add semicolons at the end of statements
  singleAttributePerLine: true,        // Force one attribute per line in JSX/HTML for better readability
  singleQuote: true,                   // Use single quotes instead of double quotes
  // ----------------------------------------------------------------------------
  // Indentation & Spacing
  // ----------------------------------------------------------------------------
  tabWidth: 2,                         // Set the number of spaces per indentation level
  trailingComma: 'all',                // Use trailing commas wherever possible (ES5+)
  useTabs: false,                      // Use spaces instead of tabs for indentation

  // ----------------------------------------------------------------------------
  // Vue-Specific (if applicable)
  // ----------------------------------------------------------------------------
  vueIndentScriptAndStyle: false,      // Do not indent <script> and <style> tags in Vue files
};
