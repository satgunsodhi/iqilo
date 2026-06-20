# DSA Learner

An interactive learning platform for competitive programming placement prep. Track day-level progress across structured courses with embedded resources, LeetCode/CSES links, and local progress persistence.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

- **Multi-course dashboard** — browse courses and see completion at a glance
- **Day-level progress** — mark each day complete; progress persists in `localStorage`
- **Course curriculum view** — week sections with per-week progress bars
- **Day detail pages** — objectives, daily protocol, resources, practice links, pitfalls, and simulation tasks
- **Embedded YouTube** — Fiset/Errichto videos play inline where supported
- **External practice links** — LeetCode and CSES open in new tabs
- **Export progress** — download your progress as JSON from the header

## Project structure

```
app/                    # Next.js App Router pages
components/             # UI components
data/courses/           # Course curriculum data
hooks/useProgress.tsx    # Progress context and hook
lib/                    # Types, course registry, progress helpers
```

## Adding a new course

1. Create a file in `data/courses/` following the `Course` type in `lib/types.ts`:

```typescript
import type { Course } from "@/lib/types";

export const myNewCourse: Course = {
  id: "my-new-course",
  title: "My Course Title",
  description: "Short description.",
  totalDays: 14,
  weeks: [
    {
      weekNumber: 1,
      title: "Week theme",
      days: [
        {
          dayNumber: 1,
          title: "Topic name",
          objective: "What you will learn.",
          protocol: STANDARD_PROTOCOL, // optional; import from competitive-programming-roadmap.ts
          resources: [{ label: "Article", url: "https://..." }],
          practice: [
            {
              label: "LC 1 — Two Sum",
              url: "https://leetcode.com/problems/two-sum/",
              platform: "leetcode",
            },
          ],
          pitfall: "Common mistake to avoid.",
        },
      ],
    },
  ],
};
```

2. Register the course in `lib/courses.ts`:

```typescript
import { myNewCourse } from "@/data/courses/my-new-course";

const courses: Course[] = [competitiveProgrammingRoadmap, myNewCourse];
```

3. Restart the dev server. The new course appears on the dashboard automatically. Progress is scoped by `courseId`.

## Current courses

| ID | Title | Days |
|----|-------|------|
| `competitive-programming-roadmap` | 4-Week Java Competitive Programming Roadmap | 30 |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Run production server |
| `npm run lint` | Run ESLint |

## Progress storage

Progress is stored in the browser under the key `dsa-learner-progress`:

```json
{
  "competitive-programming-roadmap": {
    "completedDays": [1, 2, 3],
    "lastVisitedDay": 4
  }
}
```

Use **Export progress** in the header to back up this data.
