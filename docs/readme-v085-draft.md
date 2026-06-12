# Pacemaker

Pacemaker is a personal endurance training cockpit for marathon preparation. It combines workout logging, weekly planning, readiness tracking, race prediction, Strava import, Gemini-powered coaching, cloud sync and calendar export in a mobile-first PWA.

> Current version: v0.8.2  
> Next architecture milestone: v0.8.5 - React Foundation

## Product Vision

Pacemaker is designed for runners who want a practical training companion rather than a generic fitness dashboard. The app focuses on the daily decisions that matter during a marathon build:

- What should I run today?
- How much volume is left this week?
- Am I ready for intensity or should I recover?
- Is my long-run trend moving toward race goal pace?
- How do I turn a weekly plan into calendar events?
- How do I keep manual, planned and Strava-imported workouts in one place?

The product goal is to become a reliable training operating system: simple enough to use every day, structured enough to guide a full marathon cycle, and flexible enough to evolve into a richer React-based platform.

## Current Features

### Training Dashboard

- Race countdown.
- Weekly and monthly mileage progress.
- Total mileage tracking.
- Readiness score based on recent fatigue and RPE.
- Marathon prediction based on real long runs.
- Next workout suggestion.
- Recent completed workout list.

### Workout Log

- Manual run logging.
- Strength training logging.
- RPE and fatigue capture.
- Pace, heart rate, distance and duration fields.
- Edit and delete flows.
- Planned-to-completed workout conversion.
- Workout restoration and missed-workout handling.

### Planner

- Monthly calendar view.
- Work/off-day awareness using a 2x2 schedule.
- Current-week execution summary.
- Next-week planned summary.
- Coach-assisted weekly plan preview.
- Conservative plan variant.
- Plan confirmation into calendar.
- Plan cleanup for current or next week.
- Rebalancing support after edits/completions.

### Race IQ

- Marathon prediction from real long-run data.
- Ignores planned workouts when calculating prediction.
- Distinguishes Strava and manual long-run sources.
- Tracks gap to a sub-4 target model.

### Coach AI

- Offline smart coach responses.
- Gemini integration with user-provided API key.
- Athlete context generation from real app data.
- Training recommendations based on volume, readiness, fatigue, long runs and race date.
- Athlete memory/profile fields.

### Strava Integration

- OAuth connection using user-provided Strava Client ID and Client Secret.
- Token storage on device.
- Activity sync for recent activities.
- Import modal with duplicate protection by `stravaId`.
- Mapping from Strava activity types to Pacemaker workout types.

### Cloud Sync

- Firebase Google login.
- Firestore user document sync at `users/{uid}`.
- Local-first persistence through `localStorage`.
- UID-scoped data keys.
- Legacy data migration from `pacemaker_v2`.
- Sync status indicator.

### PWA

- Mobile-first installable experience.
- Runtime manifest generation.
- Runtime service worker registration.
- App icons for 192px and 512px.

### Calendar Export

- Manual ICS generation.
- Export current week, next week, generic planned week and planned month.
- Workout titles, descriptions, durations and categories.

## Current Stack

Pacemaker v0.8.2 is intentionally lightweight and currently ships as a single-file PWA.

- HTML, CSS and Vanilla JavaScript in `index.html`.
- Firebase SDK v10.12.0 via CDN modules.
- Firebase Auth with Google provider.
- Firestore for cloud sync.
- Gemini API via direct browser call to `gemini-2.5-flash:generateContent`.
- Strava OAuth and Activities API via browser flow.
- Browser `localStorage` for local persistence.
- Browser Blob APIs for manifest, service worker and ICS downloads.
- Google Fonts via CDN.
- No local build pipeline in v0.8.2.
- No package manager metadata in the current root.

## Current Architecture

The current architecture is a single-file application. This is productive for rapid iteration, but it also means many contracts are implicit.

