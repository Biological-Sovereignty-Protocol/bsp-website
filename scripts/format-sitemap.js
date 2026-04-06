import { readFileSync, writeFileSync } from 'fs'

const path = '.vitepress/dist/sitemap.xml'
const xml = readFileSync(path, 'utf8')

const lines = xml.replace(/></g, '>\n<').split('\n').map(l => l.trim()).filter(Boolean)

const formatted = lines.map(line => {
  // Self-closing tags (like xhtml:link)
  if (line.endsWith('/>')) {
    if (line.startsWith('<xhtml:')) return '      ' + line
    return '    ' + line
  }
  // XML declaration
  if (line.startsWith('<?')) return line
  // urlset open/close
  if (line.startsWith('<urlset')) return line
  if (line === '</urlset>') return line
  // url open/close
  if (line === '<url>') return '  <url>'
  if (line === '</url>') return '  </url>'
  // Tags that open and close on same line (loc, lastmod, changefreq, priority)
  if (line.startsWith('<') && line.includes('</')) return '    ' + line
  // Fallback
  return '    ' + line
}).join('\n')

writeFileSync(path, formatted + '\n', 'utf8')
console.log('✓ sitemap.xml formatted (' + formatted.split('\n').length + ' lines)')
