# Astack Foundation — Welfare Organization Platform

A full-stack welfare organization platform: public website, admin dashboard, and mobile app.

```
welfare-org-app/
├── web/            React 18 + Vite + Tailwind + Firebase — public site & admin dashboard
├── server/         Minimal Express API (transactional email for event registrations)
├── mobile/         React Native (Expo) app — builds to a real Android APK
├── firestore.rules Firestore security rules
└── storage.rules   Firebase Storage security rules
```

## ⚡ Try it in 2 minutes (no Firebase needed yet)

The web app ships with a **demo mode**: if no Firebase credentials are set, it
runs entirely against a local mock data layer (`localStorage`), pre-seeded
with realistic content. Every CRUD screen, form, and the admin dashboard fully
work — nothing is stubbed out or fake-disabled.

```bash
cd web
npm install
npm run dev
```

Open the printed local URL. Go to `/admin/login` and sign in with **any**
email/password — demo mode logs you in as a Super Admin.

This is the fastest way to review the whole build before wiring up a real
backend.

## 🔥 Connect a real Firebase project

**This project is already pointed at your Firebase project `welfare-e840b`.**
`web/.env.example` is pre-filled with its `projectId`, `authDomain`, and
`storageBucket`. Three values still need to come from the console (a service
account key doesn't include these — they're a separate, public-safe config):

1. Firebase Console → your `welfare-e840b` project → gear icon → Project Settings → General.
2. Under "Your apps," add (or open) a **Web app**.
3. Copy `apiKey`, `messagingSenderId`, and `appId` from the shown config into `web/.env`.

⚠️ **About the service account key you shared earlier in chat:** treat it as
compromised and rotate it in the console (Project Settings → Service
Accounts → generate a new key, delete the old one) before using it anywhere.
The rotated key goes in `server/serviceAccountKey.json` (already gitignored)
if you want the optional email-confirmation server running — it's for
server-side admin use only, never for `web/.env`.

<details>
<summary>Starting from scratch instead?</summary>

