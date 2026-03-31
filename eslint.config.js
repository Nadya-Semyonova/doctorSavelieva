import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginReactRefresh from "eslint-plugin-react-refresh";
import pluginImport from "eslint-plugin-import";
import pluginJsxA11y from "eslint-plugin-jsx-a11y";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  // Игнорируемые файлы/папки (заменяет .eslintignore)
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      "build/**",
      "*.config.js",
      "*.config.ts",
      "scripts/**",
      "**/*.d.ts",
    ],
  },

  // Базовые конфигурации
  js.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,

  // Отключаем правила, которые конфликтуют с Prettier
  eslintConfigPrettier,

  // Основная конфигурация
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },

    plugins: {
      import: pluginImport,
      "jsx-a11y": pluginJsxA11y,
      "react-hooks": pluginReactHooks,
      "react-refresh": pluginReactRefresh,
    },

    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
        typescript: {
          alwaysTryTypes: true,
          project: "./tsconfig.json",
        },
      },
      "import/parsers": {
        "@typescript-eslint/parser": [".ts", ".tsx"],
      },
    },

    rules: {
      // React
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/jsx-uses-react": "off",

      // React Hooks
      ...pluginReactHooks.configs.recommended.rules,

      // React Refresh (для Vite)
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],

      // TypeScript
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn",

      // Import - исправляем ошибки с dependencies
      "import/no-extraneous-dependencies": [
        "error",
        {
          devDependencies: [
            "**/*.test.{js,jsx,ts,tsx}",
            "**/*.spec.{js,jsx,ts,tsx}",
            "**/vite.config.ts",
            "**/eslint.config.js",
            "**/scripts/**/*.{js,ts}",
            "**/vite-env.d.ts",
          ],
          optionalDependencies: false,
          peerDependencies: false,
        },
      ],

      // Отключаем проверку расширений для TypeScript
      "import/extensions": [
        "error",
        "ignorePackages",
        {
          js: "never",
          jsx: "never",
          ts: "never",
          tsx: "never",
        },
      ],

      // Разрешаем импорт из devDependencies для конфигов
      "import/no-unresolved": [
        "error",
        {
          ignore: ["^vite/client$"],
        },
      ],

      // Общие правила
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-debugger": "warn",
    },
  },

  // Специальные правила для скриптов
  {
    files: ["scripts/**/*.js", "scripts/**/*.ts"],
    rules: {
      "no-console": "off", // Разрешаем console в скриптах
      "import/no-extraneous-dependencies": "off",
    },
  },
];
