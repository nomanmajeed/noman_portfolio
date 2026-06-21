# Static assets

All portfolio images live under `public/assets/` and are referenced by URL path (e.g. `/assets/tech/react.png`).

## Folders

| Folder | Contents |
|--------|----------|
| `tech/` | Tech stack icons (Python, React, Git, etc.) |
| `companies/` | Employer / client logos for work history |
| `projects/` | Project card thumbnails |
| `about/` | About section service images |
| `profile/` | Profile photo, hero SVGs |
| `brand/` | Site logo, contact icons, backgrounds |
| `certifications/` | Certificate provider logos |

## Adding files

- **Company logo:** `companies/<id>.png` → set `"logo": "/assets/companies/<id>.png"` in `data/experiences.json`
- **Tech icon:** add an entry in `lib/tech-stack.tsx` — icons appear in About orbit, TechCloud ring, and skill badges automatically.
- **Project image:** `projects/<name>.png` → use `imgUrl` key in `data/works.json`

Keys are mapped in `constants/images.js`.

## Project galleries

Each project in `data/works.json` can have a full image gallery shown in its detail modal (opened via the card's expand button or double-click):

- Put numbered images in `projects/<slug>/`, e.g. `projects/tally-crm/tally-crm-1.png`, `projects/tally-crm/tally-crm-2.png`, etc.
- List them in that project's `images` array in `data/works.json`, as plain paths: `"images": ["/assets/projects/tally-crm/tally-crm-1.png", "/assets/projects/tally-crm/tally-crm-2.png"]`.
- No registration in `constants/images.js` needed — gallery images are referenced as direct paths, not keys.
- If `images` is omitted or empty, the modal falls back to `previewImage`, then the card's `imgUrl` / company logo, so nothing breaks while a gallery is still empty.

## Card preview image

`previewImage` is a single explicit path used as the card thumbnail — shown by both the regular grid card and the featured card — and as the first image in the detail modal's gallery:

```json
"previewImage": "/assets/projects/tally-crm/tally-crm-1.png"
```

Pick whichever image best represents the project; it doesn't have to be `images[0]`. If omitted, the card falls back to `images[0]`, then `imgUrl`, then the company logo.
