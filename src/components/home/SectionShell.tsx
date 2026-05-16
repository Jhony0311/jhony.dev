import type { ReactNode } from 'react';

type SectionShellProps = {
    readonly eyebrow: string;
    readonly title: string;
    readonly description: string;
    readonly children: ReactNode;
};

export function SectionShell({
    eyebrow,
    title,
    description,
    children,
}: SectionShellProps) {
    return (
        <section className="grid gap-6 border-t border-white/10 py-10 md:py-14 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-10">
            <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-300/80">
                    {eyebrow}
                </p>
                <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white md:text-3xl">
                    {title}
                </h2>
                <p className="mt-4 max-w-[62ch] text-base leading-7 text-slate-300">
                    {description}
                </p>
            </div>
            <div>{children}</div>
        </section>
    );
}
