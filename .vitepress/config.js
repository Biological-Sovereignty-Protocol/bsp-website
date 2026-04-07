import { defineConfig } from 'vitepress'

const enSidebar = [
    {
        text: 'Getting Started',
        items: [
            { text: 'What is BSP?', link: '/what-is-bsp' },
            { text: 'Learn Hub', link: '/learn' },
            { text: 'Whitepaper', link: '/whitepaper' },
            { text: 'Introduction', link: '/getting-started/intro' },
            { text: 'Quickstart', link: '/getting-started/quickstart' },
            { text: 'User Onboarding', link: '/getting-started/user-onboarding' },
            { text: 'FAQ', link: '/getting-started/faq' }
        ]
    },
    {
        text: 'Architecture & Concepts',
        items: [
            { text: 'Ecosystem Flow', link: '/architecture/ecosystem-flow' },
            { text: 'BEO (Biological Entity)', link: '/architecture/beo' },
            { text: 'IEO (Institutional Entity)', link: '/architecture/ieo' },
            { text: 'Consent & AccessControl', link: '/architecture/consent-token' },
            { text: 'Security & Blockchain', link: '/architecture/security-blockchain' },
            { text: 'GitHub Architecture', link: '/architecture/github-architecture' }
        ]
    },
    {
        text: 'Specification',
        items: [
            { text: 'Overview', link: '/specification/overview' },
            { text: 'BEO Schema', link: '/specification/beo' },
            { text: 'IEO Schema', link: '/specification/ieo' },
            { text: 'BioRecord Schema', link: '/specification/biorecord' },
            { text: 'Exchange Protocol', link: '/specification/exchange' },
            { text: 'BSP Domain System', link: '/specification/bsp-domain' },
            { text: 'Governance', link: '/specification/governance' },
            {
                text: 'Biomarker Taxonomy',
                items: [
                    { text: 'Level 1 — Core', link: '/specification/taxonomy/level-1-core' },
                    { text: 'Level 2 — Standard', link: '/specification/taxonomy/level-2-standard' },
                    { text: 'Level 3 — Extended', link: '/specification/taxonomy/level-3-extended' },
                    { text: 'Level 4 — Device', link: '/specification/taxonomy/level-4-device' }
                ]
            }
        ]
    },
    {
        text: 'Protocols & Guidelines',
        items: [
            { text: 'Exchange Protocol', link: '/protocols/exchange-protocol' },
            { text: 'Governance & BIPs', link: '/protocols/governance' },
            { text: 'Canonical Glossary', link: '/protocols/glossary' }
        ]
    },
    {
        text: 'BIPs',
        items: [
            { text: 'About BIPs', link: '/bips/' },
            { text: 'BIP-0000 — Template', link: '/bips/BIP-0000' }
        ]
    },
    {
        text: 'Community & Roadmap',
        items: [
            { text: 'Roadmap', link: '/roadmap' },
            { text: 'Community', link: '/community' }
        ]
    },
    {
        text: 'Developer Resources',
        items: [
            { text: 'Implementation Guide', link: '/developers/implementation-guide' },
            { text: 'JSON Examples', link: '/developers/examples' },
            { text: 'Biomarker Taxonomy', link: '/developers/taxonomy' },
            { text: 'Complete Taxonomy', link: '/developers/taxonomy-list' },
            { text: 'Certification Process', link: '/developers/certification' },
            { text: 'SDK Reference', link: '/developers/sdk-reference' },
            { text: 'CLI Reference', link: '/developers/cli' },
            { text: 'API Reference', link: '/developers/api-reference' },
            { text: 'MCP Server', link: '/developers/mcp' },
            { text: 'Tutorials & Cookbooks', link: '/developers/tutorials' },
            { text: 'JSON Payloads', link: '/developers/payloads' },
            { text: 'Ecosystem Directory', link: '/developers/directory' }
        ]
    },
    {
        text: 'Use Cases',
        items: [
            { text: 'Health Data Ownership', link: '/use-cases/health-data-ownership' },
            { text: 'Decentralized Health Records', link: '/use-cases/decentralized-health-records' },
            { text: 'Open Data Standard', link: '/use-cases/open-health-data-standard' },
            { text: 'Longevity AI', link: '/use-cases/longevity-ai-data' }
        ]
    }
]

