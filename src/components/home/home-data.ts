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
    { label: 'Garden', href: '#garden-preview' },
    { label: 'Contact', href: '#contact' },
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
        title: 'React hook for scroll direction without layout thrash',
        type: 'Snippet',
        stage: 'Evergreen',
        lastEdited: 'May 3, 2026',
        tags: ['react', 'performance', 'hooks'],
        summary:
            'A small hook that reads direction from passive listeners and keeps layout work off the critical path.',
        href: '/garden/scroll-direction-hook',
    },
] as const;

export const focusNotes = [
    'Writing to make decisions easier later.',
    'Preferring durable structure over decorative complexity.',
    'Leaving work visible while it is still forming.',
] as const;
