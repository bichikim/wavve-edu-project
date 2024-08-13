import js from '@eslint/js'
import ts from 'typescript-eslint'
import prettierRecommended from 'eslint-plugin-prettier/recommended'
import sortKeys from 'eslint-plugin-sort-keys-fix'
import exportsSort from 'eslint-plugin-sort-export-all'
import typeSortKeys from 'eslint-plugin-typescript-sort-keys'

export default [
  js.configs.recommended,
  ...ts.configs.recommended,
  prettierRecommended,
  {
    files: ['**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx,vue}'],
    ignores: ['**/package.json'],
    plugins: {
      'sort-export-all': exportsSort,
      'sort-keys-fix': sortKeys,
      'typescript-sort-keys': typeSortKeys,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
    },
  },
]
