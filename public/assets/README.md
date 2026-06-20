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
