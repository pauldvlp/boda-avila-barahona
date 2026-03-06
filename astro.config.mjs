// @ts-check
import vercel from '@astrojs/vercel'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  site: 'https://boda-avila-barahona.vercel.app',
  output: 'server',
  security: {
    checkOrigin: false,
  },
  adapter: vercel({
    imageService: true,
  }),
  vite: {
    plugins: [tailwindcss()],
    server: {
      watch: {
        ignored: ['**/src/assets/data/**'],
      },
    },
  },
})