const ptSidebar = [
    {
        text: 'Primeiros Passos',
        items: [
            { text: 'O que é o BSP?', link: '/pt/what-is-bsp' },
            { text: 'Hub de Aprendizado', link: '/pt/learn' },
            { text: 'Whitepaper', link: '/pt/whitepaper' },
            { text: 'Introdução', link: '/pt/getting-started/intro' },
            { text: 'Início Rápido', link: '/pt/getting-started/quickstart' },
            { text: 'Onboarding de Usuário', link: '/pt/getting-started/user-onboarding' },
            { text: 'Perguntas Frequentes (FAQ)', link: '/pt/getting-started/faq' }
        ]
    },
    {
        text: 'Arquitetura e Conceitos',
        items: [
            { text: 'Fluxo do Ecossistema', link: '/pt/architecture/ecosystem-flow' },
            { text: 'BEO (Entidade Biológica)', link: '/pt/architecture/beo' },
            { text: 'IEO (Entidade Institucional)', link: '/pt/architecture/ieo' },
            { text: 'Consentimento', link: '/pt/architecture/consent-token' },
            { text: 'Segurança e Blockchain', link: '/pt/architecture/security-blockchain' },
            { text: 'Arquitetura GitHub', link: '/pt/architecture/github-architecture' }
        ]
    },
    {
        text: 'Especificação',
        items: [
            { text: 'Visão Geral', link: '/pt/specification/overview' },
            { text: 'Schema BEO', link: '/pt/specification/beo' },
            { text: 'Schema IEO', link: '/pt/specification/ieo' },
            { text: 'Schema BioRecord', link: '/pt/specification/biorecord' },
            { text: 'Protocolo de Troca', link: '/pt/specification/exchange' },
            { text: 'Sistema de Domínios .bsp', link: '/pt/specification/bsp-domain' },
            { text: 'Governança', link: '/pt/specification/governance' },
            {
                text: 'Taxonomia L1',
                items: [
                    { text: 'Nível 1 — Core', link: '/pt/specification/taxonomy/level-1-core' },
                    { text: 'Nível 2 — Standard', link: '/pt/specification/taxonomy/level-2-standard' },
                    { text: 'Nível 3 — Extended', link: '/pt/specification/taxonomy/level-3-extended' },
                    { text: 'Nível 4 — Device', link: '/pt/specification/taxonomy/level-4-device' }
                ]
            }
        ]
    },
    {
        text: 'Protocolos e Diretrizes',
        items: [
            { text: 'Protocolo de Troca', link: '/pt/protocols/exchange-protocol' },
            { text: 'Governança e BIPs', link: '/pt/protocols/governance' },
            { text: 'Glossário Canônico', link: '/pt/protocols/glossary' }
        ]
    },
    {
        text: 'BIPs',
        items: [
            { text: 'Sobre os BIPs', link: '/pt/bips/' },
            { text: 'BIP-0000 — Template', link: '/pt/bips/BIP-0000' }
        ]
    },
    {
        text: 'Comunidade e Roadmap',
        items: [
            { text: 'Roadmap', link: '/pt/roadmap' },
            { text: 'Comunidade', link: '/pt/community' }
        ]
    },
    {
        text: 'Recursos para Desenvolvedores',
        items: [
            { text: 'Guia de Implementação', link: '/pt/developers/implementation-guide' },
            { text: 'Exemplos JSON', link: '/pt/developers/examples' },
            { text: 'Taxonomia L1', link: '/pt/developers/taxonomy' },
            { text: 'Taxonomia Completa', link: '/pt/developers/taxonomy-list' },
            { text: 'Processo de Certificação', link: '/pt/developers/certification' },
            { text: 'Referência SDK', link: '/pt/developers/sdk-reference' },
            { text: 'Referência CLI', link: '/pt/developers/cli' },
            { text: 'Referência API', link: '/pt/developers/api-reference' },
            { text: 'Servidor MCP', link: '/pt/developers/mcp' },
            { text: 'Tutoriais e Guias', link: '/pt/developers/tutorials' },
            { text: 'Cargas JSON', link: '/pt/developers/payloads' },
            { text: 'Diretório do Ecossistema', link: '/pt/developers/directory' }
        ]
    },
    {
        text: 'Casos de Uso',
        items: [
            { text: 'Soberania de Dados de Saúde', link: '/pt/use-cases/health-data-ownership' },
            { text: 'Registros de Saúde Descentralizados', link: '/pt/use-cases/decentralized-health-records' },
            { text: 'Padrão Aberto de Dados', link: '/pt/use-cases/open-health-data-standard' },
            { text: 'IA de Longevidade', link: '/pt/use-cases/longevity-ai-data' }
        ]
    }
]

