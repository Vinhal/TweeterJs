module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  rules: {
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "semi": [2, "never"],
    "react/forbid-prop-types": ["error", { "forbid": [] }],
    "react/require-default-props": [0, { "forbidDefaultForRequired": false }],
    "react/destructuring-assignment": "never",
    "no-underscore-dangle": ["error", { "allow": ["_id"] }],
  }
}