import { ArrowLeft, ArrowUpRight, Leaf, Plant, Tree } from '@phosphor-icons/react';
import type { GardenEntry, GardenStage, GardenType } from '../home/home-data';
import { STAGE_META } from './GardenCard';
import {
    type GardenCodeBlock,
    type GardenComponentBlock,
    type GardenDetailBlock,
    type GardenImageBlock,
    type GardenParagraphBlock,
    type GardenQuoteBlock,
    type GardenYoutubeBlock,
} from './garden-post-data';

type GardenPostPageProps = {
    entry: GardenEntry;
    tagline: string;
    blocks: readonly GardenDetailBlock[];
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

function widthClass(width: GardenDetailBlock['width'] = 'narrow') {
    if (width === 'bleed') {
        return 'w-full';
    }

    if (width === 'wide') {
        return 'mx-auto w-full max-w-300 px-8';
    }

    return 'mx-auto w-full max-w-[68ch] px-8';
}

function renderParagraph(block: GardenParagraphBlock) {
    return (
        <div className={widthClass(block.width)}>
            <p
                className={[
                    'm-0 font-sans text-base leading-relaxed text-ink-muted',
                    block.intro ? 'text-[1.05rem] leading-8 text-ink' : '',
                ].join(' ')}
            >
                {block.text}
            </p>
        </div>
    );
}

function renderQuote(block: GardenQuoteBlock) {
    return (
        <div className={widthClass(block.width)}>
            <blockquote className="rounded-3xl border border-line bg-canvas p-6">
                <p className="m-0 font-mono text-sm leading-7 text-ink">
                    {block.text}
                </p>
                <footer className="mt-4 flex items-center justify-between gap-3 border-t border-line pt-3">
                    <div>
                        <p className="m-0 font-mono text-xs font-medium uppercase tracking-wider text-ink-faint">
                            {block.attribution}
                        </p>
                        {block.role && (
                            <p className="m-0 mt-1 font-mono text-xs text-ink-faint">
                                {block.role}
                            </p>
                        )}
                    </div>
                    <ArrowUpRight size={14} weight="bold" className="text-accent-blue" />
                </footer>
            </blockquote>
        </div>
    );
}

function renderCode(block: GardenCodeBlock) {
    return (
        <div className={widthClass(block.width)}>
            <section className="overflow-hidden rounded-3xl border border-line bg-canvas shadow-[0_20px_40px_-24px_rgba(26,25,23,0.16)]">
                {block.title && (
                    <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3">
                        <p className="m-0 font-mono text-xs font-medium uppercase tracking-wider text-ink-faint">
                            {block.title}
                        </p>
                        <span className="rounded-full bg-canvas-inset px-2 py-1 font-mono text-[11px] uppercase tracking-wider text-ink-faint ring-1 ring-line">
                            {block.language}
                        </span>
                    </div>
                )}
                <pre className="m-0 overflow-x-auto px-5 py-5 font-mono text-sm leading-7 text-ink">
                    <code>{block.code}</code>
                </pre>
            </section>
        </div>
    );
}

function renderImage(block: GardenImageBlock) {
    const containerClass = block.width === 'bleed' ? 'w-full' : widthClass(block.width);

    return (
        <div className={containerClass}>
            <figure className="m-0 overflow-hidden border-y border-line bg-canvas md:rounded-none">
                <img
                    src={block.src}
                    alt={block.alt}
                    className="block h-auto w-full object-cover"
                />
                {block.caption && (
                    <figcaption className="mx-auto w-full max-w-300 px-8 py-4 font-mono text-xs text-ink-faint">
                        {block.caption}
                    </figcaption>
                )}
            </figure>
        </div>
    );
}

function renderYoutube(block: GardenYoutubeBlock) {
    const containerClass = block.width === 'bleed' ? 'w-full' : widthClass(block.width);

    return (
        <div className={containerClass}>
            <div className="overflow-hidden border-y border-line bg-canvas">
                <div className="mx-auto w-full max-w-300 px-8 py-8">
                    {block.title && (
                        <div className="mb-4 flex items-center justify-between gap-3">
                            <p className="m-0 font-mono text-xs font-medium uppercase tracking-wider text-ink-faint">
                                {block.title}
                            </p>
                            <span className="rounded-full bg-canvas-inset px-2 py-1 font-mono text-[11px] uppercase tracking-wider text-ink-faint ring-1 ring-line">
                                YouTube
                            </span>
                        </div>
                    )}
                    <div className="overflow-hidden rounded-3xl border border-line bg-canvas">
                        <div className="aspect-video">
                            <iframe
                                src={`https://www.youtube.com/embed/${block.videoId}`}
                                title={block.title ?? 'YouTube embed'}
                                className="h-full w-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            />
                        </div>
                    </div>
                    {block.caption && (
                        <p className="m-0 mt-4 max-w-[68ch] font-sans text-sm leading-relaxed text-ink-muted">
                            {block.caption}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

function renderComponent(block: GardenComponentBlock) {
    return (
        <div className={widthClass(block.width)}>
            <section className="rounded-4xl border border-line bg-canvas p-8 shadow-[0_20px_40px_-24px_rgba(26,25,23,0.16)]">
                <p className="mb-3 font-mono text-xs font-medium uppercase tracking-wider text-accent-blue">
                    {block.label}
                </p>
                <h3 className="m-0 mb-3 font-mono text-2xl leading-tight tracking-tight text-ink">
                    {block.title}
                </h3>
                <p className="m-0 max-w-[60ch] font-sans text-sm leading-relaxed text-ink-muted">
                    {block.description}
                </p>
                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-line bg-canvas-subtle p-4">
                        <p className="m-0 font-mono text-xs uppercase tracking-wider text-ink-faint">
                            Slot A
                        </p>
                        <p className="m-0 mt-2 font-sans text-sm leading-relaxed text-ink-muted">
                            Use this area for supporting charts, custom callouts, or live UI.
                        </p>
                    </div>
                    <div className="rounded-2xl border border-line bg-canvas-subtle p-4">
                        <p className="m-0 font-mono text-xs uppercase tracking-wider text-ink-faint">
                            Slot B
                        </p>
                        <p className="m-0 mt-2 font-sans text-sm leading-relaxed text-ink-muted">
                            Keep the editorial column narrow while other content opens up.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}

function renderBlock(block: GardenDetailBlock) {
    if (block.type === 'paragraph') {
        return renderParagraph(block);
    }

    if (block.type === 'quote') {
        return renderQuote(block);
    }

    if (block.type === 'code') {
        return renderCode(block);
    }

    if (block.type === 'image') {
        return renderImage(block);
    }

    if (block.type === 'youtube') {
        return renderYoutube(block);
    }

    return renderComponent(block);
}

export function GardenPostPage({ entry, tagline, blocks }: GardenPostPageProps) {
    return (
        <article className="bg-canvas-subtle">
            <section className="border-b border-line/60 bg-canvas">
                <div className="mx-auto grid w-full max-w-300 grid-cols-1 gap-10 px-8 pt-36 pb-16 lg:grid-cols-[minmax(0,1fr)_18rem]">
                    <div>
                        <a
                            href="/garden"
                            className="mb-6 inline-flex items-center gap-2 rounded-full bg-canvas-inset px-3 py-1.5 font-mono text-xs text-ink-muted ring-1 ring-line transition-all duration-200 hover:bg-accent-blue-soft hover:text-accent-blue active:-translate-y-px"
                        >
                            <ArrowLeft size={12} weight="bold" />
                            Back to garden
                        </a>

                        <p className="mb-4 font-mono text-xs font-medium uppercase tracking-widest text-accent-green">
                            {TYPE_META[entry.type].label}
                        </p>

                        <h1 className="m-0 max-w-[14ch] font-mono text-[clamp(2.9rem,7vw,5.75rem)] font-bold leading-[0.95] tracking-tighter text-ink">
                            {entry.title}
                        </h1>

                        <p className="mt-6 max-w-[64ch] font-sans text-lg leading-8 text-ink-muted">
                            {tagline}
                        </p>
                    </div>

                    <aside className="flex flex-col gap-4 border-t border-line pt-6 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
                        <div>
                            <p className="m-0 font-mono text-xs font-medium uppercase tracking-wider text-ink-faint">
                                Stage
                            </p>
                            <div className="mt-2 flex items-center gap-2">
                                <span
                                    className={`inline-flex items-center gap-1 font-mono text-sm font-medium ${STAGE_META[entry.stage].className}`}
                                >
                                    {STAGE_META[entry.stage].label}
                                    <StageIcon stage={entry.stage} />
                                </span>
                            </div>
                        </div>

                        <div>
                            <p className="m-0 font-mono text-xs font-medium uppercase tracking-wider text-ink-faint">
                                Last edited
                            </p>
                            <p className="m-0 mt-2 font-mono text-sm text-ink">
                                {entry.lastEdited}
                            </p>
                        </div>

                        <div>
                            <p className="m-0 font-mono text-xs font-medium uppercase tracking-wider text-ink-faint">
                                Tags
                            </p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                {entry.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="rounded-full bg-canvas-inset px-2 py-1 font-mono text-xs text-ink-muted ring-1 ring-line"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </section>

            <section className="flex flex-col gap-12 py-12">
                {blocks.map((block, index) => (
                    <div key={`${entry.href}-${index}`}>{renderBlock(block)}</div>
                ))}
            </section>
        </article>
    );
}
