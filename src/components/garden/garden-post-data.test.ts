import { describe, expect, it } from "vitest";
import { gardenEntries, type GardenEntry } from "../home/home-data";
import { getGardenPostDetail } from "./garden-post-data";

describe("getGardenPostDetail", () => {
  it("returns the authored detail for a known entry", () => {
    const entry = gardenEntries.find((item) => item.href === "/async-error-handling");

    if (!entry) {
      throw new Error("Expected the async-error-handling garden entry");
    }

    const detail = getGardenPostDetail(entry);

    expect(detail.tagline).toBe(
      "Where I drew the line between silent failures and useful boundaries.",
    );
    expect(detail.blocks.length).toBeGreaterThan(0);
  });

  it("falls back to the entry summary when no authored detail exists", () => {
    const entry: GardenEntry = {
      title: "Untitled note",
      type: "Note",
      stage: "Seedling",
      lastEdited: "May 1, 2026",
      tags: [],
      summary: "A summary that should become the tagline.",
      href: "/missing-detail",
    };

    const detail = getGardenPostDetail(entry);

    expect(detail.tagline).toBe(entry.summary);
    expect(detail.blocks[0]).toMatchObject({
      type: "paragraph",
      text: entry.summary,
    });
  });
});
