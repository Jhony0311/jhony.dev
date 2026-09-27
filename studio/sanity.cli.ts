import {existsSync} from 'node:fs'
import {loadEnvFile} from 'node:process'
import {dirname, resolve} from 'node:path'
import {fileURLToPath} from 'node:url'
import {defineCliConfig} from 'sanity/cli'

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

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  }
})
