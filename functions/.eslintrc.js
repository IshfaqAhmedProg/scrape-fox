module.exports = {
  root: true,
  env: {
    es2019: true,
    node: true,
  },
  extends: ["eslint:recommended", "google"],
  rules: {
    quotes: ["error", "double"],
  },
};
