module.exports = {
  root: true,

  env: {
    node: true
  },

  extends: [
    "plugin:vue/essential",
    "eslint:recommended",
    "plugin:prettier/recommended",
    "@vue/typescript"
  ],

  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: {
    parser: "@typescript-eslint/parser"
  },

  rules: {
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "vue/multi-word-component-names": [
      "error",
      {
        ignores: ["Map", "Layer", "Portal"]
      }
    ]
  }
};
