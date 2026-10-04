# Triage Labels

The skills speak in terms of five canonical triage roles. This file maps those roles to the actual label strings used in this repo's issue tracker.

| Label in mattpocock/skills | Label in our tracker | Meaning                                  |
| -------------------------- | -------------------- | ---------------------------------------- |
| `needs-triage`             | `needs-triage`       | Maintainer needs to evaluate this issue  |
| `needs-info`               | `needs-info`         | Waiting on reporter for more information |
| `ready-for-agent`          | `ready-for-agent`    | Fully specified, ready for an AFK agent  |
| `ready-for-human`          | `ready-for-human`    | Requires human implementation            |
| `wontfix`                  | `wontfix`            | Will not be actioned                     |

When a skill mentions a role (e.g. "apply the AFK-ready triage label"), use the corresponding label string from this table.

Edit the right-hand column to match whatever vocabulary you actually use.

## Claim lock

`in-progress` is not a triage role. An issue still carries exactly one state role from the table above. The lock sits alongside that role. Commands live in `docs/agents/issue-tracker.md`.

| Label         | Meaning                          |
| ------------- | -------------------------------- |
| `in-progress` | Claimed. Do not pick this up.    |

- **Claim** adds `in-progress`, removes `ready-for-agent`, and assigns the issue. This is the first write, before any code.
- An issue that already has `in-progress`, or an open pull request that links it, is already claimed. Stop.
- **Hand back** removes `in-progress`, adds `ready-for-human`, and comments what needs a person.
- **Finish** leaves `in-progress` on the issue. The pull request body contains `Closes #<n>`. GitHub closes the issue on merge.

Do not apply `in-progress` during triage. Triage ends at `ready-for-agent` or `ready-for-human`.
