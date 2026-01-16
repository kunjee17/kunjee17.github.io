# Kunjan.in Blog

Personal consulting and authority site for Kunjan Dalal, built with Astro, AstroDB, DaisyUI, and Tailwind CSS.

## Features

- **Consulting-first design**: Homepage emphasizes services and authority over blog posts
- **Theme-based writing**: Blog posts grouped by themes, not chronological
- **Full SEO optimization**: Meta tags, Open Graph, Twitter Cards, JSON-LD, sitemap, robots.txt
- **Modern design**: DaisyUI components with custom theme, responsive, dark mode support
- **Search**: Pagefind integration for fast client-side search
- **Analytics**: Google Analytics and AdSense ready
- **Performance**: Static generation, optimized images, minimal JavaScript
- **Fun 404**: Retro Snake game on 404 page

## Tech Stack

- **Framework**: Astro 5
- **Database**: AstroDB (SQLite-based)
- **Styling**: Tailwind CSS 4 + DaisyUI 5
- **Search**: Pagefind
- **Fonts**: Figtree (body), Fraunces (display), Satisfy (script)
- **Deployment**: Netlify

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended)

### Installation

```bash
# Install dependencies
pnpm install

# Setup environment variables
cp .env.example .env
# Edit .env with your Google Analytics and AdSense IDs
```

### Development

```bash
# Start dev server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

### Database Setup

The database schema is defined in `db/config.ts`. You'll need to populate it with:

1. **Author Profile**: Add your author information
2. **Categories**: Create categories for organizing posts
3. **Tags**: Create tags for post taxonomy
4. **Blog Posts**: Import or create blog posts
5. **Media**: Upload and track media assets
6. **FAQs** (optional): Add FAQs for posts

## Project Structure

```
apps/blog/
├── src/
│   ├── components/          # Reusable Astro components
│   │   ├── Navigation.astro
│   │   ├── Footer.astro
│   │   ├── SEO.astro
│   │   ├── GoogleAnalytics.astro
│   │   ├── AdSense.astro
│   │   ├── Search.astro
│   │   ├── PostCard.astro
│   │   ├── AuthorByline.astro
│   │   ├── FAQSection.astro
│   │   └── RelatedPosts.astro
│   ├── layouts/             # Page layouts
│   │   ├── BaseLayout.astro
│   │   ├── PostLayout.astro
│   │   └── PageLayout.astro
│   ├── pages/               # Route pages
│   │   ├── index.astro      # Home page
│   │   ├── services.astro   # Services page
│   │   ├── about.astro      # About page
│   │   ├── contact.astro    # Contact page
│   │   ├── 404.astro        # 404 page with Snake game
│   │   ├── writing/         # Blog posts
│   │   │   ├── index.astro
│   │   │   └── [slug].astro
│   │   ├── categories/      # Category archives
│   │   │   ├── index.astro
│   │   │   └── [slug].astro
│   │   ├── tags/            # Tag archives
│   │   │   ├── index.astro
│   │   │   └── [slug].astro
│   │   ├── sitemap.xml.ts   # Dynamic sitemap
│   │   └── robots.txt.ts    # Robots.txt
│   ├── lib/                 # Utilities
│   │   ├── db.ts            # Database queries
│   │   ├── seo.ts           # SEO utilities
│   │   └── content.ts       # Content utilities
│   └── styles/
│       └── global.css       # Global styles, DaisyUI theme
├── db/
│   └── config.ts            # AstroDB schema
├── astro.config.mjs         # Astro configuration
├── netlify.toml             # Netlify deployment config
├── package.json
└── tsconfig.json
```

## Content Management

### Adding Blog Posts

Blog posts are stored in the AstroDB database. To add a new post:

1. Insert into `BlogPosts` table with all required fields
2. Link to author via `authorId`
3. Add categories via `BlogPostCategories` junction table
4. Add tags via `BlogPostTags` junction table
5. (Optional) Add FAQs via `FAQs` table
6. (Optional) Add related posts via `BlogPostReferences` table

### SEO Best Practices

Each post should include:
- Unique title (50-60 chars)
- Meta description (150-160 chars)
- SEO-friendly slug
- Keywords array
- OG image (1200x630px)
- Proper schema.org type
- Canonical URL (if needed)

## Customization

### Theme Colors

Edit `src/styles/global.css` to customize DaisyUI themes:

```css
@plugin "daisyui" {
  themes:
    kunjan-light {
      primary: #2563eb;
      /* ... */
    }
}
```

### Google Analytics & AdSense

Add your IDs to `.env`:

```
PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX
```

### Topmate Integration

Update the Topmate URLs in:
- `src/pages/index.astro` (CTA)
- `src/pages/services.astro` (widget)
- `src/pages/contact.astro` (widget)

## Deployment

### Netlify

The site is configured for Netlify deployment:

1. Push to GitHub
2. Connect repository to Netlify
3. Set environment variables
4. Deploy!

Build settings are in `netlify.toml`:
- Build command: `pnpm install && pnpm turbo build --filter=blog`
- Publish directory: `apps/blog/dist`

### Redirects

301 redirects are configured in `netlify.toml`:
- `/posts/*` → `/writing/:splat`
- `/:year/:month/:slug` → `/writing/:slug`
- `/resume` → `/about`

## SEO Checklist

- [x] Meta tags (title, description, keywords)
- [x] Open Graph tags
- [x] Twitter Cards
- [x] JSON-LD structured data
- [x] Sitemap (dynamic)
- [x] Robots.txt
- [x] Canonical URLs
- [x] 301 redirects from old URLs
- [x] Image alt text
- [x] Internal linking (BlogPostReferences)
- [x] FAQs for rich snippets

## License

Private project - All rights reserved.

## Contact

- Email: contact@kunjan.in
- Website: https://kunjan.in
- GitHub: https://github.com/kunjee17
