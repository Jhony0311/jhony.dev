import type { ReactNode } from 'react';

type PillLinkProps = {
    readonly href: string;
    readonly children: ReactNode;
    readonly target?: '_blank' | '_self' | '_parent' | '_top';
    readonly rel?: string;
    readonly className?: string;
};

const BASE_CLASSNAME =
    'inline-flex items-center gap-1.5 rounded-full border border-accent-blue-soft bg-accent-blue-soft px-4 py-2 font-mono text-sm font-medium text-accent-blue no-underline transition-all duration-200 hover:border-accent-blue hover:bg-accent-blue hover:text-canvas active:-translate-y-px';

export function PillLink({
    href,
    children,
    target,
    rel,
    className,
}: PillLinkProps) {
    const mergedClassName = `${BASE_CLASSNAME} ${className ?? ''}`.trim();

    return (
        <a href={href} target={target} rel={rel} className={mergedClassName}>
            {children}
        </a>
    );
}
