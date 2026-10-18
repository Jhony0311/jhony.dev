import {
  Button as AriaButton,
  Link as AriaLink,
  type ButtonProps as AriaButtonProps,
  type LinkProps as AriaLinkProps,
} from "react-aria-components";
import { useLayoutEffect, useRef, type ReactNode } from "react";
import { tv } from "tailwind-variants";

type Variant = "green" | "blue" | "subtle";
type Size = "sm" | "md";
type IconPosition = "left" | "right";

type ButtonEvents = Pick<
  AriaButtonProps,
  | "onPress"
  | "onPressStart"
  | "onPressEnd"
  | "onPressChange"
  | "onHoverStart"
  | "onHoverEnd"
  | "onHoverChange"
  | "onFocus"
  | "onBlur"
  | "onFocusChange"
  | "onKeyDown"
  | "onKeyUp"
>;

type LinkEvents = Pick<
  AriaLinkProps,
  | "onPress"
  | "onPressStart"
  | "onPressEnd"
  | "onPressChange"
  | "onPressUp"
  | "onHoverStart"
  | "onHoverEnd"
  | "onHoverChange"
  | "onFocus"
  | "onBlur"
  | "onFocusChange"
  | "onKeyDown"
  | "onKeyUp"
>;

type ButtonFields = Pick<
  AriaButtonProps,
  "isPending" | "type" | "name" | "value" | "form" | "formAction" | "formMethod" | "formTarget"
>;

type LinkFields = Pick<AriaLinkProps, "download" | "hrefLang" | "rel" | "target">;

type SharedProps = {
  variant?: Variant;
  size?: Size;
  iconPosition?: IconPosition;
  className?: string;
  isDisabled?: boolean;
};

type LabeledProps = SharedProps & {
  children: ReactNode;
  icon?: ReactNode;
  "aria-label"?: string;
};

type IconOnlyProps = SharedProps & {
  children?: never;
  icon: ReactNode;
  "aria-label": string;
};

type ContentProps = LabeledProps | IconOnlyProps;

type ActionProps = ContentProps &
  ButtonEvents &
  ButtonFields & {
    href?: never;
    download?: never;
    hrefLang?: never;
    rel?: never;
    target?: never;
    onPressUp?: never;
  };

type AnchorProps = ContentProps &
  LinkEvents &
  LinkFields & {
    href: string;
    isPending?: never;
    type?: never;
    name?: never;
    value?: never;
    form?: never;
    formAction?: never;
    formMethod?: never;
    formTarget?: never;
  };

export type ButtonProps = ActionProps | AnchorProps;

// tailwind-merge treats a bare `outline` utility as an outline width, so it
// drops `focus-visible:outline` when `focus-visible:outline-2` is present.
// Tailwind v4 uses that bare utility for outline style. Keep the style.
const buttonStyles = tv(
  {
    slots: {
      base: "relative inline-flex items-center justify-center rounded-full font-mono font-medium no-underline transition-all duration-200 data-[pressed]:-translate-y-px data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:transition-none motion-reduce:data-[pressed]:translate-y-0",
      label: "",
      icon: "inline-flex shrink-0",
      spinner:
        "pointer-events-none absolute inset-0 m-auto animate-spin motion-reduce:animate-none",
    },
    variants: {
      variant: {
        blue: {
          base: "border border-accent-blue-soft bg-accent-blue-soft text-accent-blue hover:border-accent-blue hover:bg-accent-blue hover:text-canvas focus-visible:outline-accent-blue data-[disabled]:hover:border-accent-blue-soft data-[disabled]:hover:bg-accent-blue-soft data-[disabled]:hover:text-accent-blue",
        },
        green: {
          base: "bg-accent-green-soft text-accent-green ring-1 ring-accent-green/30 hover:bg-accent-green hover:text-canvas focus-visible:outline-accent-green data-[disabled]:hover:bg-accent-green-soft data-[disabled]:hover:text-accent-green",
        },
        subtle: {
          base: "bg-canvas-inset text-ink-muted ring-1 ring-line hover:bg-accent-blue-soft hover:text-accent-blue focus-visible:outline-accent-blue data-[disabled]:hover:bg-canvas-inset data-[disabled]:hover:text-ink-muted",
        },
      },
      size: {
        sm: { base: "gap-1.5 px-3 py-1.5 text-xs", spinner: "size-3.5" },
        md: { base: "gap-1.5 px-4 py-2 text-sm", spinner: "size-4" },
      },
      iconOnly: {
        true: { label: "sr-only" },
        false: {},
      },
      pending: {
        true: { label: "opacity-0", icon: "opacity-0" },
        false: {},
      },
    },
    compoundVariants: [
      { iconOnly: true, size: "sm", class: { base: "h-8 w-8 p-0" } },
      { iconOnly: true, size: "md", class: { base: "h-10 w-10 p-0" } },
    ],
    defaultVariants: {
      variant: "blue",
      size: "md",
      iconOnly: false,
      pending: false,
    },
  },
  {
    twMergeConfig: {
      override: {
        classGroups: {
          "outline-w": [{ outline: ["0", "1", "2", "4", "8"] }],
        },
      },
    },
  },
);

function isIconOnly(children: ReactNode, icon: ReactNode | undefined) {
  return icon != null && (children == null || children === false);
}

