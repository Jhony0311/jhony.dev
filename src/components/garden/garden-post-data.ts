import type { GardenEntry } from '../home/home-data';

export type GardenBlockWidth = 'narrow' | 'wide' | 'bleed';

export type GardenParagraphBlock = {
    type: 'paragraph';
    width?: GardenBlockWidth;
    text: string;
    intro?: boolean;
};

export type GardenQuoteBlock = {
    type: 'quote';
    width?: GardenBlockWidth;
    text: string;
    attribution: string;
    role?: string;
};

export type GardenCodeBlock = {
    type: 'code';
    width?: GardenBlockWidth;
    language: string;
    title?: string;
    code: string;
};

export type GardenImageBlock = {
    type: 'image';
    width?: GardenBlockWidth;
    src: string;
    alt: string;
    caption?: string;
};

export type GardenYoutubeBlock = {
    type: 'youtube';
    width?: GardenBlockWidth;
    videoId: string;
    title?: string;
    caption?: string;
};

export type GardenComponentBlock = {
    type: 'component';
    width?: GardenBlockWidth;
    label: string;
    title: string;
    description: string;
};

export type GardenDetailBlock =
    | GardenParagraphBlock
    | GardenQuoteBlock
    | GardenCodeBlock
    | GardenImageBlock
    | GardenYoutubeBlock
    | GardenComponentBlock;

export type GardenPostDetail = {
    tagline: string;
    blocks: readonly GardenDetailBlock[];
};

function slugFromEntry(entry: GardenEntry) {
    return entry.href.split('/').filter(Boolean).at(-1) ?? '';
}

function buildFallbackDetail(entry: GardenEntry): GardenPostDetail {
    return {
        tagline: entry.summary,
        blocks: [
            {
                type: 'paragraph',
                width: 'narrow',
                intro: true,
                text: entry.summary,
            },
            {
                type: 'quote',
                width: 'narrow',
                text: 'Keep the shape of the idea visible until the edge cases prove otherwise.',
                attribution: 'Jonathan Ortega',
                role: 'working note',
            },
            {
                type: 'component',
                width: 'wide',
                label: 'Reusable slot',
                title: 'Content can break the editorial rail',
                description:
                    'This section is intentionally wider than the core text column so custom charts, callouts, or embeds can sit outside the narrow reading width.',
            },
        ],
    };
}

