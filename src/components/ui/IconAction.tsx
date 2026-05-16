import type { CSSProperties, ReactNode } from 'react';

type BaseProps = {
    ariaLabel: string;
    title?: string;
    children: ReactNode;
    className?: string;
    hoverBackground?: string;
    hoverForeground?: string;
};

type LinkProps = BaseProps & {
    href: string;
    target?: string;
    rel?: string;
    onClick?: never;
    type?: never;
};

type ButtonProps = BaseProps & {
    href?: never;
    target?: never;
    rel?: never;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
};

type IconActionProps = LinkProps | ButtonProps;

const BASE_CLASSNAME =
    'inline-flex h-10 w-10 items-center justify-center rounded-full no-underline transition-[background-color,color,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:-translate-y-px bg-[var(--icon-action-bg)] text-[var(--icon-action-fg)] hover:bg-[var(--icon-action-hover-bg)] hover:text-[var(--icon-action-hover-fg)]';

export function IconAction({
    ariaLabel,
    title,
    children,
    className,
    hoverBackground = 'var(--icon-action-hover-bg-default)',
    hoverForeground = 'var(--icon-action-hover-fg-default)',
    ...props
}: IconActionProps) {
    const style = {
        '--icon-action-bg': 'var(--bg-inset)',
        '--icon-action-fg': 'var(--text)',
        '--icon-action-hover-bg': hoverBackground,
        '--icon-action-hover-fg': hoverForeground,
    } as CSSProperties;

    const mergedClassName = `${BASE_CLASSNAME} ${className ?? ''}`.trim();

    if ('href' in props) {
        return (
            <a
                href={props.href}
                target={props.target}
                rel={props.rel}
                aria-label={ariaLabel}
                title={title}
                className={mergedClassName}
                style={style}
            >
                {children}
            </a>
        );
    }

    return (
        <button
            type={props.type ?? 'button'}
            onClick={props.onClick}
            aria-label={ariaLabel}
            title={title}
            className={mergedClassName}
            style={style}
        >
            {children}
        </button>
    );
}
