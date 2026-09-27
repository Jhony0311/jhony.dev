import {existsSync} from 'node:fs'
import {loadEnvFile} from 'node:process'
import {dirname, resolve} from 'node:path'
import {fileURLToPath} from 'node:url'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

const studioDir = dirname(fileURLToPath(import.meta.url))

for (const envPath of [resolve(studioDir, '.env'), resolve(studioDir, '../.env')]) {
  if (existsSync(envPath)) {
    loadEnvFile(envPath)
  }
}

const projectId = process.env.SANITY_PROJECT_ID
const dataset = process.env.SANITY_DATASET

if (!projectId || !dataset) {
  throw new Error('SANITY_PROJECT_ID and SANITY_DATASET must be set')
}

export default defineConfig({
  name: 'default',
  title: 'jhony.dev',

  projectId,
  dataset,

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
