# Commits and branches

Commit messages follow [Conventional Commits 1.0.0-beta.4](https://www.conventionalcommits.org/en/v1.0.0-beta.4/). The check is `commitlint.config.js` (`@commitlint/config-conventional`), plus the type `improvement` from that spec.

## Message

```
<type>[optional scope][optional !]: <description>

[optional body]

[optional footer]
```

`feat` adds a feature. `fix` patches a bug. Any other type has to be in the `type-enum` of `commitlint.config.js`. The type is lowercase. The description starts with a lowercase letter and has no trailing period. The subject is at most 100 characters. A breaking change adds `!` before the colon and a `BREAKING CHANGE:` line in the body or footer.

Lefthook runs `pnpm exec commitlint --edit` on every commit.

## Pull request

This repo squash-merges into `main`. The commit that closes the pull request uses the pull request title as its subject and the pull request body as its body. That message has to pass commitlint, including the title. The body is the pull request description, so the line-length rule does not apply to it. The Commits workflow checks every commit on the branch and that closing message.

## Branches

A working branch uses the same type, then one or more kebab-case segments:

```
<type>/<description>
<type>/<scope>/<description>
```

Examples: `ci/commitlint`, `docs/coding-guidelines`, `feat/garden/tag-filter`.

Agents use this shape for every branch they open. `main` is the default branch, not a working branch. The pull request check rejects any other shape. Local commits on `main` are the only exception.
