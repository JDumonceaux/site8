import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,

  {
    
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: { globals: globals.browser },
    rules: { 
      'no-unused-vars':        'off' ,
  
      '@typescript-esling/no-unused-vars': 
      [ 'error', { "argsIgnorePattern": "^_" } ],
  

    }
  
  },
 
 
];