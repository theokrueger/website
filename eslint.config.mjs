import js from "@eslint/js";
import css from "@eslint/css";
import tseslint from 'typescript-eslint';
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    plugins: { js, tseslint },
    extends: ["js/recommended", tseslint.configs.recommended],
    languageOptions: { globals: globals.browser },
    rules: {
      "no-unused-vars": "warn",
    },
  },
  {
    files: ["**/*.css"],
    plugins: {
      css,
    },
    language: "css/css",
    rules: {
      "css/no-duplicate-imports": "error",
      "css/no-empty-blocks": "warn",
      "css/no-invalid-at-rules": "error",
      //"css/no-invalid-properties": "error",
      "css/use-baseline": "warn",
    },
  },
]);
