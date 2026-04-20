import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// IMPORTANT: change "todo-app" to your repo name
export default defineConfig({
  plugins: [react()],
  base: "/todo-app/"
})