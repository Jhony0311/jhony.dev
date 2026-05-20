import { useEffect, useMemo, useState, type ReactNode } from 'react';
import {
    ArrowLeft,
    ArrowRight,
    Leaf,
    Plant,
    SlidersHorizontal,
    Tree,
    X,
} from '@phosphor-icons/react';
import { Button, Dialog, DialogTrigger, Popover } from 'react-aria-components';
import { GardenCard } from './GardenCard';
import {
    gardenEntries,
    type GardenStage,
    type GardenType,
} from '../home/home-data';

const ITEMS_PER_PAGE = 6;
const ALL_FILTER = 'All';
const STAGE_PARAM = 'stage';
const TAGS_PARAM = 'tags';
const PAGE_PARAM = 'page';

type FilterOption = GardenType | GardenStage | typeof ALL_FILTER;

type GardenFilterState = {
    selectedType: FilterOption;
    selectedStage: FilterOption;
    selectedTags: string[];
    page: number;
};

const STAGE_OPTIONS: readonly GardenStage[] = [
    'Seedling',
    'Budding',
    'Evergreen',
];
const ALL_TAGS = Array.from(
    new Set(gardenEntries.flatMap((entry) => entry.tags)),
).sort();
const CATEGORY_SEGMENT_BY_TYPE: Record<GardenType, string> = {
    Essay: 'essay',
    Note: 'note',
    Snippet: 'snippet',
};

const TYPE_BY_CATEGORY_SEGMENT: Record<string, GardenType> = {
    essay: 'Essay',
    note: 'Note',
    snippet: 'Snippet',
};

const MATURITY_META: Record<
    GardenStage,
    { icon: typeof Leaf; className: string }
> = {
    Seedling: { icon: Leaf, className: 'text-stage-seedling' },
    Budding: { icon: Plant, className: 'text-stage-budding' },
    Evergreen: { icon: Tree, className: 'text-stage-evergreen' },
};

function isStage(value: string | null): value is GardenStage {
    return value !== null && STAGE_OPTIONS.includes(value as GardenStage);
}

function parsePage(value: string | null): number {
    const parsed = Number(value);
    return Number.isInteger(parsed) && parsed > 0 ? parsed : 1;
}

function parseTypeFromPathname(pathname: string): FilterOption {
    const segments = pathname.split('/').filter(Boolean);
    const gardenIndex = segments.indexOf('garden');

    if (gardenIndex === -1) {
        return ALL_FILTER;
    }

    const categorySegment = segments[gardenIndex + 1];

    if (!categorySegment) {
        return ALL_FILTER;
    }

    return TYPE_BY_CATEGORY_SEGMENT[categorySegment] ?? ALL_FILTER;
}

function parseStateFromLocation(
    pathname: string,
    search: string,
): GardenFilterState {
    const params = new URLSearchParams(search);

    const selectedType = parseTypeFromPathname(pathname);
    const selectedStage = isStage(params.get(STAGE_PARAM))
        ? params.get(STAGE_PARAM)
        : ALL_FILTER;

    const selectedTags = (params.get(TAGS_PARAM) ?? '')
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0 && ALL_TAGS.includes(tag));

    return {
        selectedType,
        selectedStage,
        selectedTags: Array.from(new Set(selectedTags)),
        page: parsePage(params.get(PAGE_PARAM)),
    };
}

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

