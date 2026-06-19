import type { ReactNode } from "react";

type BaseProps = {
  ariaLabel: string;
  title?: string;
  children: ReactNode;
  className?: string;
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
  type?: "button" | "submit" | "reset";
};

type IconActionProps = LinkProps | ButtonProps;

const BASE_CLASSNAME =
  "inline-flex h-10 w-10 items-center justify-center rounded-full bg-canvas-inset text-ink no-underline transition-[background-color,color,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-canvas-subtle hover:text-ink active:-translate-y-px";

export function IconAction({
  ariaLabel,
  title,
  children,
  className,
  ...props
}: IconActionProps) {
  const mergedClassName = `${BASE_CLASSNAME} ${className ?? ""}`.trim();

  if ("href" in props) {
    return (
      <a
        href={props.href}
        target={props.target}
        rel={props.rel}
        aria-label={ariaLabel}
        title={title}
        className={mergedClassName}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      onClick={props.onClick}
      aria-label={ariaLabel}
      title={title}
      className={mergedClassName}
    >
      {children}
    </button>
  );
}
