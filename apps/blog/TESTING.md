# Testing Checklist for kunjan.in

## Pre-Launch Testing

### Functional Testing

#### Navigation
- [ ] Test navigation menu on all pages
- [ ] Verify mobile hamburger menu works
- [ ] Check all internal links work correctly
- [ ] Test theme toggle (light/dark mode)
- [ ] Verify search button opens Pagefind modal

#### Pages
- [ ] **Home Page**
  - [ ] Hero section displays correctly
  - [ ] Services cards are clickable
  - [ ] Featured posts load (if any in DB)
  - [ ] About blurb displays author info
  - [ ] All CTAs work
- [ ] **Services Page**
  - [ ] All service cards display
  - [ ] Topmate widget loads
  - [ ] Good/Not fit sections are clear
  - [ ] CTAs work correctly
- [ ] **Writing Pages**
  - [ ] Writing listing shows posts grouped by theme
  - [ ] Post detail pages render markdown correctly
  - [ ] Author byline displays
  - [ ] Tags and categories are clickable
  - [ ] Related posts section works
  - [ ] FAQs section displays (if any)
  - [ ] Social share buttons work
- [ ] **Category/Tag Pages**
  - [ ] Categories listing works
  - [ ] Individual category pages show posts
  - [ ] Tags cloud displays with correct sizes
  - [ ] Individual tag pages show posts
- [ ] **About Page**
  - [ ] Author bio displays
  - [ ] YouTube video embeds work
  - [ ] Audio embed works
  - [ ] External links work
- [ ] **Contact Page**
  - [ ] Email links work
  - [ ] Social links work
  - [ ] Topmate widget loads
  - [ ] Expectation alert is visible
- [ ] **404 Page**
  - [ ] Snake game loads and works
  - [ ] Arrow keys and WASD controls work
  - [ ] Score and high score tracking works
  - [ ] High score persists in localStorage
  - [ ] Navigation buttons work

#### Search
- [ ] Pagefind search modal opens
- [ ] Search returns relevant results
- [ ] Search results are clickable
- [ ] Escape key closes search modal
- [ ] Click outside closes search modal

### Responsive Design

#### Breakpoints to Test
- [ ] Mobile (320px - 640px)
- [ ] Tablet (640px - 1024px)
- [ ] Desktop (1024px+)

#### Mobile Testing
- [ ] Navigation menu collapses to hamburger
- [ ] All text is readable
- [ ] Buttons are tappable (min 44x44px)
- [ ] Images scale properly
- [ ] Cards stack vertically
- [ ] Hero sections are readable
- [ ] Snake game canvas is centered

#### Tablet Testing
- [ ] 2-column grid layouts work
- [ ] Navigation displays correctly
- [ ] Images don't overflow

#### Desktop Testing
- [ ] 3-column grid layouts work
- [ ] Max-width constraints apply
- [ ] Whitespace is generous
- [ ] Typography scales appropriately

### SEO Testing

#### Meta Tags
- [ ] Verify `<title>` tags on all pages
- [ ] Check meta descriptions (150-160 chars)
- [ ] Verify canonical URLs
- [ ] Check Open Graph tags
- [ ] Verify Twitter Card tags
- [ ] Confirm JSON-LD structured data

#### Sitemap
- [ ] Access `/sitemap.xml`
- [ ] Verify all pages are included
- [ ] Check lastmod dates
- [ ] Verify priorities and changefreq

#### Robots.txt
- [ ] Access `/robots.txt`
- [ ] Verify sitemap reference
- [ ] Check User-agent directives

#### Redirects
- [ ] Test `/posts` → `/writing` (301)
- [ ] Test `/posts/slug` → `/writing/slug` (301)
- [ ] Test `/:year/:month/:slug` → `/writing/:slug` (301)
- [ ] Test `/resume` → `/about` (301)

### Performance Testing

#### Lighthouse Scores (Target)
- [ ] Performance: 90+
- [ ] Accessibility: 95+
- [ ] Best Practices: 90+
- [ ] SEO: 100

