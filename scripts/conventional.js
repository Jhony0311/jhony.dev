/** @type {readonly string[]} */
export const COMMIT_TYPES = [
  "build",
  "chore",
  "ci",
  "docs",
  "feat",
  "fix",
  "improvement",
  "perf",
  "refactor",
  "revert",
  "style",
  "test",
];

const DEFAULT_BRANCHES = new Set(["main"]);

const segment = "[a-z0-9]+(?:-[a-z0-9]+)*";

const branchPattern = new RegExp(`^(?:${COMMIT_TYPES.join("|")})(?:/${segment})+$`);

/**
 * @param {string} name
 */
export function isConventionalBranch(name) {
  return branchPattern.test(name);
}

/**
 * @param {string} name
 */
export function isAllowedLocalBranch(name) {
  return DEFAULT_BRANCHES.has(name) || isConventionalBranch(name);
}

/**
 * Squash merges use the pull request title as the subject and the body as the body.
 * @param {string | null | undefined} title
 * @param {string | null | undefined} body
 */
export function closingCommitMessage(title, body) {
  const subject = (title ?? "").replace(/\r\n/g, "\n").trim();
  const rest = (body ?? "").replace(/\r\n/g, "\n").trim();
  if (!rest) {
    return `${subject}\n`;
  }
  return `${subject}\n\n${rest}\n`;
}

export const commitlintConfig = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [2, "always", [...COMMIT_TYPES]],
    // The closing commit body is the pull request description, which is prose.
    "body-max-line-length": [0],
    "footer-max-line-length": [0],
  },
};
