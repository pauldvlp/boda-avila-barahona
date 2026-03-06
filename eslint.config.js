import { includeIgnoreFile } from '@eslint/compat'
import eslintParserAstro from 'astro-eslint-parser'
import eslintPluginBetterTailwindcss from 'eslint-plugin-better-tailwindcss'
import { defineConfig } from 'eslint/config'
import { parser as eslintParserTypeScript } from 'typescript-eslint'
import { fileURLToPath } from 'url'

const gitIgnorePath = fileURLToPath(new URL('.gitignore', import.meta.url))

export default defineConfig([
  includeIgnoreFile(gitIgnorePath),
  {
    extends: [eslintPluginBetterTailwindcss.configs.recommended],
    settings: {
      'better-tailwindcss': {
        entryPoint: 'src/styles/global.css',
      },
    },

    files: ['**/*.astro'],

    languageOptions: {
      parser: eslintParserAstro,
      parserOptions: {
        parser: eslintParserTypeScript,
      },
    },

    rules: {
      'better-tailwindcss/no-unknown-classes': 'off',
    },
  },
])