```text
index.html
|-- meta / icons / font links
|-- Firebase module script
|-- CSS
|-- HTML app shell
|-- modals and drawer markup
|-- Vanilla JS state and functions
|-- Firebase cloud sync logic
|-- Gemini logic
|-- Strava logic
|-- Planner logic
|-- Race IQ logic
|-- ICS export logic
|-- PWA manifest and service worker runtime
`-- app initialization
```

The official architecture inventory for v0.8.5 preparation lives in:

- `docs/contract-inventory.md`
- `docs/contract-freeze.md`
- `docs/migration-risk-register.md`
- `docs/modularization-plan-v085.md`

## Architectural Contracts

The following contracts are currently treated as compatibility-critical:

- Global functions called by inline HTML handlers.
- DOM IDs used directly by JavaScript renderers.
- `state` shape.
- `state.workouts` shape and semantics.
- `localStorage` keys.
- Firebase objects exposed through `window._fb*`.
- `save()` behavior: local persistence plus cloud sync when logged in and online.
- Initialization order: Firebase setup, state availability, local load, Strava callback, first render.
- PWA runtime behavior.
- ICS export API.
## Roadmap

### v0.8.2 - Current Stable Vanilla PWA

Status: current baseline.

Focus:

- Single-file product iteration.
- Core training dashboard.
- Workout log.
- Planner.
- Race IQ.
- Coach AI with Gemini option.
- Strava import.
- Firebase cloud sync.
- ICS export.
- PWA support.

Definition of done:

- App works as a local-first PWA.
- User can log workouts, plan weeks, import Strava activities, ask Coach, sync with Firebase and export calendar files.

### v0.8.5 - React Foundation

Status: planned migration foundation.

Focus:

- Modularize JavaScript safely.
- Preserve 100% compatibility with v0.8.2 behavior.
- Introduce module boundaries and adapters.
- Keep global facade for inline handlers.
- Preserve DOM IDs and `state` schema.
- Prepare React as an isolated foundation, not a full rewrite.

Key principles:

- No breaking changes to `state`.
- No breaking changes to `localStorage`.
- No breaking changes to Firebase path or payload.
- No breaking changes to Strava/Gemini flows.
- No early takeover of the DOM by React.

Expected outcome:

- A safer codebase ready for incremental React migration.
- Clear modules for utils, storage, sync, integrations, planner, race, coach and exports.
- Temporary compatibility facade maintained.

### v0.9.0 - React App Shell

Focus:

- Move navigation and app shell into React.
- Keep existing feature logic behind adapters.
- Introduce route/view structure.
- Begin replacing direct DOM manipulation with component state where safe.
- Preserve localStorage and cloud contracts.

Expected outcome:

- React controls the outer shell.
- Vanilla feature modules still operate through compatibility bridges where needed.
- The app remains functionally equivalent to v0.8.x.

### v0.9.5 - Feature Component Migration

Focus:

- Migrate selected screens to React components.
- Prioritize lower-risk screens first.
- Candidate order: Dashboard, Race IQ, Settings, ICS controls, then Coach, Log and Planner.
- Replace inline handlers with React events gradually.
- Reduce global facade surface area after each successful migration.

Expected outcome:

- Most read-heavy UI becomes React-driven.
- High-risk workflows remain protected by adapters until fully tested.

### v1.0 - Stable React PWA

Focus:

- React-first production architecture.
- Explicit state management strategy.
- Tested persistence and sync flows.
- Hardened PWA lifecycle.
- Stable public internal contracts for modules.
- Reduced or removed inline handlers.

Expected outcome:

- Pacemaker becomes a maintainable React PWA without losing the behavior of the v0.8.x product.

### v1.1 - Data Model and Sync Hardening

Focus:

- Formal schema versioning.
- Safer migrations.
- Better conflict handling for cloud sync.
- More explicit workout types and plan entities.
- Stronger handling of secrets and integration metadata.
- Possible backend support for sensitive provider flows.

Expected outcome:

- Data layer becomes robust enough for multi-device and long-term use.

### v2.0 - Training Platform

Focus:

- Advanced training intelligence.
- Richer planning engine.
- Better race modeling.
- Multi-race cycles.
- Deeper Strava/health integrations.
- Coach sessions and historical analysis.
- Potential backend services for secure integrations.

Expected outcome:

- Pacemaker evolves from a personal PWA into a full training platform.

## Development Notes

The most important engineering rule for the v0.8.5 transition is compatibility first. The project already has a working product surface; the migration should protect that value while making the internals easier to evolve.

Before modifying code, consult:

- `docs/contract-inventory.md`
- `docs/contract-freeze.md`
- `docs/migration-risk-register.md`
- `docs/modularization-plan-v085.md`

## Repository Structure Today

```text
pacemaker/
|-- icon-192.png
|-- icon-512.png
|-- index.html
|-- README.md
`-- docs/
    |-- contract-inventory.md
    |-- contract-freeze.md
    |-- migration-risk-register.md
    |-- modularization-plan-v085.md
    `-- readme-v085-draft.md
```

## License

License information should be added before public release if this repository is published publicly.
