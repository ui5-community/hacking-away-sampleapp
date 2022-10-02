module.exports = {
	root: true,
	env: {
		browser: true,
		es6: true,
		node: true
	},
	extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:@typescript-eslint/recommended-requiring-type-checking"],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		project: ["tsconfig.json"],
		tsconfigRootDir: __dirname,
		sourceType: "module"
	},
	ignorePatterns: [".eslintrc.js"],
	plugins: ["@typescript-eslint"]
};
