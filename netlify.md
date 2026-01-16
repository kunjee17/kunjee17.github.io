# Netlify Configuration Guide

This guide covers the Netlify dashboard configuration changes needed for deploying the monorepo from Hugo to Astro.

## Overview

The monorepo contains two separate Astro projects:
- **Admin** (`apps/admin/`): Server-side rendered with Netlify Functions → `admin.kunjan.in`
- **Blog** (`apps/blog/`): Static site generation → `kunjan.in`

Both sites are already configured in Netlify with their domains. This guide focuses on updating the build settings for the monorepo structure.

## Admin Site Configuration (admin.kunjan.in)

### Build Settings

Navigate to: **Site settings → Build & deploy → Build settings**

Update the following:

| Setting | Value |
|---------|-------|
| **Base directory** | `apps/admin` |
| **Build command** | `pnpm install && pnpm turbo build --filter=admin` |
| **Publish directory** | `apps/admin/dist` |

### Environment Variables

Navigate to: **Site settings → Environment variables**

Add or verify the following variables:

- `SUPER_ADMIN_PASSWORD` - Required for admin authentication
- Any AstroDB-related environment variables if needed

### Node Version

Navigate to: **Site settings → Environment variables → Add variable**

- Variable: `NODE_VERSION`
- Value: `18` (or higher)

Alternatively, you can set this in the build settings if your Netlify plan supports it.

## Blog Site Configuration (kunjan.in)

### Build Settings

Navigate to: **Site settings → Build & deploy → Build settings**

Update the following:

| Setting | Value |
|---------|-------|
| **Base directory** | `apps/blog` |
| **Build command** | `pnpm install && pnpm turbo build --filter=blog` |
| **Publish directory** | `apps/blog/dist` |

### Environment Variables

Navigate to: **Site settings → Environment variables**

Add any AstroDB-related environment variables if needed.

### Node Version

Navigate to: **Site settings → Environment variables → Add variable**

- Variable: `NODE_VERSION`
- Value: `18` (or higher)

## Monorepo-Specific Considerations

### Base Directory

The **Base directory** setting is critical for monorepo deployments. It tells Netlify:
- Where to find the `package.json` and `netlify.toml` for this specific site
- The context for relative paths in build commands
- Which part of the repository this site should use

### Build Commands

The build commands use Turbo to:
1. Install all dependencies (including workspace packages)
2. Build only the specific app using `--filter=admin` or `--filter=blog`
3. Handle dependencies between packages automatically

### Configuration Files

Each app has its own `netlify.toml` file:
- `apps/admin/netlify.toml` - Admin site configuration
- `apps/blog/netlify.toml` - Blog site configuration

These files are automatically detected by Netlify when the base directory is set correctly.

### Shared Packages

The monorepo uses pnpm workspaces with shared packages:
- `@repo/services` - Shared services
- `@repo/dtos` - Shared data transfer objects
- `@repo/typescript-config` - Shared TypeScript configuration

These are automatically resolved during the build process via pnpm workspace dependencies.

## Git Integration

If you're using Git integration (recommended):

1. Ensure the repository is connected to Netlify
2. Both sites should point to the same repository
3. Configure branch settings:
   - **Production branch**: `main` (or your default branch)
   - **Branch deploys**: Enable if you want preview deployments

## Deployment Workflow

1. Push changes to your Git repository
2. Netlify automatically detects the push
3. For each site:
   - Netlify checks out the repository
   - Changes to the base directory (`apps/admin` or `apps/blog`)
   - Runs the build command
   - Deploys from the publish directory

## Troubleshooting

### Build Fails with "Cannot find module"

- Ensure **Base directory** is set correctly
- Verify `pnpm-workspace.yaml` includes the packages
- Check that workspace dependencies are properly declared in `package.json`

### Build Fails with "Command not found: pnpm"

- Add `NODE_VERSION` environment variable
- Ensure pnpm is available (Netlify should auto-detect from `packageManager` in root `package.json`)

### Functions Not Working (Admin Site)

- Verify `@astrojs/netlify` adapter is installed in `apps/admin`
- Check that `output: "server"` is set in `apps/admin/astro.config.mjs`
- Functions are auto-generated in `.netlify/functions-internal` during build

### Build Takes Too Long

- Turbo caching should help with subsequent builds
- Consider enabling Netlify Build Plugins for optimization
- Check that only necessary files are being built

## Verification Checklist

After configuration, verify:

- [ ] Base directory is set correctly for both sites
- [ ] Build commands use Turbo filters
- [ ] Publish directories point to `dist` folders
- [ ] Node version is set to 18+
- [ ] Environment variables are configured
- [ ] Git integration is working
- [ ] Test deployments are successful

## Additional Resources

- [Netlify Monorepo Documentation](https://docs.netlify.com/configure-builds/monorepos/)
- [Astro Netlify Adapter](https://docs.astro.build/en/guides/integrations-guide/netlify/)
- [Turbo Documentation](https://turbo.build/repo/docs)
