{
    "parser": "espree",
    "parserOptions": {
        "ecmaVersion": 2020, // Set to your desired ECMAScript version (e.g., 2021, 2022)
        "sourceType": "module", // For modern module syntax
        "ecmaFeatures": {
            "arrowFunction": true, // Enable arrow functions
            "destructuringBinding": true, // Enable destructuring assignment
            "modules": true, // Enable modern module syntax
            "spread": true, // Enable spread syntax (...)
            "rest": true, // Enable rest parameters (...rest)
            "optionalCatchBinding": true, // Enable optional catch binding
            "classFields": true, // Enable class fields
        }
    },
    "env": {
        "node": true // Enable Node.js environment globals (if applicable)
    },
    "extends": [
        "eslint:recommended"
    ], // Extends the recommended ESLint rules
    "rules": {
        // Customize rules as needed
    }
}