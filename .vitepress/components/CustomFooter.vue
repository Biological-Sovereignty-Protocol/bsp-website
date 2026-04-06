<script setup>
import { useData, useRouter } from 'vitepress'
import { computed } from 'vue'

const { lang, frontmatter } = useData()
const router = useRouter()

const t = computed(() => {
  if (lang.value === 'pt') {
    return {
      tagline: 'Soberania permanente sobre a sua biologia.',
      colLearn: 'Aprender',
      colProtocol: 'Protocolo',
      colDev: 'Desenvolvedores',
      colUseCases: 'Casos de Uso',
      colCommunity: 'Comunidade',
      colEcosystem: 'Ecossistema',
      colResources: 'Recursos',
      colLegal: 'Legal',
      whatIsBsp: 'O que é o BSP?',
      learnHub: 'Hub de Aprendizado',
      whitepaper: 'Whitepaper',
      compare: 'BSP vs FHIR vs HL7',
      glossary: 'Glossário',
      faq: 'Perguntas Frequentes',
      intro: 'Introdução ao Protocolo',
      specOverview: 'Visão Geral da Spec',
      beo: 'Schema BEO',
      ieo: 'Schema IEO',
      exchange: 'Protocolo de Exchange',
      biorecord: 'Schema BioRecord',
      governance: 'Governança',
      quickstart: 'Início Rápido',
      sdkRef: 'Referência SDK',
      tutorials: 'Tutoriais',
      implGuide: 'Guia de Implementação',
      examples: 'Exemplos JSON',
      integrations: 'Integrações',
      certification: 'Certificação',
      uc1: 'Dados de Saúde Pessoais',
      uc2: 'Registros Médicos Descentralizados',
      uc3: 'Padrão Aberto de Dados de Saúde',
      uc4: 'IA de Longevidade',
      uc5: 'Soberania Biológica',
      community: 'Hub da Comunidade',
      roadmap: 'Roadmap',
      bips: 'BIPs',
      contribute: 'Como Contribuir',
      forum: 'Fórum de Discussão',
      archDiagram: 'Diagrama de Arquitetura',
      ecosystemFlow: 'Fluxo do Ecossistema',
      taxonomy: 'Taxonomia de Biomarcadores',
      taxonomyL2: 'Taxonomia L2',
      taxonomyL3: 'Taxonomia L3',
      taxonomyL4: 'Taxonomia L4',
      changelog: 'Changelog',
      privacy: 'Política de Privacidade',
      terms: 'Termos de Uso',
      license: 'Licença MIT',
      copyright: '© 2026 Ambrósio Institute',
      openStandard: 'Open Standard',
      mitLicense: 'MIT License',
      langTitle: 'Idioma',
      seoLabel: 'Explorar BSP',
      seoText: 'O Biological Sovereignty Protocol (BSP) é um padrão aberto para soberania e interoperabilidade de dados de saúde pessoais. O BSP define schemas estruturados — BEO (Biological Entity Object), IEO (Instrument Entity Object), BioRecord e Exchange Protocol — permitindo que indivíduos, desenvolvedores e instituições de saúde troquem dados com consentimento verificável. Construído para pesquisa de longevidade, registros médicos descentralizados e aplicações de saúde com IA.',
      seoTags: [
        { label: 'BSP Protocol', href: '/specification/overview' },
        { label: 'Soberania Biológica', href: '/use-cases/' },
        { label: 'Schema BEO', href: '/specification/beo' },
        { label: 'Schema IEO', href: '/specification/ieo' },
        { label: 'Schema BioRecord', href: '/specification/biorecord' },
        { label: 'Taxonomia L1', href: '/specification/taxonomy/level-1-core' },
        { label: 'Exchange Protocol', href: '/specification/exchange' },
        { label: 'Padrão Aberto de Saúde', href: '/use-cases/open-health-data-standard' },
        { label: 'Registros Descentralizados', href: '/use-cases/decentralized-health-records' },
        { label: 'Dados de Saúde Pessoais', href: '/use-cases/health-data-ownership' },
        { label: 'IA de Longevidade', href: '/use-cases/longevity-ai-data' },
        { label: 'SDK Reference', href: '/developers/sdk-reference' },
        { label: 'Governança', href: '/specification/governance' },
        { label: 'Open Standard', href: '/whitepaper' },
        { label: 'MIT License', href: '/legal/terms' },
      ],
    }
  } else if (lang.value === 'es') {
    return {
      tagline: 'Soberanía permanente sobre tu biología.',
      colLearn: 'Aprender',
      colProtocol: 'Protocolo',
      colDev: 'Desarrolladores',
      colUseCases: 'Casos de Uso',
      colCommunity: 'Comunidad',
      colEcosystem: 'Ecosistema',
      colResources: 'Recursos',
      colLegal: 'Legal',
      whatIsBsp: '¿Qué es BSP?',
      learnHub: 'Hub de Aprendizaje',
      whitepaper: 'Whitepaper',
      compare: 'BSP vs FHIR vs HL7',
      glossary: 'Glosario',
      faq: 'Preguntas Frecuentes',
      intro: 'Introducción al Protocolo',
      specOverview: 'Resumen de Especificación',
      beo: 'Schema BEO',
      ieo: 'Schema IEO',
      exchange: 'Protocolo de Exchange',
      biorecord: 'Schema BioRecord',
      governance: 'Gobernanza',
      quickstart: 'Inicio Rápido',
      sdkRef: 'Referencia SDK',
      tutorials: 'Tutoriales',
      implGuide: 'Guía de Implementación',
      examples: 'Ejemplos JSON',
      integrations: 'Integraciones',
      certification: 'Certificación',
      uc1: 'Datos de Salud Personales',
      uc2: 'Registros Médicos Descentralizados',
      uc3: 'Estándar Abierto de Datos de Salud',
      uc4: 'IA de Longevidad',
      uc5: 'Soberanía Biológica',
      community: 'Hub de la Comunidad',
      roadmap: 'Roadmap',
      bips: 'BIPs',
      contribute: 'Cómo Contribuir',
      forum: 'Foro de Discusión',
      archDiagram: 'Diagrama de Arquitectura',
      ecosystemFlow: 'Flujo del Ecosistema',
      taxonomy: 'Taxonomía de Biomarcadores',
      taxonomyL2: 'Taxonomía L2',
      taxonomyL3: 'Taxonomía L3',
      taxonomyL4: 'Taxonomía L4',
      changelog: 'Changelog',
      privacy: 'Política de Privacidad',
      terms: 'Términos de Uso',
      license: 'Licencia MIT',
      copyright: '© 2026 Ambrósio Institute',
      openStandard: 'Open Standard',
      mitLicense: 'MIT License',
      langTitle: 'Idioma',
      seoLabel: 'Explorar BSP',
      seoText: 'Biological Sovereignty Protocol (BSP) es un estándar abierto para la soberanía e interoperabilidad de datos de salud personal. BSP define schemas estructurados — BEO, IEO, BioRecord y Exchange Protocol — permitiendo a individuos, desarrolladores e instituciones de salud intercambiar datos con consentimiento verificable. Construido para investigación de longevidad, registros médicos descentralizados y aplicaciones de salud con IA.',
      seoTags: [
        { label: 'BSP Protocol', href: '/es/specification/overview' },
        { label: 'Soberanía Biológica', href: '/es/use-cases/' },
        { label: 'Schema BEO', href: '/es/specification/beo' },
        { label: 'Schema IEO', href: '/es/specification/ieo' },
        { label: 'Schema BioRecord', href: '/es/specification/biorecord' },
        { label: 'Taxonomía L1', href: '/es/specification/taxonomy/level-1-core' },
        { label: 'Exchange Protocol', href: '/es/specification/exchange' },
        { label: 'Estándar Abierto de Salud', href: '/es/use-cases/open-health-data-standard' },
        { label: 'Registros Descentralizados', href: '/es/use-cases/decentralized-health-records' },
        { label: 'IA de Longevidad', href: '/es/use-cases/longevity-ai-data' },
        { label: 'SDK Reference', href: '/es/developers/sdk-reference' },
        { label: 'Open Standard', href: '/es/whitepaper' },
      ],
    }
  }
  return {
    tagline: 'Permanent sovereignty over your biology.',
    colLearn: 'Learn',
    colProtocol: 'Protocol',
    colDev: 'Developers',
    colUseCases: 'Use Cases',
    colCommunity: 'Community',
    colEcosystem: 'Ecosystem',
    colResources: 'Resources',
    colLegal: 'Legal',
    whatIsBsp: 'What is BSP?',
    learnHub: 'Learn Hub',
    whitepaper: 'Whitepaper',
    compare: 'BSP vs FHIR vs HL7',
    glossary: 'Glossary',
    faq: 'FAQ',
    intro: 'Protocol Introduction',
    specOverview: 'Specification Overview',
    beo: 'BEO Schema',
    ieo: 'IEO Schema',
    exchange: 'Exchange Protocol',
    biorecord: 'BioRecord Schema',
    governance: 'Governance Spec',
    quickstart: 'Quickstart',
    sdkRef: 'SDK Reference',
    tutorials: 'Tutorials',
    implGuide: 'Implementation Guide',
    examples: 'JSON Examples',
    integrations: 'Integrations',
    certification: 'Certification',
    uc1: 'Personal Health Data',
    uc2: 'Decentralized Medical Records',
    uc3: 'Open Health Data Standard',
    uc4: 'Longevity AI',
    uc5: 'Biological Sovereignty',
    community: 'Community Hub',
    roadmap: 'Roadmap',
    bips: 'BIPs',
    contribute: 'How to Contribute',
    forum: 'Discussion Forum',
    archDiagram: 'Architecture Diagram',
    ecosystemFlow: 'Ecosystem Flow',
    taxonomy: 'Biomarker Taxonomy',
    taxonomyL2: 'Taxonomy L2',
    taxonomyL3: 'Taxonomy L3',
    taxonomyL4: 'Taxonomy L4',
    changelog: 'Changelog',
    privacy: 'Privacy Policy',
    terms: 'Terms of Use',
    license: 'MIT License',
    copyright: '© 2026 Ambrósio Institute',
    openStandard: 'Open Standard',
    mitLicense: 'MIT License',
    langTitle: 'Language',
    seoLabel: 'Explore BSP',
    seoText: 'Biological Sovereignty Protocol (BSP) is an open standard for personal health data ownership, sovereignty, and interoperability. BSP defines structured schemas — BEO (Biological Entity Object), IEO (Instrument Entity Object), BioRecord, and Exchange Protocol — enabling individuals, developers, and health institutions to exchange personal health data with full consent and verifiability. Built for longevity research, decentralized health records, and AI-powered health applications. BSP is MIT-licensed and open to contributions.',
    seoTags: [
      { label: 'BSP Protocol', href: '/specification/overview' },
      { label: 'Biological Sovereignty', href: '/use-cases/' },
      { label: 'BEO Schema', href: '/specification/beo' },
      { label: 'IEO Schema', href: '/specification/ieo' },
      { label: 'BioRecord Schema', href: '/specification/biorecord' },
      { label: 'Taxonomy L1', href: '/specification/taxonomy/level-1-core' },
      { label: 'Exchange Protocol', href: '/specification/exchange' },
      { label: 'Open Health Standard', href: '/use-cases/open-health-data-standard' },
      { label: 'Decentralized Health Records', href: '/use-cases/decentralized-health-records' },
      { label: 'Personal Health Data', href: '/use-cases/health-data-ownership' },
      { label: 'Longevity AI', href: '/use-cases/longevity-ai-data' },
      { label: 'SDK Reference', href: '/developers/sdk-reference' },
      { label: 'Governance Spec', href: '/specification/governance' },
      { label: 'Open Standard', href: '/whitepaper' },
      { label: 'MIT License', href: '/legal/terms' },
    ],
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

      <!-- Main row: brand + 4 primary columns -->
      <div class="footer-main">

        <!-- Create BEO CTA (replaces brand position) -->
        <div class="footer-cta">
          <h4 class="footer-cta-title">Create your BEO</h4>
          <p class="footer-cta-desc">{{ t.tagline }}</p>
          <a href="https://id.biologicalsovereigntyprotocol.com/create" target="_blank" rel="noopener" class="footer-cta-btn">
            Create BEO
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-left:6px"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>

        <!-- Learn -->
        <div class="footer-col">
          <h4 class="col-title">{{ t.colLearn }}</h4>
          <ul>
            <li><a :href="`${pfx}/what-is-bsp`">{{ t.whatIsBsp }}</a></li>
            <li><a :href="`${pfx}/learn`">{{ t.learnHub }}</a></li>
            <li><a :href="`${pfx}/whitepaper`">{{ t.whitepaper }}</a></li>
            <li><a :href="`${pfx}/compare`">{{ t.compare }}</a></li>
            <li><a :href="`${pfx}/glossary`">{{ t.glossary }}</a></li>
            <li><a :href="`${pfx}/getting-started/faq`">{{ t.faq }}</a></li>
            <li><a :href="`${pfx}/getting-started/intro`">{{ t.intro }}</a></li>
          </ul>
        </div>

        <!-- Protocol -->
        <div class="footer-col">
          <h4 class="col-title">{{ t.colProtocol }}</h4>
          <ul>
            <li><a :href="`${pfx}/specification/overview`">{{ t.specOverview }}</a></li>
            <li><a :href="`${pfx}/specification/beo`">{{ t.beo }}</a></li>
            <li><a :href="`${pfx}/specification/ieo`">{{ t.ieo }}</a></li>
            <li><a :href="`${pfx}/specification/exchange`">{{ t.exchange }}</a></li>
            <li><a :href="`${pfx}/specification/biorecord`">{{ t.biorecord }}</a></li>
            <li><a :href="`${pfx}/specification/bsp-domain`">BSP Domain</a></li>
            <li><a :href="`${pfx}/specification/governance`">{{ t.governance }}</a></li>
          </ul>
        </div>

        <!-- Developers -->
        <div class="footer-col">
          <h4 class="col-title">{{ t.colDev }}</h4>
          <ul>
            <li><a :href="`${pfx}/getting-started/quickstart`">{{ t.quickstart }}</a></li>
            <li><a :href="`${pfx}/getting-started/user-onboarding`">User Onboarding</a></li>
            <li><a :href="`${pfx}/developers/sdk-reference`">{{ t.sdkRef }}</a></li>
            <li><a :href="`${pfx}/developers/tutorials`">{{ t.tutorials }}</a></li>
            <li><a :href="`${pfx}/developers/implementation-guide`">{{ t.implGuide }}</a></li>
            <li><a :href="`${pfx}/developers/examples`">{{ t.examples }}</a></li>
            <li><a :href="`${pfx}/developers/payloads`">Payload Reference</a></li>
            <li><a :href="`${pfx}/integrations`">{{ t.integrations }}</a></li>
            <li><a :href="`${pfx}/developers/certification`">{{ t.certification }}</a></li>
          </ul>
        </div>

        <!-- Use Cases -->
        <div class="footer-col">
          <h4 class="col-title">{{ t.colUseCases }}</h4>
          <ul>
            <li><a :href="`${pfx}/use-cases/health-data-ownership`">{{ t.uc1 }}</a></li>
            <li><a :href="`${pfx}/use-cases/decentralized-health-records`">{{ t.uc2 }}</a></li>
            <li><a :href="`${pfx}/use-cases/open-health-data-standard`">{{ t.uc3 }}</a></li>
            <li><a :href="`${pfx}/use-cases/longevity-ai-data`">{{ t.uc4 }}</a></li>
            <li><a :href="`${pfx}/use-cases/`">{{ t.uc5 }}</a></li>
          </ul>
        </div>

      </div>

      <!-- Secondary row: 4 colunas (Community, Ecosystem, Resources, Legal) -->
      <div class="footer-secondary">

        <div class="footer-secondary-spacer"></div>

        <!-- Community -->
        <div class="footer-col-sm">
          <h4 class="col-title">{{ t.colCommunity }}</h4>
          <ul>
            <li><a href="https://id.biologicalsovereigntyprotocol.com/create" target="_blank" rel="noopener">Create BEO</a></li>
            <li><a :href="`${pfx}/community`">{{ t.community }}</a></li>
            <li><a href="https://github.com/Biological-Sovereignty-Protocol/bsp-spec/blob/main/CONTRIBUTING.md" target="_blank" rel="noopener">{{ t.contribute }}</a></li>
            <li><a href="https://github.com/Biological-Sovereignty-Protocol/bsp-spec/discussions" target="_blank" rel="noopener">{{ t.forum }}</a></li>
            <li><a href="https://id.biologicalsovereigntyprotocol.com" target="_blank" rel="noopener">BSP ID</a></li>
          </ul>
        </div>

        <!-- Ecosystem -->
        <div class="footer-col-sm">
          <h4 class="col-title">{{ t.colEcosystem }}</h4>
          <ul>
            <li><a :href="`${pfx}/architecture`">{{ t.archDiagram }}</a></li>
            <li><a :href="`${pfx}/architecture/ecosystem-flow`">{{ t.ecosystemFlow }}</a></li>
            <li><a :href="`${pfx}/roadmap`">{{ t.roadmap }}</a></li>
            <li><a :href="`${pfx}/bips/`">{{ t.bips }}</a></li>
            <li><a href="https://github.com/Biological-Sovereignty-Protocol/bsp-spec/releases" target="_blank" rel="noopener">{{ t.changelog }}</a></li>
          </ul>
        </div>

        <!-- Resources -->
        <div class="footer-col-sm">
          <h4 class="col-title">{{ t.colResources }}</h4>
          <ul>
            <li><a :href="`${pfx}/specification/taxonomy/level-1-core`">{{ t.taxonomy }}</a></li>
            <li><a :href="`${pfx}/specification/taxonomy/level-2-standard`">{{ t.taxonomyL2 }}</a></li>
            <li><a :href="`${pfx}/specification/taxonomy/level-3-extended`">{{ t.taxonomyL3 }}</a></li>
            <li><a :href="`${pfx}/specification/taxonomy/level-4-device`">{{ t.taxonomyL4 }}</a></li>
          </ul>
        </div>

        <!-- Legal -->
        <div class="footer-col-sm">
          <h4 class="col-title">{{ t.colLegal }}</h4>
          <ul>
            <li><a :href="`${pfx}/legal/privacy`">{{ t.privacy }}</a></li>
            <li><a :href="`${pfx}/legal/terms`">{{ t.terms }}</a></li>
            <li><a href="https://github.com/Biological-Sovereignty-Protocol/bsp-spec/blob/main/LICENSE" target="_blank" rel="noopener">{{ t.license }}</a></li>
          </ul>
        </div>

      </div>

      <!-- SEO Tags -->
      <div class="footer-seo-tags">
        <span class="seo-label">{{ t.seoLabel }}</span>
        <div class="seo-pills">
          <a v-for="tag in t.seoTags" :key="tag.label" :href="`${pfx}${tag.href}`" class="seo-pill">{{ tag.label }}</a>
        </div>
      </div>

      <!-- SEO Text Block -->
      <div class="footer-seo-text">
        <p>{{ t.seoText }}</p>
      </div>

      <!-- Brand row (moved from top) -->
      <div class="footer-brand-row">
        <div class="footer-brand-left">
          <img src="/images/bsp-logo-dark.png" class="footer-logo footer-logo-light" alt="Biological Sovereignty Protocol" />
          <img src="/images/bsp-logo-light.png" class="footer-logo footer-logo-dark" alt="Biological Sovereignty Protocol" />
        </div>
        <div class="social-links">
          <a href="https://github.com/Biological-Sovereignty-Protocol" target="_blank" rel="noopener" class="social-link" aria-label="GitHub">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
          </a>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="footer-bottom">
        <div class="bottom-left">
          <span class="copyright-text">{{ t.copyright }}</span>
          <span class="separator">·</span>
          <span class="badge badge-open">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style="margin-right:4px"><circle cx="12" cy="12" r="10"/></svg>
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
  max-width: 1280px;
  margin: 0 auto;
  padding: 4rem 2rem 0;
}

/* ─── Main row: brand + 4 primary cols ─── */
.footer-main {
  display: grid;
  grid-template-columns: 1.5fr repeat(4, 1fr);
  gap: 2.5rem;
  padding-bottom: 3rem;
}

/* Create BEO CTA (top-left of footer) */
.footer-cta {
  display: flex;
  flex-direction: column;
}

.footer-cta-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
}

.footer-cta-desc {
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
  line-height: 1.55;
  margin-bottom: 1.2rem;
  max-width: 220px;
}

.footer-cta-btn {
  display: inline-flex;
  align-items: center;
  padding: 0.6rem 1.2rem;
  border-radius: 10px;
  background: var(--vp-c-brand-1);
  color: #fff;
  font-size: 0.82rem;
  font-weight: 600;
  text-decoration: none;
  width: fit-content;
  transition: background 0.2s, box-shadow 0.2s;
}

.footer-cta-btn:hover {
  background: var(--vp-c-brand-2, #0062d6);
  box-shadow: 0 4px 16px rgba(0, 118, 255, 0.25);
}

/* Brand row (moved to bottom, before bottom bar) */
.footer-brand-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 0;
  border-top: 1px solid var(--vp-c-divider);
}

.footer-brand-left {
  display: flex;
  align-items: center;
}

.footer-logo {
  height: 36px;
  width: auto;
  max-width: 160px;
  object-fit: contain;
  display: block;
}

.footer-logo-dark { display: none; }
.dark .footer-logo-light { display: none; }
.dark .footer-logo-dark { display: block; }

.social-links {
  display: flex;
  gap: 0.6rem;
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

/* Primary columns */
.footer-col ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-col li {
  margin-bottom: 0.55rem;
}

.footer-col a {
  color: var(--vp-c-text-2);
  text-decoration: none;
  font-size: 0.82rem;
  line-height: 1.5;
  transition: color 0.18s;
}

.footer-col a:hover {
  color: var(--vp-c-brand-1);
}

/* ─── Secondary row: spacer + 4 cols (alinha com brand acima) ─── */
.footer-secondary {
  display: grid;
  grid-template-columns: 1.5fr repeat(4, 1fr);
  gap: 2.5rem;
  border-top: 1px solid var(--vp-c-divider);
  padding: 2.5rem 0 3rem;
}

.footer-secondary-spacer {
  /* alinha com brand acima */
}

.footer-col-sm ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-col-sm li {
  margin-bottom: 0.5rem;
}

.footer-col-sm a {
  color: var(--vp-c-text-2);
  text-decoration: none;
  font-size: 0.82rem;
  line-height: 1.5;
  transition: color 0.18s;
}

.footer-col-sm a:hover {
  color: var(--vp-c-brand-1);
}

/* Column titles */
.col-title {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--vp-c-text-1);
  margin-bottom: 1rem;
}

/* ─── SEO Tags ─── */
.footer-seo-tags {
  border-top: 1px solid var(--vp-c-divider);
  padding: 2rem 0 1.5rem;
}

.seo-label {
  display: block;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--vp-c-text-3);
  margin-bottom: 1rem;
}

