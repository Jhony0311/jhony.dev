// @vitest-environment happy-dom
// @vitest-environment-options {"settings":{"navigation":{"disableMainFrameNavigation":true,"disableFallbackToSetURL":true}}}

import { act, createElement, type ReactNode } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, describe, expect, it } from "vitest";
import { Button, type ButtonProps } from "./Button";

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

const cleanups: Array<() => void> = [];

afterEach(() => {
  while (cleanups.length > 0) {
    const cleanup = cleanups.pop();
    cleanup?.();
  }
});

function renderButton(node: ReactNode) {
  const container = document.createElement("div");
  document.body.append(container);
  const root: Root = createRoot(container);

  act(() => {
    root.render(node);
  });

  cleanups.push(() => {
    act(() => {
      root.unmount();
    });
    container.remove();
  });

  return container;
}

function requireControl(container: HTMLElement) {
  const control = container.querySelector("a, button");

  if (!(control instanceof HTMLElement)) {
    throw new Error("Expected Button to render a link or a button");
  }

  return control;
}

function dispatchClick(control: HTMLElement) {
  const eventInit = { bubbles: true, cancelable: true, button: 0 };
  const click = new MouseEvent("click", eventInit);

  act(() => {
    control.dispatchEvent(new PointerEvent("pointerdown", { ...eventInit, pointerId: 1 }));
    control.dispatchEvent(new PointerEvent("pointerup", { ...eventInit, pointerId: 1 }));
    control.dispatchEvent(click);
  });

  return click;
}

function rejectedContracts(): ReactNode {
  return (
    <>
      {/* @ts-expect-error selected state belongs on ToggleButton */}
      <Button isSelected>Save</Button>
      {/* @ts-expect-error pending applies only when href is omitted */}
      <Button href="/garden" isPending>
        All entries
      </Button>
      {/* @ts-expect-error onPressUp applies only when href is set */}
      <Button onPressUp={() => undefined}>Save</Button>
    </>
  );
}

void rejectedContracts;

