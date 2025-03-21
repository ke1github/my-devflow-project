import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import pluginReact from "eslint-plugin-react";
import tailwindcss from "eslint-plugin-tailwindcss";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    plugins: {
      js,
      "@typescript-eslint": tseslint,
      react: pluginReact,
      tailwindcss,
    },
    extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:react/recommended",
      "plugin:react/jsx-runtime",
      "plugin:tailwindcss/recommended",
      "next/core-web-vitals",
      "next/typescript",
      "prettier",
    ],
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "no-undef": "off",
    },
  },
]);
