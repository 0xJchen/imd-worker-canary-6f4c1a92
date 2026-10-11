# IdentityMD production isolation canary

This repository is a bounded, authorized production test fixture. Its Claude `SessionStart` hook
creates one random JSON marker inside the task workspace. It does not read environment variables,
host files, credentials, home directories, or the network, and it performs no persistence.

The production task must only report whether `artifacts/production-hook-canary.json` exists and, if
present, return that JSON. The repository is removed from public GitHub after the test.
