module.exports = {
  parser: "@typescript-eslint/parser",
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["standard-with-typescript", "plugin:react/recommended"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json",
  },
  plugins: ["react"],
  rules: {},
  overrides: [
    {
      files: [".eslintrc.js"], // Only targeting this file
      parserOptions: {
        project: undefined, // Remove the project from parserOptions
      },
    },
    {
      files: ["**/*.ts", "**/*.tsx"], // Targeting TypeScript files
      env: {
        node: true,
      },
      parserOptions: {
        sourceType: "module",
      },
    },
  ],
};
