import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
// import {visionTool} from '@sanity/vision'
import { schemaTypes } from './studio/schemaTypes';

const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET;

if (!projectId || !dataset) {
    throw new Error('SANITY_PROJECT_ID and SANITY_DATASET must be set');
}

export default defineConfig({
    name: 'default',
    title: 'jhony.dev',

    projectId,
    dataset,

    plugins: [structureTool()],

    schema: {
        types: schemaTypes,
    },
});
