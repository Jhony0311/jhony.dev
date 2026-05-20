import { ArrowUpRight, Leaf, Plant, Tree } from '@phosphor-icons/react';
import type { GardenEntry, GardenStage, GardenType } from '../home/home-data';
import { GardenCardDecoration } from '../home/GardenCardDecoration';

export const STAGE_META: Record<
    GardenStage,
    { label: string; className: string }
> = {
    Seedling: { label: 'Seedling', className: 'text-stage-seedling' },
    Budding: { label: 'Budding', className: 'text-stage-budding' },
    Evergreen: { label: 'Evergreen', className: 'text-stage-evergreen' },
};

const TYPE_META: Record<GardenType, { label: string }> = {
    Essay: { label: 'Essay' },
    Note: { label: 'Note' },
    Snippet: { label: 'Snippet' },
};

function StageIcon({ stage }: { stage: GardenStage }) {
    const className = STAGE_META[stage].className;

    if (stage === 'Seedling') {
        return <Leaf size={12} weight="fill" className={className} />;
    }

    if (stage === 'Budding') {
        return <Plant size={12} weight="fill" className={className} />;
    }

    return <Tree size={12} weight="fill" className={className} />;
}

export function GardenCard({ entry }: { entry: GardenEntry }) {
    const stageMeta = STAGE_META[entry.stage];

    return (
        <a
            href={entry.href}
            className="group relative block overflow-hidden rounded-lg border border-line p-6 text-inherit no-underline transition-all duration-200 hover:border-line/60"
            style={{
                boxShadow: 'var(--card-shadow)',
            }}
        >
            <GardenCardDecoration stage={entry.stage} />

            <div className="relative z-10 flex flex-col gap-6">
                <div className="flex flex-col md:items-start md:gap-6 md:flex-row">
                    <div className="min-w-0 flex-1">
                        <h3 className="m-0 mb-3 font-mono text-lg font-semibold leading-snug text-ink transition-colors duration-200 group-hover:text-accent-blue">
                            {entry.title}
                        </h3>

                        <p className="mb-4 max-w-[52ch] font-sans text-sm font-light leading-relaxed text-ink-muted">
                            {entry.summary}
                        </p>
                    </div>

                    <div className="flex shrink-0 flex-col gap-2 text-right">
                        <div className="flex items-center justify-end gap-2">
                            <span className="font-mono text-xs font-medium uppercase tracking-wider text-ink-faint">
                                {TYPE_META[entry.type].label}
                            </span>
                        </div>

                        <div className="flex items-center justify-end gap-2">
                            <span
                                className={`inline-flex items-center gap-1 font-mono text-xs font-medium ${stageMeta.className}`}
                            >
                                {stageMeta.label}
                                <StageIcon stage={entry.stage} />
                            </span>
                        </div>

                        <span className="font-mono text-xs text-ink-faint">
                            {entry.lastEdited}
                        </span>
                    </div>
                </div>

                {entry.tags.length > 0 && (
                    <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex flex-wrap items-center gap-2">
                            {entry.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="rounded-sm bg-canvas-inset px-2 py-1 font-mono text-xs font-normal tracking-wide text-ink-faint ring-1 ring-line"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                        <div className="inline-flex items-center gap-1.5 rounded-full bg-accent-green-soft px-3 py-1.5 font-mono text-xs font-medium text-accent-green ring-1 ring-accent-green/30 transition-all duration-200 group-hover:bg-accent-green group-hover:text-canvas">
                            Read
                            <ArrowUpRight size={12} weight="bold" />
                        </div>
                    </div>
                )}
            </div>
        </a>
    );
}