function FilterGroup({
    label,
    options,
    selected,
    onSelect,
    renderOption,
}: {
    label: string;
    options: readonly string[];
    selected: string;
    onSelect: (value: string) => void;
    renderOption?: (option: string) => ReactNode;
}) {
    return (
        <div className="flex flex-col gap-2">
            <p className="m-0 font-mono text-xs font-medium uppercase tracking-wider text-ink-faint">
                {label}
            </p>

            <div className="flex flex-wrap gap-2">
                {options.map((option) => {
                    const isActive = option === selected;

                    return (
                        <button
                            key={option}
                            type="button"
                            onClick={() => onSelect(option)}
                            className={[
                                'rounded-full px-3 py-1.5 font-mono text-xs transition-all duration-200 active:-translate-y-px',
                                isActive
                                    ? 'bg-accent-blue text-canvas ring-1 ring-accent-blue/20'
                                    : 'bg-canvas-inset text-ink-muted ring-1 ring-line hover:bg-accent-blue-soft hover:text-accent-blue',
                            ].join(' ')}
                        >
                            {renderOption ? renderOption(option) : option}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

function TagFilterGroup({
    allTags,
    selectedTags,
    onToggleTag,
    onClearTags,
}: {
    allTags: readonly string[];
    selectedTags: readonly string[];
    onToggleTag: (tag: string) => void;
    onClearTags: () => void;
}) {
    const visibleTags = selectedTags.slice(0, 3);
    const hiddenTagsCount = Math.max(
        0,
        selectedTags.length - visibleTags.length,
    );

    return (
        <div className="flex flex-col gap-2">
            <p className="m-0 font-mono text-xs font-medium uppercase tracking-wider text-ink-faint">
                Tags
            </p>

            <div className="flex min-h-9 items-center gap-2">
                <div className="flex min-w-0 flex-wrap items-center gap-1.5">
                    {selectedTags.length === 0 ? (
                        <span className="rounded-full bg-canvas-inset px-2 py-1 font-mono text-xs text-ink-muted ring-1 ring-line">
                            All
                        </span>
                    ) : (
                        <>
                            {visibleTags.map((tag) => (
                                <span
                                    key={tag}
                                    className="inline-flex items-center gap-1 rounded-full bg-accent-blue-soft px-2 py-1 font-mono text-xs text-accent-blue ring-1 ring-accent-blue/30"
                                >
                                    {tag}
                                </span>
                            ))}

                            {hiddenTagsCount > 0 && (
                                <span className="inline-flex items-center rounded-full bg-canvas-inset px-2 py-1 font-mono text-xs text-ink-muted ring-1 ring-line">
                                    +{hiddenTagsCount}
                                </span>
                            )}
                        </>
                    )}
                </div>

                <DialogTrigger>
                    <Button
                        className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-canvas-inset text-ink-muted ring-1 ring-line transition-all duration-200 hover:bg-accent-blue-soft hover:text-accent-blue active:-translate-y-px"
                        aria-label="Adjust tag filters"
                    >
                        <SlidersHorizontal size={14} weight="bold" />
                    </Button>

                    <Popover
                        placement="bottom end"
                        offset={8}
                        className="w-88 rounded-xl border border-line bg-canvas p-3 shadow-[0_10px_30px_-14px_rgba(26,25,23,0.35)]"
                    >
                        <Dialog className="h-88 outline-none">
                            <div className="mb-3 flex items-center justify-between border-b border-line pb-2">
                                <p className="m-0 font-mono text-xs font-medium uppercase tracking-wider text-ink-faint">
                                    Filter tags
                                </p>

                                {selectedTags.length > 0 && (
                                    <button
                                        type="button"
                                        onClick={onClearTags}
                                        className="inline-flex items-center gap-1 rounded-full bg-canvas-inset px-2 py-1 font-mono text-xs text-ink-muted ring-1 ring-line transition-all duration-200 hover:bg-accent-blue-soft hover:text-accent-blue active:-translate-y-px"
                                    >
                                        <X size={10} weight="bold" />
                                        Clear
                                    </button>
                                )}
                            </div>

                            <div className="flex h-[calc(100%-2.5rem)] flex-wrap content-start gap-1.5 overflow-y-auto pr-1">
                                {allTags.map((tag) => {
                                    const isSelected =
                                        selectedTags.includes(tag);

                                    return (
                                        <button
                                            key={tag}
                                            type="button"
                                            onClick={() => onToggleTag(tag)}
                                            className={[
                                                'inline-flex items-center rounded-full px-2.5 py-1 font-mono text-xs ring-1 transition-all duration-200 active:-translate-y-px',
                                                isSelected
                                                    ? 'bg-accent-blue-soft text-accent-blue ring-accent-blue/25'
                                                    : 'bg-canvas-inset text-ink-muted ring-line hover:bg-accent-blue-soft hover:text-accent-blue',
                                            ].join(' ')}
                                        >
                                            {tag}
                                        </button>
                                    );
                                })}
                            </div>
                        </Dialog>
                    </Popover>
                </DialogTrigger>
            </div>
        </div>
    );
}

export function GardenPage() {
    const initialState =
        typeof window !== 'undefined'
            ? parseStateFromLocation(
                  window.location.pathname,
                  window.location.search,
              )
            : {
                  selectedType: ALL_FILTER,
                  selectedStage: ALL_FILTER,
                  selectedTags: [],
                  page: 1,
              };

    const [selectedType, setSelectedType] = useState<FilterOption>(
        initialState.selectedType,
    );
    const [selectedStage, setSelectedStage] = useState<FilterOption>(
        initialState.selectedStage,
    );
    const [selectedTags, setSelectedTags] = useState<string[]>(
        initialState.selectedTags,
    );
    const [page, setPage] = useState(initialState.page);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => setLoading(false), 450);
        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        setPage(1);
    }, [selectedType, selectedStage, selectedTags]);

    const allTags = useMemo(() => ALL_TAGS, []);

    function toggleTag(tag: string) {
        setSelectedTags((current) => {
            if (current.includes(tag)) {
                return current.filter((item) => item !== tag);
            }

            return [...current, tag];
        });
    }

    const filteredEntries = useMemo(() => {
        return gardenEntries.filter((entry) => {
            const typePass =
                selectedType === ALL_FILTER || entry.type === selectedType;
            const stagePass =
                selectedStage === ALL_FILTER || entry.stage === selectedStage;
            const tagPass =
                selectedTags.length === 0 ||
                selectedTags.some((tag) => entry.tags.includes(tag));

            return typePass && stagePass && tagPass;
        });
    }, [selectedType, selectedStage, selectedTags]);

    const pageCount = Math.max(
        1,
        Math.ceil(filteredEntries.length / ITEMS_PER_PAGE),
    );
    const clampedPage = Math.min(page, pageCount);
    const paginatedEntries = filteredEntries.slice(
        (clampedPage - 1) * ITEMS_PER_PAGE,
        clampedPage * ITEMS_PER_PAGE,
    );

    const pageNumbers = Array.from({ length: pageCount }, (_, i) => i + 1);

    useEffect(() => {
        if (page !== clampedPage) {
            setPage(clampedPage);
        }
    }, [page, clampedPage]);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        if (selectedStage === ALL_FILTER) {
            params.delete(STAGE_PARAM);
        } else {
            params.set(STAGE_PARAM, selectedStage);
        }

        if (selectedTags.length === 0) {
            params.delete(TAGS_PARAM);
        } else {
            params.set(TAGS_PARAM, selectedTags.join(','));
        }

        if (clampedPage <= 1) {
            params.delete(PAGE_PARAM);
        } else {
            params.set(PAGE_PARAM, String(clampedPage));
        }

        const categoryPath =
            selectedType === ALL_FILTER
                ? '/garden'
                : `/garden/${CATEGORY_SEGMENT_BY_TYPE[selectedType]}`;
        const nextSearch = params.toString();
        const nextUrl = `${categoryPath}${nextSearch ? `?${nextSearch}` : ''}`;
        window.history.replaceState(null, '', nextUrl);
    }, [selectedType, selectedStage, selectedTags, clampedPage]);

    useEffect(() => {
        const onPopState = () => {
            const state = parseStateFromLocation(
                window.location.pathname,
                window.location.search,
            );
            setSelectedType(state.selectedType);
            setSelectedStage(state.selectedStage);
            setSelectedTags(state.selectedTags);
            setPage(state.page);
        };

        window.addEventListener('popstate', onPopState);
        return () => window.removeEventListener('popstate', onPopState);
    }, []);

    return (
        <>
            <section className="border-b border-line/60 bg-canvas">
                <div className="mx-auto w-full max-w-300 px-8 pt-36 pb-16">
                    <p className="mb-4 font-mono text-xs font-medium uppercase tracking-widest text-accent-green">
                        Digital Garden
                    </p>

                    <h1 className="m-0 mb-6 max-w-[15ch] font-mono text-[clamp(2.75rem,7vw,5.25rem)] font-bold leading-[0.95] tracking-[-0.04em] text-ink">
                        A living map of ongoing work
                    </h1>

                    <p className="m-0 max-w-[62ch] font-sans text-base font-light leading-relaxed text-ink-muted">
                        This is the center of gravity for my notes, essays, and
                        snippets. Every entry reflects work in motion, with
                        visible maturity stages and last edited dates so ideas
                        stay useful as they evolve.
                    </p>
                </div>
            </section>

            <section className="bg-canvas-subtle">
                <div className="mx-auto w-full max-w-300 px-8 py-14">
                    <div className="mb-8 grid grid-cols-1 gap-6 border-b border-line pb-8 md:grid-cols-3">
                        <FilterGroup
                            label="Category"
                            options={[ALL_FILTER, 'Essay', 'Note', 'Snippet']}
                            selected={selectedType}
                            onSelect={setSelectedType}
                        />

                        <FilterGroup
                            label="Maturity"
                            options={[
                                ALL_FILTER,
                                'Seedling',
                                'Budding',
                                'Evergreen',
                            ]}
                            selected={selectedStage}
                            onSelect={setSelectedStage}
                            renderOption={(option) => {
                                if (option === ALL_FILTER) {
                                    return option;
                                }

                                const stage = option as GardenStage;
                                const { icon: StageIcon, className } =
                                    MATURITY_META[stage];

                                return (
                                    <span className="inline-flex items-center gap-1.5">
                                        <span>{option}</span>
                                        <StageIcon
                                            size={12}
                                            weight="fill"
                                            className={className}
                                        />
                                    </span>
                                );
                            }}
                        />

                        <TagFilterGroup
                            allTags={allTags}
                            selectedTags={selectedTags}
                            onToggleTag={toggleTag}
                            onClearTags={() => setSelectedTags([])}
                        />
                    </div>

                    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                        <p className="m-0 font-mono text-xs text-ink-faint">
                            {filteredEntries.length}{' '}
                            {filteredEntries.length === 1 ? 'entry' : 'entries'}
                        </p>

                        {(selectedType !== ALL_FILTER ||
                            selectedStage !== ALL_FILTER ||
                            selectedTags.length > 0) && (
                            <button
                                type="button"
                                onClick={() => {
                                    setSelectedType(ALL_FILTER);
                                    setSelectedStage(ALL_FILTER);
                                    setSelectedTags([]);
                                }}
                                className="rounded-full bg-canvas-inset px-3 py-1.5 font-mono text-xs text-ink-muted ring-1 ring-line transition-all duration-200 hover:bg-accent-blue-soft hover:text-accent-blue active:-translate-y-px"
                            >
                                Reset filters
                            </button>
                        )}
                    </div>

                    {loading ? (
                        <GardenSkeleton />
                    ) : paginatedEntries.length === 0 ? (
                        <div className="rounded-lg border border-line bg-canvas p-10 text-center">
                            <p className="m-0 mb-2 font-mono text-sm font-medium text-ink">
                                No entries match these filters
                            </p>
                            <p className="m-0 font-sans text-sm font-light leading-relaxed text-ink-muted">
                                Try a different category, maturity stage, or
                                tag.
                            </p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4">
                            {paginatedEntries.map((entry) => (
                                <GardenCard key={entry.href} entry={entry} />
                            ))}
                        </div>
                    )}

                    {pageCount > 1 &&
                        !loading &&
                        paginatedEntries.length > 0 && (
                            <div className="mt-8 flex flex-wrap items-center justify-center gap-2 border-t border-line pt-6">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setPage((prev) => Math.max(1, prev - 1))
                                    }
                                    disabled={clampedPage === 1}
                                    className="inline-flex items-center gap-1 rounded-full bg-canvas-inset px-3 py-1.5 font-mono text-xs text-ink-muted ring-1 ring-line transition-all duration-200 hover:bg-accent-blue-soft hover:text-accent-blue disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <ArrowLeft size={12} weight="bold" />
                                    Prev
                                </button>

                                {pageNumbers.map((pageNumber) => (
                                    <button
                                        key={pageNumber}
                                        type="button"
                                        onClick={() => setPage(pageNumber)}
                                        className={[
                                            'h-8 min-w-8 rounded-full px-2 font-mono text-xs ring-1 transition-all duration-200 active:-translate-y-px',
                                            pageNumber === clampedPage
                                                ? 'bg-accent-blue text-canvas ring-accent-blue/20'
                                                : 'bg-canvas-inset text-ink-muted ring-line hover:bg-accent-blue-soft hover:text-accent-blue',
                                        ].join(' ')}
                                    >
                                        {pageNumber}
                                    </button>
                                ))}

                                <button
                                    type="button"
                                    onClick={() =>
                                        setPage((prev) =>
                                            Math.min(pageCount, prev + 1),
                                        )
                                    }
                                    disabled={clampedPage === pageCount}
                                    className="inline-flex items-center gap-1 rounded-full bg-canvas-inset px-3 py-1.5 font-mono text-xs text-ink-muted ring-1 ring-line transition-all duration-200 hover:bg-accent-blue-soft hover:text-accent-blue disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    Next
                                    <ArrowRight size={12} weight="bold" />
                                </button>
                            </div>
                        )}
                </div>
            </section>
        </>
    );
}
