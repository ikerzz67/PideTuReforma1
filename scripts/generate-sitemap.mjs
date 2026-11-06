// Genera dist/sitemap.xml tras el build si VITE_SITE_URL (o SITE_URL) está definida.
// Las URLs de los artículos se leen de src/content/posts.ts (campo slug).
import { readFileSync, writeFileSync, existsSync } from 'node:fs'

const envFile = existsSync('.env') ? readFileSync('.env', 'utf8') : ''
const fromFile = envFile.match(/^VITE_SITE_URL=(.*)$/m)?.[1]?.trim()
const site = (process.env.VITE_SITE_URL || process.env.SITE_URL || fromFile || '').replace(/\/$/, '')

if (!site) {
  console.warn('[sitemap] VITE_SITE_URL no definida: no se genera sitemap.xml (defínela en .env para producción).')
  process.exit(0)
}

const posts = readFileSync('src/content/posts.ts', 'utf8')
const slugs = [...posts.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1])
const paths = ['/', '/blog', ...slugs.map((s) => `/blog/${s}`), '/aviso-legal', '/privacidad', '/cookies']
const xml =
  '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  paths.map((p) => `  <url><loc>${site}${p}</loc></url>`).join('\n') +
  '\n</urlset>\n'
writeFileSync('dist/sitemap.xml', xml)
writeFileSync('dist/robots.txt', `User-agent: *\nAllow: /\nSitemap: ${site}/sitemap.xml\n`)
console.log(`[sitemap] ${paths.length} URLs escritas en dist/sitemap.xml`)