function describeButton({
  children,
  icon,
  ariaLabel,
  variant,
  size,
  className,
  pending = false,
}: {
  children?: ReactNode;
  icon?: ReactNode;
  ariaLabel?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  pending?: boolean;
}) {
  const iconOnly = isIconOnly(children, icon);

  if (iconOnly && (ariaLabel == null || ariaLabel === "")) {
    throw new Error("Button requires aria-label when it renders an icon without a label.");
  }

  const styles = buttonStyles({ variant, size, iconOnly, pending });

  return {
    iconOnly,
    className: styles.base({ className }),
    labelClassName: styles.label(),
    iconClassName: styles.icon(),
    spinnerClassName: styles.spinner(),
  };
}

function PendingSpinner({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2.5" opacity="0.25" />
      <path
        d="M20 12a8 8 0 0 0-8-8"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ButtonBody({
  children,
  icon,
  iconPosition,
  iconOnly,
  pending,
  ariaLabel,
  labelClassName,
  iconClassName,
  spinnerClassName,
}: {
  children?: ReactNode;
  icon?: ReactNode;
  iconPosition: IconPosition;
  iconOnly: boolean;
  pending: boolean;
  ariaLabel?: string;
  labelClassName: string;
  iconClassName: string;
  spinnerClassName: string;
}) {
  const label = iconOnly ? ariaLabel : children;
  const iconNode =
    icon != null ? (
      <span aria-hidden="true" className={iconClassName}>
        {icon}
      </span>
    ) : null;

  return (
    <>
      {pending ? <PendingSpinner className={spinnerClassName} /> : null}
      {iconPosition === "left" ? iconNode : null}
      {label != null && label !== false ? <span className={labelClassName}>{label}</span> : null}
      {iconPosition === "right" ? iconNode : null}
    </>
  );
}

function LinkButton({
  href,
  download,
  hrefLang,
  rel,
  target,
  variant,
  size,
  icon,
  iconPosition = "right",
  className,
  children,
  isDisabled,
  "aria-label": ariaLabel,
  onPress,
  onPressStart,
  onPressEnd,
  onPressChange,
  onPressUp,
  onHoverStart,
  onHoverEnd,
  onHoverChange,
  onFocus,
  onBlur,
  onFocusChange,
  onKeyDown,
  onKeyUp,
}: Extract<ButtonProps, { href: string }>) {
  const parts = describeButton({ children, icon, ariaLabel, variant, size, className });
  const ref = useRef<HTMLAnchorElement>(null);

  // react-aria Link keeps download, rel, and target, and drops hrefLang before
  // the DOM node is created. Set the attribute on the element it rendered.
  useLayoutEffect(() => {
    const node = ref.current;

    if (!node) {
      return;
    }

    if (hrefLang == null || hrefLang === "") {
      node.removeAttribute("hreflang");
      return;
    }

    node.setAttribute("hreflang", hrefLang);
  }, [hrefLang]);

  return (
    <AriaLink
      ref={ref}
      href={href}
      download={download}
      hrefLang={hrefLang}
      rel={rel}
      target={target}
      isDisabled={isDisabled}
      aria-label={ariaLabel}
      className={parts.className}
      onPress={onPress}
      onPressStart={onPressStart}
      onPressEnd={onPressEnd}
      onPressChange={onPressChange}
      onPressUp={onPressUp}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      onHoverChange={onHoverChange}
      onFocus={onFocus}
      onBlur={onBlur}
      onFocusChange={onFocusChange}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
    >
      <ButtonBody
        icon={icon}
        iconPosition={iconPosition}
        iconOnly={parts.iconOnly}
        pending={false}
        ariaLabel={ariaLabel}
        labelClassName={parts.labelClassName}
        iconClassName={parts.iconClassName}
        spinnerClassName={parts.spinnerClassName}
      >
        {children}
      </ButtonBody>
    </AriaLink>
  );
}

function ActionButton({
  variant,
  size,
  icon,
  iconPosition = "right",
  className,
  children,
  isDisabled,
  isPending,
  type,
  name,
  value,
  form,
  formAction,
  formMethod,
  formTarget,
  "aria-label": ariaLabel,
  onPress,
  onPressStart,
  onPressEnd,
  onPressChange,
  onHoverStart,
  onHoverEnd,
  onHoverChange,
  onFocus,
  onBlur,
  onFocusChange,
  onKeyDown,
  onKeyUp,
}: Exclude<ButtonProps, { href: string }>) {
  const pending = isPending ?? false;
  const parts = describeButton({
    children,
    icon,
    ariaLabel,
    variant,
    size,
    className,
    pending,
  });

  return (
    <AriaButton
      type={type ?? "button"}
      isDisabled={isDisabled}
      isPending={pending}
      name={name}
      value={value}
      form={form}
      formAction={formAction}
      formMethod={formMethod}
      formTarget={formTarget}
      aria-label={ariaLabel}
      className={parts.className}
      onPress={onPress}
      onPressStart={onPressStart}
      onPressEnd={onPressEnd}
      onPressChange={onPressChange}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      onHoverChange={onHoverChange}
      onFocus={onFocus}
      onBlur={onBlur}
      onFocusChange={onFocusChange}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
    >
      <ButtonBody
        icon={icon}
        iconPosition={iconPosition}
        iconOnly={parts.iconOnly}
        pending={pending}
        ariaLabel={ariaLabel}
        labelClassName={parts.labelClassName}
        iconClassName={parts.iconClassName}
        spinnerClassName={parts.spinnerClassName}
      >
        {children}
      </ButtonBody>
    </AriaButton>
  );
}

export function Button(props: ButtonProps) {
  if ("href" in props && typeof props.href === "string") {
    return <LinkButton {...props} href={props.href} />;
  }

  return <ActionButton {...props} />;
}
