import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/web_todo/', // 리포지토리 이름 기준
  plugins: [react()],
})
