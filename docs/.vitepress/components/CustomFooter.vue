<script setup>
import { useData, useRouter } from 'vitepress'
import { computed } from 'vue'

const { lang, frontmatter } = useData()
const router = useRouter()

const t = computed(() => {
  if (lang.value === 'pt') {
    return {
      tagline: 'Soberania permanente sobre a sua biologia.',
      protocol: 'Protocolo',
      developers: 'Desenvolvedores',
      resources: 'Recursos',
      community: 'Comunidade',
      legal: 'Legal',
      overview: 'Visão Geral',
      beo: 'Schema BEO',
      ieo: 'Schema IEO',
      exchange: 'Exchange',
      biorecord: 'BioRecord',
      sdkRef: 'Referência SDK',
      quickstart: 'Quickstart',
      tutorials: 'Tutoriais',
      implGuide: 'Guia de Implementação',
      examples: 'Exemplos',
      whitepaper: 'Whitepaper',
      bips: 'BIPs',
      taxonomy: 'Taxonomia de Biomarcadores',
      governance: 'Governança',
      privacy: 'Política de Privacidade',
      terms: 'Termos de Uso',
      license: 'Licença MIT',
      copyright: '© 2026 Ambrósio Institute',
      openStandard: 'Open Standard',
      mitLicense: 'MIT License',
      langTitle: 'Idioma',
    }
  } else if (lang.value === 'es') {
    return {
      tagline: 'Soberanía permanente sobre tu biología.',
      protocol: 'Protocolo',
      developers: 'Desarrolladores',
      resources: 'Recursos',
      community: 'Comunidad',
      legal: 'Legal',
      overview: 'Resumen',
      beo: 'Schema BEO',
      ieo: 'Schema IEO',
      exchange: 'Exchange',
      biorecord: 'BioRecord',
      sdkRef: 'Referencia SDK',
      quickstart: 'Inicio Rápido',
      tutorials: 'Tutoriales',
      implGuide: 'Guía de Implementación',
      examples: 'Ejemplos',
      whitepaper: 'Whitepaper',
      bips: 'BIPs',
      taxonomy: 'Taxonomía de Biomarcadores',
      governance: 'Gobernanza',
      privacy: 'Política de Privacidad',
      terms: 'Términos de Uso',
      license: 'Licencia MIT',
      copyright: '© 2026 Ambrósio Institute',
      openStandard: 'Open Standard',
      mitLicense: 'MIT License',
      langTitle: 'Idioma',
    }
  }
  return {
    tagline: 'Permanent sovereignty over your biology.',
    protocol: 'Protocol',
    developers: 'Developers',
    resources: 'Resources',
    community: 'Community',
    legal: 'Legal',
    overview: 'Overview',
    beo: 'BEO Schema',
    ieo: 'IEO Schema',
    exchange: 'Exchange',
    biorecord: 'BioRecord',
    sdkRef: 'SDK Reference',
    quickstart: 'Quickstart',
    tutorials: 'Tutorials',
    implGuide: 'Implementation Guide',
    examples: 'Examples',
    whitepaper: 'Whitepaper',
    bips: 'BIPs',
    taxonomy: 'Biomarker Taxonomy',
    governance: 'Governance',
    privacy: 'Privacy Policy',
    terms: 'Terms of Use',
    license: 'MIT License',
    copyright: '© 2026 Ambrósio Institute',
    openStandard: 'Open Standard',
    mitLicense: 'MIT License',
    langTitle: 'Language',
  }
})

const pfx = computed(() => {
  if (lang.value === 'pt') return '/pt'
  if (lang.value === 'es') return '/es'
  return ''
})

const onLangChange = (event) => {
  const newLang = event.target.value
  let path = window.location.pathname
  if (path.startsWith('/pt/')) path = path.replace('/pt/', '/')
  else if (path.startsWith('/es/')) path = path.replace('/es/', '/')
  if (path === '/pt' || path === '/es') path = '/'
  if (newLang === 'en') {
    router.go(path)
  } else {
    const fixedPath = path.startsWith('/') ? path : `/${path}`
    router.go(`/${newLang}${fixedPath === '/' ? '/' : fixedPath}`)
  }
}

const hasSidebar = computed(() => {
  if (frontmatter.value.layout === 'home' || frontmatter.value.layout === 'page') return false
  if (frontmatter.value.sidebar === false) return false
  return true
})
</script>

