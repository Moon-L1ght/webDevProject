import { fileURLToPath } from 'node:url'
import path from 'node:path'
import fse from 'fs-extra'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const src = path.resolve(__dirname, '../node_modules/monaco-editor/min/vs')
const dest = path.resolve(__dirname, '../public/monaco/vs')

async function run() {
    await fse.ensureDir(dest)
    await fse.copy(src, dest, { overwrite: true, errorOnExist: false })
    console.log('[monaco] copied', src, '→', dest)
}

run().catch((e) => {
    console.warn('[monaco] copy failed:', e?.message || e)
    process.exit(0)
})