.seo-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.seo-pill {
  display: inline-block;
  padding: 5px 13px;
  border-radius: 20px;
  font-size: 0.78rem;
  color: var(--vp-c-text-2);
  border: 1px solid var(--vp-c-divider);
  text-decoration: none;
  transition: color 0.18s, border-color 0.18s, background-color 0.18s;
  white-space: nowrap;
}

.seo-pill:hover {
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  background-color: var(--vp-c-brand-soft);
}

/* ─── SEO Text Block ─── */
.footer-seo-text {
  padding: 1rem 0 2rem;
}

.footer-seo-text p {
  font-size: 0.75rem;
  line-height: 1.7;
  color: var(--vp-c-text-3);
  max-width: 960px;
  margin: 0;
}

/* ─── Bottom bar ─── */
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

.globe-icon { color: var(--vp-c-text-3); flex-shrink: 0; }
.chevron-icon { color: var(--vp-c-text-3); pointer-events: none; flex-shrink: 0; }

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

/* ─── Responsive ─── */
@media (max-width: 1200px) {
  .footer-main {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }
  .footer-brand {
    grid-column: 1 / -1;
    flex-direction: row;
    align-items: flex-start;
    gap: 2rem;
    flex-wrap: wrap;
  }
  .footer-tagline { max-width: 300px; margin-bottom: 0; }
  .footer-secondary {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }
  .footer-secondary-spacer { display: none; }
}

@media (max-width: 768px) {
  .footer-main {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }
  .footer-brand {
    grid-column: 1 / -1;
    flex-direction: column;
  }
  .footer-secondary {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }
  .footer-secondary-spacer { display: none; }
}

@media (max-width: 480px) {
  .footer-main {
    grid-template-columns: 1fr 1fr;
    gap: 1.8rem;
  }
  .footer-secondary { grid-template-columns: 1fr; }
  .footer-secondary-spacer { display: none; }
  .footer-bottom {
    flex-direction: column;
    align-items: flex-start;
  }
  .seo-pills { gap: 0.4rem; }
}
</style>
