# SkyNotes

Your notes, under an ever-changing sky. SkyNotes is a minimal, local-first app that shifts through atmospheric themes as the day unfolds — no accounts, no servers, just you and your thoughts.

## Features

### Notes

- Create, edit, and delete notes
- Duplicate any note
- Copy a note's content to the clipboard
- Share a note to other apps via the native Web Share API
- Search notes by title or content
- Sort notes by newest or oldest (preference saved across sessions)
- Autosave on blur, every 10 seconds, and on tab/window close
- Live relative timestamps ("2 min ago") that refresh automatically

### Sky Themes

The background theme automatically changes based on the current time of day — checked every minute, with a smooth fade transition between themes. Each theme applies a different background image with a fully adapted color palette across cards, text, buttons, dropdowns, and more.

| Time               | Theme             |
| ------------------ | ----------------- |
| 12:00 AM – 3:00 AM | Milky Way Night   |
| 3:00 AM – 6:00 AM  | Astronomical Dawn |
| 6:00 AM – 9:00 AM  | Golden Sunrise    |
| 9:00 AM – 12:00 PM | Bright Morning    |
| 12:00 PM – 3:00 PM | Cloudy Noon       |
| 3:00 PM – 6:00 PM  | Golden Hour       |
| 6:00 PM – 9:00 PM  | Blue Hour         |
| 9:00 PM – 12:00 AM | Starlit Night     |

Background images are served as WebP with JPEG fallback for broad browser compatibility.

### PWA & Offline

- Fully installable as a Progressive Web App (PWA) with rich install UI (screenshots included for both desktop and mobile)
- Full offline support — all 8 sky backgrounds, icons, and app assets are cached by the service worker after first load
- **Web Share Target** — share text, URLs, or titles from any other app directly into SkyNotes; a new note is created automatically

### Accessibility

- Skip to content link for keyboard and screen reader users
- Semantic landmark regions (`main`, etc.)
- ARIA labels on icon-only controls

## Tech Stack

- `React`
- `Vite`
- `React Router` (SPA mode)
- `Tailwind CSS`
- `localStorage` for notes and preferences
- Service Worker for offline caching and Web Share Target

No accounts, analytics, or servers — all data stays locally in your browser.
