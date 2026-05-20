# Domain Configuration

Production canonical domain:

```txt
https://www.zescorp.ro
```

Recommendation: redirect root/apex domain to `www`.

```txt
zescorp.ro -> https://www.zescorp.ro
```

Reason: the application metadata, sitemap, robots, and canonical helpers already use `https://www.zescorp.ro`.

## DNS For Vercel

If using Vercel, configure the project domains:

- `www.zescorp.ro`
- `zescorp.ro`

Recommended DNS records:

| Host | Type | Value | Purpose |
| --- | --- | --- | --- |
| `www` | `CNAME` | `cname.vercel-dns.com` | Primary production domain |
| `@` | `A` | `76.76.21.21` | Apex/root redirect support |

Notes:

- Use the exact records shown by Vercel if their dashboard provides project-specific instructions.
- Remove conflicting old `A`, `AAAA`, or `CNAME` records for the same hosts.
- Keep TTL moderate during launch, such as 300 seconds if the DNS provider allows it.

## Redirect Rule

Preferred final behavior:

| Request | Expected result |
| --- | --- |
| `http://zescorp.ro` | `301` to `https://www.zescorp.ro` |
| `https://zescorp.ro` | `301` to `https://www.zescorp.ro` |
| `http://www.zescorp.ro` | `301` to `https://www.zescorp.ro` |
| `https://www.zescorp.ro` | `200` production site |

Vercel usually handles HTTP to HTTPS automatically. Set `www.zescorp.ro` as the primary domain in Vercel so apex redirects to `www`.

## HTTPS Expectations

Before launch is considered complete:

- SSL certificate is active for `www.zescorp.ro`.
- SSL certificate is active for `zescorp.ro`.
- No browser mixed-content warnings.
- `https://www.zescorp.ro/sitemap.xml` returns `200`.
- `https://www.zescorp.ro/robots.txt` returns `200`.
- Canonical tags use `https://www.zescorp.ro`.

## Canonical Consistency

The project currently uses:

```txt
https://www.zescorp.ro
```

in:

- `src/lib/brand.ts`
- `src/lib/seo.ts`
- metadata canonical URLs
- Open Graph URLs
- sitemap URLs
- robots sitemap reference

If the final business decision changes to apex/root as canonical, update `brand.siteUrl` in `src/lib/brand.ts` and rerun the full launch QA.