#### Core Web Vitals
- [ ] LCP (Largest Contentful Paint) < 2.5s
- [ ] FID (First Input Delay) < 100ms
- [ ] CLS (Cumulative Layout Shift) < 0.1

#### Page Load Times
- [ ] Home page < 2s
- [ ] Writing listing < 2s
- [ ] Post detail < 2.5s

#### Optimization Checks
- [ ] Images are optimized
- [ ] Fonts are preloaded
- [ ] CSS is minified
- [ ] JS is minimal and deferred
- [ ] Critical CSS is inlined (if needed)

### Browser Testing

#### Desktop Browsers
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

#### Mobile Browsers
- [ ] Chrome Mobile
- [ ] Safari iOS
- [ ] Firefox Mobile

### Accessibility Testing

#### Screen Readers
- [ ] Test with NVDA/JAWS (Windows)
- [ ] Test with VoiceOver (Mac/iOS)
- [ ] Verify all images have alt text
- [ ] Check heading hierarchy (H1-H6)

#### Keyboard Navigation
- [ ] Tab through all interactive elements
- [ ] Verify focus indicators are visible
- [ ] Test Skip to Content link (if added)
- [ ] Ensure no keyboard traps

#### Color Contrast
- [ ] Test with color contrast checker
- [ ] Verify WCAG AA compliance (4.5:1 for normal text)
- [ ] Check both light and dark themes

### Analytics & Tracking

#### Google Analytics
- [ ] Verify GA script loads (if `PUBLIC_GA_MEASUREMENT_ID` is set)
- [ ] Check pageview tracking
- [ ] Test in production only (not dev)

#### Google AdSense
- [ ] Verify AdSense script loads (if `PUBLIC_ADSENSE_CLIENT_ID` is set)
- [ ] Check ad placements
- [ ] Test in production only (not dev)

### Database Testing

#### Data Integrity
- [ ] Verify author data loads correctly
- [ ] Check blog posts query correctly
- [ ] Test category/tag relationships
- [ ] Verify FAQs associate with posts
- [ ] Check related posts links work

#### Edge Cases
- [ ] Test with no posts (empty states)
- [ ] Test with no featured posts
- [ ] Test post without author
- [ ] Test post without categories/tags
- [ ] Test post without FAQs

## Post-Launch Monitoring

### Week 1
- [ ] Monitor Lighthouse scores
- [ ] Check for 404 errors in logs
- [ ] Verify search indexing
- [ ] Test all redirects in production
- [ ] Monitor Core Web Vitals

### Week 2-4
- [ ] Review Google Search Console
- [ ] Check Google Analytics traffic
- [ ] Monitor AdSense performance
- [ ] Review user feedback
- [ ] Check mobile usability report

### Ongoing
- [ ] Weekly Lighthouse audits
- [ ] Monthly SEO check-ups
- [ ] Quarterly content updates
- [ ] Security updates (dependencies)
- [ ] Performance optimization

## Known Issues

_(Document any known issues here)_

## Testing Tools

- **Lighthouse**: Chrome DevTools > Lighthouse tab
- **PageSpeed Insights**: https://pagespeed.web.dev/
- **Mobile-Friendly Test**: https://search.google.com/test/mobile-friendly
- **Rich Results Test**: https://search.google.com/test/rich-results
- **Accessibility**: WAVE (https://wave.webaim.org/)
- **Color Contrast**: WebAIM (https://webaim.org/resources/contrastchecker/)
- **Structured Data**: Google's Structured Data Testing Tool

## Browser DevTools

### Useful Commands
```javascript
// Check localStorage (Snake high score)
localStorage.getItem('snakeHighScore')

// Check theme
document.documentElement.getAttribute('data-theme')

// Verify GA
window.gtag

// Verify Pagefind
window.PagefindUI
```

## Notes

- Test with actual content after migrating blog posts
- Populate author profile before testing
- Add sample FAQs to test schema markup
- Create sample categories and tags
- Test with featured posts enabled

---

**Last Updated**: 2026-01-16
**Status**: Pre-launch testing in progress
