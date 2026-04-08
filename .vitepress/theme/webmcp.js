// WebMCP Tool Registration for BSP Website
// Exposes site tools to AI agents via navigator.modelContext (W3C WebMCP protocol)
// Multilingual: descriptions adapt to current page language

export function registerWebMCPTools() {
  if (!navigator.modelContext) return

  // Detect current language
  const path = window.location.pathname
  const lang = path.startsWith('/pt/') ? 'pt' : path.startsWith('/es/') ? 'es' : 'en'
  const prefix = lang === 'en' ? '' : `/${lang}`

  const t = {
    en: {
      searchDesc: 'Search BSP protocol documentation, specification, and guides',
      searchQuery: 'Search query for BSP documentation',
      navDesc: 'Navigate to a specific BSP documentation page',
      navPage: 'Page path to navigate to',
      bioDesc: 'Get information about BSP biomarker taxonomy. 210+ standardized biomarkers across 4 levels: L1 Core (longevity), L2 Standard (routine labs), L3 Extended (specialized), L4 Device (wearables)',
      bioLevel: 'Taxonomy level',
      beoDesc: 'View the BEO (Biological Entity Object) specification — the permanent cryptographic identity for biological data on Arweave',
      sdkDesc: 'View SDK reference and installation for TypeScript (npm install bsp-sdk) or Python (pip install bsp-sdk)',
      sdkLang: 'SDK language',
      langDesc: 'Switch the website language between English, Portuguese, and Spanish',
      langTarget: 'Target language',
    },
    pt: {
      searchDesc: 'Buscar na documentação do protocolo BSP — especificação, guias e tutoriais',
      searchQuery: 'Busca na documentação BSP',
      navDesc: 'Navegar para uma página específica da documentação BSP',
      navPage: 'Caminho da página',
      bioDesc: 'Informações sobre a taxonomia de biomarcadores BSP. 210+ biomarcadores em 4 níveis: L1 Core (longevidade), L2 Standard (rotina), L3 Extended (especializado), L4 Device (wearables)',
      bioLevel: 'Nível da taxonomia',
      beoDesc: 'Ver a especificação do BEO (Biological Entity Object) — identidade criptográfica permanente para dados biológicos no Arweave',
      sdkDesc: 'Ver referência do SDK e instalação para TypeScript (npm install bsp-sdk) ou Python (pip install bsp-sdk)',
      sdkLang: 'Linguagem do SDK',
      langDesc: 'Trocar o idioma do site entre Inglês, Português e Espanhol',
      langTarget: 'Idioma destino',
    },
    es: {
      searchDesc: 'Buscar en la documentación del protocolo BSP — especificación, guías y tutoriales',
      searchQuery: 'Búsqueda en la documentación BSP',
      navDesc: 'Navegar a una página específica de la documentación BSP',
      navPage: 'Ruta de la página',
      bioDesc: 'Información sobre la taxonomía de biomarcadores BSP. 210+ biomarcadores en 4 niveles: L1 Core (longevidad), L2 Standard (rutina), L3 Extended (especializado), L4 Device (wearables)',
      bioLevel: 'Nivel de taxonomía',
      beoDesc: 'Ver la especificación del BEO (Biological Entity Object) — identidad criptográfica permanente para datos biológicos en Arweave',
      sdkDesc: 'Ver referencia del SDK e instalación para TypeScript (npm install bsp-sdk) o Python (pip install bsp-sdk)',
      sdkLang: 'Lenguaje del SDK',
      langDesc: 'Cambiar el idioma del sitio entre Inglés, Portugués y Español',
      langTarget: 'Idioma destino',
    }
  }

  const i = t[lang]

  navigator.modelContext.registerTool({
    name: 'search_documentation',
    description: i.searchDesc,
    inputSchema: {
      type: 'object',
      properties: { query: { type: 'string', description: i.searchQuery } },
      required: ['query']
    },
    handler: async ({ query }) => {
      const searchButton = document.querySelector('.VPNavBarSearch button, .DocSearch-Button')
      if (searchButton) searchButton.click()
      await new Promise(r => setTimeout(r, 300))
      const input = document.querySelector('.DocSearch-Input, input[type="search"]')
      if (input) { input.value = query; input.dispatchEvent(new Event('input', { bubbles: true })) }
      return { status: 'search_opened', query, lang }
    }
  })

  navigator.modelContext.registerTool({
    name: 'navigate_to_page',
    description: i.navDesc,
    inputSchema: {
      type: 'object',
      properties: {
        page: {
          type: 'string',
          description: i.navPage,
          enum: [
            '/specification/overview', '/specification/beo', '/specification/ieo',
            '/specification/biorecord', '/specification/exchange', '/specification/governance',
            '/specification/taxonomy/level-1-core', '/specification/taxonomy/level-2-standard',
            '/whitepaper', '/getting-started/quickstart', '/developers/sdk-reference',
            '/architecture', '/use-cases/', '/community', '/roadmap', '/compare'
          ]
        }
      },
      required: ['page']
    },
    handler: async ({ page }) => {
      window.location.href = `${prefix}${page}`
      return { status: 'navigated', page: `${prefix}${page}`, lang }
    }
  })

  navigator.modelContext.registerTool({
    name: 'get_biomarker_info',
    description: i.bioDesc,
    inputSchema: {
      type: 'object',
      properties: { level: { type: 'string', description: i.bioLevel, enum: ['L1', 'L2', 'L3', 'L4', 'all'] } },
      required: ['level']
    },
    handler: async ({ level }) => {
      const pages = {
        L1: '/specification/taxonomy/level-1-core',
        L2: '/specification/taxonomy/level-2-standard',
        L3: '/specification/taxonomy/level-3-extended',
        L4: '/specification/taxonomy/level-4-device',
        all: '/developers/taxonomy'
      }
      window.location.href = `${prefix}${pages[level] || pages.all}`
      return { status: 'navigated', level, lang }
    }
  })

  navigator.modelContext.registerTool({
    name: 'get_beo_schema',
    description: i.beoDesc,
    inputSchema: { type: 'object', properties: {} },
    handler: async () => {
      window.location.href = `${prefix}/specification/beo`
      return { status: 'navigated', page: `${prefix}/specification/beo`, lang }
    }
  })

  navigator.modelContext.registerTool({
    name: 'get_sdk_info',
    description: i.sdkDesc,
    inputSchema: {
      type: 'object',
      properties: { language: { type: 'string', enum: ['typescript', 'python', 'both'], description: i.sdkLang } }
    },
    handler: async ({ language }) => {
      window.location.href = `${prefix}/developers/sdk-reference`
      return { status: 'navigated', page: `${prefix}/developers/sdk-reference`, sdkLang: language, lang }
    }
  })

  navigator.modelContext.registerTool({
    name: 'switch_language',
    description: i.langDesc,
    inputSchema: {
      type: 'object',
      properties: { language: { type: 'string', enum: ['en', 'pt', 'es'], description: i.langTarget } },
      required: ['language']
    },
    handler: async ({ language }) => {
      const basePath = window.location.pathname.replace(/^\/(pt|es)\//, '/')
      const newPrefix = language === 'en' ? '' : `/${language}`
      window.location.href = `${newPrefix}${basePath}`
      return { status: 'switched', from: lang, to: language }
    }
  })
}