const esSidebar = [
    {
        text: 'Primeros Pasos',
        items: [
            { text: '¿Qué es BSP?', link: '/es/what-is-bsp' },
            { text: 'Hub de Aprendizaje', link: '/es/learn' },
            { text: 'Whitepaper', link: '/es/whitepaper' },
            { text: 'Introducción', link: '/es/getting-started/intro' },
            { text: 'Inicio Rápido', link: '/es/getting-started/quickstart' },
            { text: 'Incorporación de Usuarios', link: '/es/getting-started/user-onboarding' },
            { text: 'Preguntas Frecuentes (FAQ)', link: '/es/getting-started/faq' }
        ]
    },
    {
        text: 'Arquitectura y Conceptos',
        items: [
            { text: 'Flujo del Ecosistema', link: '/es/architecture/ecosystem-flow' },
            { text: 'BEO (Entidad Biológica)', link: '/es/architecture/beo' },
            { text: 'IEO (Entidad Institucional)', link: '/es/architecture/ieo' },
            { text: 'Consentimiento', link: '/es/architecture/consent-token' },
            { text: 'Seguridad y Blockchain', link: '/es/architecture/security-blockchain' },
            { text: 'Arquitectura GitHub', link: '/es/architecture/github-architecture' }
        ]
    },
    {
        text: 'Especificación',
        items: [
            { text: 'Visión General', link: '/es/specification/overview' },
            { text: 'Schema BEO', link: '/es/specification/beo' },
            { text: 'Schema IEO', link: '/es/specification/ieo' },
            { text: 'Schema BioRecord', link: '/es/specification/biorecord' },
            { text: 'Protocolo de Intercambio', link: '/es/specification/exchange' },
            { text: 'Sistema de Dominios .bsp', link: '/es/specification/bsp-domain' },
            { text: 'Gobernanza', link: '/es/specification/governance' },
            {
                text: 'Taxonomía L1',
                items: [
                    { text: 'Nivel 1 — Core', link: '/es/specification/taxonomy/level-1-core' },
                    { text: 'Nivel 2 — Standard', link: '/es/specification/taxonomy/level-2-standard' },
                    { text: 'Nivel 3 — Extended', link: '/es/specification/taxonomy/level-3-extended' },
                    { text: 'Nivel 4 — Device', link: '/es/specification/taxonomy/level-4-device' }
                ]
            }
        ]
    },
    {
        text: 'Protocolos y Directrices',
        items: [
            { text: 'Protocolo de Intercambio', link: '/es/protocols/exchange-protocol' },
            { text: 'Gobernanza y BIPs', link: '/es/protocols/governance' },
            { text: 'Glosario Canónico', link: '/es/protocols/glossary' }
        ]
    },
    {
        text: 'BIPs',
        items: [
            { text: 'Sobre los BIPs', link: '/es/bips/' },
            { text: 'BIP-0000 — Template', link: '/es/bips/BIP-0000' }
        ]
    },
    {
        text: 'Comunidad y Roadmap',
        items: [
            { text: 'Roadmap', link: '/es/roadmap' },
            { text: 'Comunidad', link: '/es/community' }
        ]
    },
    {
        text: 'Desarrolladores',
        items: [
            { text: 'Guía de Implementación', link: '/es/developers/implementation-guide' },
            { text: 'Ejemplos JSON', link: '/es/developers/examples' },
            { text: 'Taxonomía L1', link: '/es/developers/taxonomy' },
            { text: 'Taxonomía Completa', link: '/es/developers/taxonomy-list' },
            { text: 'Proceso de Certificación', link: '/es/developers/certification' },
            { text: 'Referencia SDK', link: '/es/developers/sdk-reference' },
            { text: 'Referencia CLI', link: '/es/developers/cli' },
            { text: 'Referencia API', link: '/es/developers/api-reference' },
            { text: 'Servidor MCP', link: '/es/developers/mcp' },
            { text: 'Tutoriales y Guías', link: '/es/developers/tutorials' },
            { text: 'Cargas JSON', link: '/es/developers/payloads' },
            { text: 'Directorio del Ecosistema', link: '/es/developers/directory' }
        ]
    },
    {
        text: 'Casos de Uso',
        items: [
            { text: 'Soberanía de Datos de Salud', link: '/es/use-cases/health-data-ownership' },
            { text: 'Registros de Salud Descentralizados', link: '/es/use-cases/decentralized-health-records' },
            { text: 'Estándar Abierto de Datos', link: '/es/use-cases/open-health-data-standard' },
            { text: 'IA de Longevidad', link: '/es/use-cases/longevity-ai-data' }
        ]
    }
]

