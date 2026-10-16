import { execFileSync } from "node:child_process";
import { isAllowedLocalBranch, isConventionalBranch } from "./conventional.js";

const args = process.argv.slice(2);
const allowDefault = args.includes("--allow-default");
const nameArg = args.find((arg) => !arg.startsWith("--"));
const name =
  nameArg ??
  execFileSync("git", ["rev-parse", "--abbrev-ref", "HEAD"], {
    encoding: "utf8",
  }).trim();

const allowed = allowDefault ? isAllowedLocalBranch(name) : isConventionalBranch(name);

if (!allowed) {
  console.error(
    `Branch "${name}" does not follow Conventional Commits. Use <type>/<kebab-description>, for example ci/commitlint. See docs/commits.md.`,
  );
  process.exit(1);
}