export const gardenPostDetails: Record<string, GardenPostDetail> = {
    'async-error-handling': {
        tagline:
            'Where I drew the line between silent failures and useful boundaries.',
        blocks: [
            {
                type: 'paragraph',
                width: 'narrow',
                intro: true,
                text: 'The goal was not to catch everything. It was to make the failure path legible enough that a future me could trace it without adding another debug print.',
            },
            {
                type: 'quote',
                width: 'narrow',
                text: 'If the error path feels obvious only while the stack is warm, the design is too optimistic.',
                attribution: 'Jonathan Ortega',
                role: 'note to self',
            },
            {
                type: 'code',
                width: 'wide',
                title: 'Minimal async boundary',
                language: 'ts',
                code: `type Result<T> =
    | { ok: true; value: T }
    | { ok: false; error: Error };

export async function wrapAsync<T>(task: () => Promise<T>): Promise<Result<T>> {
    try {
        return { ok: true, value: await task() };
    } catch (error) {
        return { ok: false, error: error instanceof Error ? error : new Error('Unknown error') };
    }
}`,
            },
            {
                type: 'image',
                width: 'bleed',
                src: 'https://picsum.photos/seed/async-error-handling-hero/1600/900',
                alt: 'A low-contrast abstract workspace image representing a debugging session.',
                caption:
                    'Keeping the problem visible without turning the page into a log dump.',
            },
            {
                type: 'component',
                width: 'wide',
                label: 'Boundary checklist',
                title: 'What I check after the first exception lands',
                description:
                    'Does the caller get a stable failure shape, is retrying safe, and did the original cause survive the hop?',
            },
        ],
    },
    'pr-template-design': {
        tagline:
            'A template only works if it improves the handoff between author and reviewer.',
        blocks: [
            {
                type: 'paragraph',
                width: 'narrow',
                intro: true,
                text: 'The useful version of a pull request template is not longer. It asks for the smallest amount of context that helps a reviewer decide where to spend attention.',
            },
            {
                type: 'image',
                width: 'bleed',
                src: 'https://picsum.photos/seed/pr-template-design/1700/950',
                alt: 'A clean editorial photo used as a visual anchor for the review process discussion.',
                caption:
                    'Templates should shorten the distance between intent and review.',
            },
            {
                type: 'quote',
                width: 'narrow',
                text: 'A good template changes the first five minutes of review, not the whole social contract.',
                attribution: 'Jonathan Ortega',
                role: 'process note',
            },
            {
                type: 'component',
                width: 'wide',
                label: 'Review cadence slot',
                title: 'A place for checklist-style context',
                description:
                    'This wider surface can hold diff summaries, screenshots, linked tickets, or lightweight custom components that help explain the change.',
            },
        ],
    },
    'service-layer-abstraction': {
        tagline:
            'Less indirection, more signal, until the edge cases demand a seam.',
        blocks: [
            {
                type: 'paragraph',
                width: 'narrow',
                intro: true,
                text: 'I stopped treating abstraction as a default win. For this piece, the test was whether a future change would need the seam before the code needed the ceremony.',
            },
            {
                type: 'code',
                width: 'wide',
                title: 'A service boundary that stays honest',
                language: 'ts',
                code: `export async function getProjectSummary(projectId: string) {
    const project = await projectsRepo.findById(projectId);

    if (!project) {
        throw new Error('Project not found');
    }

    return {
        id: project.id,
        name: project.name,
        status: project.status,
    };
}`,
            },
            {
                type: 'quote',
                width: 'narrow',
                text: 'An abstraction should compress repetition, not forecast every possible shape at once.',
                attribution: 'Jonathan Ortega',
                role: 'architecture note',
            },
        ],
    },
    'cache-key-migration': {
        tagline: 'How I changed cache shape without forcing a hard cutover.',
        blocks: [
            {
                type: 'paragraph',
                width: 'narrow',
                intro: true,
                text: 'The interesting part of a cache migration is not the new key. It is the overlap window where old and new keys need to coexist long enough to avoid a cliff.',
            },
            {
                type: 'code',
                width: 'wide',
                title: 'Dual-read migration path',
                language: 'ts',
                code: `const newKey = buildKeyV2(userId);
const oldKey = buildKeyV1(userId);

const cached = await cache.get(newKey) ?? await cache.get(oldKey);

if (!cached) {
    const value = await loadUserProfile(userId);
    await cache.set(newKey, value, { ttl: 300 });
    return value;
}

return cached;`,
            },
            {
                type: 'image',
                width: 'bleed',
                src: 'https://picsum.photos/seed/cache-key-migration/1600/900',
                alt: 'An abstract layered interface that stands in for a migration diagram.',
                caption:
                    'The old and new shapes need a controlled overlap window.',
            },
        ],
    },
    'scroll-direction-hook': {
        tagline:
            'A tiny hook that keeps scroll work off the main thread of thought.',
        blocks: [
            {
                type: 'paragraph',
                width: 'narrow',
                intro: true,
                text: 'This snippet reads direction from a passive listener and avoids the kind of layout work that usually sneaks in when the implementation gets too clever.',
            },
            {
                type: 'code',
                width: 'wide',
                title: 'Scroll direction hook',
                language: 'ts',
                code: `import { useEffect, useState } from 'react';

export function useScrollDirection() {
    const [direction, setDirection] = useState<'up' | 'down'>('down');

    useEffect(() => {
        let previousY = window.scrollY;

        const onScroll = () => {
            const nextY = window.scrollY;
            setDirection(nextY > previousY ? 'down' : 'up');
            previousY = nextY;
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return direction;
}`,
            },
            {
                type: 'component',
                width: 'wide',
                label: 'Usage slot',
                title: 'Where a hook can be paired with a live indicator',
                description:
                    'This area can hold a tiny dashboard widget, a moving status pill, or another client component that reflects direction without crowding the article body.',
            },
        ],
    },
    'api-endpoint-checklist': {
        tagline:
            'A compact list of things that should fail loudly before customers see them.',
        blocks: [
            {
                type: 'paragraph',
                width: 'narrow',
                intro: true,
                text: 'The checklist is meant to be used right before shipping. It is not documentation; it is a final pass over validation, observability, and response shape.',
            },
            {
                type: 'code',
                width: 'wide',
                title: 'Endpoint checks',
                language: 'ts',
                code: `const checks = [
    'validate input',
    'log failures with context',
    'return stable response shapes',
    'measure latency and retries',
];`,
            },
            {
                type: 'youtube',
                width: 'wide',
                videoId: 'M7lc1UVf-VE',
                title: 'Context for the checklist',
                caption:
                    'An embedded YouTube slot for longer explanations or walkthroughs.',
            },
            {
                type: 'quote',
                width: 'narrow',
                text: 'Endpoints fail in predictable ways. The job is to make those failures boring.',
                attribution: 'Jonathan Ortega',
                role: 'preflight note',
            },
        ],
    },
    'feature-flag-complexity': {
        tagline:
            'Feature flags are useful when the complexity they buy is strictly temporary.',
        blocks: [
            {
                type: 'paragraph',
                width: 'narrow',
                intro: true,
                text: 'I try to separate optionality from entropy. If the flag is only protecting a hypothetical future, it is usually just borrowing complexity from tomorrow.',
            },
            {
                type: 'image',
                width: 'bleed',
                src: 'https://picsum.photos/seed/feature-flag-complexity/1700/950',
                alt: 'A moody architectural image representing branching product choices.',
                caption:
                    'Not every branch deserves to become a permanent path.',
            },
            {
                type: 'quote',
                width: 'narrow',
                text: 'If the flag survives the decision that created it, its cost is no longer temporary.',
                attribution: 'Jonathan Ortega',
                role: 'tradeoff note',
            },
        ],
    },
    'cold-start-tracing': {
        tagline: 'Making cold starts measurable instead of anecdotal.',
        blocks: [
            {
                type: 'paragraph',
                width: 'narrow',
                intro: true,
                text: 'The trick was to make region variance visible enough that I could compare startup shape without guessing where the slow path lived.',
            },
            {
                type: 'youtube',
                width: 'wide',
                videoId: 'M7lc1UVf-VE',
                title: 'A talk slot for the tracing walkthrough',
                caption:
                    'You can swap this block for a real talk or product walkthrough later.',
            },
            {
                type: 'component',
                width: 'wide',
                label: 'Metric slot',
                title: 'A wider surface for traces or latency charts',
                description:
                    'This placeholder is where a custom visualization or video component can sit outside the narrow column and still feel editorial.',
            },
        ],
    },
    'typed-env-validation': {
        tagline:
            'Strongly typed config starts with validating the boundary once.',
        blocks: [
            {
                type: 'paragraph',
                width: 'narrow',
                intro: true,
                text: 'The point is to turn environment variables into a single, well-shaped object at startup instead of letting them leak through the codebase as unchecked strings.',
            },
            {
                type: 'code',
                width: 'wide',
                title: 'Typed env parser',
                language: 'ts',
                code: `import { z } from 'zod';

const EnvSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']),
    API_URL: z.string().url(),
});

export const env = EnvSchema.parse(process.env);`,
            },
            {
                type: 'quote',
                width: 'narrow',
                text: 'The earlier config is validated, the less of the application needs to be defensive later.',
                attribution: 'Jonathan Ortega',
                role: 'tooling note',
            },
        ],
    },
    'note-taking-cadence': {
        tagline:
            'A writing cadence that keeps the garden live without making the habit heavy.',
        blocks: [
            {
                type: 'paragraph',
                width: 'narrow',
                intro: true,
                text: 'I use notes to expose unfinished thoughts while they are still useful. The discipline is in making the next pass easy, not in polishing the first one too early.',
            },
            {
                type: 'image',
                width: 'bleed',
                src: 'https://picsum.photos/seed/note-taking-cadence/1700/950',
                alt: 'A calm workspace image used to frame the writing habit discussion.',
                caption:
                    'The writing system should lower friction, not add ceremony.',
            },
            {
                type: 'quote',
                width: 'narrow',
                text: 'I write to make the next decision cheaper.',
                attribution: 'Jonathan Ortega',
                role: 'writing note',
            },
            {
                type: 'component',
                width: 'wide',
                label: 'Habit slot',
                title: 'This section can host a writing workflow or custom component',
                description:
                    'A larger surface makes it possible to show a diagram, a timeline, or an inline tool without compressing the editorial text column.',
            },
        ],
    },
};

export function getGardenPostDetail(entry: GardenEntry): GardenPostDetail {
    const slug = slugFromEntry(entry);
    return gardenPostDetails[slug] ?? buildFallbackDetail(entry);
}
