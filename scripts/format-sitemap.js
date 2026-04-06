import { readFileSync, writeFileSync, mkdirSync } from 'fs'

const distDir = '.vitepress/dist'
const baseUrl = 'https://biologicalsovereigntyprotocol.com'
const xml = readFileSync(`${distDir}/sitemap.xml`, 'utf8')

// Parse all URLs from the sitemap
const urlRegex = /<url>([\s\S]*?)<\/url>/g
const urls = []
let match
while ((match = urlRegex.exec(xml)) !== null) {
  const block = match[1]
  const loc = block.match(/<loc>(.*?)<\/loc>/)?.[1] || ''
  const lastmod = block.match(/<lastmod>(.*?)<\/lastmod>/)?.[1] || ''
  const changefreq = block.match(/<changefreq>(.*?)<\/changefreq>/)?.[1] || 'monthly'
  const priority = block.match(/<priority>(.*?)<\/priority>/)?.[1] || '0.5'
  const alternates = [...block.matchAll(/<xhtml:link[^>]*href="([^"]*)"[^>]*hreflang="([^"]*)"[^/]*\/>/g)]
    .map(m => ({ href: m[1], hreflang: m[2] }))
  urls.push({ loc, lastmod, changefreq, priority, alternates })
}

// Categorize URLs
const categories = {
  'core': { label: 'Core Pages', filter: u => {
    const p = u.loc.replace(baseUrl, '')
    return !p.startsWith('/pt/') && !p.startsWith('/es/') &&
      ['/', '/what-is-bsp', '/whitepaper', '/learn', '/compare', '/glossary', '/community', '/roadmap', '/integrations'].some(x => p === x || p === x + '/')
  }},
  'specification': { label: 'Protocol Specification', filter: u => {
    const p = u.loc.replace(baseUrl, '')
    return !p.startsWith('/pt/') && !p.startsWith('/es/') && p.startsWith('/specification')
  }},
  'architecture': { label: 'Architecture & Concepts', filter: u => {
    const p = u.loc.replace(baseUrl, '')
    return !p.startsWith('/pt/') && !p.startsWith('/es/') && p.startsWith('/architecture')
  }},
  'developers': { label: 'Developer Resources', filter: u => {
    const p = u.loc.replace(baseUrl, '')
    return !p.startsWith('/pt/') && !p.startsWith('/es/') && (p.startsWith('/developers') || p.startsWith('/getting-started'))
  }},
  'use-cases': { label: 'Use Cases', filter: u => {
    const p = u.loc.replace(baseUrl, '')
    return !p.startsWith('/pt/') && !p.startsWith('/es/') && p.startsWith('/use-cases')
  }},
  'community': { label: 'Community & Governance', filter: u => {
    const p = u.loc.replace(baseUrl, '')
    return !p.startsWith('/pt/') && !p.startsWith('/es/') && (p.startsWith('/bips') || p.startsWith('/protocols') || p.startsWith('/legal'))
  }},
  'pt': { label: 'Portuguese (PT-BR)', filter: u => u.loc.replace(baseUrl, '').startsWith('/pt/') },
  'es': { label: 'Spanish (ES)', filter: u => u.loc.replace(baseUrl, '').startsWith('/es/') },
}

// Generate individual sitemaps
function buildSitemap(entries, comment) {
  let out = `<?xml version="1.0" encoding="UTF-8"?>\n`
  out += `<!-- ${comment} -->\n`
  out += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`
  out += `        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n\n`
  for (const u of entries) {
    out += `  <url>\n`
    out += `    <loc>${u.loc}</loc>\n`
    if (u.lastmod) out += `    <lastmod>${u.lastmod}</lastmod>\n`
    out += `    <changefreq>${u.changefreq}</changefreq>\n`
    out += `    <priority>${u.priority}</priority>\n`
    for (const alt of u.alternates) {
      out += `    <xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${alt.href}" />\n`
    }
    out += `  </url>\n\n`
  }
  out += `</urlset>\n`
  return out
}

// Write category sitemaps
mkdirSync(`${distDir}/sitemaps`, { recursive: true })
const indexEntries = []
const now = new Date().toISOString().split('T')[0]

for (const [name, cat] of Object.entries(categories)) {
  const entries = urls.filter(cat.filter)
  if (entries.length === 0) continue
  const filename = `sitemap-${name}.xml`
  const content = buildSitemap(entries, `BSP Sitemap — ${cat.label} (${entries.length} pages)`)
  writeFileSync(`${distDir}/sitemaps/${filename}`, content, 'utf8')
  indexEntries.push({ loc: `${baseUrl}/sitemaps/${filename}`, lastmod: now, count: entries.length, label: cat.label })
  console.log(`  ✓ sitemaps/${filename} — ${entries.length} URLs (${cat.label})`)
}

// Generate sitemap index
let index = `<?xml version="1.0" encoding="UTF-8"?>\n`
index += `<!--\n`
index += `  Biological Sovereignty Protocol — Sitemap Index\n`
index += `  ${baseUrl}\n`
index += `  Total: ${urls.length} pages across ${indexEntries.length} categories\n`
index += `-->\n`
index += `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n\n`
for (const entry of indexEntries) {
  index += `  <!-- ${entry.label} (${entry.count} pages) -->\n`
  index += `  <sitemap>\n`
  index += `    <loc>${entry.loc}</loc>\n`
  index += `    <lastmod>${entry.lastmod}</lastmod>\n`
  index += `  </sitemap>\n\n`
}
index += `</sitemapindex>\n`

writeFileSync(`${distDir}/sitemap.xml`, index, 'utf8')
console.log(`\n✓ sitemap.xml index — ${indexEntries.length} categories, ${urls.length} total URLs`)
