# ZES MEDCORP Brand Asset Replacement Plan

This project is prepared for final brand assets, but still uses the current fallback files until the real production package is delivered.

## Active Configuration

All active brand paths are centralized in:

```txt
src/lib/brand.ts
```

Current fallbacks:

- Logo: `/logo-zes.png`
- Favicon: `/favicon.ico`
- App icon: `/icon.png`
- Apple icon: `/apple-icon.png`
- Open Graph images: `/og/home.png`, `/og/services.png`, `/og/knowledge.png`, `/og/tools.png`

Future expected paths are already listed in `futureBrandAssets` inside `src/lib/brand.ts`.

## Required Final Assets

Place final files under:

```txt
public/brand/logo/
public/brand/icons/
public/brand/og/
public/brand/reference/
```

Recommended file names:

- `public/brand/logo/logo-color.svg`
- `public/brand/logo/logo-white.svg`
- `public/brand/logo/logo-mark.svg`
- `public/brand/logo/logo-horizontal.svg`
- `public/brand/icons/favicon.ico`
- `public/brand/icons/apple-icon.png`
- `public/brand/og/og-home.png`
- `public/brand/og/og-services.png`
- `public/brand/og/og-knowledge.png`
- `public/brand/og/og-tools.png`

## Asset Specifications

Logos:

- SVG is preferred for all production logo variants.
- Use transparent backgrounds.
- Keep text converted to outlines only if licensing requires it; otherwise preserve editable text.
- `logo-color.svg` should work on white/light backgrounds.
- `logo-white.svg` should work on dark blue or graphite backgrounds.
- `logo-mark.svg` should be a square or compact mark for schema, icons, and constrained UI.
- `logo-horizontal.svg` should be the primary header/navigation logo.

Icons:

- `favicon.ico`: include at least 16x16, 32x32, and 48x48 sizes.
- `apple-icon.png`: 180x180 PNG.
- Optional future additions: 192x192 and 512x512 PNG app icons.
- Keep the icon legible at small sizes. Avoid thin text in the favicon.

Open Graph:

- Size: 1200x630 px.
- Format: PNG or high-quality JPG.
- Keep safe margins around text and logo.
- Use concise text, strong hierarchy, and ZES blue accents.
- Avoid busy backgrounds, stock doctor imagery, and tiny technical details.

Reference files:

- Add original source files, brand guidelines, color references, and approved logo exports to `public/brand/reference/`.
- Do not reference large editable source files directly in the app.

## Where Assets Are Used

- Header and footer logo: `src/components/layout/BrandLogo.tsx`
- SEO defaults and Open Graph image routing: `src/lib/seo.ts`
- App icons and metadata icons: `src/lib/seo.ts`
- Web manifest: `src/app/manifest.ts`
- Browser theme color: `src/app/layout.tsx`
- Organization schema logo: `src/components/seo/OrganizationSchema.tsx`

## Safe Replacement Steps

1. Add the final files using the expected paths under `public/brand/`.
2. Update `brandAssets` in `src/lib/brand.ts` to point active values from fallback paths to `futureBrandAssets`.
3. Verify the header logo on desktop and mobile.
4. Verify the footer logo on dark background.
5. Open `/manifest.webmanifest`, `/favicon.ico`, and `/apple-icon.png`.
6. Verify metadata previews on home, service, Knowledge Hub, and tool pages.
7. Run:

```bash
npm run build
```

8. After deployment, test public URLs with LinkedIn, Facebook, and X/Twitter sharing debuggers.

## Notes

- Do not remove fallback assets until production brand files are confirmed in staging.
- Keep brand file names stable once external previews have cached them.
- If OG images are replaced, keep the same dimensions and paths to avoid metadata churn.
