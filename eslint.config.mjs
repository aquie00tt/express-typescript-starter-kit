import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import jest from "eslint-plugin-jest";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";

export default [
	eslint.configs.recommended,
	...tseslint.configs.recommended,
	{
		ignores: ["dist", "node_modules"],
	},
	{
		files: ["**/*.ts"],
		languageOptions: {
			parserOptions: {
				project: "tsconfig.eslint.json",
				tsconfigRootDir: import.meta.dirname,
			},
		},
		rules: {
			"no-console": "error",
			semi: "error",
			"@typescript-eslint/explicit-function-return-type":
				"error",
			"@typescript-eslint/require-await": "error",
		},
	},
	{
		files: ["tests/**/*.test.ts"],
		...jest.configs["flat/recommended"],
		rules: {
			...jest.configs["flat/recommended"].rules,
			"jest/prefer-expect-assertions": "off",
		},
	},
	eslintPluginPrettier,
];
