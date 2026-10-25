// @vitest-environment happy-dom
// @vitest-environment-options {"settings":{"navigation":{"disableMainFrameNavigation":true,"disableFallbackToSetURL":true}}}

import { createEvent, fireEvent, screen, within } from "@testing-library/dom";
import { cleanup, render } from "@testing-library/react";
import { createElement, type ReactNode } from "react";
import { afterEach, describe, expect, it } from "vitest";
import { Button, type ButtonProps } from "./Button";

afterEach(() => {
  cleanup();
});

function press(control: HTMLElement) {
  const pointerInit = { button: 0, pointerId: 1 };
  fireEvent.pointerDown(control, pointerInit);
  fireEvent.pointerUp(control, pointerInit);

  const click = createEvent.click(control, { button: 0 });
  fireEvent(control, click);

  return click;
}

function requireButton(element: HTMLElement) {
  if (!(element instanceof HTMLButtonElement)) {
    throw new Error("Expected a button");
  }

  return element;
}

function requireAnchor(element: HTMLElement) {
  if (!(element instanceof HTMLAnchorElement)) {
    throw new Error("Expected an anchor");
  }

  return element;
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
    render(
      <Button
        href="/garden"
        download="notes.md"
        rel="noreferrer"
        target="_blank"
        onPress={() => {
          presses += 1;
        }}
      >
        All entries
      </Button>,
    );
    const link = requireAnchor(screen.getByRole("link", { name: "All entries" }));

    expect(link.getAttribute("href")).toBe("/garden");
    expect(link.getAttribute("download")).toBe("notes.md");
    expect(link.getAttribute("rel")).toBe("noreferrer");
    expect(link.getAttribute("target")).toBe("_blank");
    expect(link.textContent).toContain("All entries");

    const click = press(link);

    expect(click.defaultPrevented).toBe(false);
    expect(presses).toBe(1);
  });

  it("renders a button when href is omitted", () => {
    let presses = 0;
    render(
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
    const button = requireButton(screen.getByRole("button", { name: "Save" }));

    expect(button.type).toBe("submit");
    expect(button.name).toBe("action");
    expect(button.value).toBe("save");
    expect(button.getAttribute("form")).toBe("profile");
    expect(button.getAttribute("formAction")).toBe("/save");
    expect(button.getAttribute("formMethod")).toBe("post");
    expect(button.getAttribute("formTarget")).toBe("_self");

    press(button);

    expect(presses).toBe(1);
  });

  it("defaults to a blue md button", () => {
    render(<Button>Save</Button>);
    const button = requireButton(screen.getByRole("button", { name: "Save" }));

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
    render(
      <Button variant="green" size="sm" className="mt-1">
        Read
      </Button>,
    );
    const button = screen.getByRole("button", { name: "Read" });

    expect(button.className).toContain("bg-accent-green-soft");
    expect(button.className).toContain("text-accent-green");
    expect(button.className).toContain("px-3");
    expect(button.className).toContain("text-xs");
    expect(button.className).toContain("mt-1");
    expect(button.className).not.toContain("px-4");
  });

  it("places one icon on the requested side", () => {
    const right = render(<Button icon={<span>icon-mark</span>}>Next</Button>);
    const rightControl = within(right.container).getByRole("button", { name: "Next" });
    const rightHtml = rightControl.innerHTML;

    expect(rightHtml.indexOf("Next")).toBeLessThan(rightHtml.indexOf("icon-mark"));

    const left = render(
      <Button variant="subtle" iconPosition="left" icon={<span>icon-mark</span>}>
        Prev
      </Button>,
    );
    const leftControl = within(left.container).getByRole("button", { name: "Prev" });

    expect(leftControl.className).toContain("bg-canvas-inset");
    expect(leftControl.innerHTML.indexOf("icon-mark")).toBeLessThan(
      leftControl.innerHTML.indexOf("Prev"),
    );
  });

  it("renders an icon-only circle and requires aria-label", () => {
    render(
      <Button
        variant="subtle"
        size="sm"
        aria-label="Adjust tag filters"
        icon={<span>icon</span>}
      />,
    );
    const button = screen.getByRole("button", { name: "Adjust tag filters" });

    expect(button.getAttribute("aria-label")).toBe("Adjust tag filters");
    expect(button.className).toContain("h-8");
    expect(button.className).toContain("w-8");
    expect(button.className).toContain("p-0");
    expect(button.textContent).toContain("Adjust tag filters");

    expect(() => {
      render(createElement(Button, { icon: createElement("span") } as unknown as ButtonProps));
    }).toThrow(/aria-label/);
  });

  it("shows a spinner while pending and keeps the label available", () => {
    let presses = 0;
    render(
      <Button
        isPending
        onPress={() => {
          presses += 1;
        }}
      >
        Save
      </Button>,
    );
    const button = requireButton(screen.getByRole("button", { name: "Save" }));
    const label = within(button).getByText("Save");

    expect(button.type).toBe("button");
    expect(button.hasAttribute("disabled")).toBe(false);
    expect(button.getAttribute("aria-disabled")).toBe("true");
    expect(button.querySelector("svg")).not.toBeNull();
    expect(label.className).toContain("opacity-0");
    expect(label.getAttribute("aria-hidden")).toBeNull();
    expect(button.textContent).toContain("Save");

    press(button);

    expect(presses).toBe(0);
  });

  it("disables both the button and the link", () => {
    const buttonView = render(<Button isDisabled>Save</Button>);
    const button = within(buttonView.container).getByRole("button", { name: "Save" });

    expect(button.getAttribute("data-disabled")).toBe("true");
    expect(button.className).toContain("cursor-not-allowed");
    expect(button.className).toContain("opacity-50");

    const linkView = render(
      <Button href="/garden" isDisabled>
        All entries
      </Button>,
    );

    expect(linkView.container.querySelector("a")).toBeNull();
    const link = within(linkView.container).getByRole("link", { name: "All entries" });

    expect(link.getAttribute("role")).toBe("link");
    expect(link.className).toContain("opacity-50");
  });

  it("uses a 40px circle for an icon-only md button", () => {
    render(<Button aria-label="Close" icon={<span>icon</span>} />);
    const button = screen.getByRole("button", { name: "Close" });

    expect(button.className).toContain("h-10");
    expect(button.className).toContain("w-10");
    expect(button.className).toContain("rounded-full");
  });
});
