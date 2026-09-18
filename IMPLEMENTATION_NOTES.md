# Implementation notes

## Architecture

The application uses React, TypeScript and Vite. It is a single-page frontend with view state kept in `src/App.tsx`; learning content is a typed local data set in `src/data.ts`. There is no runtime API or external database.

`src/progress.ts` owns versioned multi-profile persistence, version-1 migration, backup/restore validation, learning streaks, completion calculations and badge criteria. State writes happen after each meaningful change. The PWA plugin generates the service worker and manifest during production builds and announces offline/update readiness without erasing browser storage.

## Learning content

Each module contains a concise big idea, four guided lessons with an interactive check, and five topic questions. The mixed Quiz Arena draws from the combined 40-question pool. Incorrect answers always reveal an explanation and allow retry without penalty.

To add a module, create a `LearningModule` entry in `src/data.ts`, retain unique stable IDs and add a matching badge label/criterion in `src/App.tsx`. To add a lesson or question, follow the interfaces in `src/types.ts`.

## Progress and badges

Progress is stored in `localStorage` with schema version 2. Each learner has an independent nickname profile and transfer code. A module badge requires every lesson in that module plus a quiz score of at least 70%. The PAL Tech Innovator badge requires at least 50% lesson completion in every module. Learning points are a light acknowledgement: 25 per first-time lesson, 30 per completed project and 10 per new first-try quiz answer.

## Safety choices

The code lab uses predefined prediction questions and never executes learner-entered code. User content is rendered through React text nodes. No permissions, tracking scripts, third-party runtime APIs or sensitive fields are used.

## Current limits

- Four substantial lessons per module rather than the optional 4–6 expansion target
- Checks use multiple choice; richer drag/order/matching interactions remain future enhancements
- Backup transfer is implemented, but automatic cloud synchronization requires an approved database and deployment credentials
- Cohort cards intentionally remain placeholders until guardian consent, learner assent and approved content are supplied
