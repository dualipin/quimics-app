import pluginVue from 'eslint-plugin-vue'
import { defineConfigWithVueTs } from '@vue/eslint-config-typescript'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default defineConfigWithVueTs([
  // Configuración para archivos a lintear
  {
    files: ['**/*.{ts,mts,tsx,vue}'],
    // otras configuraciones específicas para estos archivos
  },

  // Configuración para archivos a ignorar
  {
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },

  pluginVue.configs['flat/essential'],
  // Removed invalid usage as the module does not exist
  skipFormatting,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
    },
  },
])
