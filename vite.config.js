import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // ou @vitejs/plugin-react-swc

export default defineConfig({
  plugins: [react()],
})