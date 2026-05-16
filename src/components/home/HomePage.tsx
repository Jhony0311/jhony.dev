import { useEffect, useState } from 'react';
import {
    ArrowRight,
    ArrowUpRight,
    Envelope,
    GithubLogo,
    Leaf,
    Plant,
    Tree,
    TwitterLogo,
} from '@phosphor-icons/react';
import {
    expertise,
    focusNotes,
    gardenEntries,
    type GardenEntry,
    type GardenStage,
    type GardenType,
} from './home-data';
import { FloatingNav } from './FloatingNav';

const STAGE_META: Record<GardenStage, { label: string; className: string }> = {
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

function GardenCard({ entry }: { entry: GardenEntry }) {
    const stageMeta = STAGE_META[entry.stage];

    return (
        <a
            href={entry.href}
            className="group block border-t border-line py-6 text-inherit no-underline"
        >
            <div className="mb-2.5 flex items-center gap-3">
                <span className="font-mono text-xs font-medium uppercase tracking-wider text-ink-faint">
                    {TYPE_META[entry.type].label}
                </span>

                <span className="text-xs text-line">·</span>

                <span
                    className={`inline-flex items-center gap-1.5 font-mono text-xs font-medium ${stageMeta.className}`}
                >
                    <StageIcon stage={entry.stage} />
                    {stageMeta.label}
                </span>

                <span className="text-xs text-line">·</span>

                <span className="font-mono text-xs text-ink-faint">
                    {entry.lastEdited}
                </span>
            </div>

            <div className="flex items-start justify-between gap-4">
                <h3 className="m-0 font-mono text-base font-medium leading-snug text-ink transition-colors duration-200 group-hover:text-accent-blue">
                    {entry.title}
                </h3>

                <ArrowUpRight
                    size={16}
                    weight="bold"
                    className="mt-[0.2rem] shrink-0 text-ink-faint transition-colors duration-200 group-hover:text-accent-blue"
                />
            </div>

            <p className="mt-2 max-w-[52ch] font-sans text-sm leading-relaxed font-light text-ink-muted">
                {entry.summary}
            </p>

            {entry.tags.length > 0 && (
                <div className="mt-3.5 flex flex-wrap gap-1.5">
                    {entry.tags.map((tag) => (
                        <span
                            key={tag}
                            className="rounded bg-canvas-inset px-2 py-[0.2rem] font-mono text-xs font-normal tracking-wide text-ink-faint ring-1 ring-line"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
            )}
        </a>
    );
}

function GardenSkeleton() {
    return (
        <div className="flex flex-col">
            {[0, 1, 2].map((i) => (
                <div key={i} className="border-t border-line py-6">
                    <div className="mb-3 flex gap-3">
                        <div className="h-3 w-12 animate-[shimmer_1.6s_ease-in-out_infinite] rounded-[3px] bg-canvas-inset" />
                        <div className="h-3 w-16 animate-[shimmer_1.6s_ease-in-out_infinite] rounded-[3px] bg-canvas-inset" />
                    </div>
                    <div className="mb-2 h-4.5 w-[70%] animate-[shimmer_1.6s_ease-in-out_infinite] rounded bg-canvas-inset" />
                    <div className="h-3.5 w-[90%] animate-[shimmer_1.6s_ease-in-out_infinite] rounded bg-canvas-inset" />
                </div>
            ))}
        </div>
    );
}

function GardenSection() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => setLoading(false), 600);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <section id="garden-preview" className="bg-canvas-subtle">
            <div className="mx-auto w-full max-w-300 px-8 py-20">
                <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <p className="mb-2 font-mono text-xs font-medium uppercase tracking-widest text-accent-green">
                            Digital Garden
                        </p>
                        <h2 className="m-0 font-mono text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-ink">
                            Notes &amp; essays
                        </h2>
                    </div>

                    <a
                        href="/garden"
                        className="inline-flex items-center gap-1.5 rounded-full border border-accent-blue-soft bg-accent-blue-soft px-4 py-2 font-mono text-sm font-medium text-accent-blue no-underline transition-all duration-200 hover:border-accent-blue hover:bg-accent-blue hover:text-canvas active:-translate-y-px"
                    >
                        All entries
                        <ArrowRight size={14} weight="bold" />
                    </a>
                </div>

                {loading ? (
                    <GardenSkeleton />
                ) : (
                    <div>
                        {gardenEntries.map((entry) => (
                            <GardenCard key={entry.href} entry={entry} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

function ContactSection() {
    return (
        <section id="contact" className="bg-canvas">
            <div className="mx-auto w-full max-w-300 border-t border-line px-8 pt-20 pb-24">
                <p className="mb-2 font-mono text-xs font-medium uppercase tracking-widest text-accent-blue">
                    Get in touch
                </p>

                <h2 className="mb-10 font-mono text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-ink">
                    Let&apos;s talk
                </h2>

                <div className="flex flex-wrap gap-3">
                    <a
                        href="mailto:hi@jhony.dev"
                        className="inline-flex items-center gap-2 rounded-full bg-canvas-inset px-5 py-2.5 font-mono text-sm font-medium text-ink no-underline ring-1 ring-line transition-all duration-200 hover:bg-accent-green-soft hover:text-accent-green active:-translate-y-px"
                    >
                        <Envelope size={15} weight="bold" />
                        hi@jhony.dev
                    </a>

                    <a
                        href="https://github.com/Jhony0311"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-transparent px-5 py-2.5 font-mono text-sm font-medium text-ink-muted no-underline ring-1 ring-line transition-all duration-200 hover:text-accent-blue hover:ring-accent-blue-soft active:-translate-y-px"
                    >
                        <GithubLogo size={15} weight="bold" />
                        GitHub
                    </a>

                    <a
                        href="https://twitter.com/jhony0311"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-transparent px-5 py-2.5 font-mono text-sm font-medium text-ink-muted no-underline ring-1 ring-line transition-all duration-200 hover:text-accent-blue hover:ring-accent-blue-soft active:-translate-y-px"
                    >
                        <TwitterLogo size={15} weight="bold" />
                        Twitter
                    </a>
                </div>
            </div>
        </section>
    );
}

export function HomePage() {
    return (
        <>
            <FloatingNav />

            <main>
                <section className="bg-canvas">
                    <div className="mx-auto w-full max-w-300 px-8 pt-40 pb-20">
                        <p className="mb-8 font-mono text-xs font-medium uppercase tracking-widest text-accent-green">
                            Software engineer
                        </p>

                        <h1 className="m-0 mb-10 max-w-[14ch] font-mono text-[clamp(2.75rem,8vw,6.5rem)] font-bold leading-none tracking-[-0.04em] text-ink">
                            Jonathan
                            <br />
                            <span className="text-ink-muted">Ortega</span>
                        </h1>

                        <div className="grid grid-cols-1 gap-12 border-t border-line pt-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-16">
                            <div>
                                <p className="mb-5 max-w-[44ch] font-sans text-base leading-relaxed font-light text-ink-muted">
                                    Building systems that hold shape over time.
                                    Focused on TypeScript, React, and
                                    distributed infrastructure, with a
                                    preference for durable design over clever
                                    shortcuts.
                                </p>

                                <ul className="m-0 flex list-none flex-col gap-2 p-0">
                                    {focusNotes.map((note) => (
                                        <li
                                            key={note}
                                            className="flex items-start gap-2 font-sans text-sm leading-relaxed font-light text-ink-muted"
                                        >
                                            <span className="mt-[0.55rem] inline-block h-1 w-1 shrink-0 rounded-full bg-accent-green" />
                                            {note}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <p className="mb-4 font-mono text-xs font-medium uppercase tracking-wider text-ink-faint">
                                    Working with
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    {expertise.map((skill) => (
                                        <span
                                            key={skill}
                                            className="rounded-md bg-canvas-inset px-3 py-1.5 font-mono text-sm font-normal text-ink-muted ring-1 ring-line transition-colors duration-200 hover:bg-accent-blue-soft hover:text-accent-blue"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <GardenSection />
                <ContactSection />
            </main>
        </>
    );
}
