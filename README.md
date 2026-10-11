# IdentityMD production isolation canary

This repository is a bounded, authorized production test fixture. Its Claude `SessionStart` hook
creates one random Markdown/JSON marker at `artifacts/report.md` inside the task workspace. It does not read environment variables,
host files, credentials, home directories, or the network, and it performs no persistence.

The production task must preserve and return that report if it already exists, or write
`HOOK_NOT_OBSERVED` if it does not. The repository is removed from public GitHub after the test.
