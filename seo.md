# SEO Features Documentation

This document outlines all SEO-related features in the blog system, their purpose, and where they are used.

## Table of Contents

1. [Blog Posts SEO Fields](#blog-posts-seo-fields)
2. [Pages SEO Fields](#pages-seo-fields)
3. [Media SEO](#media-seo)
4. [Author Profile](#author-profile)
5. [FAQs (Frequently Asked Questions)](#faqs-frequently-asked-questions)
6. [Internal References (Internal Linking)](#internal-references-internal-linking)
7. [Tags & Categories](#tags--categories)
8. [SEO Best Practices](#seo-best-practices)

---

## Blog Posts SEO Fields

### Basic SEO Metadata

**Location**: Blog Post creation/edit forms → "Basic Info" section

- **Title** (`title`)
  - **Purpose**: Main heading of the blog post
  - **SEO Impact**: Primary on-page SEO element, appears in search results
  - **Best Practice**: 50-60 characters, include primary keyword

- **Link Title** (`linkTitle`)
  - **Purpose**: Alternative title for navigation/links
  - **SEO Impact**: Used in internal navigation and anchor text
  - **Best Practice**: Shorter, more descriptive than main title

- **Slug** (`slug`)
  - **Purpose**: URL-friendly identifier (e.g., `/blog/my-awesome-post`)
  - **SEO Impact**: Clean URLs improve click-through rates
  - **Best Practice**: Use hyphens, lowercase, include keywords

- **Description** (`description`)
  - **Purpose**: SEO meta description
  - **SEO Impact**: Appears in search engine results (snippets)
  - **Best Practice**: 150-160 characters, compelling, include call-to-action

- **Summary** (`summary`)
  - **Purpose**: Content teaser/excerpt (different from meta description)
  - **SEO Impact**: Used in blog listings, social shares, RSS feeds
  - **Best Practice**: 2-3 sentences, engaging, different from description

### URL Management

**Location**: Blog Post forms → "URL Management" section

- **Canonical URL** (`canonicalUrl`)
  - **Purpose**: Prevents duplicate content issues by specifying the preferred URL
  - **SEO Impact**: Critical for avoiding duplicate content penalties
  - **Best Practice**: Use when content is republished or exists on multiple URLs

### Meta Robots

**Location**: Blog Post forms → "SEO Metadata" section

- **Meta Robots** (`metaRobots`)
  - **Purpose**: Controls how search engines index and follow links
  - **Options**: 
    - `index, follow` (default) - Index page and follow links
    - `noindex, follow` - Don't index but follow links
    - `index, nofollow` - Index but don't follow links
    - `noindex, nofollow` - Don't index or follow
  - **SEO Impact**: Controls search engine crawling behavior
  - **Best Practice**: Use `noindex` for drafts, duplicate content, or private posts

### Open Graph (Social Media)

**Location**: Blog Post forms → "SEO Metadata" section

- **OG Image** (`ogImage`)
  - **Purpose**: Image displayed when post is shared on social media (Facebook, LinkedIn, etc.)
  - **SEO Impact**: Improves social media engagement and click-through rates
  - **Best Practice**: 1200x630px, high quality, relevant to content

- **OG Type** (`ogType`)
  - **Purpose**: Defines the type of content (article, website, etc.)
  - **SEO Impact**: Helps social platforms render rich previews correctly
  - **Best Practice**: Use `article` for blog posts

### Twitter Cards

**Location**: Blog Post forms → "SEO Metadata" section

- **Twitter Card** (`twitterCard`)
  - **Purpose**: Controls how post appears when shared on Twitter/X
  - **Options**: `summary`, `summary_large_image`, `app`, `player`
  - **SEO Impact**: Better Twitter engagement and visibility
  - **Best Practice**: Use `summary_large_image` for visual content

### Schema.org Structured Data

**Location**: Blog Post forms → "SEO Metadata" section

- **Schema Type** (`schemaType`)
  - **Purpose**: Defines structured data type for rich snippets
  - **Options**: `Article`, `BlogPosting`, `NewsArticle`, `TechArticle`, etc.
  - **SEO Impact**: Enables rich snippets in search results (ratings, dates, authors, etc.)
  - **Best Practice**: Use `BlogPosting` for standard blog posts

- **Schema JSON** (`schemaJson`)
  - **Purpose**: Custom structured data in JSON-LD format
  - **SEO Impact**: Provides additional context to search engines
  - **Best Practice**: Include author, publish date, featured image, etc.

### Sitemap Metadata

**Location**: Blog Post forms → "SEO Metadata" section

- **Sitemap Priority** (`sitemapPriority`)
  - **Purpose**: Indicates importance of page (0.0 to 1.0)
  - **SEO Impact**: Helps search engines prioritize crawling
  - **Best Practice**: 
    - 1.0 for homepage and key pages
    - 0.8 for important blog posts
    - 0.5 for regular posts
    - 0.3 for archive pages

- **Sitemap Change Frequency** (`sitemapChangefreq`)
  - **Purpose**: Indicates how often content is updated
  - **Options**: `always`, `hourly`, `daily`, `weekly`, `monthly`, `yearly`, `never`
  - **SEO Impact**: Helps search engines schedule crawls efficiently
  - **Best Practice**: 
    - `daily` for news/active blogs
    - `weekly` for regular blog posts
    - `monthly` for evergreen content

### Content Metrics

**Location**: Automatically calculated, displayed in post forms

- **Word Count** (`wordCount`)
  - **Purpose**: Total number of words in content
  - **SEO Impact**: Longer content (1000+ words) often ranks better
  - **Best Practice**: Aim for comprehensive, in-depth content

- **Reading Time** (`readingTime`)
  - **Purpose**: Estimated time to read the post (in minutes)
  - **SEO Impact**: Improves user experience, reduces bounce rate
  - **Best Practice**: Display prominently to set user expectations

---

## Pages SEO Fields

**Location**: Page creation/edit forms

Pages use a subset of blog post SEO fields:

- **Title** (`title`) - Main page title
- **Link Title** (`linkTitle`) - Navigation title
- **Slug** (`slug`) - URL identifier
- **Description** (`description`) - Meta description
- **Summary** (`summary`) - Page excerpt
- **Draft** (`draft`) - Publication status
- **Published Date** (`publishedAt`) - Publication timestamp
- **Expiry Date** (`expiryDate`) - Optional expiration date

**Note**: Pages don't have taxonomy (tags/categories), Open Graph, Twitter Cards, or Schema.org fields by default, as they're typically static content pages.

---

## Media SEO

**Location**: Media management (`/media`)

### Purpose
Media SEO fields ensure images and other media assets are properly optimized for search engines and accessibility.

### Fields

- **Alt Text** (`altText`)
  - **Purpose**: Descriptive text for screen readers and when images fail to load
  - **SEO Impact**: Critical for image search rankings and accessibility
  - **Best Practice**: Descriptive, concise, include relevant keywords naturally

- **Title** (`title`)
  - **Purpose**: Tooltip text and image title attribute
  - **SEO Impact**: Provides additional context for search engines
  - **Best Practice**: Brief, descriptive title

- **Caption** (`caption`)
  - **Purpose**: Visible caption displayed with image
  - **SEO Impact**: Provides context and can include keywords
  - **Best Practice**: Descriptive, can include attribution if needed

- **Width & Height** (`width`, `height`)
  - **Purpose**: Image dimensions
  - **SEO Impact**: Helps with Core Web Vitals (CLS - Cumulative Layout Shift)
  - **Best Practice**: Always specify dimensions for better page performance

### Where It's Used
- Featured images for blog posts
- Images within blog post content
- Author profile pictures
- Social media sharing images (OG images)

---

## Author Profile

**Location**: Author management (`/author`)

### Purpose
Author profiles establish expertise, credibility, and enable rich snippets with author information.

### Fields

- **Name** (`name`)
  - **Purpose**: Author's full name
  - **SEO Impact**: Used in bylines, author pages, and structured data
  - **Best Practice**: Use real name for credibility

- **Slug** (`slug`)
  - **Purpose**: URL-friendly identifier (e.g., `/author/john-doe`)
  - **SEO Impact**: Creates author archive pages
  - **Best Practice**: Use name-based slug

- **Bio** (`bio`)
  - **Purpose**: Author biography
  - **SEO Impact**: Establishes expertise and authority (E-A-T)
  - **Best Practice**: Include credentials, experience, expertise areas

- **Credentials** (`credentials`)
  - **Purpose**: Professional qualifications, certifications
  - **SEO Impact**: Strengthens E-A-T (Expertise, Authoritativeness, Trustworthiness)
  - **Best Practice**: List relevant qualifications

- **Profile Picture** (`profilePicture`)
  - **Purpose**: Author's photo
  - **SEO Impact**: Personal branding, trust signals
  - **Best Practice**: Professional, high-quality image

- **Email** (`email`)
  - **Purpose**: Contact information
  - **SEO Impact**: Used in structured data (can improve trust)
  - **Best Practice**: Use professional email

- **Website** (`website`)
  - **Purpose**: Author's personal/professional website
  - **SEO Impact**: Establishes authority and credibility
  - **Best Practice**: Link to professional portfolio or website

- **Social Links** (`socialLinks`)
  - **Purpose**: Social media profiles (JSON object)
  - **SEO Impact**: Social signals, personal branding
  - **Best Practice**: Include LinkedIn, Twitter, GitHub, etc.

### Where It's Used
- Author bylines on blog posts
- Author archive pages
- Structured data (Article schema)
- Social media sharing
- About page

---

## FAQs (Frequently Asked Questions)

**Location**: FAQ management (`/faqs`)

### Purpose
FAQs can be used to:
1. **Rich Snippets**: Enable FAQ rich snippets in Google search results
2. **Featured Snippets**: Answer common questions to appear in "People Also Ask"
3. **Content Enhancement**: Provide additional value to readers
4. **Voice Search Optimization**: Answer conversational queries

### Fields

- **Question** (`question`)
  - **Purpose**: The FAQ question
  - **SEO Impact**: Can appear in Google's FAQ rich snippets
  - **Best Practice**: Use natural language, match user search queries

- **Answer** (`answer`)
  - **Purpose**: The FAQ answer
  - **SEO Impact**: Content for rich snippets and featured snippets
  - **Best Practice**: Concise (50-100 words), direct answer

- **Order** (`order`)
  - **Purpose**: Display order of FAQs
  - **SEO Impact**: Most important questions should appear first
  - **Best Practice**: Order by importance/frequency

- **Blog Post/Page Association** (`blogPostId`, `pageId`)
  - **Purpose**: Link FAQs to specific content
  - **SEO Impact**: Contextual FAQs improve page relevance
  - **Best Practice**: Add FAQs to relevant blog posts or pages

### Where It's Used
- Individual blog posts (post-specific FAQs)
- Individual pages (page-specific FAQs)
- FAQ schema markup for rich snippets
- FAQ sections on pages
- Potential for dedicated FAQ page

### Schema.org Implementation
FAQs should be rendered as `FAQPage` or `Question` schema types to enable rich snippets:
```json
{
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "Question text",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Answer text"
    }
  }]
}
```

---

## Internal References (Internal Linking)

**Location**: Blog Post forms → "Internal References" section

### Purpose
Internal linking is a critical SEO strategy that:
1. **Distributes Page Authority**: Passes link equity between pages
2. **Improves Crawlability**: Helps search engines discover all pages
3. **Reduces Bounce Rate**: Keeps users engaged on your site
4. **Establishes Topic Clusters**: Groups related content together
5. **Improves Rankings**: Well-linked content ranks better

### Fields

- **From Post** (`fromPostId`)
  - **Purpose**: The post that contains the link
  - **SEO Impact**: Source of link equity

- **To Post** (`toPostId`)
  - **Purpose**: The post being linked to
  - **SEO Impact**: Receives link equity

- **Anchor Text** (`anchorText`)
  - **Purpose**: The clickable text of the link
  - **SEO Impact**: Tells search engines what the linked page is about
  - **Best Practice**: Use descriptive, keyword-rich anchor text naturally

- **Link Type** (`linkType`)
  - **Purpose**: Type of internal link
  - **Options**: 
    - `related` - Related content
    - `prerequisite` - Required reading
    - `follow-up` - Next steps
    - `example` - Example or case study
    - `reference` - Reference material
  - **SEO Impact**: Helps organize content relationships

- **Weight** (`weight`)
  - **Purpose**: Link importance/priority
  - **SEO Impact**: Can influence which links are prioritized
  - **Best Practice**: Higher weight for important internal links

### Where It's Used
- Automatically inserted into blog post content
- Can be displayed as "Related Posts" sections
- Used to build topic clusters
- Navigation breadcrumbs
- "You might also like" sections

### Best Practices
- Link to 3-5 related posts per article
- Use descriptive anchor text (avoid "click here")
- Link to cornerstone content from multiple posts
- Create topic clusters around pillar content
- Update old posts with links to new content

---

## Tags & Categories

**Location**: Tag management (`/tags`), Category management (`/categories`)

### Purpose
Tags and categories help organize content and create topic clusters for SEO.

### Tags

- **Purpose**: Specific topics, keywords, or themes
- **SEO Impact**: 
  - Creates tag archive pages
  - Helps with topic clustering
  - Improves internal linking
- **Best Practice**: 
  - Use 3-10 tags per post
  - Be specific (avoid generic tags)
  - Use consistent naming

### Categories

- **Purpose**: Broad content groupings
- **SEO Impact**: 
  - Creates category archive pages
  - Establishes site structure
  - Helps with site navigation
- **Best Practice**: 
  - Use 1-3 categories per post
  - Create hierarchical categories if needed
  - Use broad, meaningful categories

### Fields

Both Tags and Categories have:
- **Name** (`name`) - Display name
- **Slug** (`slug`) - URL identifier
- **Description** (`description`) - Category/tag description (for archive pages)

### Where It's Used
- Blog post taxonomy
- Archive pages (`/tags/[slug]`, `/categories/[slug]`)
- Post metadata
- Related posts suggestions
- Navigation menus
- Breadcrumbs

---

## SEO Best Practices

### Content Optimization

1. **Title Tags**: 50-60 characters, include primary keyword
2. **Meta Descriptions**: 150-160 characters, compelling, include CTA
3. **Headings**: Use H1 for title, H2-H6 for structure
4. **Keyword Density**: 1-2% (natural usage, avoid keyword stuffing)
5. **Content Length**: Aim for 1000+ words for comprehensive content
6. **Internal Linking**: 3-5 internal links per post
7. **External Links**: Link to authoritative sources

### Technical SEO

1. **Canonical URLs**: Use to prevent duplicate content
2. **Meta Robots**: Properly configure indexing directives
3. **Schema Markup**: Implement structured data for rich snippets
4. **Sitemap**: Keep sitemap updated with proper priorities
5. **Image Optimization**: Always include alt text, optimize file sizes
6. **Mobile Responsiveness**: Ensure all content is mobile-friendly
7. **Page Speed**: Optimize images, minimize code

### On-Page SEO Checklist

- [ ] Unique, descriptive title (50-60 chars)
- [ ] Compelling meta description (150-160 chars)
- [ ] SEO-friendly URL slug
- [ ] Proper heading structure (H1, H2, etc.)
- [ ] Internal links to related content
- [ ] External links to authoritative sources
- [ ] Image alt text for all images
- [ ] Canonical URL (if needed)
- [ ] Proper meta robots directive
- [ ] Open Graph image and metadata
- [ ] Twitter Card metadata
- [ ] Schema.org structured data
- [ ] FAQs (if applicable)
- [ ] Author information
- [ ] Tags and categories
- [ ] Word count and reading time

### Content Strategy

1. **Pillar Content**: Create comprehensive cornerstone content
2. **Topic Clusters**: Group related content around pillars
3. **Content Updates**: Regularly update and refresh old content
4. **Evergreen Content**: Balance timely and evergreen content
5. **User Intent**: Match content to user search intent
6. **E-A-T**: Establish Expertise, Authoritativeness, Trustworthiness

---

## Implementation Notes

### Database Schema
All SEO fields are stored in the AstroDB database:
- `BlogPosts` table: Contains all blog post SEO fields
- `Pages` table: Contains page SEO fields
- `Media` table: Contains image/media SEO fields
- `Author` table: Contains author profile fields
- `FAQs` table: Contains FAQ questions and answers
- `BlogPostReferences` table: Contains internal linking data
- `Tags` and `Categories` tables: Taxonomy data

### Admin Panel
All SEO fields can be managed through the admin panel:
- `/posts/new` and `/posts/[id]` - Blog post SEO fields
- `/pages/new` and `/pages/[id]` - Page SEO fields
- `/media` - Media SEO fields
- `/author` - Author profile
- `/faqs` - FAQ management
- `/tags` and `/categories` - Taxonomy management

### Frontend Implementation
SEO metadata should be rendered in:
- `<head>` section: Meta tags, Open Graph, Twitter Cards, Schema JSON
- Content area: Author bylines, FAQs, related posts
- Archive pages: Tag/category descriptions
- Sitemap: Generated from sitemap metadata

---

## Resources

- [Google Search Central](https://developers.google.com/search)
- [Schema.org Documentation](https://schema.org/)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Cards](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
- [Moz SEO Learning Center](https://moz.com/learn/seo)
- [Ahrefs SEO Blog](https://ahrefs.com/blog/)

---

**Last Updated**: 2026
**Version**: 1.0
