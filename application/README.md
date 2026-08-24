# Kubernetes Zero → Hero

An interactive Kubernetes learning platform designed to take a learner from beginner to advanced level.

## Planned Features

- Kubernetes learning roadmap
- Milestone-based learning
- Topic explanations
- Visual diagrams
- Interactive simulations
- Hands-on labs
- Interview questions
- Troubleshooting scenarios
- Progress tracking
- Bookmarks
- Search
- Learning prerequisites
- Real-world scenarios
- Future AI tutor
- Future real Kubernetes lab environments

## Technology

Initial version:

- HTML
- CSS
- Vanilla JavaScript
- Browser LocalStorage

No backend or database is required for the initial version.

## Recent improvements

- Responsive layout improvements (flex/grid, clamp-based sidebar width, media queries)
- Simulated UI polish: reveal-on-scroll animations, progress bar animations, skeleton placeholders
- Accessibility: keyboard skip link, focus styles, modal focus-trap
- Theme toggle with system preference and persistent selection
- Performance tweaks: deferred non-critical CSS preload and smaller JS helpers

## Development checklist

- [ ] Verify responsive layouts on mobile/tablet/desktop
- [ ] Run Lighthouse audit and address high-impact accessibility/performance issues
- [ ] Add image srcset and `loading="lazy"` where content images are used
- [ ] Minify CSS/JS for production and enable gzip/br compression on hosting

## Running locally

Open `application/index.html` in a web browser (no build step required). For development, serve the folder with a static server (recommended):

```bash
# from project root
python3 -m http.server 8000 --directory application

# then open http://localhost:8000 in your browser
```

If you want me to, I can run a Lighthouse audit and produce a short report and specific fixes.
