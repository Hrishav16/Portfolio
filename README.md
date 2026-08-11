# Hrishav Kumar Mahato — Creative Portfolio

A React + Vite creative-tech portfolio using Three.js / React Three Fiber, GSAP and Lenis.

## 1. Requirements

Install Node.js LTS from https://nodejs.org/

Check:

```bash
node -v
npm -v
```

## 2. Install

Open a terminal inside this project folder:

```bash
npm install
```

## 3. Run locally

```bash
npm run dev
```

Vite will print a local address such as:

```text
http://localhost:5173/
```

Open it in Chrome.

## 4. Build for production

```bash
npm run build
```

## 5. Preview the production build

```bash
npm run preview
```

## 6. Personalize

Edit:

`src/data.js`

Replace:
- email
- GitHub
- LinkedIn
- resume
- project links
- project descriptions

Add images:

`public/images/profile.jpg`
`public/images/project-ai.jpg`
`public/images/project-ml.jpg`
`public/images/project-web.jpg`

The site works without these images because it has placeholders.

## 7. SEO

Before deployment, replace `your-domain.com` in:

- `index.html`
- `public/robots.txt`
- `public/sitemap.xml`

## 8. Accessibility test

Run the site and open Chrome DevTools.

Use Lighthouse:
DevTools → Lighthouse → Accessibility + SEO + Best Practices + Performance.

Also test:
- Tab navigation
- Enter/Space on buttons
- Skip to content
- Reduced motion
- Mobile layout
- WebGL fallback

## 9. Deploy

Recommended simple deployment:

1. Create a GitHub repository.
2. Push this project.
3. Import the repository into Vercel or Netlify.
4. Build command: `npm run build`
5. Output directory: `dist`

## Notes

The visual direction is inspired by creative-technology portfolios but is original. Do not add fake clients, awards or professional experience. Replace placeholders with your real information before publishing.
