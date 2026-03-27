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
    title: "Biological Sovereignty Protocol",
    description: "The protocol that gives every human being permanent sovereignty over their own biology.",
    cleanUrls: true,

    sitemap: {
        hostname: 'https://biologicalsovereigntyprotocol.com'
    },
    head: [
        ['meta', { name: 'theme-color', content: '#0076ff' }],
        ['meta', { property: 'og:type', content: 'website' }],
        ['meta', { property: 'og:site_name', content: 'Biological Sovereignty Protocol' }],
        ['meta', { property: 'og:image', content: 'https://biologicalsovereigntyprotocol.com/images/bsp-og-image.jpg' }],
        ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
        ['meta', { name: 'twitter:site', content: '@BSProtocol' }],
        ['meta', { name: 'twitter:image', content: 'https://biologicalsovereigntyprotocol.com/images/bsp-og-image.jpg' }],
        ['link', { rel: 'canonical', href: 'https://biologicalsovereigntyprotocol.com' }],
        ['script', { type: 'application/ld+json' }, JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Biological Sovereignty Protocol",
            "url": "https://biologicalsovereigntyprotocol.com",
            "logo": "https://biologicalsovereigntyprotocol.com/images/bsp-logo-dark.png",
            "description": "Open cryptographic standard for health and longevity data sovereignty",
            "sameAs": [
                "https://github.com/Biological-Sovereignty-Protocol"
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
                            { text: 'Tutorials', link: '/developers/tutorials' },
                            { text: 'Code Examples', link: '/developers/examples' },
                            { text: 'Payload Reference', link: '/developers/payloads' },
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
                            { text: 'Tutoriais', link: '/pt/developers/tutorials' },
                            { text: 'Exemplos de Código', link: '/pt/developers/examples' },
                            { text: 'Referência de Payloads', link: '/pt/developers/payloads' },
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
                            { text: 'Tutoriales', link: '/es/developers/tutorials' },
                            { text: 'Ejemplos de Código', link: '/es/developers/examples' },
                            { text: 'Referencia de Payloads', link: '/es/developers/payloads' },
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
                ],
                sidebar: {
                    '/es/': esSidebar
                }
            }
        }
    }
})