describe("Button", () => {
  it("renders a link when href is set and follows that href", () => {
    let presses = 0;
    const container = renderButton(
      <Button
        href="/garden"
        download="notes.md"
        hrefLang="en"
        rel="noreferrer"
        target="_blank"
        onPress={() => {
          presses += 1;
        }}
      >
        All entries
      </Button>,
    );
    const link = container.querySelector("a");

    if (!(link instanceof HTMLAnchorElement)) {
      throw new Error("Expected an anchor");
    }

    expect(link.getAttribute("href")).toBe("/garden");
    expect(link.getAttribute("download")).toBe("notes.md");
    expect(link.getAttribute("hreflang")).toBe("en");
    expect(link.getAttribute("rel")).toBe("noreferrer");
    expect(link.getAttribute("target")).toBe("_blank");
    expect(link.textContent).toContain("All entries");

    const click = dispatchClick(link);

    expect(click.defaultPrevented).toBe(false);
    expect(presses).toBe(1);
  });

  it("renders a button when href is omitted", () => {
    let presses = 0;
    const container = renderButton(
      <Button
        type="submit"
        name="action"
        value="save"
        form="profile"
        formAction="/save"
        formMethod="post"
        formTarget="_self"
        onPress={() => {
          presses += 1;
        }}
      >
        Save
      </Button>,
    );
    const button = container.querySelector("button");

    if (!(button instanceof HTMLButtonElement)) {
      throw new Error("Expected a button");
    }

    expect(button.type).toBe("submit");
    expect(button.name).toBe("action");
    expect(button.value).toBe("save");
    expect(button.getAttribute("form")).toBe("profile");
    expect(button.getAttribute("formAction")).toBe("/save");
    expect(button.getAttribute("formMethod")).toBe("post");
    expect(button.getAttribute("formTarget")).toBe("_self");

    dispatchClick(button);

    expect(presses).toBe(1);
  });

  it("defaults to a blue md button", () => {
    const container = renderButton(<Button>Save</Button>);
    const button = requireControl(container);

    if (!(button instanceof HTMLButtonElement)) {
      throw new Error("Expected a button");
    }

    expect(button.type).toBe("button");
    expect(button.className).toContain("bg-accent-blue-soft");
    expect(button.className).toContain("text-accent-blue");
    expect(button.className).toContain("px-4");
    expect(button.className).toContain("text-sm");
    expect(button.className).toContain("focus-visible:outline");
    expect(button.className).toContain("focus-visible:outline-2");
    expect(button.className).toContain("data-[pressed]:-translate-y-px");
    expect(button.className).toContain("data-[disabled]:opacity-50");
  });

  it("applies variant, size, and caller classes", () => {
    const container = renderButton(
      <Button variant="green" size="sm" className="mt-1">
        Read
      </Button>,
    );
    const button = requireControl(container);

    expect(button.className).toContain("bg-accent-green-soft");
    expect(button.className).toContain("text-accent-green");
    expect(button.className).toContain("px-3");
    expect(button.className).toContain("text-xs");
    expect(button.className).toContain("mt-1");
    expect(button.className).not.toContain("px-4");
  });

  it("places one icon on the requested side", () => {
    const right = renderButton(<Button icon={<span>icon-mark</span>}>Next</Button>);
    const rightControl = requireControl(right);
    const rightHtml = rightControl.innerHTML;

    expect(rightHtml.indexOf("Next")).toBeLessThan(rightHtml.indexOf("icon-mark"));

    const left = renderButton(
      <Button variant="subtle" iconPosition="left" icon={<span>icon-mark</span>}>
        Prev
      </Button>,
    );
    const leftControl = requireControl(left);

    expect(leftControl.className).toContain("bg-canvas-inset");
    expect(leftControl.innerHTML.indexOf("icon-mark")).toBeLessThan(
      leftControl.innerHTML.indexOf("Prev"),
    );
  });

  it("renders an icon-only circle and requires aria-label", () => {
    const container = renderButton(
      <Button
        variant="subtle"
        size="sm"
        aria-label="Adjust tag filters"
        icon={<span>icon</span>}
      />,
    );
    const button = requireControl(container);

    expect(button.getAttribute("aria-label")).toBe("Adjust tag filters");
    expect(button.className).toContain("h-8");
    expect(button.className).toContain("w-8");
    expect(button.className).toContain("p-0");
    expect(button.textContent).toContain("Adjust tag filters");

    expect(() => {
      renderButton(
        createElement(Button, { icon: createElement("span") } as unknown as ButtonProps),
      );
    }).toThrow(/aria-label/);
  });

  it("shows a spinner while pending and keeps the label available", () => {
    let presses = 0;
    const container = renderButton(
      <Button
        isPending
        onPress={() => {
          presses += 1;
        }}
      >
        Save
      </Button>,
    );
    const button = requireControl(container);
    const label = button.querySelector("span");

    if (!(button instanceof HTMLButtonElement) || !(label instanceof HTMLSpanElement)) {
      throw new Error("Expected a pending button with a label");
    }

    expect(button.type).toBe("button");
    expect(button.hasAttribute("disabled")).toBe(false);
    expect(button.getAttribute("aria-disabled")).toBe("true");
    expect(button.querySelector("svg")).not.toBeNull();
    expect(label.className).toContain("opacity-0");
    expect(label.getAttribute("aria-hidden")).toBeNull();
    expect(button.textContent).toContain("Save");

    dispatchClick(button);

    expect(presses).toBe(0);
  });

  it("disables both the button and the link", () => {
    const buttonView = renderButton(<Button isDisabled>Save</Button>);
    const button = requireControl(buttonView);

    expect(button.getAttribute("data-disabled")).toBe("true");
    expect(button.className).toContain("cursor-not-allowed");
    expect(button.className).toContain("opacity-50");

    const linkView = renderButton(
      <Button href="/garden" isDisabled>
        All entries
      </Button>,
    );

    expect(linkView.querySelector("a")).toBeNull();
    const link = linkView.querySelector("[data-disabled]");

    if (!(link instanceof HTMLElement)) {
      throw new Error("Expected a disabled link");
    }

    expect(link.getAttribute("role")).toBe("link");
    expect(link.className).toContain("opacity-50");
  });

  it("uses a 40px circle for an icon-only md button", () => {
    const container = renderButton(<Button aria-label="Close" icon={<span>icon</span>} />);
    const button = requireControl(container);

    expect(button.className).toContain("h-10");
    expect(button.className).toContain("w-10");
    expect(button.className).toContain("rounded-full");
  });
});
