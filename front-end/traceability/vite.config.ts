import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import path from 'path'
import { APP_PORT } from './src/utils/ConfigConstant'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server:{
    host: "0.0.0.0",
    port: APP_PORT,
  },
  resolve: {
    alias: {
      '@services': path.resolve(__dirname, 'src/services'),
    },
  },
})
