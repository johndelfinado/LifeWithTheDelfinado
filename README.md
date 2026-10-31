# Life With The Delfinado's website

A one-page static site (HTML, CSS, JavaScript). No build step: upload the folder to any static host
(Netlify, Vercel, GitHub Pages, Cloudflare Pages) or open it with a local server:

```
python -m http.server 5173
```

## Files

- `index.html` – page structure and text (About, verses, contact)
- `styles.css` – colours, fonts and layout (colour tokens at the top)
- `main.js` – the video list and page behaviour
- `assets/logo/` – `logo.svg` (full logo) and `logo-mark.svg` (icon / favicon)
- `assets/videos/` – YouTube thumbnails, named by video ID
- `assets/photos/` – cropped photos for the hero and verse bands

## Adding a new video

1. Save `https://i.ytimg.com/vi/<VIDEO_ID>/maxresdefault.jpg` as `assets/videos/<VIDEO_ID>.jpg`.
2. Add a line to `VIDEOS` in `main.js`: `['<VIDEO_ID>', 'YYYY-MM-DD', 'category', 'Title'],`
   Categories: `life`, `homemaking`, `cooking`, `wanderlust`, `faith`.

## Still to do

- Contact email: replace `hello@example.com` in `index.html`.
- Newsletter: set the form's `action` in `index.html` to a Mailchimp or Formspree endpoint.
