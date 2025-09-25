// eslint.config.ts
import pluginVue from 'eslint-plugin-vue'
import { defineConfigWithVueTs } from '@vue/eslint-config-typescript'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import vueParser from 'vue-eslint-parser'
import tsParser from '@typescript-eslint/parser'

export default defineConfigWithVueTs([
  // Config base de Vue
  pluginVue.configs['flat/base'],
  skipFormatting,

  // Configuración para Vue + TS
  {
    files: ['**/*.{ts,mts,tsx,vue}'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
    },
  },

  // Archivos a ignorar
  {
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },
])
