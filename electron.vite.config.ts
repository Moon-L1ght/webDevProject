import { defineConfig } from 'electron-vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

export default defineConfig({
    main: {
        build: {
            outDir: 'dist-electron/main',
            rollupOptions: {
                input: resolve(__dirname, 'electron/main/index.ts')
            }
        }
    },
    preload: {
        build: {
            outDir: 'dist-electron/preload',
            rollupOptions: {
                input: resolve(__dirname, 'electron/preload/index.ts')
            }
        }
    },
    renderer: {
        root: 'src/renderer',
        build: {
            outDir: 'dist'
        },
        resolve: {
            alias: { '@': resolve(__dirname, 'src/renderer') }
        },
        plugins: [react()]
    }
})