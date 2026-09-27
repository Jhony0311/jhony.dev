# AGENTS.md routes to sources of truth

Agents need one place to start, and each standard needs to live where it can actually be checked. `AGENTS.md` is the index: it points at the deterministic config, Bugbot rules, coding guidelines, and `DESIGN.md`. It does not contain those standards. Issue #5 originally allowed the guidelines to live in `AGENTS.md` itself. That would make the index the source of truth, so the enforceable checks and the prose would drift apart. The rejected alternative is one always-loaded file that holds every rule.
