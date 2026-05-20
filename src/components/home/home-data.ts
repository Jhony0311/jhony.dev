export type GardenType = 'Essay' | 'Note' | 'Snippet';
export type GardenStage = 'Seedling' | 'Budding' | 'Evergreen';

export type GardenEntry = {
    readonly title: string;
    readonly type: GardenType;
    readonly stage: GardenStage;
    readonly lastEdited: string;
    readonly tags: readonly string[];
    readonly summary: string;
    readonly href: string;
};

export const expertise = [
    'TypeScript',
    'React',
    'Node.js',
    'Distributed systems',
    'Developer tooling',
] as const;

export const navigation = [
    { label: 'Garden', href: '/garden' },
    { label: 'Contact', href: '/#contact' },
    { label: 'About', href: '/about' },
] as const;

export const gardenEntries: readonly GardenEntry[] = [
    {
        title: 'What changed in my async error handling this month',
        type: 'Note',
        stage: 'Seedling',
        lastEdited: 'May 12, 2026',
        tags: ['javascript', 'async-await', 'debugging'],
        summary:
            'A short log on where structured error boundaries helped and where they still leak too much detail.',
        href: '/garden/async-error-handling',
    },
    {
        title: 'Designing pull request templates that reviewers actually use',
        type: 'Essay',
        stage: 'Budding',
        lastEdited: 'May 11, 2026',
        tags: ['workflow', 'git', 'review-culture'],
        summary:
            'How we moved from ceremonial templates to prompts that speed up context transfer and reduce review loops.',
        href: '/garden/pr-template-design',
    },
    {
        title: 'I stopped over-abstracting service layers',
        type: 'Essay',
        stage: 'Budding',
        lastEdited: 'May 9, 2026',
        tags: ['architecture', 'backend', 'tradeoffs'],
        summary:
            'A working note on leaving more shape in the code until the edge cases actually justify the abstraction.',
        href: '/garden/service-layer-abstraction',
    },
    {
        title: 'Migrating a cache key strategy without invalidating everything',
        type: 'Note',
        stage: 'Seedling',
        lastEdited: 'May 8, 2026',
        tags: ['caching', 'redis', 'operations'],
        summary:
            'A migration approach that lets old and new keys coexist while traffic gradually shifts to the new shape.',
        href: '/garden/cache-key-migration',
    },
    {
        title: 'React hook for scroll direction without layout thrash',
        type: 'Snippet',
        stage: 'Evergreen',
        lastEdited: 'May 3, 2026',
        tags: ['react', 'performance', 'hooks'],
        summary:
            'A small hook that reads direction from passive listeners and keeps layout work off the critical path.',
        href: '/garden/scroll-direction-hook',
    },
    {
        title: 'API endpoint checklist before shipping to production',
        type: 'Snippet',
        stage: 'Evergreen',
        lastEdited: 'May 1, 2026',
        tags: ['api', 'reliability', 'checklist'],
        summary:
            'A compact checklist for validation, observability, and failure modes I run before exposing new routes.',
        href: '/garden/api-endpoint-checklist',
    },
    {
        title: 'When feature flags increase complexity more than they reduce risk',
        type: 'Essay',
        stage: 'Budding',
        lastEdited: 'Apr 28, 2026',
        tags: ['feature-flags', 'risk', 'product-engineering'],
        summary:
            'Criteria I use to decide whether a flag is buying optionality or creating long-lived branching logic.',
        href: '/garden/feature-flag-complexity',
    },
    {
        title: 'Tracing cold starts across regions with practical dashboards',
        type: 'Note',
        stage: 'Seedling',
        lastEdited: 'Apr 24, 2026',
        tags: ['observability', 'serverless', 'latency'],
        summary:
            'Early notes on combining logs and traces so cold start behavior becomes measurable instead of anecdotal.',
        href: '/garden/cold-start-tracing',
    },
    {
        title: 'Typed environment variables with runtime validation',
        type: 'Snippet',
        stage: 'Evergreen',
        lastEdited: 'Apr 20, 2026',
        tags: ['typescript', 'validation', 'tooling'],
        summary:
            'A repeatable pattern for parsing env vars once at startup and exposing strongly typed config everywhere else.',
        href: '/garden/typed-env-validation',
    },
    {
        title: 'A note-taking cadence that keeps the garden alive',
        type: 'Essay',
        stage: 'Budding',
        lastEdited: 'Apr 15, 2026',
        tags: ['writing', 'knowledge-management', 'habits'],
        summary:
            'The workflow I use to turn daily implementation notes into durable entries without turning writing into overhead.',
        href: '/garden/note-taking-cadence',
    },
] as const;

export const focusNotes = [
    'Writing to make decisions easier later.',
    'Preferring durable structure over decorative complexity.',
    'Leaving work visible while it is still forming.',
] as const;
