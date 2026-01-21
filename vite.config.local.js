import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 本地预览配置（不使用 base path）
export default defineConfig({
  plugins: [react()],
  base: '/', // 本地预览使用根路径
})
