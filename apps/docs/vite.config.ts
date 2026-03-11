import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

const uiSrc = path.resolve(__dirname, '../../packages/ui/src')

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'resolve-workspace-at-alias',
      enforce: 'pre',
      async resolveId(id, importer, options) {
        if (id.startsWith('@/') && importer?.includes('/packages/ui/src')) {
          return this.resolve(
            id.replace('@/', uiSrc + '/'),
            importer,
            { skipSelf: true, ...options }
          )
        }
      },
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@aplo/ui': path.resolve(__dirname, '../../packages/ui/src/index.ts'),
    },
  },
})
