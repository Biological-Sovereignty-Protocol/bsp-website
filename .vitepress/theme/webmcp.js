// WebMCP Tool Registration for BSP Website
// Exposes site tools to AI agents via navigator.modelContext (W3C WebMCP protocol)

export function registerWebMCPTools() {
  if (!navigator.modelContext) return

  navigator.modelContext.registerTool({
    name: 'search_documentation',
    description: 'Search BSP protocol documentation, specification, and guides',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Search query for BSP documentation' }
      },
      required: ['query']
    },
    handler: async ({ query }) => {
      const searchButton = document.querySelector('.VPNavBarSearch button, .DocSearch-Button')
      if (searchButton) searchButton.click()
      await new Promise(r => setTimeout(r, 300))
      const input = document.querySelector('.DocSearch-Input, input[type="search"]')
      if (input) {
        input.value = query
        input.dispatchEvent(new Event('input', { bubbles: true }))
      }
      return { status: 'search_opened', query }
    }
  })

  navigator.modelContext.registerTool({
    name: 'navigate_to_page',
    description: 'Navigate to a specific BSP documentation page',
    inputSchema: {
      type: 'object',
      properties: {
        page: {
          type: 'string',
          description: 'Page path to navigate to',
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
      window.location.href = page
      return { status: 'navigated', page }
    }
  })

  navigator.modelContext.registerTool({
    name: 'get_biomarker_info',
    description: 'Get information about BSP biomarker taxonomy levels. 210+ standardized biomarkers across 4 levels: L1 Core (longevity), L2 Standard (routine labs), L3 Extended (specialized), L4 Device (wearables)',
    inputSchema: {
      type: 'object',
      properties: {
        level: {
          type: 'string',
          description: 'Taxonomy level',
          enum: ['L1', 'L2', 'L3', 'L4', 'all']
        }
      },
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
      window.location.href = pages[level] || pages.all
      return { status: 'navigated', level, page: pages[level] }
    }
  })

  navigator.modelContext.registerTool({
    name: 'get_beo_schema',
    description: 'View the BEO (Biological Entity Object) specification — the permanent cryptographic identity for biological data on Arweave',
    inputSchema: { type: 'object', properties: {} },
    handler: async () => {
      window.location.href = '/specification/beo'
      return { status: 'navigated', page: '/specification/beo' }
    }
  })

  navigator.modelContext.registerTool({
    name: 'get_sdk_info',
    description: 'View SDK reference and installation instructions for TypeScript (npm install @bsp/sdk) or Python (pip install bsp-sdk)',
    inputSchema: {
      type: 'object',
      properties: {
        language: { type: 'string', enum: ['typescript', 'python', 'both'], description: 'SDK language' }
      }
    },
    handler: async ({ language }) => {
      window.location.href = '/developers/sdk-reference'
      return { status: 'navigated', page: '/developers/sdk-reference', language }
    }
  })

  navigator.modelContext.registerTool({
    name: 'switch_language',
    description: 'Switch the website language between English, Portuguese, and Spanish',
    inputSchema: {
      type: 'object',
      properties: {
        language: { type: 'string', enum: ['en', 'pt', 'es'], description: 'Target language' }
      },
      required: ['language']
    },
    handler: async ({ language }) => {
      const path = window.location.pathname.replace(/^\/(pt|es)\//, '/')
      const prefix = language === 'en' ? '' : `/${language}`
      window.location.href = `${prefix}${path}`
      return { status: 'switched', language }
    }
  })
}
