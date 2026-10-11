import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist', 'node_modules'] },
  js.configs.recommended,
  ...tseslint.configs.strict,
  // Tests index into known fixtures; non-null assertions keep them short.
  { files: ['tests/**'], rules: { '@typescript-eslint/no-non-null-assertion': 'off' } },
);