export default defineConfig({
    title: "BSP",
    titleTemplate: ':title — Biological Sovereignty Protocol',
    description: "Open cryptographic standard giving individuals permanent ownership of their biological data. Built on Arweave. 210+ biomarkers. MIT licensed.",
    cleanUrls: true,
    srcExclude: ['**/README.md', '**/LICENSE'],
    lastUpdated: true,

    transformPageData(pageData) {
        const canonicalUrl = `https://biologicalsovereigntyprotocol.com/${pageData.relativePath}`
            .replace(/index\.md$/, '')
            .replace(/\.md$/, '')

        // Determine current lang and base path
        let lang = 'en'
        let basePath = pageData.relativePath
        if (basePath.startsWith('pt/')) { lang = 'pt'; basePath = basePath.replace(/^pt\//, '') }
        else if (basePath.startsWith('es/')) { lang = 'es'; basePath = basePath.replace(/^es\//, '') }

        const cleanBase = basePath.replace(/index\.md$/, '').replace(/\.md$/, '')
        const base = 'https://biologicalsovereigntyprotocol.com'

        const hreflangTags = [
            ['link', { rel: 'alternate', hreflang: 'en', href: `${base}/${cleanBase}` }],
            ['link', { rel: 'alternate', hreflang: 'pt', href: `${base}/pt/${cleanBase}` }],
            ['link', { rel: 'alternate', hreflang: 'es', href: `${base}/es/${cleanBase}` }],
            ['link', { rel: 'alternate', hreflang: 'x-default', href: `${base}/${cleanBase}` }],
            ['link', { rel: 'canonical', href: canonicalUrl }],
        ]

        pageData.frontmatter.head = pageData.frontmatter.head || []
        pageData.frontmatter.head.push(...hreflangTags)
    },

    sitemap: {
        hostname: 'https://biologicalsovereigntyprotocol.com',
        transformItems: (items) => {
            return items.map(item => {
                // Set priority based on path depth
                const depth = (item.url.match(/\//g) || []).length
                if (item.url === '' || item.url === '/') {
                    item.changefreq = 'weekly'
                    item.priority = 1.0
                } else if (item.url.includes('/specification/')) {
                    item.changefreq = 'monthly'
                    item.priority = 0.9
                } else if (item.url.includes('/developers/') || item.url.includes('/getting-started/')) {
                    item.changefreq = 'monthly'
                    item.priority = 0.8
                } else if (item.url.includes('/use-cases/') || item.url.includes('/architecture/')) {
                    item.changefreq = 'monthly'
                    item.priority = 0.7
                } else if (item.url.startsWith('/pt/') || item.url.startsWith('/es/')) {
                    item.changefreq = 'monthly'
                    item.priority = 0.6
                } else if (item.url.includes('/whitepaper')) {
                    item.changefreq = 'yearly'
                    item.priority = 0.9
                } else if (item.url.includes('/roadmap') || item.url.includes('/community')) {
                    item.changefreq = 'weekly'
                    item.priority = 0.7
                } else {
                    item.changefreq = 'monthly'
                    item.priority = 0.5
                }
                return item
            })
        }
    },
    head: [
        // WebMCP — expose tools to AI agents via navigator.modelContext
        ['meta', { name: 'webmcp', content: 'enabled' }],
        ['meta', { name: 'webmcp-tools', content: 'search_documentation,navigate_to_page,get_biomarker_info,get_beo_schema,get_sdk_info,switch_language' }],
        ['meta', { name: 'theme-color', content: '#0076ff' }],
        ['meta', { property: 'og:type', content: 'website' }],
        // Favicon
        ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32.png' }],
        ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16.png' }],
        ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }],
        ['link', { rel: 'icon', type: 'image/png', href: '/favicon.png' }],
        // Open Graph
        ['meta', { property: 'og:type', content: 'website' }],
        ['meta', { property: 'og:site_name', content: 'Biological Sovereignty Protocol' }],
        ['meta', { property: 'og:title', content: 'BSP — Biological Sovereignty Protocol' }],
        ['meta', { property: 'og:description', content: 'Open cryptographic standard giving individuals permanent ownership of their biological data. Built on Arweave.' }],
        ['meta', { property: 'og:image', content: 'https://biologicalsovereigntyprotocol.com/images/bsp-og-image.png' }],
        ['meta', { property: 'og:image:width', content: '1200' }],
        ['meta', { property: 'og:image:height', content: '630' }],
        ['meta', { property: 'og:url', content: 'https://biologicalsovereigntyprotocol.com' }],
        ['meta', { property: 'og:locale', content: 'en_US' }],
        ['meta', { property: 'og:locale:alternate', content: 'pt_BR' }],
        ['meta', { property: 'og:locale:alternate', content: 'es_ES' }],
        // Twitter Card
        ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
        ['meta', { name: 'twitter:site', content: '@BSProtocol' }],
        ['meta', { name: 'twitter:title', content: 'BSP — Biological Sovereignty Protocol' }],
        ['meta', { name: 'twitter:description', content: 'Open cryptographic standard for health data sovereignty. Own your biology permanently.' }],
        ['meta', { name: 'twitter:image', content: 'https://biologicalsovereigntyprotocol.com/images/bsp-og-image.png' }],
        // SEO extras
        ['meta', { name: 'author', content: 'Ambrósio Institute' }],
        ['meta', { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1' }],
        // Structured Data — Organization
        ['script', { type: 'application/ld+json' }, JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Biological Sovereignty Protocol",
            "alternateName": "BSP",
            "url": "https://biologicalsovereigntyprotocol.com",
            "logo": "https://biologicalsovereigntyprotocol.com/favicon.png",
            "description": "Open cryptographic standard for health and longevity data sovereignty. Built on Arweave.",
            "foundingDate": "2026",
            "founder": {
                "@type": "Organization",
                "name": "Ambrósio Institute",
                "url": "https://ambrosioinstitute.org"
            },
            "sameAs": [
                "https://github.com/Biological-Sovereignty-Protocol"
            ]
        })],
        // Structured Data — WebSite (enables Google Sitelinks Search)
        ['script', { type: 'application/ld+json' }, JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Biological Sovereignty Protocol",
            "url": "https://biologicalsovereigntyprotocol.com",
            "potentialAction": {
                "@type": "SearchAction",
                "target": "https://biologicalsovereigntyprotocol.com/?q={search_term_string}",
                "query-input": "required name=search_term_string"
            }
        })],
        // Structured Data — SoftwareApplication (SDK)
        ['script', { type: 'application/ld+json' }, JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "BSP SDK",
            "applicationCategory": "DeveloperApplication",
            "operatingSystem": "Cross-platform",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
            "url": "https://biologicalsovereigntyprotocol.com/developers/sdk-reference"
        })],
        // Structured Data — FAQPage
        ['script', { type: 'application/ld+json' }, JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
                { "@type": "Question", "name": "What is BSP?", "acceptedAnswer": { "@type": "Answer", "text": "The Biological Sovereignty Protocol is an open protocol that gives every individual cryptographic ownership of their biological data — genomics, clinical records, wearables, and more." } },
                { "@type": "Question", "name": "Where is my data stored?", "acceptedAnswer": { "@type": "Answer", "text": "All data is permanently stored on the Arweave network, a decentralized storage blockchain. No company can delete or revoke your access." } },
                { "@type": "Question", "name": "Do I need to pay to use BSP?", "acceptedAnswer": { "@type": "Answer", "text": "No. BSP is open source and MIT-licensed. Any developer can integrate for free. Arweave storage costs are minimal." } },
                { "@type": "Question", "name": "How does consent work?", "acceptedAnswer": { "@type": "Answer", "text": "Every access requires a ConsentToken — cryptographically signed by the BEO holder. You define scope, time limits, and can revoke at any time." } },
                { "@type": "Question", "name": "Can I integrate with existing systems (FHIR, HL7)?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. BSP was designed to interoperate with existing standards. Our Exchange API translates between formats natively." } },
                { "@type": "Question", "name": "Who is behind BSP?", "acceptedAnswer": { "@type": "Answer", "text": "BSP is maintained by the Ambrósio Institute and community-governed through BIPs (BSP Improvement Proposals). Anyone can propose changes." } }
            ]
        })]
    ],

    themeConfig: {
        logo: {
            light: '/images/bsp-logo-dark.png',
            dark: '/images/bsp-logo-light.png'
        },
        siteTitle: false,
        search: {
            provider: 'local',
            options: {
                translations: {
                    button: {
                        buttonText: 'Search',
                        buttonAriaLabel: 'Search docs'
                    },
                    modal: {
                        noResultsText: 'No results for',
                        resetButtonTitle: 'Clear',
                        footer: {
                            selectText: 'to select',
                            navigateText: 'to navigate',
                            closeText: 'to close'
                        }
                    }
                }
            }
        },
        socialLinks: [
            { icon: 'github', link: 'https://github.com/Biological-Sovereignty-Protocol' }
        ]
    },

    locales: {
        root: {
            label: 'English',
            lang: 'en',
            themeConfig: {
                description: 'BSP is the open cryptographic standard for health data sovereignty. Own your biological data permanently on Arweave. No gatekeepers. No API fees.',
                nav: [
                    {
                        text: 'Learn',
                        items: [
                            { text: 'What is BSP?', link: '/what-is-bsp' },
                            { text: 'Learn Hub', link: '/learn' },
                            { text: 'Compare: BSP vs FHIR', link: '/compare' },
                            { text: 'Glossary', link: '/glossary' },
                            { text: 'FAQ', link: '/getting-started/faq' }
                        ]
                    },
                    {
                        text: 'Use',
                        items: [
                            { text: 'Use Cases', link: '/use-cases/' },
                            { text: 'Health Data Ownership', link: '/use-cases/health-data-ownership' },
                            { text: 'Decentralized Health Records', link: '/use-cases/decentralized-health-records' },
                            { text: 'Longevity & AI Data', link: '/use-cases/longevity-ai-data' },
                            { text: 'Integrations', link: '/integrations' },
                            { text: 'User Onboarding', link: '/getting-started/user-onboarding' }
                        ]
                    },
                    {
                        text: 'Build',
                        items: [
                            { text: 'Introduction', link: '/getting-started/intro' },
                            { text: 'Quickstart', link: '/getting-started/quickstart' },
                            { text: 'Implementation Guide', link: '/developers/implementation-guide' },
                            { text: 'SDK Reference', link: '/developers/sdk-reference' },
                            { text: 'CLI Reference', link: '/developers/cli' },
                            { text: 'API Reference', link: '/developers/api-reference' },
                            { text: 'MCP Server', link: '/developers/mcp' },
                            { text: 'Tutorials', link: '/developers/tutorials' },
                            { text: 'Certification', link: '/developers/certification' }
                        ]
                    },
                    {
                        text: 'Participate',
                        items: [
                            { text: 'Community', link: '/community' },
                            { text: 'Roadmap', link: '/roadmap' },
                            { text: 'BIPs', link: '/bips/' },
                            { text: 'Governance', link: '/protocols/governance' },
                            { text: 'Contribute', link: '/community#contribute' }
                        ]
                    },
                    {
                        text: 'Research',
                        items: [
                            { text: 'Whitepaper', link: '/whitepaper' },
                            { text: 'Specification Overview', link: '/specification/overview' },
                            { text: 'BEO Schema', link: '/specification/beo' },
                            { text: 'IEO Schema', link: '/specification/ieo' },
                            { text: 'BioRecord Format', link: '/specification/biorecord' },
                            { text: 'BSP Domain', link: '/specification/bsp-domain' },
                            { text: 'Exchange Protocol', link: '/specification/exchange' },
                            { text: 'Governance Spec', link: '/specification/governance' },
                            { text: 'Taxonomy L1 Core', link: '/specification/taxonomy/level-1-core' },
                            { text: 'Taxonomy L2 Standard', link: '/specification/taxonomy/level-2-standard' },
                            { text: 'Taxonomy L3 Extended', link: '/specification/taxonomy/level-3-extended' },
                            { text: 'Taxonomy L4 Device', link: '/specification/taxonomy/level-4-device' },
                            { text: 'Architecture Overview', link: '/architecture' },
                            { text: 'Security & Blockchain', link: '/architecture/security-blockchain' }
                        ]
                    },
                    { text: 'Create BEO', link: 'https://id.biologicalsovereigntyprotocol.com/create' },
                ],
                sidebar: {
                    '/': enSidebar
                }
            }
        },
        pt: {
            label: 'Português',
            lang: 'pt',
            link: '/pt/',
            title: 'Protocolo de Soberania Biológica',
            description: 'O protocolo que dá a cada humano soberania permanente sobre sua própria biologia.',
            themeConfig: {
                description: 'BSP é o padrão criptográfico aberto para soberania de dados de saúde. Seja dono dos seus dados biológicos permanentemente no Arweave.',
                outlineTitle: 'Nesta página',
                returnToTopLabel: 'Voltar ao topo',
                sidebarMenuLabel: 'Menu',
                darkModeSwitchLabel: 'Tema',
                lastUpdatedText: 'Atualizado em',
                editLink: {
                    pattern: 'https://github.com/Biological-Sovereignty-Protocol/bsp-spec/edit/main/docs/:path',
                    text: 'Editar esta página'
                },
                docFooter: {
                    prev: 'Anterior',
                    next: 'Próximo'
                },
                search: {
                    options: {
                        translations: {
                            button: { buttonText: 'Buscar', buttonAriaLabel: 'Buscar na documentação' },
                            modal: {
                                noResultsText: 'Nenhum resultado para',
                                resetButtonTitle: 'Limpar',
                                footer: { selectText: 'para selecionar', navigateText: 'para navegar', closeText: 'para fechar' }
                            }
                        }
                    }
                },
                nav: [
                    {
                        text: 'Aprenda',
                        items: [
                            { text: 'O que é o BSP?', link: '/pt/what-is-bsp' },
                            { text: 'Hub de Aprendizado', link: '/pt/learn' },
                            { text: 'Comparativo: BSP vs FHIR', link: '/pt/compare' },
                            { text: 'Glossário', link: '/pt/glossary' },
                            { text: 'Perguntas Frequentes', link: '/pt/getting-started/faq' }
                        ]
                    },
                    {
                        text: 'Use',
                        items: [
                            { text: 'Casos de Uso', link: '/pt/use-cases/' },
                            { text: 'Soberania de Dados de Saúde', link: '/pt/use-cases/health-data-ownership' },
                            { text: 'Prontuários Descentralizados', link: '/pt/use-cases/decentralized-health-records' },
                            { text: 'Longevidade e IA', link: '/pt/use-cases/longevity-ai-data' },
                            { text: 'Integrações', link: '/pt/integrations' },
                            { text: 'Onboarding de Usuários', link: '/pt/getting-started/user-onboarding' }
                        ]
                    },
                    {
                        text: 'Construa',
                        items: [
                            { text: 'Introdução', link: '/pt/getting-started/intro' },
                            { text: 'Início Rápido', link: '/pt/getting-started/quickstart' },
                            { text: 'Guia de Implementação', link: '/pt/developers/implementation-guide' },
                            { text: 'Referência SDK', link: '/pt/developers/sdk-reference' },
                            { text: 'Referência CLI', link: '/developers/cli' },
                            { text: 'Referência API', link: '/developers/api-reference' },
                            { text: 'Servidor MCP', link: '/developers/mcp' },
                            { text: 'Tutoriais', link: '/pt/developers/tutorials' },
                            { text: 'Certificação', link: '/pt/developers/certification' }
                        ]
                    },
                    {
                        text: 'Participe',
                        items: [
                            { text: 'Comunidade', link: '/pt/community' },
                            { text: 'Roadmap', link: '/pt/roadmap' },
                            { text: 'BIPs', link: '/pt/bips/' },
                            { text: 'Governança', link: '/pt/protocols/governance' },
                            { text: 'Contribuir', link: '/pt/community#contribute' }
                        ]
                    },
                    {
                        text: 'Pesquisa',
                        items: [
                            { text: 'Whitepaper', link: '/pt/whitepaper' },
                            { text: 'Visão Geral da Spec', link: '/pt/specification/overview' },
                            { text: 'Schema BEO', link: '/pt/specification/beo' },
                            { text: 'Schema IEO', link: '/pt/specification/ieo' },
                            { text: 'Formato BioRecord', link: '/pt/specification/biorecord' },
                            { text: 'Domínio BSP', link: '/pt/specification/bsp-domain' },
                            { text: 'Protocolo de Troca', link: '/pt/specification/exchange' },
                            { text: 'Spec de Governança', link: '/pt/specification/governance' },
                            { text: 'Taxonomia L1 Core', link: '/pt/specification/taxonomy/level-1-core' },
                            { text: 'Taxonomia L2 Standard', link: '/pt/specification/taxonomy/level-2-standard' },
                            { text: 'Taxonomia L3 Extended', link: '/pt/specification/taxonomy/level-3-extended' },
                            { text: 'Taxonomia L4 Device', link: '/pt/specification/taxonomy/level-4-device' },
                            { text: 'Visão da Arquitetura', link: '/pt/architecture' },
                            { text: 'Segurança e Blockchain', link: '/pt/architecture/security-blockchain' }
                        ]
                    },
                    { text: 'Criar BEO', link: 'https://id.biologicalsovereigntyprotocol.com/create' },
                ],
                sidebar: {
                    '/pt/': ptSidebar
                }
            }
        },
        es: {
            label: 'Español',
            lang: 'es',
            link: '/es/',
            title: 'Protocolo de Soberanía Biológica',
            description: 'El protocolo que otorga a cada ser humano soberanía permanente sobre su propia biología.',
            themeConfig: {
                description: 'BSP es el estándar criptográfico abierto para la soberanía de datos de salud. Sea dueño de sus datos biológicos permanentemente en Arweave.',
                outlineTitle: 'En esta página',
                returnToTopLabel: 'Volver arriba',
                sidebarMenuLabel: 'Menú',
                darkModeSwitchLabel: 'Tema',
                lastUpdatedText: 'Actualizado el',
                editLink: {
                    pattern: 'https://github.com/Biological-Sovereignty-Protocol/bsp-spec/edit/main/docs/:path',
                    text: 'Editar esta página'
                },
                docFooter: {
                    prev: 'Anterior',
                    next: 'Siguiente'
                },
                search: {
                    options: {
                        translations: {
                            button: { buttonText: 'Buscar', buttonAriaLabel: 'Buscar en la documentación' },
                            modal: {
                                noResultsText: 'Sin resultados para',
                                resetButtonTitle: 'Limpiar',
                                footer: { selectText: 'para seleccionar', navigateText: 'para navegar', closeText: 'para cerrar' }
                            }
                        }
                    }
                },
                nav: [
                    {
                        text: 'Aprende',
                        items: [
                            { text: '¿Qué es BSP?', link: '/es/what-is-bsp' },
                            { text: 'Hub de Aprendizaje', link: '/es/learn' },
                            { text: 'Comparativa: BSP vs FHIR', link: '/es/compare' },
                            { text: 'Glosario', link: '/es/glossary' },
                            { text: 'Preguntas Frecuentes', link: '/es/getting-started/faq' }
                        ]
                    },
                    {
                        text: 'Usa',
                        items: [
                            { text: 'Casos de Uso', link: '/es/use-cases/' },
                            { text: 'Soberanía de Datos de Salud', link: '/es/use-cases/health-data-ownership' },
                            { text: 'Registros Descentralizados', link: '/es/use-cases/decentralized-health-records' },
                            { text: 'Longevidad e IA', link: '/es/use-cases/longevity-ai-data' },
                            { text: 'Integraciones', link: '/es/integrations' },
                            { text: 'Incorporación de Usuarios', link: '/es/getting-started/user-onboarding' }
                        ]
                    },
                    {
                        text: 'Construye',
                        items: [
                            { text: 'Introducción', link: '/es/getting-started/intro' },
                            { text: 'Inicio Rápido', link: '/es/getting-started/quickstart' },
                            { text: 'Guía de Implementación', link: '/es/developers/implementation-guide' },
                            { text: 'Referencia SDK', link: '/es/developers/sdk-reference' },
                            { text: 'Referencia CLI', link: '/developers/cli' },
                            { text: 'Referencia API', link: '/developers/api-reference' },
                            { text: 'Servidor MCP', link: '/developers/mcp' },
                            { text: 'Tutoriales', link: '/es/developers/tutorials' },
                            { text: 'Certificación', link: '/es/developers/certification' }
                        ]
                    },
                    {
                        text: 'Participa',
                        items: [
                            { text: 'Comunidad', link: '/es/community' },
                            { text: 'Roadmap', link: '/es/roadmap' },
                            { text: 'BIPs', link: '/es/bips/' },
                            { text: 'Gobernanza', link: '/es/protocols/governance' },
                            { text: 'Contribuir', link: '/es/community#contribute' }
                        ]
                    },
                    {
                        text: 'Investigación',
                        items: [
                            { text: 'Whitepaper', link: '/es/whitepaper' },
                            { text: 'Resumen de Especificación', link: '/es/specification/overview' },
                            { text: 'Schema BEO', link: '/es/specification/beo' },
                            { text: 'Schema IEO', link: '/es/specification/ieo' },
                            { text: 'Formato BioRecord', link: '/es/specification/biorecord' },
                            { text: 'Dominio BSP', link: '/es/specification/bsp-domain' },
                            { text: 'Protocolo de Intercambio', link: '/es/specification/exchange' },
                            { text: 'Spec de Gobernanza', link: '/es/specification/governance' },
                            { text: 'Taxonomía L1 Core', link: '/es/specification/taxonomy/level-1-core' },
                            { text: 'Taxonomía L2 Standard', link: '/es/specification/taxonomy/level-2-standard' },
                            { text: 'Taxonomía L3 Extended', link: '/es/specification/taxonomy/level-3-extended' },
                            { text: 'Taxonomía L4 Device', link: '/es/specification/taxonomy/level-4-device' },
                            { text: 'Vista de Arquitectura', link: '/es/architecture' },
                            { text: 'Seguridad y Blockchain', link: '/es/architecture/security-blockchain' }
                        ]
                    },
                    { text: 'Crear BEO', link: 'https://id.biologicalsovereigntyprotocol.com/create' },
                ],
                sidebar: {
                    '/es/': esSidebar
                }
            }
        }
    }
})
