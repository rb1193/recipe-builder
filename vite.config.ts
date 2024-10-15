import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import fs from 'fs'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'certs/server.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, 'certs/key.pem')),
    },
    host: 'local.recipes.arbee.me',
    port: 3000
  },
})
