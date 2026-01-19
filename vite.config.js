import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Star-Greenhouse-100-Survival/', // GitHub Pages 路径
})

