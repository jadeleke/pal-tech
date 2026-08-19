# PAL Tech Learning Hub

An offline-first technology learning application for children aged 9–14, created for the Play & Learn Foundation. The app is frontend-only: it has no accounts, backend, analytics, advertising or cloud data collection.

## Run locally

```bash
pnpm install
pnpm dev
```

Open the local URL printed by Vite. For a production check:

```bash
pnpm lint
pnpm test
pnpm build
pnpm preview
```

## What is included

- Eight learning labs covering computers, algorithms, flowcharts, JavaScript, networks, AI, safety and practical digital skills
- Guided learning pattern: discover, learn, see, try, check, challenge and reflect
- Topic and mixed quizzes with explanatory feedback and retry
- Eight independent project prompts
- Device-local learner profile, progress, XP, best scores and nine explicit badges
- Facilitator guidance and confirmed learner-data reset
- Installable PWA with offline application-shell and content caching
- Responsive, keyboard-accessible UI with reduced-motion support

## Privacy and storage

The learner may enter a nickname and optional age band. This, along with learning progress, is stored only in browser `localStorage` under `pal-tech-progress-v1`. The app does not request a full name, date of birth, email, phone number, address, location, camera or microphone.

## Offline use

Run a production build and serve it over HTTPS (or localhost). On the first successful visit, the service worker caches the complete app. Later visits can load offline. The small connection indicator reflects network state but never blocks core learning.

## Content maintenance

Learning content lives in `src/data.ts`, separate from the interface. Each module has stable IDs, lessons and checkpoint questions. To add content:

1. Add a lesson with a unique ID and the required learning fields.
2. Add checkpoint questions with unique IDs, answers and explanations.
3. Keep IDs stable after release so saved progress remains valid.
4. Run tests and a production build.

See `IMPLEMENTATION_NOTES.md` for architecture and extension details.
