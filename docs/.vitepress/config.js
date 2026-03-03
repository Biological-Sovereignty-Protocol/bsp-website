import { defineConfig } from 'vitepress'

const enSidebar = [
    {
        text: 'Getting Started',
        items: [
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
        text: 'Protocols & Guidelines',
        items: [
            { text: 'Exchange Protocol', link: '/protocols/exchange-protocol' },
            { text: 'Governance & BIPs', link: '/protocols/governance' },
            { text: 'Canonical Glossary', link: '/protocols/glossary' }
        ]
    },
    {
        text: 'Developer Resources',
        items: [
            { text: 'Biomarker Taxonomy', link: '/developers/taxonomy' },
            { text: 'Complete Taxonomy', link: '/developers/taxonomy-list' },
            { text: 'Certification Process', link: '/developers/certification' },
            { text: 'SDK Reference', link: '/developers/sdk-reference' },
            { text: 'Tutorials & Cookbooks', link: '/developers/tutorials' },
            { text: 'JSON Payloads', link: '/developers/payloads' },
            { text: 'Ecosystem Directory', link: '/developers/directory' }
        ]
    }
]

const ptSidebar = [
    {
        text: 'Primeiros Passos',
        items: [
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
        text: 'Protocolos e Diretrizes',
        items: [
            { text: 'Protocolo de Troca', link: '/pt/protocols/exchange-protocol' },
            { text: 'Governança e BIPs', link: '/pt/protocols/governance' },
            { text: 'Glossário Canônico', link: '/pt/protocols/glossary' }
        ]
    },
    {
        text: 'Recursos para Desenvolvedores',
        items: [
            { text: 'Taxonomia de Biomarcadores', link: '/pt/developers/taxonomy' },
            { text: 'Taxonomia Completa', link: '/pt/developers/taxonomy-list' },
            { text: 'Processo de Certificação', link: '/pt/developers/certification' },
            { text: 'Referência SDK', link: '/pt/developers/sdk-reference' },
            { text: 'Tutoriais e Guias', link: '/pt/developers/tutorials' },
            { text: 'Cargas JSON', link: '/pt/developers/payloads' },
            { text: 'Diretório do Ecossistema', link: '/pt/developers/directory' }
        ]
    }
]

const esSidebar = [
    {
        text: 'Primeros Pasos',
        items: [
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
        text: 'Protocolos y Directrices',
        items: [
            { text: 'Protocolo de Intercambio', link: '/es/protocols/exchange-protocol' },
            { text: 'Gobernanza y BIPs', link: '/es/protocols/governance' },
            { text: 'Glosario Canónico', link: '/es/protocols/glossary' }
        ]
    },
    {
        text: 'Desarrolladores',
        items: [
            { text: 'Taxonomía de Biomarcadores', link: '/es/developers/taxonomy' },
            { text: 'Taxonomía Completa', link: '/es/developers/taxonomy-list' },
            { text: 'Proceso de Certificación', link: '/es/developers/certification' },
            { text: 'Referencia SDK', link: '/es/developers/sdk-reference' },
            { text: 'Tutoriales y Guías', link: '/es/developers/tutorials' },
            { text: 'Cargas JSON', link: '/es/developers/payloads' },
            { text: 'Directorio del Ecosistema', link: '/es/developers/directory' }
        ]
    }
]

export default defineConfig({
    title: "Biological Sovereignty Protocol",
    description: "The protocol that gives every human being permanent sovereignty over their own biology.",
    cleanUrls: true,

    themeConfig: {
        logo: {
            light: '/images/bsp-logo-dark.png',
            dark: '/images/bsp-logo-light.png'
        },
        siteTitle: false,
        socialLinks: [
            { icon: 'github', link: 'https://github.com/Biological-Sovereignty-Protocol' }
        ]
    },

    locales: {
        root: {
            label: 'English',
            lang: 'en',
            themeConfig: {
                nav: [
                    { text: 'Whitepaper', link: '/whitepaper' },
                    {
                        text: 'Documentation',
                        items: [
                            { text: 'Introduction', link: '/getting-started/intro' },
                            { text: 'Architecture Diagram', link: '/architecture' },
                            { text: 'Ecosystem Flow', link: '/architecture/ecosystem-flow' }
                        ]
                    },
                    { text: 'SDK & Tools', link: '/developers/sdk-reference' },
                    { text: 'Blog', link: '/blog/' }
                ],
                sidebar: {
                    '/blog/': [
                        {
                            text: 'Blog',
                            items: [
                                { text: 'All Posts', link: '/blog/' },
                                { text: 'The Structural Failure of Modern Health Data', link: '/blog/the-problem-with-data-silos' },
                                { text: 'Introducing the Biological Sovereignty Protocol', link: '/blog/introducing-bsp' }
                            ]
                        }
                    ],
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
                nav: [
                    { text: 'Whitepaper', link: '/pt/whitepaper' },
                    {
                        text: 'Documentação',
                        items: [
                            { text: 'Introdução', link: '/pt/getting-started/intro' },
                            { text: 'Diagrama de Arquitetura', link: '/pt/architecture' },
                            { text: 'Fluxo do Ecossistema', link: '/pt/architecture/ecosystem-flow' }
                        ]
                    },
                    { text: 'SDK e Ferramentas', link: '/pt/developers/sdk-reference' },
                    { text: 'Blog', link: '/blog/' }
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
                nav: [
                    { text: 'Whitepaper', link: '/es/whitepaper' },
                    {
                        text: 'Documentación',
                        items: [
                            { text: 'Introducción', link: '/es/getting-started/intro' },
                            { text: 'Diagrama de Arquitectura', link: '/es/architecture' },
                            { text: 'Flujo del Ecosistema', link: '/es/architecture/ecosystem-flow' }
                        ]
                    },
                    { text: 'SDK y Herramientas', link: '/es/developers/sdk-reference' },
                    { text: 'Blog', link: '/blog/' }
                ],
                sidebar: {
                    '/es/': esSidebar
                }
            }
        }
    }
})
