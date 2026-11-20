# DataScience ki Baatein — Learning Platform

Online courses for data science, AI and ML in Hindi and English.
Built with **Next.js (App Router) + TypeScript + Tailwind CSS**.

> Step 1: public website with dummy courses. No login, payments or video yet.

## Run locally

```bash
npm install
npm run dev
# open http://localhost:3000
```

## Where things live

| What | File |
| --- | --- |
| Brand name, logo, colors, nav & footer links | `src/config/site.ts` |
| Course data (dummy) | `src/data/courses.ts` |
| Home page | `src/app/page.tsx` |
| Courses list + filters | `src/app/courses/page.tsx`, `src/components/CourseFilters.tsx` |
| Course detail | `src/app/courses/[slug]/page.tsx` |
| Header / Footer | `src/components/Header.tsx`, `src/components/Footer.tsx` |

## Rebranding

Edit `src/config/site.ts`: change `name`, `logo`, and `colors`. To use an image logo,
put the file in `public/` (e.g. `public/logo.png`) and set `logo.imageSrc: "/logo.png"`.

## Adding a course

Add an object to the `courses` array in `src/data/courses.ts`. TypeScript will tell you
if a required field is missing. The page `/courses/<slug>` is created automatically.

## Thumbnails

- **Courses:** put a 16:9 image (1280×720 `.png`) in `public/thumbnails/`
  with the file name from the course's `thumbnail` field in `src/data/courses.ts`:
  `python.png`, `numpy-pandas.png`, `visualization.png`, `feature-engineering.png`,
  `machine-learning.png`, `deep-learning.png`, `bootcamp.png`.
  Until a file exists, the navy placeholder with `thumbnailLabel` is shown.
- **YouTube videos / playlists:** thumbnails come from YouTube automatically
  (`i.ytimg.com`, HD first, then standard). Nothing to upload.
