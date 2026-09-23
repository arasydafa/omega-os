# Versioning (`@omega-os/ui`)

Semantic Versioning (`MAJOR.MINOR.PATCH`), changelog follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## Number rules

- `PATCH` (e.g. `0.2.1`): fix with no API change — dark-contrast fix,
  token typo, render bug.
- `MINOR` (e.g. `0.3.0`): new backward-compatible feature — each new
  component batch (overlay, data, navigation).
- `MAJOR` (e.g. `1.0.0`): breaking change — renamed/removed props,
  renamed/removed tokens or classes, major peer-dependency change.

Exception while `0.x`: the API may change every minor. Breaking
changes during `0.x` bump `MINOR`, not `MAJOR`.

## Going 1.0

`1.0.0` requires ALL of:

1. Used by at least one real repo (e.g. vstack migrated).
2. Core component API stable for 1–2 releases with no renames.
3. External consumers exist (opensource users beyond Omega Throne).

## Release discipline

1. Work on `dev` or `feat/*` branches, merge to `main` via PR.
2. Keep an `## [Unreleased]` section in `CHANGELOG.md` during development.
3. On release: bump `package.json`, move Unreleased entries under the
   new version heading, commit `chore(release): ...`, tag `vX.Y.Z`.
4. Commits follow Conventional Commits so the changelog can be
   semi-automated later:
   - `feat(ui):` new component / token
   - `feat(tokens):` new token scale
   - `fix:` bug fix, no API change
   - `docs:` docs only
   - `chore(release):` version bump + changelog

## Examples

- Toast + Modal + Dropdown finished → `0.3.0`.
- Contrast fix after that → `0.3.1`.
- Button props rename while `0.x` → `0.4.0` (after `1.0`: `1.0.0`).
