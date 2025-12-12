import path from "node:path";
import { fileURLToPath } from "node:url";

import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import poupeTailwindcss from "@poupe/eslint-plugin-tailwindcss";
import tsParser from "@typescript-eslint/parser";
import betterTailwindcss from "eslint-plugin-better-tailwindcss";
import destructuringNewline from "eslint-plugin-destructuring-newline";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import sortDestructureKeys from "eslint-plugin-sort-destructure-keys";
import sortKeysFix from "eslint-plugin-sort-keys-fix";
import typeScriptSortKeysFix from "eslint-plugin-typescript-sort-keys";
import globals from "globals";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
    allConfig: js.configs.all,
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
});

export default [
    {
        ignores: [
            "dist/**/*",
            "build/**/*",
            "node_modules/**/*",
            "coverage/**/*",
            "public/**/*",
            ".vite/**/*",
        ],
    },
    ...compat["extends"](
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "airbnb",
        "airbnb/hooks",
    ), {
        languageOptions: {
            ecmaVersion: 2020,
            globals: { ...globals.browser },
            parser: tsParser,
            parserOptions: {
                ecmaFeatures: { jsx: true },
            },
            sourceType: "module",
        },
        plugins: {
            "better-tailwindcss": betterTailwindcss,
            "destructuring-newline": destructuringNewline,
            "simple-import-sort": simpleImportSort,
            "sort-destructure-keys": sortDestructureKeys,
            "sort-keys-fix": sortKeysFix,
            tailwindcss: poupeTailwindcss,
            "typescript-sort-keys": typeScriptSortKeysFix,
        },
        rules: {
            "array-callback-return": "off",
            "arrow-body-style": ["error", "as-needed"],
            "better-tailwindcss/enforce-shorthand-classes": "error",
            "better-tailwindcss/no-conflicting-classes": "error",
            "better-tailwindcss/no-duplicate-classes": "error",
            "better-tailwindcss/sort-classes": "error",
            camelcase: ["error", {
                ignoreDestructuring: true,
                ignoreGlobals: false,
                ignoreImports: true,
                properties: "always",
            }],
            "capitalized-comments": ["error"],
            complexity: ["error", 30],
            "consistent-return": "off",
            curly: ["error", "multi-or-nest"],
            "default-case": "off",
            "default-param-last": 0,
            "destructuring-newline/object-property-newline": 2,
            "dot-location": ["error", "object"],
            "dot-notation": ["error", { allowKeywords: false }],
            eqeqeq: "error",
            "func-style": ["error", "expression", { allowArrowFunctions: true }],
            "function-call-argument-newline": ["error", "always"],
            "import/extensions": ["error", "ignorePackages", {
                "": "never",
                js: "never",
                jsx: "never",
                ts: "never",
                tsx: "never",
            }],
            "import/no-cycle": 0,
            "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
            "import/no-named-as-default": 0,
            "import/no-named-as-default-member": 0,
            "import/no-unresolved": 0,
            "import/prefer-default-export": 0,
            indent: ["error", 4],
            "jsx-a11y/anchor-is-valid": "off",
            "jsx-a11y/click-events-have-key-events": "off",
            "jsx-a11y/html-has-lang": "off",
            "jsx-a11y/label-has-associated-control": "off",
            "jsx-a11y/media-has-caption": "off",
            "jsx-a11y/no-static-element-interactions": "off",
            "jsx-a11y/tabindex-no-positive": "off",
            "linebreak-style": "off",
            "max-depth": ["error", 4],
            "max-len": "off",
            "max-lines": ["error", {
                max: 600,
                skipBlankLines: true,
                skipComments: true,
            }],
            "max-lines-per-function": "off",
            "max-nested-callbacks": ["error", 10],
            "max-params": ["error", 18],
            "multiline-comment-style": ["error", "bare-block"],
            "no-alert": "error",
            "no-await-in-loop": "error",
            "no-cond-assign": "error",
            "no-else-return": "error",
            "no-eq-null": "error",
            "no-extra-parens": "error",
            "no-extra-semi": "error",
            "no-fallthrough": "error",
            "no-floating-decimal": "error",
            "no-import-assign": "error",
            "no-inline-comments": "error",
            "no-irregular-whitespace": "error",
            "no-lone-blocks": "error",
            "no-lonely-if": "error",
            "no-multi-spaces": "error",
            "no-nested-ternary": "error",
            "no-plusplus": "error",
            "no-redeclare": "error",
            "no-return-assign": "off",
            "no-self-compare": "error",
            "no-underscore-dangle": "off",
            "no-unexpected-multiline": "error",
            "no-unused-vars": "error",
            "no-use-before-define": "error",
            "no-useless-escape": "off",
            "no-var": "error",
            "object-property-newline": ["error", {
                allowAllPropertiesOnSameLine: false,
                allowMultiplePropertiesPerLine: false,
            }],
            quotes: ["error", "double"],
            radix: 0,
            "react/button-has-type": 0,
            "react/forbid-prop-types": 0,
            "react/function-component-definition": 0,
            "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx", ".tsx", ".ts"] }],
            "react/jsx-indent": ["error", 4],
            "react/jsx-indent-props": ["error", 4],
            "react/jsx-max-props-per-line": [1, { maximum: 1 }],
            "react/jsx-props-no-spreading": "off",
            "react/jsx-sort-props": [2, {
                callbacksLast: true,
                ignoreCase: false,
                locale: "auto",
                multiline: "last",
                noSortAlphabetically: false,
                shorthandFirst: false,
                shorthandLast: true,
            }],
            "react/no-danger": 0,
            "react/prop-types": 0,
            "react/react-in-jsx-scope": "off",
            "react/require-default-props": 0,
            "simple-import-sort/exports": "error",
            "simple-import-sort/imports": "error",
            "sort-destructure-keys/sort-destructure-keys": 2,
            "sort-keys": ["error", "asc", {
                caseSensitive: true,
                minKeys: 2,
                natural: true,
            }],
            "sort-keys-fix/sort-keys-fix": "error",
            "tailwindcss/prefer-theme-tokens": "error",
            "typescript-sort-keys/interface": "error",
            "typescript-sort-keys/string-enum": "error",
            "valid-typeof": "error",
            "vars-on-top": "error",
        },
        settings: {
            "import/extensions": [".js", ".jsx", ".tsx", ".ts"],
            "import/parsers": { "@typescript-eslint/parser": [".ts", ".tsx"] },
            "import/resolver": {
                node: {
                    extensions: [".js", ".jsx", ".tsx", ".ts"],
                    paths: ["src"],
                },
            },
        },
    },
];
