/**
 * @type {import('@types/eslint').Linter.BaseConfig}
 */
module.exports = {
  root: true,
  plugins: ["@typescript-eslint", "import"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["./tsconfig.json"],
  },
  extends: [
    "eslint:recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  env: {
    node: true,
    es6: true,
  },
  ignorePatterns: [
    "node_modules",
    ".eslintrc.cjs",
    "build.js",
    "dist",
    "templates",
  ],
  settings: {
    "import/extensions": [".ts", ".js", ".tsx"],
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".js", ".tsx"],
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
        project: "./tsconfig.json",
      },
    },
  },
  rules: {
    "no-console": "warn",
    "arrow-body-style": ["warn", "as-needed"],
    // React
    "react/prop-types": "off",
    "react/no-unescaped-entities": "off",
    // @typescript-eslint
    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/sort-type-union-intersection-members": "off",
    "@typescript-eslint/no-namespace": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-unsafe-argument": "off",
    // //import
    "import/no-default-export": "error",
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "internal"],
        pathGroups: [
          {
            pattern: "react",
            group: "external",
            position: "before",
          },
          {
            pattern: "@api/**",
            group: "internal",
            position: "before",
          },
          {
            pattern: "@modules/**",
            group: "internal",
            position: "before",
          },
          {
            pattern: "@plugins/**",
            group: "internal",
            position: "before",
          },
          {
            pattern: "@utils/**",
            group: "internal",
            position: "before",
          },
        ],
        pathGroupsExcludedImportTypes: ["react"],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
  },
  overrides: [
    {
      files: [
        "./src/modules/**/*.ts",
        "./src/internal/**/api/*.ts",
        "./src/screens/**/*.tsx",
      ],
      rules: {
        "import/no-default-export": "off",
        "import/prefer-default-export": "error",
      },
    },
  ],
};
