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

Personal-project rules (Omega Throne scope): `1.0.0` requires ALL of:

1. Pilot repo migrated and merged (e.g. vstack on OmegaOS).
2. Full test suite and build green on `main`.
3. Changelog up to date (every user-visible change under a version heading).

No external-consumers or multi-release API-freeze requirement —
those apply only if the package is ever published for public use.

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
