import { execFileSync } from "node:child_process";
import { describe, expect, it } from "vitest";
import {
  closingCommitMessage,
  isAllowedLocalBranch,
  isConventionalBranch,
} from "./conventional.js";

describe("branch names", () => {
  it("accepts a type and kebab-case description", () => {
    expect(isConventionalBranch("ci/commitlint")).toBe(true);
    expect(isConventionalBranch("docs/coding-guidelines")).toBe(true);
    expect(isConventionalBranch("feat/garden/tag-filter")).toBe(true);
    expect(isConventionalBranch("improvement/copy-tone")).toBe(true);
    expect(isConventionalBranch("fix/issue-21")).toBe(true);
  });

  it("rejects names outside the commit types", () => {
    expect(isConventionalBranch("cursor/commitlint-e837")).toBe(false);
    expect(isConventionalBranch("main")).toBe(false);
    expect(isConventionalBranch("Feat/commitlint")).toBe(false);
    expect(isConventionalBranch("ci/Commit_Lint")).toBe(false);
    expect(isConventionalBranch("ci/")).toBe(false);
  });

  it("allows main only as the local default branch", () => {
    expect(isAllowedLocalBranch("main")).toBe(true);
    expect(isAllowedLocalBranch("ci/commitlint")).toBe(true);
    expect(isAllowedLocalBranch("cursor/commitlint-e837")).toBe(false);
  });
});

describe("closing commit", () => {
  it("joins the pull request title and body the way a squash commit does", () => {
    expect(closingCommitMessage("ci: add commitlint", "## Summary\n\nDetails.")).toBe(
      "ci: add commitlint\n\n## Summary\n\nDetails.\n",
    );
    expect(closingCommitMessage("docs: correct spelling", "  ")).toBe("docs: correct spelling\n");
  });
});

describe("commitlint", () => {
  /**
   * @param {string} message
   */
  function lint(message) {
    try {
      execFileSync("pnpm", ["exec", "commitlint"], {
        input: message,
        encoding: "utf8",
        stdio: ["pipe", "pipe", "pipe"],
      });
      return 0;
    } catch (error) {
      const failure = /** @type {{ status?: number }} */ (error);
      return failure.status ?? 1;
    }
  }

  it("accepts a conventional subject and a long pull request body", () => {
    const message = closingCommitMessage(
      "ci: enforce conventional commits and branch names",
      "The body is the pull request description. It can be a long line that would not fit in a 100 character commit body because the squash commit keeps that description.",
    );
    expect(lint(message)).toBe(0);
  });

  it("accepts the improvement type from Conventional Commits 1.0.0-beta.4", () => {
    expect(lint("improvement: tighten the header spacing\n")).toBe(0);
  });

  it("rejects a subject that is not a conventional commit", () => {
    expect(lint("Write coding guidelines for components\n")).not.toBe(0);
    expect(lint("Feat: add a garden filter\n")).not.toBe(0);
    expect(lint("docs: Correct the spelling.\n")).not.toBe(0);
  });
});
