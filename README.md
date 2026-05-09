# SkyNotes

A minimal note-taking app with local browser persistence and a cozy sky-themed UI that changes throughout the day.

## Features

- Create, edit, and delete notes
- Search notes by title or content
- Automatic sky theme rotation based on the time of day
- Local-first persistence using browser storage
- Fully installable as a Progressive Web App (PWA)
- Clean and distraction-free interface

## Sky Themes

The background theme automatically changes based on the current time:

- 6:00 AM – 9:00 AM — Golden Sunrise
- 9:00 AM – 12:00 PM — Bright Morning
- 12:00 PM – 3:00 PM — Cloudy Noon
- 3:00 PM – 6:00 PM — Golden Hour
- 6:00 PM – 9:00 PM — Blue Hour
- 9:00 PM – 12:00 AM — Starlit Night
- 12:00 AM – 3:00 AM — Milky Way Night
- 3:00 AM – 6:00 AM — Astronomical Dawn

## Tech Stack

Built with:

- `React`
- `Vite`
- `React Router` (SPA mode)
- `localStorage` for offline persistence

No accounts, analytics, or servers — all data stays locally in your browser.

## Future Improvements

- Markdown note support
- Note categories or tags
- Pinned/favorite notes
- Export/import backups
