module.exports = {
    "extends": "airbnb",
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true,
            "modules": true,
            "experimentalObjectRestSpread": true
        }
    },
    "rules": {
        "semi": [2, "never"],
        "react/jsx-filename-extension": ["error", { "extensions": [".js", ".jsx"] }],
        "react/forbid-prop-types": ["error", { "forbid": [] }],
        "react/require-default-props": [0, { "forbidDefaultForRequired": false }],
        "react/destructuring-assignment": "never",
        "no-underscore-dangle": ["error", { "allow": ["_id"] }],
    },
    "globals": {
        "localStorage": true,
        "fetch": true
    },
    "env": {
        "browser": true,
        "node": true,
        "jasmine": true
    },
};