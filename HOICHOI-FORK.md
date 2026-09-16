# Hoichoi fork of agent-swarm

This is a **deployment fork** of `desplega-ai/agent-swarm`. It exists so we can
extend the engine where config / scripts / prompts hit a ceiling, and run our
own image — without waiting on upstream review or release cadence.

## Branch model

- **Base is always a release tag, never `main`.** `hoichoi/dev` is cut from a
  release tag (currently `v1.140.0`) and carries our merged features.
- **Feature branches PR into `hoichoi/dev`** — our own review + CI gate.
- **We build and deploy from `hoichoi/dev`.** The image is tagged
  `<release>-hoichoi.<n>` (e.g. `1.140.0-hoichoi.1`), and Chart `version` /
  `appVersion` MUST carry the same suffix or the chart pulls the stock image and
  silently runs un-patched.
- **Rolling forward is a tag-to-tag rebase**: when we adopt the next release,
  `git rebase --onto vX.Y.Z <old-tag> hoichoi/dev`, resolve the small conflicts
  (our delta is a handful of files against a frozen base, not `main`'s churn),
  rebuild, bump the helmfile.

## Flow for a change

    feat/<name>  ──PR──▶  hoichoi/dev  ──▶  build image  ──▶  deploy + validate
                                                              │
                                          (on explicit human request only)
                                          cherry-pick the feature commit ──▶
                                          clean branch off upstream/main ──▶ PR upstream

Upstreaming is opt-in and human-triggered. Keep each feature as one clean,
self-contained commit so the later cherry-pick is trivial.

## What we own now (that consuming the released image did not)

- Building `Dockerfile` + `Dockerfile.worker` → `ghcr.io/hoichoitech/agent-swarm`.
- Security duty: an upstream CVE fix is a rebase + rebuild, not a `helm upgrade`.
- A `hoichoi/dev` gate (their tests + our smoke) before cutting a deploy tag —
  do not deploy `dev` HEAD blindly.

## Current delta vs v1.140.0

- `feat(linear): Issue.create triage` — behind `LINEAR_ISSUE_CREATE_TRIAGE`
  (default off). Routes the previously-unhandled Issue.create webhook to a
  bounded triage task that ends in a question / conflicting-evidence /
  ask-to-implement outcome. Upstream-worthy; candidate for the first PR up.