<template>
  <footer class="bsp-footer" :class="{ 'has-sidebar': hasSidebar }">
    <div class="footer-inner">

      <!-- Main grid -->
      <div class="footer-grid">

        <!-- Brand column -->
        <div class="footer-brand">
          <img src="/images/bsp-logo-dark.png" class="footer-logo footer-logo-light" alt="BSP" />
          <img src="/images/bsp-logo-light.png" class="footer-logo footer-logo-dark" alt="BSP" />
          <p class="footer-tagline">{{ t.tagline }}</p>
          <div class="social-links">
            <!-- GitHub -->
            <a href="https://github.com/Biological-Sovereignty-Protocol" target="_blank" rel="noopener" class="social-link" aria-label="GitHub">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
            </a>
            <!-- Twitter/X -->
            <a href="#" target="_blank" rel="noopener" class="social-link" aria-label="Twitter / X">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <!-- npm -->
            <a href="https://www.npmjs.com/package/@bsp/sdk" target="_blank" rel="noopener" class="social-link" aria-label="npm">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M0 0v24h24V0H0zm19.2 19.2H12v-9.6H9.6v9.6H4.8V4.8h14.4v14.4z"/></svg>
            </a>
          </div>
        </div>

        <!-- Protocol -->
        <div class="footer-col">
          <h4 class="col-title">{{ t.protocol }}</h4>
          <ul>
            <li><a :href="`${pfx}/specification/overview`">{{ t.overview }}</a></li>
            <li><a :href="`${pfx}/specification/beo`">{{ t.beo }}</a></li>
            <li><a :href="`${pfx}/specification/ieo`">{{ t.ieo }}</a></li>
            <li><a :href="`${pfx}/specification/exchange`">{{ t.exchange }}</a></li>
            <li><a :href="`${pfx}/specification/biorecord`">{{ t.biorecord }}</a></li>
          </ul>
        </div>

        <!-- Developers -->
        <div class="footer-col">
          <h4 class="col-title">{{ t.developers }}</h4>
          <ul>
            <li><a :href="`${pfx}/developers/sdk-reference`">{{ t.sdkRef }}</a></li>
            <li><a :href="`${pfx}/getting-started/quickstart`">{{ t.quickstart }}</a></li>
            <li><a :href="`${pfx}/developers/tutorials`">{{ t.tutorials }}</a></li>
            <li><a :href="`${pfx}/developers/implementation-guide`">{{ t.implGuide }}</a></li>
            <li><a :href="`${pfx}/developers/examples`">{{ t.examples }}</a></li>
          </ul>
        </div>

        <!-- Resources -->
        <div class="footer-col">
          <h4 class="col-title">{{ t.resources }}</h4>
          <ul>
            <li><a :href="`${pfx}/whitepaper`">{{ t.whitepaper }}</a></li>
            <li><a :href="`${pfx}/bips/`">{{ t.bips }}</a></li>
            <li><a :href="`${pfx}/specification/taxonomy/level-1-core`">{{ t.taxonomy }}</a></li>
            <li><a :href="`${pfx}/protocols/governance`">{{ t.governance }}</a></li>
          </ul>
        </div>

        <!-- Legal -->
        <div class="footer-col">
          <h4 class="col-title">{{ t.legal }}</h4>
          <ul>
            <li><a :href="`${pfx}/legal/privacy`">{{ t.privacy }}</a></li>
            <li><a :href="`${pfx}/legal/terms`">{{ t.terms }}</a></li>
            <li><a href="https://github.com/Biological-Sovereignty-Protocol/bsp-spec/blob/main/LICENSE" target="_blank" rel="noopener">{{ t.license }}</a></li>
          </ul>
        </div>

      </div>

      <!-- Bottom bar -->
      <div class="footer-bottom">
        <div class="bottom-left">
          <span class="copyright-text">{{ t.copyright }}</span>
          <span class="separator">·</span>
          <span class="badge badge-open">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style="margin-right:4px"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/></svg>
            {{ t.openStandard }}
          </span>
          <span class="badge badge-mit">{{ t.mitLicense }}</span>
        </div>
        <div class="bottom-right">
          <div class="lang-selector-wrapper">
            <svg class="globe-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
              <path d="M2 12h20"></path>
            </svg>
            <select class="lang-selector" @change="onLangChange" :value="lang">
              <option value="en">EN</option>
              <option value="pt">PT</option>
              <option value="es">ES</option>
            </select>
            <svg class="chevron-icon" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>
      </div>

    </div>
  </footer>
