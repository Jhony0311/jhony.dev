import { useEffect, useState } from 'react';
import { ArrowRight } from '@phosphor-icons/react';
import { expertise, focusNotes, gardenEntries } from './home-data';
import { GardenCard } from '../garden/GardenCard';
import { PillLink } from '../ui/PillLink';

function GardenSkeleton() {
    return (
        <div className="flex flex-col gap-4">
            {[0, 1, 2].map((i) => (
                <div key={i} className="rounded-lg border border-line p-6">
                    <div className="mb-4 h-5 w-[60%] animate-[shimmer_1.6s_ease-in-out_infinite] rounded bg-canvas-inset" />
                    <div className="mb-3 h-3.5 w-full animate-[shimmer_1.6s_ease-in-out_infinite] rounded bg-canvas-inset" />
                    <div className="h-3 w-[85%] animate-[shimmer_1.6s_ease-in-out_infinite] rounded bg-canvas-inset" />
                </div>
            ))}
        </div>
    );
}

function GardenSection() {
    const [loading, setLoading] = useState(true);
    const previewEntries = gardenEntries.slice(0, 4);

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

                    <PillLink href="/garden">
                        All entries
                        <ArrowRight size={14} weight="bold" />
                    </PillLink>
                </div>

                {loading ? (
                    <GardenSkeleton />
                ) : (
                    <div className="flex flex-col gap-4">
                        {previewEntries.map((entry) => (
                            <GardenCard key={entry.href} entry={entry} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

export function HomePage() {
    return (
        <>
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
                                Focused on TypeScript, React, and distributed
                                infrastructure, with a preference for durable
                                design over clever shortcuts.
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
        </>
    );
}