1. Go to the [Firebase console](https://console.firebase.google.com), create a project.
2. Enable **Authentication** → Email/Password and Google providers.
3. Enable **Firestore Database** (production mode).
4. Enable **Storage**.
5. In Project Settings → General, register a Web App and copy the config values.
6. Copy `web/.env.example` to `web/.env` and fill in the six `VITE_FIREBASE_*` values.
7. Deploy the security rules from the repo root (requires the [Firebase CLI](https://firebase.google.com/docs/cli)):
   ```bash
   npm install -g firebase-tools
   firebase login
   firebase init firestore storage   # point at this project, keep existing rules files
   firebase deploy --only firestore:rules,storage:rules
   ```
8. Restart `npm run dev` — the app now reads/writes real Firestore in real time,
   and the demo-mode banner disappears.

</details>

### Seeding initial content

The collections the app expects are: `gallery`, `events`, `programs`,
`testimonials`, `contacts`, `feedback`, `registrations`, `donations`,
`volunteers`, `users`, `activityLog`. Document shapes are documented in
`web/src/utils/seedData.js` — the fastest way to seed a fresh project is to
add a few documents from the Admin panel itself once you're signed in (it
writes in the exact shape Firestore expects).

### Creating your first Super Admin

Firestore rules check a `users/{uid}` document's `role` field. After your
first real sign-up via Firebase Auth, manually create a matching document in
the `users` collection with `role: "Super Admin"` (via the Firebase console)
so the rules and the admin UI grant full access.

## 🖥️ Public website

Routes: `/` (home), `/gallery`, `/events`, `/programs`, `/contact`, `/feedback`.

- Home: animated hero slider, animated stat counters, upcoming events, testimonials.
- Gallery: category filter, masonry grid, swipeable lightbox, infinite scroll.
- Events: upcoming/completed toggle, registration form (writes to `registrations`
  and bumps the event's `registrationCount`).
- Programs: progress bars driven by `achieved`/`target`, donate & volunteer modals.
- Contact: form (writes to `contacts`), embedded map, working hours, socials.
- Feedback: star rating, category, optional anonymous submission.

## 👑 Admin dashboard

Routes under `/admin`, gated by `/admin/login`.

| Module | Path | Minimum role |
|---|---|---|
| Dashboard | `/admin` | Viewer |
| Gallery Manager (drag-drop upload, bulk delete, zoom) | `/admin/gallery` | Viewer |
| Events Manager | `/admin/events` | Editor |
| Programs Manager | `/admin/programs` | Editor |
| Contact Inbox (read/unread, reply, CSV export) | `/admin/inbox` | Viewer |
| Feedback Analytics (rating chart, sentiment, reply) | `/admin/feedback` | Viewer |
| User Management (roles, activity log) | `/admin/users` | Super Admin |

Role gating is enforced both in the React route tree (`ProtectedRoute`) and
in `firestore.rules` — the UI hides what a role can't do, and the rules
refuse it server-side even if someone bypasses the UI.

**Note on sentiment analysis:** the Feedback Analytics module uses a
lightweight keyword-based scorer (see `FeedbackAnalytics.jsx`) rather than a
paid NLP API, so it works with zero external dependencies. Swap in a real
sentiment API (e.g. a Cloud Function calling an NLP service) if you need
higher accuracy at scale.

## 🛠️ Optional Express server

`server/` sends a real confirmation email on event registration via SMTP
(nodemailer). It's optional — the web app already shows a toast confirmation
without it. To enable real emails:

```bash
cd server
npm install
cp .env.example .env   # fill in SMTP credentials
npm start
```

Then have the web app's `Events.jsx` `RegisterModal.onSubmit` also `fetch`
`POST http://localhost:4000/api/send-confirmation` with the registrant's
details.

## 📱 Mobile app (Android APK)

`mobile/` is an Expo-managed React Native app sharing the same Firebase
project and brand colors, with Home / Events / Programs / Gallery / Contact
tabs.

```bash
cd mobile
npm install
cp .env.example .env   # same Firebase values, EXPO_PUBLIC_ prefixed
npx expo start          # run in Expo Go to preview on your phone
```

**Building a real, installable `.apk`** requires Expo's build service (there's
no Android SDK in this environment, so it can't be compiled here):

```bash
npm install -g eas-cli
eas login
eas build:configure
eas build -p android --profile preview   # produces a downloadable .apk
```

The `preview` profile in `mobile/eas.json` is already set to output a raw
`.apk` (rather than the Play-Store `.aab` format) for direct installs.

## 🎨 Design system

- Colors: `#2C3E50` primary, `#E67E22` secondary, `#ECF0F1` accent (see
  `web/tailwind.config.js` for the full shade ramps).
- Type: **Sora** for display/headings, **Inter** for body, **JetBrains Mono**
  for stats and data (impact counters, admin metrics).
- Motion: Framer Motion page/element transitions, scroll-reveal via
  `useReveal.js`, respects `prefers-reduced-motion`.

## 🖼️ Fixing Storage CORS (optional)

Image uploads currently work by compressing the image in the browser and
storing it as a base64 string directly on the Firestore document — this
sidesteps Firebase Storage entirely, so it works even if Storage isn't set up
yet or its CORS preflight is failing (`blocked by CORS policy` in the
console). It's automatic and needs no configuration.

This is fine for a foundation's admin-managed content (a few dozen photos,
not a high-volume user upload feature), but each image adds ~100–400KB to its
Firestore document. If you'd rather have real Storage URLs (smaller
Firestore documents, a CDN, no per-doc size limit), fix Storage properly:

1. Firebase Console → Build → Storage → make sure you've clicked "Get started" once.
2. Publish `storage.rules` from this repo in the Storage → Rules tab.
3. If uploads still CORS-fail after that, set a CORS policy on the bucket
   with the [gcloud CLI](https://cloud.google.com/storage/docs/using-cors):
   ```bash
   echo '[{"origin": ["*"], "method": ["GET","POST","PUT"], "maxAgeSeconds": 3600}]' > cors.json
   gsutil cors set cors.json gs://welfare-e840b.firebasestorage.app
   ```
4. No code changes needed — `uploadImage()` in `web/src/firebase/storageApi.js`
   already tries real Storage first and only falls back to base64 if that fails.

## ✅ What's real vs. simplified here

To be upfront about production-readiness:

- **Real**: full CRUD across all 6 admin modules, role-based route + rules
  gating, Firestore real-time sync, Firebase Auth (email + Google), image
  upload to Firebase Storage, CSV export, responsive design, form validation
  (Zod), toasts, animations.
- **Simplified for a first pass**: sentiment analysis is keyword-based (not a
  trained model); email sending needs the optional Express server + your own
  SMTP credentials; the mobile app covers the core read/submit flows rather
  than 1:1 parity with every admin feature (admin is a web-only surface by
  design in this build).