</template>

<style scoped>
.bsp-footer {
  background-color: var(--vp-c-bg-alt);
  border-top: 1px solid var(--vp-c-divider);
  width: 100%;
  box-sizing: border-box;
  position: relative;
  z-index: 100;
  margin-top: 5rem;
}

.dark .bsp-footer {
  background-color: #0d0d0d;
}

@media (min-width: 960px) {
  .bsp-footer.has-sidebar {
    padding-left: var(--vp-sidebar-width, 276px);
  }
}

.footer-inner {
  max-width: 1152px;
  margin: 0 auto;
  padding: 4rem 2rem 0;
}

/* Grid */
.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
  gap: 3rem;
  padding-bottom: 3.5rem;
}

/* Brand */
.footer-brand {
  display: flex;
  flex-direction: column;
}

.footer-logo {
  height: 52px;
  width: auto;
  max-width: 180px;
  object-fit: contain;
  display: block;
  margin-bottom: 1.1rem;
}

.footer-logo-dark { display: none; }
.dark .footer-logo-light { display: none; }
.dark .footer-logo-dark { display: block; }

.footer-tagline {
  color: var(--vp-c-text-2);
  font-size: 0.875rem;
  line-height: 1.55;
  margin-bottom: 1.5rem;
  max-width: 240px;
}

/* Social links */
.social-links {
  display: flex;
  gap: 0.6rem;
  margin-top: auto;
}

.social-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  color: var(--vp-c-text-2);
  border: 1px solid var(--vp-c-divider);
  transition: color 0.2s, border-color 0.2s, background-color 0.2s;
  text-decoration: none;
}

.social-link:hover {
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  background-color: var(--vp-c-brand-soft);
}

/* Columns */
.col-title {
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--vp-c-text-1);
  margin-bottom: 1.1rem;
}

.footer-col ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-col li {
  margin-bottom: 0.6rem;
}

.footer-col a {
  color: var(--vp-c-text-2);
  text-decoration: none;
  font-size: 0.875rem;
  line-height: 1.5;
  transition: color 0.18s;
}

.footer-col a:hover {
  color: var(--vp-c-brand-1);
}

/* Bottom bar */
.footer-bottom {
  border-top: 1px solid var(--vp-c-divider);
  padding: 1.25rem 0 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.bottom-left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.copyright-text {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
}

.separator {
  color: var(--vp-c-divider);
  font-size: 0.9rem;
}

.badge {
  display: inline-flex;
  align-items: center;
  font-size: 0.72rem;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 20px;
  letter-spacing: 0.03em;
}

.badge-open {
  background-color: rgba(16, 185, 129, 0.1);
  color: #059669;
  border: 1px solid rgba(16, 185, 129, 0.25);
}

.dark .badge-open {
  background-color: rgba(16, 185, 129, 0.08);
  color: #34d399;
  border-color: rgba(52, 211, 153, 0.2);
}

.badge-mit {
  background-color: rgba(0, 118, 255, 0.08);
  color: var(--vp-c-brand-1);
  border: 1px solid rgba(0, 118, 255, 0.2);
}

/* Language selector */
.bottom-right {
  display: flex;
  align-items: center;
}

.lang-selector-wrapper {
  position: relative;
  display: inline-flex;
  align-items: center;
  background-color: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 0.3rem 0.65rem;
  transition: border-color 0.2s;
  gap: 4px;
}

.lang-selector-wrapper:hover {
  border-color: var(--vp-c-brand-1);
}

.globe-icon {
  color: var(--vp-c-text-3);
  flex-shrink: 0;
}

.chevron-icon {
  color: var(--vp-c-text-3);
  pointer-events: none;
  flex-shrink: 0;
}

.lang-selector {
  appearance: none;
  background: transparent;
  border: none;
  color: var(--vp-c-text-2);
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  outline: none;
  width: 36px;
  font-family: inherit;
}

.lang-selector option {
  background-color: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

/* Tablet: 2 columns */
@media (max-width: 900px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: 2.5rem 3rem;
  }
  .footer-brand {
    grid-column: 1 / -1;
  }
  .footer-tagline {
    max-width: 100%;
  }
}

/* Mobile: 1 column */
@media (max-width: 540px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  .footer-bottom {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
