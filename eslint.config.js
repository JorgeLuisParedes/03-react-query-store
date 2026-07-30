import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import perfectionist from 'eslint-plugin-perfectionist';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
	{
		ignores: ['dist', 'build', 'coverage', 'node_modules'],
	},
	js.configs.recommended,
	...tseslint.configs.recommended,
	{
		files: ['**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}'],
		plugins: {
			import: importPlugin,
			perfectionist,
		},

		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
			},
		},

		rules: {
			'no-console': 'off',
			'no-debugger': 'error',
			'no-var': 'error',
			'prefer-const': 'off',
			eqeqeq: ['error', 'always'],
			curly: ['error', 'all'],

			'@typescript-eslint/consistent-type-imports': [
				'error',
				{
					prefer: 'type-imports',
					fixStyle: 'inline-type-imports',
				},
			],
			'@typescript-eslint/no-import-type-side-effects': 'error',

			'@typescript-eslint/no-unused-vars': [
				'warn',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
				},
			],

			'@typescript-eslint/no-explicit-any': 'off',
			'no-useless-assignment': 'off',
			'import/no-duplicates': [
				'error',
				{
					'prefer-inline': true,
				},
			],

			'perfectionist/sort-imports': [
				'warn',
				{
					type: 'natural',
					order: 'asc',
					ignoreCase: true,
					sortSideEffects: true,
					newlinesBetween: 1,
					newlinesInside: 0,
					groups: [
						'builtin',
						'react',
						'external',
						'internal',
						'parent',
						{ newlinesBetween: 0 },
						['sibling', 'index'],
						'unknown',
						'asset',
						'style',
						{ group: 'side-effect', type: 'unsorted' },
						{ group: 'side-effect-style', type: 'unsorted' },
					],
					customGroups: [
						{
							groupName: 'react',
							elementNamePattern: ['^react$', '^react-.+'],
						},
						{
							groupName: 'asset',
							elementNamePattern:
								'\\.(?:avif|bmp|gif|ico|jpe?g|png|svg|webp|woff2?|eot|ttf|otf)(?:\\?.*)?$',
						},
					],
				},
			],
			'perfectionist/sort-named-imports': [
				'warn',
				{
					type: 'natural',
					order: 'asc',
					ignoreCase: true,
					groups: ['type-import', 'value-import'],
					newlinesBetween: 0,
				},
			],
		},
	},
	eslintConfigPrettier,
]);
