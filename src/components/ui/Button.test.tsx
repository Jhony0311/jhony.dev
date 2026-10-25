// @vitest-environment happy-dom
// @vitest-environment-options {"settings":{"navigation":{"disableMainFrameNavigation":true,"disableFallbackToSetURL":true}}}

import "@testing-library/jest-dom/vitest";
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
    const link = screen.getByRole("link", { name: "All entries" });

    expect(link).toBeInstanceOf(HTMLAnchorElement);
    expect(link).toHaveAttribute("href", "/garden");
    expect(link).toHaveAttribute("download", "notes.md");
    expect(link).toHaveAttribute("rel", "noreferrer");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveTextContent("All entries");

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
    const button = screen.getByRole("button", { name: "Save" });

    expect(button).toBeInstanceOf(HTMLButtonElement);
    expect(button).toHaveAttribute("type", "submit");
    expect(button).toHaveAttribute("name", "action");
    expect(button).toHaveAttribute("value", "save");
    expect(button).toHaveAttribute("form", "profile");
    expect(button).toHaveAttribute("formAction", "/save");
    expect(button).toHaveAttribute("formMethod", "post");
    expect(button).toHaveAttribute("formTarget", "_self");

    press(button);

    expect(presses).toBe(1);
  });

  it("defaults to a blue md button", () => {
    render(<Button>Save</Button>);
    const button = screen.getByRole("button", { name: "Save" });

    expect(button).toBeInstanceOf(HTMLButtonElement);
    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveClass(
      "bg-accent-blue-soft",
      "text-accent-blue",
      "px-4",
      "text-sm",
      "focus-visible:outline",
      "focus-visible:outline-2",
      "data-[pressed]:-translate-y-px",
      "data-[disabled]:opacity-50",
    );
  });

  it("applies variant, size, and caller classes", () => {
    render(
      <Button variant="green" size="sm" className="mt-1">
        Read
      </Button>,
    );
    const button = screen.getByRole("button", { name: "Read" });

    expect(button).toHaveClass(
      "bg-accent-green-soft",
      "text-accent-green",
      "px-3",
      "text-xs",
      "mt-1",
    );
    expect(button).not.toHaveClass("px-4");
  });

  it("places one icon on the requested side", () => {
    const right = render(<Button icon={<span>icon-mark</span>}>Next</Button>);
    const rightControl = within(right.container).getByRole("button", { name: "Next" });

    expect(within(rightControl).getByText("Next")).toAppearBefore(
      within(rightControl).getByText("icon-mark"),
    );

    const left = render(
      <Button variant="subtle" iconPosition="left" icon={<span>icon-mark</span>}>
        Prev
      </Button>,
    );
    const leftControl = within(left.container).getByRole("button", { name: "Prev" });

    expect(leftControl).toHaveClass("bg-canvas-inset");
    expect(within(leftControl).getByText("icon-mark")).toAppearBefore(
      within(leftControl).getByText("Prev"),
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

    expect(button).toHaveAttribute("aria-label", "Adjust tag filters");
    expect(button).toHaveClass("h-8", "w-8", "p-0");
    expect(button).toHaveTextContent("Adjust tag filters");

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
    const button = screen.getByRole("button", { name: "Save" });
    const label = within(button).getByText("Save");

    expect(button).toBeInstanceOf(HTMLButtonElement);
    expect(button).toHaveAttribute("type", "button");
    expect(button).toBeEnabled();
    expect(button).toHaveAttribute("aria-disabled", "true");
    expect(button.querySelector("svg")).toBeInTheDocument();
    expect(label).toHaveClass("opacity-0");
    expect(label).not.toHaveAttribute("aria-hidden");
    expect(button).toHaveTextContent("Save");

    press(button);

    expect(presses).toBe(0);
  });

  it("disables both the button and the link", () => {
    const buttonView = render(<Button isDisabled>Save</Button>);
    const button = within(buttonView.container).getByRole("button", { name: "Save" });

    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("data-disabled", "true");
    expect(button).toHaveClass("data-[disabled]:cursor-not-allowed", "data-[disabled]:opacity-50");

    const linkView = render(
      <Button href="/garden" isDisabled>
        All entries
      </Button>,
    );

    expect(linkView.container.querySelector("a")).not.toBeInTheDocument();
    const link = within(linkView.container).getByRole("link", { name: "All entries" });

    expect(link).toHaveAttribute("role", "link");
    expect(link).toHaveClass("data-[disabled]:opacity-50");
  });

  it("uses a 40px circle for an icon-only md button", () => {
    render(<Button aria-label="Close" icon={<span>icon</span>} />);
    const button = screen.getByRole("button", { name: "Close" });

    expect(button).toHaveClass("h-10", "w-10", "rounded-full");
  });
});
