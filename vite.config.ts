import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import fs from 'fs'
import path from 'path'

let cert;
let key;

try {
  cert = fs.readFileSync(path.resolve(__dirname, 'certs/server.pem'))
  key = fs.readFileSync(path.resolve(__dirname, 'certs/key.pem'))
} catch {
  console.log("No SSL certificate provided, so CORS will not work locally")
}

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  server: {
    https: {
      cert,
      key,
    },
    host: 'local.recipes.arbee.me',
    port: 3000
  },
})
