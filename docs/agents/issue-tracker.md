# Issue tracker: GitHub

Issues and specs for this repo live as GitHub issues. Use the `gh` CLI for issues, pull requests, and labels.

## Credentials

Two environment variables are in play. `gh` reads `GH_TOKEN` and ignores the other one.

- **Issues, pull requests, and issue labels**: run `gh` as usual. It authenticates with `GH_TOKEN`.
- **Project board**: the board is the user project "Jhony.dev Project". Run that command as `GH_TOKEN="$GH_PROJECT_TOKEN" gh api graphql ...` so only that call uses the project token. Leave `GH_TOKEN` itself unchanged for later `gh issue` and `gh pr` commands. `gh project item-add` and `gh project item-edit` fail with this token; the working calls are in [Intake](#intake).

`GH_PROJECT_TOKEN` can read and update the project. It cannot create or edit issues, pull requests, or labels. Do not write either value into the repo, a commit, or a comment.

## Intake

Every issue an agent creates starts in the **Backlog** column of "Jhony.dev Project" (user project `2`, owner `Jhony0311`) and carries the `needs-triage` label. Do not apply `ready-for-agent` or `ready-for-human` at creation time. Triage promotes a ticket out of Backlog only by the gates in `docs/agents/triage.md`.

Create the issue with the issues token, then place it with `GH_PROJECT_TOKEN`. `gh project item-add` and `gh project item-edit` fail with this token (it lacks `read:org` and `read:discussion`). Use the GraphQL calls below.

```bash
# Issues token (GH_TOKEN).
issue_url=$(gh issue create --title "..." --label needs-triage --body "...")
node_id=$(gh issue view "$issue_url" --json id --jq .id)
```

Look up the project and the Status option ids:

```bash
GH_TOKEN="$GH_PROJECT_TOKEN" gh api graphql \
  -f login='Jhony0311' -F number=2 \
  -f query='
    query($login: String!, $number: Int!) {
      user(login: $login) {
        projectV2(number: $number) {
          id
          field(name: "Status") {
            ... on ProjectV2SingleSelectField {
              id
              options { id name }
            }
          }
        }
      }
    }'
```

Add the issue, then set Status to the option named `Backlog`:

```bash
GH_TOKEN="$GH_PROJECT_TOKEN" gh api graphql \
  -f projectId='PROJECT_ID' -f contentId="$node_id" \
  -f query='
    mutation($projectId: ID!, $contentId: ID!) {
      addProjectV2ItemById(input: {projectId: $projectId, contentId: $contentId}) {
        item { id }
      }
    }'

GH_TOKEN="$GH_PROJECT_TOKEN" gh api graphql \
  -f projectId='PROJECT_ID' -f itemId='ITEM_ID' \
  -f fieldId='STATUS_FIELD_ID' -f optionId='BACKLOG_OPTION_ID' \
  -f query='
    mutation($projectId: ID!, $itemId: ID!, $fieldId: ID!, $optionId: String!) {
      updateProjectV2ItemFieldValue(input: {
        projectId: $projectId
        itemId: $itemId
        fieldId: $fieldId
        value: { singleSelectOptionId: $optionId }
      }) { projectV2Item { id } }
    }'
```

If the issue is already on the board, skip `addProjectV2ItemById` and set Status on the existing item. The same mutation with the `Ready` option id is how triage moves a ticket into the Ready column.

## Conventions

- **Create an issue**: follow [Intake](#intake). `gh issue create --title "..." --label needs-triage --body "..."`, then set the project Status to `Backlog`. Use a heredoc for multi-line bodies.
- **Read an issue**: `gh issue view <number> --comments`, filtering comments by `jq` and also fetching labels.
- **List issues**: `gh issue list --state open --json number,title,body,labels,comments --jq '[.[] | {number, title, body, labels: [.labels[].name], comments: [.comments[].body]}]'` with appropriate `--label` and `--state` filters.
- **Comment on an issue**: `gh issue comment <number> --body "..."`
- **Apply / remove labels**: `gh issue edit <number> --add-label "..."` / `--remove-label "..."`
- **Close**: `gh issue close <number> --comment "..."`

Infer the repo from `git remote -v`; `gh` does this automatically when run inside a clone.

## Pull requests as a triage surface

**PRs as a request surface: no.** _(Set to `yes` if this repo treats external PRs as feature requests; `/triage` reads this flag.)_

When set to `yes`, PRs run through the same labels and states as issues, using the `gh pr` equivalents:

- **Read a PR**: `gh pr view <number> --comments` and `gh pr diff <number>` for the diff.
- **List external PRs for triage**: `gh pr list --state open --json number,title,body,labels,author,authorAssociation,comments` then keep only `authorAssociation` of `CONTRIBUTOR`, `FIRST_TIME_CONTRIBUTOR`, or `NONE` (drop `OWNER`/`MEMBER`/`COLLABORATOR`).
- **Comment / label / close**: `gh pr comment`, `gh pr edit --add-label`/`--remove-label`, `gh pr close`.

GitHub shares one number space across issues and PRs, so a bare `#42` may be either: resolve with `gh pr view 42` and fall back to `gh issue view 42`.

## When a skill says "publish to the issue tracker"

Create a GitHub issue through [Intake](#intake): `needs-triage`, Status `Backlog`. Skills that say to apply `ready-for-agent` on publish defer to this file.

## When a skill says "fetch the relevant ticket"

Run `gh issue view <number> --comments`.

## Claim

`in-progress` is the claim lock. `ready-for-agent` is the pickup queue. The five triage roles stay as they are; this label is not one of them. See `docs/agents/triage-labels.md`.

- **Already claimed**: the issue has `in-progress`, or an open pull request links it (`Closes #<n>`, `Fixes #<n>`, or `Resolves #<n>` in the body). Stop.
- **Claim**: the session's first write, before any code. `gh issue edit <n> --add-label in-progress --remove-label ready-for-agent --add-assignee @me`
- **Hand back**: the work needs a person. Comment what they need to decide, then `gh issue edit <n> --remove-label in-progress --add-label ready-for-human`. Hand back does not set project Status to Ready. That move still waits for the body validation and agreed agent brief in `docs/agents/triage.md`.
- **Finish**: open the pull request with `Closes #<n>` in the body. Leave `in-progress` on the issue until GitHub closes it on merge.

## Wayfinding operations

Used by `/wayfinder`. The **map** is a single issue with **child** issues as tickets.

- **Map**: a single issue labelled `wayfinder:map`, holding the Notes / Decisions-so-far / Fog body. Create it through [Intake](#intake) and add `wayfinder:map` alongside `needs-triage`.
- **Child ticket**: an issue linked to the map as a GitHub sub-issue (`gh api` on the sub-issues endpoint). Where sub-issues aren't enabled, add the child to a task list in the map body and put `Part of #<map>` at the top of the child body. Create it through [Intake](#intake). Add `wayfinder:<type>` (`research`/`prototype`/`grilling`/`task`) alongside `needs-triage`. Once claimed, the ticket is assigned to the driving dev.
- **Blocking**: GitHub's **native issue dependencies**, the canonical, UI-visible representation. Add an edge with `gh api --method POST repos/<owner>/<repo>/issues/<child>/dependencies/blocked_by -F issue_id=<blocker-db-id>`, where `<blocker-db-id>` is the blocker's numeric **database id** (`gh api repos/<owner>/<repo>/issues/<n> --jq .id`, _not_ the `#number` or `node_id`). GitHub reports `issue_dependencies_summary.blocked_by` (open blockers only, the live gate). Where dependencies aren't available, fall back to a `Blocked by: #<n>, #<n>` line at the top of the child body. A ticket is unblocked when every blocker is closed.
- **Frontier query**: list the map's open children (`gh issue list --state open`, scoped to the map's sub-issues / task list), drop any with an open blocker (`issue_dependencies_summary.blocked_by > 0`, or an open issue in the `Blocked by` line), an assignee, or the `in-progress` label; first in map order wins.
- **Claim**: follow [Claim](#claim). The session's first write.
- **Resolve**: `gh issue comment <n> --body "<answer>"`, then `gh issue close <n>`, then append a context pointer (gist + link) to the map's Decisions-so-far.
