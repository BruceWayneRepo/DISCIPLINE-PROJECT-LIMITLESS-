DISCIPLINE — HABIT WHEEL  (home-screen app)
===========================================

A dark, glassy habit tracker built around an 8-spoke spectrum wheel.
Four views: Wheel, Grid, Insights, Analysis. Ticking a habit springs,
glows, and plays a sound; a perfect day (all 8) blooms the whole wheel.

WHERE YOUR DATA LIVES
- By default it saves on this device (localStorage) and works fully offline.
- Optional cloud sync: sign in (Google or email) and your wheel follows you
  to any device you sign into. Per-month merge, so different months on
  different devices never clash.
- Backups: Insights tab -> Data. "CSV" opens in Excel/Sheets (one row per
  day). "Backup (JSON)" saves/restores everything, including to a new device.

FILES (keep all together in the repo root)
  index.html            the app (Firebase config is already filled in)
  sw.js                 service worker / offline cache  (cache: disc-v4)
  manifest.webmanifest  PWA manifest
  icon-192.png  icon-512.png  icon-180.png

INSTALL ON YOUR PHONE
Open the live https:// URL, then:
  iPhone/iPad (Safari): Share -> Add to Home Screen
  Android (Chrome):     menu -> Add to Home screen / Install app
Open it from the home-screen icon to get full-screen + offline.

SYNC SETUP (already done for this project)
Cloud sync uses a free Firebase project. Email + Google sign-in are enabled,
Firestore rules lock each account to its own data, and the GitHub Pages
domain is authorized. To move this to a different Firebase project, see the
config block near the bottom of index.html and FIREBASE-SETUP.txt.

UPDATING
Edit index.html, re-upload it to the repo (overwrite), and hard-refresh the
site. If an installed copy looks stale, close and reopen it once so the new
service-worker cache (disc-v4) takes over.
