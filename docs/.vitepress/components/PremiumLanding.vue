<script setup>
import { useData } from 'vitepress'
import { computed, onMounted, onBeforeUnmount, ref } from 'vue'

const { lang } = useData()

// ── Scroll animation observer ──────────────────────────────────
let scrollObserver = null

const countersStarted = ref(false)

function animateCounter(el, target, duration = 1200) {
  const start = performance.now()
  function step(now) {
    const progress = Math.min((now - start) / duration, 1)
    const ease = 1 - Math.pow(1 - progress, 3)
    el.textContent = Math.round(ease * target)
    if (progress < 1) requestAnimationFrame(step)
    else el.textContent = target
  }
  requestAnimationFrame(step)
}

// Typing effect for code block
let typingTimer = null
function startTypingEffect() {
  const pre = document.querySelector('.code-decoration')
  if (!pre) return
  const originalText = pre.getAttribute('data-text') || pre.textContent
  if (!pre.getAttribute('data-text')) pre.setAttribute('data-text', originalText)
  pre.textContent = ''
  let i = 0
  function typeNext() {
    if (i < originalText.length) {
      pre.textContent += originalText[i]
      i++
      typingTimer = setTimeout(typeNext, i < 40 ? 30 : 12)
    }
  }
  typeNext()
}

onMounted(() => {
  // IntersectionObserver for scroll animations
  scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')

        // Trigger counters when stats section enters viewport
        if (entry.target.classList.contains('p-stats') && !countersStarted.value) {
          countersStarted.value = true
          const numEls = entry.target.querySelectorAll('.stat-num[data-target]')
          numEls.forEach(el => {
            const target = parseInt(el.getAttribute('data-target'), 10)
            if (!isNaN(target)) animateCounter(el, target)
          })
        }

        // Typing effect when open-banner enters viewport
        if (entry.target.classList.contains('p-open-banner')) {
          setTimeout(startTypingEffect, 400)
        }

        scrollObserver.unobserve(entry.target)
      }
    })
  }, { threshold: 0.12 })

  // Observe all animated elements
  const targets = document.querySelectorAll(
    '.glass-card, .p-split, .p-architecture, .p-stats, .p-how, .p-what, .p-usecases, .p-dev-cta, .p-open-banner, .p-cta, .arch-col, .how-step'
  )
  targets.forEach(el => scrollObserver.observe(el))
})

onBeforeUnmount(() => {
  if (scrollObserver) scrollObserver.disconnect()
  if (typingTimer) clearTimeout(typingTimer)
})

// Copy button for CLI block
function copyCliCommand() {
  const cmd = 'npm install @bsp/sdk'
  if (navigator.clipboard) {
    navigator.clipboard.writeText(cmd)
  }
  const btn = document.querySelector('.cli-copy-btn')
  if (btn) {
    btn.textContent = '✓'
    setTimeout(() => { btn.textContent = 'Copy' }, 1800)
  }
}

// Multi-language content dictionary
const content = computed(() => {
  if (lang.value === 'pt') {
    return {
      heroBadge: 'Protocolo v1 Ativo · Arweave',
      heroTitle: "Sua biologia.\nSeus dados.\nSuas regras.",
      heroTagline: "BSP é um protocolo aberto que dá às pessoas controle criptográfico sobre seus dados biológicos — de genômica a wearables.",
      btnPrimary: "Começar",
      btnSecondary: "Ler o Whitepaper",
      stat1Val: 'v1.0',
      stat1Label: 'Versão do protocolo',
      stat2Val: 'Ed25519',
      stat2Label: 'Padrão de assinatura',
      stat3Val: '∞',
      stat3Label: 'Armazenamento permanente',
      
      f1Title: "Propriedade Permanente",
      f1Text: "O indivíduo é dono do seu BEO e de todos os dados vitalícios. Hospedado na rede Arweave, nenhuma empresa pode revogar seu acesso.",
      f2Title: "Consentimento Granular",
      f2Text: "Toda solicitação exige permissão do titular via SmartWeave. Seus dados só se movem quando você assina criptograficamente.",
      f3Title: "Ecossistema Aberto",
      f3Text: "Qualquer sistema pode enviar dados (com consentimento). Zero intermediários. Zero taxas de API.",
      f4Title: "Taxonomia Universal",
      f4Text: "Mais de 210 biomarcadores padronizados. A linguagem canônica para a Inteligência Artificial operar sua biologia.",
      
      splitTitle: "Longevidade é uma Jornada Compartilhada",
      splitP1: "A descentralização não é apenas sobre bancos de dados — é sobre retomar o controle do ativo mais importante que você tem: o seu tempo e a sua saúde.",
      splitP2: "Ao trazer total transparência para dados médicos, nós destravamos um ecossistema onde a pesquisa, os aplicativos modernos e a Inteligência Artificial trabalham nativamente para o seu bem-estar diário.",
      
      archTitle: "A Arquitetura da Soberania",
      archSub: "Reconstruímos a economia dos dados de saúde do zero. Não é mais um servidor de terceiros, mas a camada fundamental para toda a humanidade.",
      i1Title: "Para os Indivíduos",
      i1Text: "Pare de pagar para acessar seus exames. Pare de perder seu histórico médico quando muda de médico. Seu BEO é um cofre criptográfico blindado para gerar e manter valor pela vida toda.",
      i2Title: "Para Plataformas",
      i2Text: "Não construa mais silos de dados. Integre nosso SDK, solicite permissão, e leia ou escreva dados na rede perfeitamente organizados para rodar sua aplicação de imediato.",
      i3Title: "Para IAs de Longevidade",
      i3Text: "IAs não leem PDFs redigidos e escaneados. O BSP entrega dados perfeitamente estruturados para que os LLMs operem e promovam a verdadeira saúde preventiva centrada e hiper-personalizada.",
      
      ctaTitle: "Pronto para Construir?",
      ctaText: "Acesse as especificações completas, instale os SDKs abertos, e comece a enviar dados soberanos hoje mesmo.",
      ctaBtn1: "Ler Referência SDK",
      ctaBtn2: "Explorar a Arquitetura",

      stat1Num: "210+",
      stat1Label: "Biomarcadores",
      stat2Num: "5",
      stat2Label: "Smart Contracts",
      stat3Num: "3",
      stat3Label: "SDKs",
      stat4Num: "Arweave",
      stat4Label: "Permanente",
      statsSectionTitle: "Confiado pela Comunidade Open Source",

      step1Title: "Crie seu BEO",
      step1Text: "Gere sua identidade biológica criptográfica permanente.",
      step2Title: "Dê Consentimento",
      step2Text: "Autorize instituições com permissões granulares e revogáveis.",
      step3Title: "Seja Dono Para Sempre",
      step3Text: "Seus dados vivem permanentemente no Arweave. Ninguém pode removê-los.",
      howItWorksTitle: "Como Funciona",

      openBannerTitle: "Padrão Aberto. Open Source.",
      openBannerSub: "Construído no Arweave. Alimentado pelo SmartWeave. Aberto para sempre.",
      openBannerBtn1: "Ver no GitHub",
      openBannerBtn2: "Ler a Especificação",
      openBannerBtn3: "npm install @bsp/sdk",

      qc1Title: "Ler o Whitepaper",
      qc1Sub: "Fundamentos e visão do protocolo",
      qc2Title: "Ver a Spec",
      qc2Sub: "Especificação técnica completa",
      qc3Title: "Integrar o SDK",
      qc3Sub: "Referência de API e exemplos",
      qc4Title: "Explorar a Arquitetura",
      qc4Sub: "Fluxo do ecossistema BSP",

      labelProtocol: "PROTOCOLO",
      labelHowItWorks: "COMO FUNCIONA",
      labelOpenSource: "OPEN SOURCE",
      labelBadgeBegin: "INICIANTE",
      labelBadgeInter: "INTERMEDIÁRIO",
      labelBadgeAdv: "AVANÇADO",

      labelWhat: 'O QUE É BSP',
      whatTitle: 'Seus dados biológicos, suas regras.',
      whatP1: 'O BSP é um protocolo aberto que dá às pessoas controle criptográfico sobre seus dados biológicos — genômica, registros clínicos, wearables e muito mais.',
      whatP2: 'Nenhuma instituição é dona dos seus dados. Nenhuma empresa controla o protocolo. Todo acesso exige seu consentimento explícito e assinado.',
      whatCta: 'Aprender sobre o BSP',
      popularTopicsLabel: 'Tópicos populares',
      topic1: 'Whitepaper BSP',
      topic2: 'O que é um BEO?',
      topic3: 'BIPs do Protocolo',
      topic4: 'Roadmap do BSP',
      labelUseCases: 'CASOS DE USO',
      ucTitle: 'Uma nova forma de ser dono dos seus dados de saúde',
      uc1Title: 'Identidade biológica soberana',
      uc1Desc: 'Seu BEO é uma identidade criptográfica ancorada em você — não em um hospital ou laboratório. Só você pode autorizar mudanças.',
      uc2Title: 'Consentimento que realmente funciona',
      uc2Desc: 'ConsentTokens são assinados criptograficamente, têm prazo e são revogáveis. Conceda e revogue acesso em segundos.',
      uc3Title: 'Uma camada global de dados de saúde',
      uc3Desc: 'A Exchange API permite que BioRecords consentidos fluam entre indivíduos, pesquisadores e sistemas de IA — armazenados permanentemente na Arweave.',
      uc4Title: 'Protocolo governado pela comunidade',
      uc4Desc: 'O BSP evolui por meio de BIPs — propostas abertas que qualquer pessoa pode enviar, discutir e votar. Nenhuma empresa controla o roadmap.',
      learnMore: 'Saiba mais',
      labelDev: 'PARA DESENVOLVEDORES',
      devCtaTitle: 'Construa sobre a infraestrutura da soberania biológica.',
      devCtaDesc: 'SDKs TypeScript e Python, uma API REST completa e armazenamento permanente na Arweave. Tudo que você precisa para criar apps de saúde, ferramentas de pesquisa ou integrações de dados.',
      devCtaBtn1: 'Começar a construir',
      devCtaBtn2: 'Ver referência do SDK',
      devStat1: 'Open source',
      devStat2: 'Padrão de assinatura',
      devStat3: 'Armazenamento permanente',
      devStat4: 'Licença',
    }
  } else if (lang.value === 'es') {
    return {
      heroBadge: 'Protocolo v1 Activo · Arweave',
      heroTitle: "Tu biología.\nTus datos.\nTus reglas.",
      heroTagline: "BSP es un protocolo abierto que otorga a los individuos propiedad criptográfica de sus datos biológicos — desde genómica hasta wearables.",
      btnPrimary: "Empezar",
      btnSecondary: "Leer el Whitepaper",
      stat1Val: 'v1.0',
      stat1Label: 'Versión del protocolo',
      stat2Val: 'Ed25519',
      stat2Label: 'Estándar de firma',
      stat3Val: '∞',
      stat3Label: 'Almacenamiento permanente',
      
      f1Title: "Propiedad Permanente",
      f1Text: "El individuo es dueño de su BEO y registros de por vida. En la red descentralizada Arweave, ninguna empresa puede denegar el acceso.",
      f2Title: "Consentimiento Granular",
      f2Text: "Todo requerimiento de acceso necesita la aprobación vía SmartWeave. La información sólo se traslada si lo firmas criptográficamente.",
      f3Title: "Ecosistema Abierto",
      f3Text: "Cualquier plataforma puede añadir datos. Sin monopolios. Sin tarifas por llamadas a la API.",
      f4Title: "Taxonomía Universal",
      f4Text: "Más de 210 biomarcadores estandarizados a nivel global. Un estándar para que la I.A entienda su biología.",
      
      splitTitle: "La Longevidad es un Viaje Compartido",
      splitP1: "Descentralizar no es sólo hablar de bases de datos, es para recuperar el control de su activo principal: el tiempo y su salud.",
      splitP2: "Dándole transparencia total a los datos médicos, abrimos un ecosistema donde investigaciones y la Inteligencia artificial impulsan rutinas de longevidad para usted y sus seres queridos.",
      
      archTitle: "La Arquitectura de la Soberanía",
      archSub: "Recreamos la base de datos de salud. Ya no es otro servidor corporativo, sino una plataforma unida fundamental y permanente.",
      i1Title: "Para los Pacientes",
      i1Text: "No vuelva a pagar por sus estudios clínicos viejos o un PDF. El BEO es un registro irrompible y seguro que guarda todo tu historial.",
      i2Title: "Para Sistemas e IT",
      i2Text: "No reinventen la plataforma de ficheros. Usa nuestro SDK, solicita permiso al paciente, e importa historiales ordenados al instante.",
      i3Title: "Para Motores I.A",
      i3Text: "La Inteligencia artificial no trabaja leyendo resúmenes en PDF escaneados. Extraer biomarcadores y aplicarlos necesita formatos nativos e interoperables que proporciona el protocolo BSP.",
      
      ctaTitle: "¿Listo para Construir?",
      ctaText: "Use las guías, nuestro Python SDK, instale dependencias y empieza en minutos.",
      ctaBtn1: "Leer la Referencia",
      ctaBtn2: "Explorar la Arquitectura",

      stat1Num: "210+",
      stat1Label: "Biomarcadores",
      stat2Num: "5",
      stat2Label: "Smart Contracts",
      stat3Num: "3",
      stat3Label: "SDKs",
      stat4Num: "Arweave",
      stat4Label: "Permanente",
      statsSectionTitle: "De confianza en la Comunidad Open Source",

      step1Title: "Crea tu BEO",
      step1Text: "Genera tu identidad biológica criptográfica permanente.",
      step2Title: "Otorga Consentimiento",
      step2Text: "Autoriza instituciones con permisos granulares y revocables.",
      step3Title: "Tuyo Para Siempre",
      step3Text: "Tus datos viven permanentemente en Arweave. Nadie puede eliminarlos.",
      howItWorksTitle: "Cómo Funciona",

      openBannerTitle: "Estándar Abierto. Open Source.",
      openBannerSub: "Construido en Arweave. Impulsado por SmartWeave. Abierto para siempre.",
      openBannerBtn1: "Ver en GitHub",
      openBannerBtn2: "Leer la Especificación",
      openBannerBtn3: "npm install @bsp/sdk",

      qc1Title: "Leer el Whitepaper",
      qc1Sub: "Fundamentos y visión del protocolo",
      qc2Title: "Ver la Spec",
      qc2Sub: "Especificación técnica completa",
      qc3Title: "Integrar el SDK",
      qc3Sub: "Referencia de API y ejemplos",
      qc4Title: "Explorar la Arquitectura",
      qc4Sub: "Flujo del ecosistema BSP",

      labelProtocol: "PROTOCOLO",
      labelHowItWorks: "CÓMO FUNCIONA",
      labelOpenSource: "OPEN SOURCE",
      labelBadgeBegin: "PRINCIPIANTE",
      labelBadgeInter: "INTERMEDIO",
      labelBadgeAdv: "AVANZADO",

      labelWhat: 'QUÉ ES BSP',
      whatTitle: 'Tus datos biológicos, tus reglas.',
      whatP1: 'BSP es un protocolo abierto que otorga a los individuos propiedad criptográfica de sus datos biológicos — genómica, registros clínicos, wearables y más.',
      whatP2: 'Ninguna institución es dueña de tus datos. Ninguna empresa controla el protocolo. Cada acceso requiere tu consentimiento explícito y firmado.',
      whatCta: 'Aprender sobre BSP',
      popularTopicsLabel: 'Temas populares',
      topic1: 'Whitepaper BSP',
      topic2: '¿Qué es un BEO?',
      topic3: 'BIPs del Protocolo',
      topic4: 'Roadmap de BSP',
      labelUseCases: 'CASOS DE USO',
      ucTitle: 'Una nueva forma de ser dueño de tus datos de salud',
      uc1Title: 'Identidad biológica soberana',
      uc1Desc: 'Tu BEO es una identidad criptográfica anclada a ti — no a un hospital o laboratorio. Solo tú puedes autorizar cambios.',
      uc2Title: 'Consentimiento que realmente funciona',
      uc2Desc: 'Los ConsentTokens están firmados criptográficamente, tienen límite de tiempo y son revocables. Concede y revoca acceso en segundos.',
      uc3Title: 'Una capa global de datos de salud',
      uc3Desc: 'La Exchange API permite que BioRecords consentidos fluyan entre individuos, investigadores y sistemas de IA — almacenados permanentemente en Arweave.',
      uc4Title: 'Protocolo gobernado por la comunidad',
      uc4Desc: 'BSP evoluciona a través de BIPs — propuestas abiertas que cualquiera puede enviar, discutir y votar. Ninguna empresa controla el roadmap.',
      learnMore: 'Aprender más',
      labelDev: 'PARA DESARROLLADORES',
      devCtaTitle: 'Construye sobre la infraestructura de la soberanía biológica.',
      devCtaDesc: 'SDKs TypeScript y Python, una API REST completa y almacenamiento permanente en Arweave. Todo lo que necesitas para crear apps de salud, herramientas de investigación o integraciones de datos.',
      devCtaBtn1: 'Empezar a construir',
      devCtaBtn2: 'Ver referencia del SDK',
      devStat1: 'Open source',
      devStat2: 'Estándar de firma',
      devStat3: 'Almacenamiento permanente',
      devStat4: 'Licencia',
    }
  }

  // Default English (en)
  return {
    heroBadge: 'Protocol Live v1 · Arweave',
    heroTitle: "Your biology.\nYour data.\nYour rules.",
    heroTagline: "BSP is an open protocol giving individuals cryptographic ownership of their biological data — from genomics to wearables.",
    btnPrimary: "Get Started",
    btnSecondary: "Read the Whitepaper",
    stat1Val: 'v1.0',
    stat1Label: 'Protocol version',
    stat2Val: 'Ed25519',
    stat2Label: 'Signature standard',
    stat3Val: '∞',
    stat3Label: 'Permanent storage',
    
    f1Title: "Permanent Ownership",
    f1Text: "The individual owns their BEO and all BioRecords within it for life. Hosted completely on the decentralized Arweave network, no company can revoke access.",
    f2Title: "Granular Consent",
    f2Text: "Every third-party access request requires explicit BEO-holder consent via the SmartWeave contract. Your data only moves when you cryptographically sign for it.",
    f3Title: "Open Ecosystem",
    f3Text: "Any system — from local labs to smartwatch manufacturers — can submit BioRecords. Zero gatekeepers. Zero API fees.",
    f4Title: "Universal Taxonomy",
    f4Text: "Over 210 rigorously standardized biomarkers, providing a single global language for longevity AI engines to analyze human health clinically.",
    
    splitTitle: "Longevity is a Shared Journey",
    splitP1: "Decentralization isn't just about databases—it's about reclaiming the control over the most important asset you have: your time and health.",
    splitP2: "By bringing full transparency to biological data, we are unlocking an ecosystem where medical research, apps, and artificial intelligence work directly for your well-being, powering longer and healthier lives for you and those you love.",
    
    archTitle: "The Architecture of Sovereignty",
    archSub: "We are rebuilding the health data economy from the ground up. Not another silo, but a permanent foundational layer.",
    i1Title: "For Individuals",
    i1Text: "Stop paying to access your own blood tests. Stop losing your medical history when you change doctors. Your BEO is a lifelong, cryptographic vault.",
    i2Title: "For Developers & Platforms",
    i2Text: "Don't build another proprietary data silo. Integrate with BSP to instantly read standardized health data from thousands of users (with consent).",
    i3Title: "For Artificial Intelligence",
    i3Text: "AI cannot practice precision medicine on unstructured PDFs. BSP provides AI engines with cryptographically verified, perfectly structured biomarker histories.",
    
    ctaTitle: "Ready to Build?",
    ctaText: "Read the spec, use our open-source SDKs, and start requesting sovereign data today.",
    ctaBtn1: "Read SDK Reference",
    ctaBtn2: "Explore Architecture",

    stat1Num: "210+",
    stat1Label: "Biomarkers",
    stat2Num: "5",
    stat2Label: "Smart Contracts",
    stat3Num: "3",
    stat3Label: "SDKs",
    stat4Num: "Arweave",
    stat4Label: "Permanent Storage",
    statsSectionTitle: "Trusted by the Open Source Community",

    step1Title: "Create your BEO",
    step1Text: "Generate your cryptographic biological identity.",
    step2Title: "Grant Consent",
    step2Text: "Authorize institutions with granular, revocable permissions.",
    step3Title: "Own Forever",
    step3Text: "Your data lives permanently on Arweave. No one can remove it.",
    howItWorksTitle: "How It Works",

    openBannerTitle: "Open Standard. Open Source.",
    openBannerSub: "Built on Arweave. Powered by SmartWeave. Open forever.",
    openBannerBtn1: "View on GitHub",
    openBannerBtn2: "Read the Spec",
    openBannerBtn3: "npm install @bsp/sdk",

    qc1Title: "Read the Whitepaper",
    qc1Sub: "Protocol foundations and vision",
    qc2Title: "View the Spec",
    qc2Sub: "Full technical specification",
    qc3Title: "Integrate SDK",
    qc3Sub: "API reference and examples",
    qc4Title: "Explore Architecture",
    qc4Sub: "BSP ecosystem flow",

    labelProtocol: "PROTOCOL",
    labelHowItWorks: "HOW IT WORKS",
    labelOpenSource: "OPEN SOURCE",
    labelBadgeBegin: "BEGINNER",
    labelBadgeInter: "INTERMEDIATE",
    labelBadgeAdv: "ADVANCED",

    labelWhat: 'WHAT IS BSP',
    whatTitle: 'Your biological data, your rules.',
    whatP1: 'BSP is an open protocol that gives individuals cryptographic ownership of their biological data — genomics, clinical records, wearables, and more.',
    whatP2: 'No institution owns your data. No company controls the protocol. Every access requires your explicit, signed consent.',
    whatCta: 'Learn about BSP',
    popularTopicsLabel: 'Popular topics',
    topic1: 'BSP Whitepaper',
    topic2: 'What is a BEO?',
    topic3: 'Protocol BIPs',
    topic4: 'BSP Roadmap',
    labelUseCases: 'USE CASES',
    ucTitle: 'A new way to own your health data',
    uc1Title: 'Sovereign biological identity',
    uc1Desc: 'Your BEO is a cryptographic identity anchored to you — not a hospital or lab. Only you can authorize changes.',
    uc2Title: 'Consent that actually works',
    uc2Desc: 'ConsentTokens are cryptographically signed, time-bound, and revocable. Grant and revoke access in seconds.',
    uc3Title: 'A global health data layer',
    uc3Desc: 'The Exchange API lets consented BioRecords flow between individuals, researchers, and AI systems — permanently stored on Arweave.',
    uc4Title: 'Community-governed protocol',
    uc4Desc: 'BSP evolves through BIPs — open proposals that anyone can submit, discuss, and vote on. No company controls the roadmap.',
    learnMore: 'Learn more',
    labelDev: 'FOR DEVELOPERS',
    devCtaTitle: 'Build on the infrastructure of biological sovereignty.',
    devCtaDesc: 'TypeScript and Python SDKs, a full REST API, and permanent storage on Arweave. Everything you need to build health apps, research tools, or data integrations.',
    devCtaBtn1: 'Start building',
    devCtaBtn2: 'View SDK reference',
    devStat1: 'Open source',
    devStat2: 'Signature standard',
    devStat3: 'Permanent storage',
    devStat4: 'License',
  }
})

// Correct localized routing prefixes
const pfx = computed(() => {
  if (lang.value === 'pt') return '/pt'
  if (lang.value === 'es') return '/es'
  return ''
})
</script>


<template>
  <div class="premium-landing">
    <!-- Background Design Elements -->
    <div class="glow-orb orb-1"></div>
    <div class="glow-orb orb-2"></div>
    
    <!-- Hero Section — Split Layout Premium -->
    <section class="p-hero">
      <!-- Dot grid background -->
      <div class="p-hero-dotgrid" aria-hidden="true"></div>
      <!-- Gradient glow top-left -->
      <div class="p-hero-glow" aria-hidden="true"></div>

      <!-- Image: direct child of section so height:100% works correctly -->
      <div class="p-hero-right" aria-hidden="true">
        <img src="/images/hero-image.jpg" alt="" class="p-hero-img" />
        <div class="p-hero-img-mask"></div>
      </div>

      <!-- Text content -->
      <div class="p-hero-split">
        <div class="p-hero-left">
          <h1 class="p-title">{{ content.heroTitle }}</h1>
          <p class="p-tagline">{{ content.heroTagline }}</p>
          <div class="p-actions">
            <a :href="`${pfx}/getting-started/intro`" class="btn btn-brand">{{ content.btnPrimary }}</a>
            <a :href="`${pfx}/getting-started/quickstart`" class="btn btn-hero-alt">{{ content.btnSecondary }}</a>
          </div>
          <div class="p-hero-stats">
            <div class="hero-stat">
              <span class="hero-stat-val">{{ content.stat1Val }}</span>
              <span class="hero-stat-label">{{ content.stat1Label }}</span>
            </div>
            <div class="hero-stat-divider"></div>
            <div class="hero-stat">
              <span class="hero-stat-val">{{ content.stat2Val }}</span>
              <span class="hero-stat-label">{{ content.stat2Label }}</span>
            </div>
            <div class="hero-stat-divider"></div>
            <div class="hero-stat">
              <span class="hero-stat-val">{{ content.stat3Val }}</span>
              <span class="hero-stat-label">{{ content.stat3Label }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Quick-Action Cards -->
    <section class="p-quick-cards">
      <a :href="`${pfx}/whitepaper`" class="quick-card">
        <span class="qc-icon" aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
        </span>
        <div class="qc-text">
          <strong>{{ content.qc1Title }}</strong>
          <span>{{ content.qc1Sub }}</span>
        </div>
        <span class="qc-arrow" aria-hidden="true">→</span>
      </a>
      <a :href="`${pfx}/specification/overview`" class="quick-card">
        <span class="qc-icon" aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
        </span>
        <div class="qc-text">
          <strong>{{ content.qc2Title }}</strong>
          <span>{{ content.qc2Sub }}</span>
        </div>
        <span class="qc-arrow" aria-hidden="true">→</span>
      </a>
      <a :href="`${pfx}/developers/sdk-reference`" class="quick-card">
        <span class="qc-icon" aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
        </span>
        <div class="qc-text">
          <strong>{{ content.qc3Title }}</strong>
          <span>{{ content.qc3Sub }}</span>
        </div>
        <span class="qc-arrow" aria-hidden="true">→</span>
      </a>
      <a :href="`${pfx}/architecture/ecosystem-flow`" class="quick-card">
        <span class="qc-icon" aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M4.93 4.93a10 10 0 0 0 0 14.14"/><path d="M14.83 9.17a4 4 0 0 1 0 5.66"/><path d="M9.17 9.17a4 4 0 0 0 0 5.66"/></svg>
        </span>
        <div class="qc-text">
          <strong>{{ content.qc4Title }}</strong>
          <span>{{ content.qc4Sub }}</span>
        </div>
        <span class="qc-arrow" aria-hidden="true">→</span>
      </a>
    </section>

    <!-- Glassmorphism Features Array -->
    <section class="p-features">
      <div class="glass-card scroll-reveal" style="--reveal-delay: 0s;">
        <span class="f-icon">
          <!-- shield icon -->
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        </span>
        <h3>{{ content.f1Title }}</h3>
        <p>{{ content.f1Text }}</p>
      </div>
      <div class="glass-card scroll-reveal" style="--reveal-delay: 0.1s;">
        <span class="f-icon">
          <!-- lock icon -->
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        </span>
        <h3>{{ content.f2Title }}</h3>
        <p>{{ content.f2Text }}</p>
      </div>
      <div class="glass-card scroll-reveal" style="--reveal-delay: 0.2s;">
        <span class="f-icon">
          <!-- globe icon -->
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
        </span>
        <h3>{{ content.f3Title }}</h3>
        <p>{{ content.f3Text }}</p>
      </div>
      <div class="glass-card scroll-reveal" style="--reveal-delay: 0.3s;">
        <span class="f-icon">
          <!-- dna/helix icon -->
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 3c0 0 3 2 3 9s-3 9-3 9"/><path d="M19 3c0 0-3 2-3 9s3 9 3 9"/><path d="M5 8h14"/><path d="M5 16h14"/></svg>
        </span>
        <h3>{{ content.f4Title }}</h3>
        <p>{{ content.f4Text }}</p>
      </div>
    </section>

    <!-- The Image Split Section -->
    <section class="p-split scroll-reveal">
      <div class="p-split-text">
        <h2>{{ content.splitTitle }}</h2>
        <p>{{ content.splitP1 }}</p>
        <p>{{ content.splitP2 }}</p>
      </div>
      <div class="p-split-img-wrapper">
        <div class="img-backdrop-glow"></div>
        <img src="/images/longevity-couple.jpg" alt="Health Checking" class="p-split-img" />
      </div>
    </section>

    <!-- Architecture Breakdown -->
    <section class="p-architecture scroll-reveal">
      <div class="arch-header">
        <span class="section-label">{{ content.labelProtocol }}</span>
        <h2>{{ content.archTitle }}</h2>
        <p>{{ content.archSub }}</p>
      </div>
      <div class="arch-columns">
        <div class="arch-col hover-lift">
          <h3>{{ content.i1Title }}</h3>
          <p>{{ content.i1Text }}</p>
        </div>
        <div class="arch-col hover-lift">
          <h3>{{ content.i2Title }}</h3>
          <p>{{ content.i2Text }}</p>
        </div>
        <div class="arch-col hover-lift">
          <h3>{{ content.i3Title }}</h3>
          <p>{{ content.i3Text }}</p>
        </div>
      </div>
    </section>

    <!-- Section A: Stats Bar -->
    <section class="p-stats scroll-reveal">
      <p class="stats-label">{{ content.statsSectionTitle }}</p>
      <div class="stats-grid">
        <div class="stat-card">
          <span class="stat-num" data-target="210">210+</span>
          <span class="stat-label">{{ content.stat1Label }}</span>
        </div>
        <div class="stat-card">
          <span class="stat-num" data-target="5">5</span>
          <span class="stat-label">{{ content.stat2Label }}</span>
        </div>
        <div class="stat-card">
          <span class="stat-num" data-target="3">3</span>
          <span class="stat-label">{{ content.stat3Label }}</span>
        </div>
        <div class="stat-card stat-card--text">
          <span class="stat-num stat-num--text">Arweave</span>
          <span class="stat-label">{{ content.stat4Label }}</span>
        </div>
      </div>
    </section>

    <!-- Section B: How It Works -->
    <section class="p-how scroll-reveal">
      <span class="section-label" style="display:block;margin-bottom:0.5rem;">{{ content.labelHowItWorks }}</span>
      <h2 class="how-title">{{ content.howItWorksTitle }}</h2>
      <div class="how-steps">
        <div class="how-step">
          <span class="skill-badge badge-beginner">{{ content.labelBadgeBegin }}</span>
          <div class="step-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </div>
          <div class="step-num">01</div>
          <h3>{{ content.step1Title }}</h3>
          <p>{{ content.step1Text }}</p>
        </div>
        <div class="how-connector how-connector--animated" aria-hidden="true">
          <svg width="80" height="2" viewBox="0 0 80 2" class="connector-line"><line x1="0" y1="1" x2="80" y2="1" stroke="var(--vp-c-brand-1)" stroke-width="1.5" stroke-dasharray="5 4"/></svg>
        </div>
        <div class="how-step">
          <span class="skill-badge badge-intermediate">{{ content.labelBadgeInter }}</span>
          <div class="step-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          </div>
          <div class="step-num">02</div>
          <h3>{{ content.step2Title }}</h3>
          <p>{{ content.step2Text }}</p>
        </div>
        <div class="how-connector how-connector--animated" aria-hidden="true">
          <svg width="80" height="2" viewBox="0 0 80 2" class="connector-line"><line x1="0" y1="1" x2="80" y2="1" stroke="var(--vp-c-brand-1)" stroke-width="1.5" stroke-dasharray="5 4"/></svg>
        </div>
        <div class="how-step">
          <span class="skill-badge badge-advanced">{{ content.labelBadgeAdv }}</span>
          <div class="step-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
          </div>
          <div class="step-num">03</div>
          <h3>{{ content.step3Title }}</h3>
          <p>{{ content.step3Text }}</p>
        </div>
      </div>
    </section>

    <!-- What is BSP — Explainer Block -->
    <section class="p-what scroll-reveal">
      <div class="what-inner">
        <div class="what-text">
          <span class="section-label">{{ content.labelWhat }}</span>
          <h2>{{ content.whatTitle }}</h2>
          <p>{{ content.whatP1 }}</p>
          <p>{{ content.whatP2 }}</p>
          <a :href="`${pfx}/what-is-bsp`" class="btn btn-brand">{{ content.whatCta }}</a>
        </div>
        <div class="what-topics">
          <p class="topics-label">{{ content.popularTopicsLabel }}</p>
          <div class="topics-grid">
            <a :href="`${pfx}/whitepaper`" class="topic-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              {{ content.topic1 }}
            </a>
            <a :href="`${pfx}/architecture/beo`" class="topic-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              {{ content.topic2 }}
            </a>
            <a :href="`${pfx}/bips`" class="topic-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              {{ content.topic3 }}
            </a>
            <a :href="`${pfx}/roadmap`" class="topic-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              {{ content.topic4 }}
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Use Cases Showcase — Inspired by ethereum.org -->
    <section class="p-usecases scroll-reveal">
      <div class="uc-header">
        <span class="section-label">{{ content.labelUseCases }}</span>
        <h2>{{ content.ucTitle }}</h2>
      </div>
      <div class="uc-grid">
        <div class="uc-card">
          <div class="uc-img-wrap">
            <img src="/images/beo-identity.jpg" :alt="content.uc1Title" loading="lazy" />
          </div>
          <div class="uc-card-body">
            <h3>{{ content.uc1Title }}</h3>
            <p>{{ content.uc1Desc }}</p>
            <a :href="`${pfx}/architecture/beo`" class="uc-link">{{ content.learnMore }} →</a>
          </div>
        </div>
        <div class="uc-card">
          <div class="uc-img-wrap">
            <img src="/images/consent-flow.jpg" :alt="content.uc2Title" loading="lazy" />
          </div>
          <div class="uc-card-body">
            <h3>{{ content.uc2Title }}</h3>
            <p>{{ content.uc2Desc }}</p>
            <a :href="`${pfx}/architecture/consent-token`" class="uc-link">{{ content.learnMore }} →</a>
          </div>
        </div>
        <div class="uc-card">
          <div class="uc-img-wrap">
            <img src="/images/exchange-protocol.jpg" :alt="content.uc3Title" loading="lazy" />
          </div>
          <div class="uc-card-body">
            <h3>{{ content.uc3Title }}</h3>
            <p>{{ content.uc3Desc }}</p>
            <a :href="`${pfx}/protocols/exchange-protocol`" class="uc-link">{{ content.learnMore }} →</a>
          </div>
        </div>
        <div class="uc-card">
          <div class="uc-img-wrap">
            <img src="/images/governance-bip.jpg" :alt="content.uc4Title" loading="lazy" />
          </div>
          <div class="uc-card-body">
            <h3>{{ content.uc4Title }}</h3>
            <p>{{ content.uc4Desc }}</p>
            <a :href="`${pfx}/bips`" class="uc-link">{{ content.learnMore }} →</a>
          </div>
        </div>
      </div>
    </section>

    <!-- Developer CTA Section -->
    <section class="p-dev-cta scroll-reveal">
      <div class="dev-cta-inner">
        <div class="dev-cta-text">
          <span class="section-label">{{ content.labelDev }}</span>
          <h2>{{ content.devCtaTitle }}</h2>
          <p>{{ content.devCtaDesc }}</p>
          <div class="dev-cta-actions">
            <a :href="`${pfx}/getting-started/quickstart`" class="btn btn-brand">{{ content.devCtaBtn1 }}</a>
            <a :href="`${pfx}/developers/sdk-reference`" class="btn btn-ghost">{{ content.devCtaBtn2 }}</a>
          </div>
        </div>
        <div class="dev-stats">
          <div class="dev-stat">
            <span class="dev-stat-num">100%</span>
            <span class="dev-stat-label">{{ content.devStat1 }}</span>
          </div>
          <div class="dev-stat">
            <span class="dev-stat-num">Ed25519</span>
            <span class="dev-stat-label">{{ content.devStat2 }}</span>
          </div>
          <div class="dev-stat">
            <span class="dev-stat-num">∞</span>
            <span class="dev-stat-label">{{ content.devStat3 }}</span>
          </div>
          <div class="dev-stat">
            <span class="dev-stat-num">MIT</span>
            <span class="dev-stat-label">{{ content.devStat4 }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Section C: Open Standard Banner -->
    <section class="p-open-banner scroll-reveal">
      <!-- Real terminal CLI block -->
      <div class="cli-terminal" role="region" aria-label="Terminal example">
        <div class="cli-terminal-header" aria-hidden="true">
          <span class="cli-dot cli-dot--red"></span>
          <span class="cli-dot cli-dot--yellow"></span>
          <span class="cli-dot cli-dot--green"></span>
          <span class="cli-terminal-title">bsp — terminal</span>
        </div>
        <div class="cli-terminal-body">
          <button class="cli-copy-btn" @click="copyCliCommand" aria-label="Copy command">Copy</button>
          <div class="cli-line"><span class="cli-prompt">$</span> <span class="cli-cmd">npm install @bsp/sdk</span></div>
          <div class="cli-line cli-comment"># initialize your biological identity</div>
          <div class="cli-line"><span class="cli-prompt">$</span> <span class="cli-cmd">bsp init --wallet ./wallet.json</span></div>
          <div class="cli-line cli-comment"># certify a health record with consent</div>
          <div class="cli-line"><span class="cli-prompt">$</span> <span class="cli-cmd">bsp certify --input health-data.json --scope read<span class="cli-cursor">▌</span></span></div>
        </div>
      </div>
      <div class="open-banner-content">
        <span class="section-label section-label--light">{{ content.labelOpenSource }}</span>
        <h2>{{ content.openBannerTitle }}</h2>
        <p>{{ content.openBannerSub }}</p>
        <div class="open-banner-actions">
          <a href="https://github.com/Biological-Sovereignty-Protocol" target="_blank" rel="noopener" class="btn btn-ghost-white">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="margin-right:6px"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
            {{ content.openBannerBtn1 }}
          </a>
          <a :href="`${pfx}/specification/overview`" class="btn btn-ghost-white">{{ content.openBannerBtn2 }}</a>
          <code class="npm-badge">{{ content.openBannerBtn3 }}</code>
        </div>
      </div>
    </section>

    <!-- Cyber-styled CTA -->
    <section class="p-cta scroll-reveal">
      <!-- CSS-only floating particles -->
      <div class="cta-particles" aria-hidden="true">
        <span class="cta-particle"></span>
        <span class="cta-particle"></span>
        <span class="cta-particle"></span>
        <span class="cta-particle"></span>
        <span class="cta-particle"></span>
        <span class="cta-particle"></span>
        <span class="cta-particle"></span>
        <span class="cta-particle"></span>
        <span class="cta-particle"></span>
        <span class="cta-particle"></span>
        <span class="cta-particle"></span>
        <span class="cta-particle"></span>
      </div>
      <div class="cta-inner-glass">
        <h2>{{ content.ctaTitle }}</h2>
        <p>{{ content.ctaText }}</p>
        <div class="cta-btn-group">
          <a :href="`${pfx}/developers/sdk-reference`" class="btn btn-brand-solid">{{ content.ctaBtn1 }}</a>
          <a :href="`${pfx}/architecture`" class="btn btn-brand-outline">{{ content.ctaBtn2 }}</a>
        </div>
      </div>
    </section>

  </div>
</template>

<style>
/* Overflow global — orbs não causam scrollbar horizontal */
html, body {
  overflow-x: hidden !important;
}

/* Garantir que o container do VitePress não clip o hero fullscreen */
.VPDoc .container,
.VPContent,
.VPPage {
  overflow: visible !important;
}

/* Esconder o padding top default do VPDoc na homepage para o hero colar no topo */
body.bsp-home .VPDoc {
  padding-top: 0 !important;
}

body.bsp-home .VPDoc .container {
  max-width: 100% !important;
  padding: 0 !important;
  margin: 0 !important;
}

/* Header styles movidos para custom.css */
</style>

<style scoped>
/* 
  PREMIUM AESTHETIC STYLES 
  Bypasses Vitepress restrictions 
*/
.premium-landing {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
  position: relative;
  font-family: var(--vp-font-family-base);
  /* Hero precisa escapar do padding — não pode ter overflow:hidden aqui */
  overflow: visible;
}

/* Background Aesthetics */
.glow-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  z-index: -1;
  opacity: 0.5;
  pointer-events: none;
}
.orb-1 {
  background: rgba(0, 118, 255, 0.4);
  width: 500px;
  height: 500px;
  top: -100px;
  right: -100px;
}
.orb-2 {
  background: rgba(59, 130, 246, 0.3);
  width: 600px;
  height: 600px;
  bottom: 20%;
  left: -200px;
}
.dark .orb-1 {
  background: rgba(50, 145, 255, 0.15);
}
.dark .orb-2 {
  background: rgba(14, 99, 199, 0.15);
}

/* ══ HERO — Full-Bleed Cinematic ══════════════════════════════ */
.p-hero {
  position: relative;
  height: 100vh;
  min-height: 640px;
  background: linear-gradient(135deg, #f0f4ff 0%, #e8f0ff 45%, #e0ebff 100%);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);
  transition: background 0.3s ease;
}
.dark .p-hero {
  background: linear-gradient(135deg, #020d22 0%, #041940 45%, #062354 100%);
}
.dark .p-hero {
  background: linear-gradient(135deg, #020d22 0%, #041940 45%, #062354 100%);
}

/* Dot grid — sits above image, only on left half */
.p-hero-dotgrid {
  position: absolute;
  inset: 0;
  z-index: 2;
  background-image: radial-gradient(circle, rgba(100, 150, 255, 0.08) 1px, transparent 1px);
  background-size: 34px 34px;
  mask-image: radial-gradient(ellipse 60% 80% at 25% 50%, black 20%, transparent 80%);
  -webkit-mask-image: radial-gradient(ellipse 60% 80% at 25% 50%, black 20%, transparent 80%);
  pointer-events: none;
}
.dark .p-hero-dotgrid {
  background-image: radial-gradient(circle, rgba(50, 145, 255, 0.15) 1px, transparent 1px);
}

/* Brand glow top-left */
.p-hero-glow {
  position: absolute;
  top: -300px;
  left: -300px;
  width: 1100px;
  height: 1100px;
  z-index: 2;
  background: radial-gradient(circle, rgba(100, 150, 255, 0.12) 0%, rgba(120, 160, 255, 0.06) 40%, transparent 68%);
  pointer-events: none;
}
.dark .p-hero-glow {
  background: radial-gradient(circle, rgba(0, 120, 255, 0.35) 0%, rgba(0, 70, 210, 0.18) 40%, transparent 68%);
}

/* Split layout — text only in flow, image is absolute */
.p-hero-split {
  position: relative;
  z-index: 3;
  display: flex;
  align-items: center;
  height: 100%;
  flex: 1;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  padding: 0 60px;
}

/* Left: text */
.p-hero-left {
  width: 54%;
  padding: 100px 0 80px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  z-index: 4;
}

/* Badge */
.p-hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(100, 150, 255, 0.15);
  border: 1px solid rgba(100, 150, 255, 0.25);
  color: #4a7dff;
  font-size: 0.82rem;
  font-weight: 600;
  padding: 6px 14px;
  border-radius: 100px;
  letter-spacing: 0.02em;
  margin-bottom: 28px;
  transition: all 0.3s ease;
}
.dark .p-hero-badge {
  background: rgba(0, 118, 255, 0.12);
  border: 1px solid rgba(0, 118, 255, 0.3);
  color: #7eb8ff;
}
.badge-dot {
  width: 7px;
  height: 7px;
  background: #22c55e;
  border-radius: 50%;
  box-shadow: 0 0 6px #22c55e;
  animation: blink-dot 2s ease-in-out infinite;
}
@keyframes blink-dot {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

/* Title — multiline with \n support */
.p-title {
  font-size: clamp(3rem, 5vw, 5.2rem) !important;
  font-weight: 900;
  line-height: 1.05 !important;
  letter-spacing: -0.03em;
  color: #1a1a2e;
  margin: 0 0 24px !important;
  white-space: pre-line;
  transition: color 0.3s ease;
}
.dark .p-title {
  color: #ffffff;
}

/* Tagline */
.p-tagline {
  font-size: clamp(1rem, 1.5vw, 1.2rem);
  color: rgba(26, 26, 46, 0.65);
  line-height: 1.65;
  max-width: 520px;
  margin: 0 0 36px !important;
  transition: color 0.3s ease;
}
.dark .p-tagline {
  color: rgba(255, 255, 255, 0.65);
}

/* Buttons */
.p-actions {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  margin-bottom: 48px;
}

/* Stats mini row */
.p-hero-stats {
  display: flex;
  align-items: center;
  gap: 20px;
}
.hero-stat {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.hero-stat-val {
  font-size: 1.05rem;
  font-weight: 800;
  color: #1a1a2e;
  letter-spacing: -0.01em;
  transition: color 0.3s ease;
}
.dark .hero-stat-val {
  color: #ffffff;
}
.hero-stat-label {
  font-size: 0.72rem;
  color: rgba(26, 26, 46, 0.45);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: color 0.3s ease;
}
.dark .hero-stat-label {
  color: rgba(255, 255, 255, 0.45);
}
.hero-stat-divider {
  width: 1px;
  height: 32px;
  background: rgba(26, 26, 46, 0.15);
  transition: background 0.3s ease;
}
.dark .hero-stat-divider {
  background: rgba(255, 255, 255, 0.15);
}

/* Right: Image — absolute to .p-hero (direct child), guaranteed full height */
.p-hero-right {
  position: absolute;
  right: 0;
  top: 0;
  width: 75%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
  overflow: hidden;
  transition: width 0.3s ease;
}
.dark .p-hero-right {
  width: 62%;
}
.p-hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
  display: block;
  filter: saturate(1.1) brightness(1.0);
}
/* Blue gradient mask fading left into background */
.p-hero-img-mask {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(
      to right,
      #f0f4ff 0%,
      #f0f4ff 5%,
      rgba(240, 244, 255, 0.92) 18%,
      rgba(224, 235, 255, 0.55) 45%,
      rgba(208, 228, 255, 0.15) 70%,
      transparent 88%
    ),
    linear-gradient(
      to bottom,
      rgba(240, 244, 255, 0.35) 0%,
      transparent 14%,
      transparent 78%,
      rgba(224, 235, 255, 0.45) 100%
    );
  pointer-events: none;
}
.dark .p-hero-img-mask {
  background:
    linear-gradient(
      to right,
      #040f2e 0%,
      #071840 10%,
      rgba(6, 22, 58, 0.82) 28%,
      rgba(4, 16, 48, 0.45) 50%,
      rgba(3, 12, 36, 0.12) 70%,
      transparent 88%
    ),
    linear-gradient(
      to bottom,
      rgba(4, 14, 44, 0.55) 0%,
      transparent 14%,
      transparent 78%,
      rgba(4, 14, 44, 0.75) 100%
    );
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  border-radius: 10px;
  font-size: 0.97rem;
  font-weight: 700;
  text-decoration: none !important;
  transition: all 0.2s;
  cursor: pointer;
  white-space: nowrap;
}
.btn-brand {
  background: var(--vp-c-brand-1);
  color: #fff !important;
  border: 2px solid var(--vp-c-brand-1);
}
.btn-brand:hover {
  background: var(--vp-c-brand-2);
  border-color: var(--vp-c-brand-2);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 118, 255, 0.35);
  color: #fff !important;
}
.btn-hero-alt {
  background: rgba(255, 255, 255, 0.08);
  color: #fff !important;
  border: 2px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
}
.btn-hero-alt:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.4);
  transform: translateY(-2px);
  color: #fff !important;
}

/* btn-alt para seções abaixo do hero (fundo normal) */
.btn-alt {
  background-color: transparent;
  color: var(--vp-c-text-1) !important;
  border: 1px solid var(--vp-c-border);
}
.btn-alt:hover {
  border-color: var(--vp-c-brand-1);
  background-color: var(--vp-c-bg-soft);
  transform: translateY(-2px);
}

/* Glass badge — canto inferior direito do hero */
.glass-badge {
  position: absolute;
  bottom: 2.5rem;
  right: 2.5rem;
  z-index: 3;
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  padding: 10px 20px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
}

.dot.green {
  width: 10px;
  height: 10px;
  background-color: #10b981;
  border-radius: 50%;
  box-shadow: 0 0 10px #10b981;
  flex-shrink: 0;
}

.badge-text {
  font-weight: 600;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.92);
  white-space: nowrap;
}


/* ----- FEATURES (GLASSMORPHISM) ----- */
.p-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
  margin: 4rem 0 8rem;
}

.glass-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--vp-c-border);
  border-radius: 20px;
  padding: 2rem;
  transition: transform 0.3s, border-color 0.3s, box-shadow 0.3s;
}

.glass-card:hover {
  transform: translateY(-8px);
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 20px 40px rgba(0,0,0,0.05);
}

.f-icon {
  font-size: 2.5rem;
  display: block;
  margin-bottom: 1.2rem;
}

.glass-card h3 {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.8rem;
  color: var(--vp-c-text-1);
}

.glass-card p {
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--vp-c-text-2);
}


/* ----- SPLIT IMAGE ----- */
.p-split {
  display: flex;
  align-items: center;
  gap: 6rem;
  margin: 8rem 0;
}

.p-split-text {
  flex: 1;
}

.p-split-text h2 {
  font-size: 2.5rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  color: var(--vp-c-text-1);
}

.p-split-text p {
  font-size: 1.15rem;
  color: var(--vp-c-text-2);
  line-height: 1.7;
  margin-bottom: 1.2rem;
}

.p-split-img-wrapper {
  flex: 1.2;
  position: relative;
}

.img-backdrop-glow {
  position: absolute;
  top: 10%;
  left: 10%;
  right: -10%;
  bottom: -10%;
  background: var(--vp-c-brand-soft);
  border-radius: 30px;
  z-index: -1;
  transform: rotate(3deg);
  transition: transform 0.4s ease;
}

.p-split:hover .img-backdrop-glow {
  transform: rotate(5deg) scale(1.02);
}

.p-split-img {
  width: 100%;
  border-radius: 24px;
  box-shadow: 0 30px 60px rgba(0,0,0,0.15);
  object-fit: cover;
  display: block;
}


/* ----- ARCHITECTURE COLUMNS ----- */
.p-architecture {
  margin: 10rem 0;
}

.arch-header {
  text-align: center;
  max-width: 800px;
  margin: 0 auto 5rem;
}

.arch-header h2 {
  font-size: 3rem;
  font-weight: 800;
  letter-spacing: -1px;
  margin-bottom: 1rem;
}

.arch-header p {
  font-size: 1.25rem;
  color: var(--vp-c-text-2);
}

.arch-columns {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 4rem;
}

.arch-col {
  position: relative;
}

.arch-col::before {
  content: "";
  position: absolute;
  top: -20px;
  left: 0;
  width: 40px;
  height: 4px;
  background-color: var(--vp-c-brand-1);
  border-radius: 4px;
}

.arch-col h3 {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--vp-c-text-1);
}

.arch-col p {
  font-size: 1.05rem;
  line-height: 1.7;
  color: var(--vp-c-text-2);
}


/* ----- CTA CTA ----- */
.p-cta {
  margin: 8rem 0;
  position: relative;
}

.cta-inner-glass {
  background: linear-gradient(135deg, var(--vp-c-brand-soft), rgba(0,0,0,0.01));
  border: 1px solid var(--vp-c-border);
  backdrop-filter: blur(10px);
  border-radius: 30px;
  padding: 6rem 2rem;
  text-align: center;
}

.dark .cta-inner-glass {
  background: linear-gradient(135deg, rgba(30, 120, 255, 0.1), rgba(10, 10, 10, 0.5));
}

.cta-inner-glass h2 {
  font-size: 3.5rem;
  font-weight: 800;
  letter-spacing: -1px;
  margin-bottom: 1rem;
}

.cta-inner-glass p {
  font-size: 1.3rem;
  color: var(--vp-c-text-2);
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.cta-btn-group {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.btn-brand-solid {
  background-color: var(--vp-c-brand-1);
  color: white !important;
  font-size: 1.1rem;
  padding: 1rem 2.5rem;
  border-radius: 50px;
  box-shadow: 0 10px 25px rgba(0, 118, 255, 0.3);
}

.btn-brand-solid:hover {
  transform: translateY(-3px);
  background-color: var(--vp-c-brand-2);
}

.btn-brand-outline {
  border: 2px solid var(--vp-c-brand-1);
  color: var(--vp-c-brand-1) !important;
  font-size: 1.1rem;
  padding: 1rem 2.5rem;
  border-radius: 50px;
  background-color: transparent;
}

.btn-brand-outline:hover {
  background-color: var(--vp-c-brand-soft);
  transform: translateY(-3px);
}

/* Animations */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

.fade-up {
  animation: fadeUp 0.8s ease forwards;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.fade-in {
  animation: fadeIn 1s ease forwards;
}

/* Media Queries */
@media (max-width: 1024px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .how-steps {
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }
  .how-connector {
    transform: rotate(90deg);
    margin-top: 0;
  }
  .p-split {
    flex-direction: column;
    text-align: center;
    gap: 4rem;
  }

  .p-hero-split {
    padding: 0 24px;
    min-height: auto;
    padding-top: 80px;
    padding-bottom: 60px;
  }
  .p-hero-left {
    width: 100%;
    padding: 60px 0 32px;
  }
  /* On mobile: image becomes a background behind the whole hero */
  .p-hero-right {
    width: 100%;
    top: 0;
    bottom: 0;
    opacity: 0.4;
  }
  .p-hero-img {
    object-position: 70% top;
    filter: saturate(0.5) brightness(0.6);
  }
  .p-hero-img-mask {
    background:
      linear-gradient(to right, #f0f4ff 0%, rgba(240,244,255,0.9) 50%, rgba(224,235,255,0.6) 100%),
      linear-gradient(to bottom, rgba(240,244,255,0.3) 0%, transparent 20%, transparent 80%, #f0f4ff 100%);
  }
  .dark .p-hero-img-mask {
    background:
      linear-gradient(to right, #030712 0%, rgba(3,7,18,0.95) 50%, rgba(3,7,18,0.7) 100%),
      linear-gradient(to bottom, rgba(3,7,18,0.3) 0%, transparent 20%, transparent 80%, #030712 100%);
  }
  .p-title { font-size: clamp(2.4rem, 8vw, 3.6rem) !important; }
  .p-hero-stats { flex-wrap: wrap; gap: 12px; }

  .p-actions {
    justify-content: flex-start;
  }
  
  .arch-col::before {
    left: 50%;
    transform: translateX(-50%);
  }
  
  .arch-col {
    text-align: center;
  }
}

/* ----- STATS BAR ----- */
.p-stats {
  margin: 6rem 0 4rem;
  text-align: center;
}

.stats-label {
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--vp-c-text-3);
  margin-bottom: 2rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.stat-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  padding: 1.75rem 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.stat-card:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 4px 20px rgba(0, 118, 255, 0.06);
}

.stat-num {
  font-size: 2.25rem;
  font-weight: 800;
  letter-spacing: -1px;
  color: var(--vp-c-text-1);
  line-height: 1;
}

.stat-label {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  font-weight: 500;
}

/* ----- HOW IT WORKS ----- */
.p-how {
  margin: 6rem 0;
  text-align: center;
}

.how-title {
  font-size: 2.25rem;
  font-weight: 800;
  letter-spacing: -0.5px;
  margin-bottom: 3.5rem;
  color: var(--vp-c-text-1);
}

.how-steps {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 0;
}

.how-step {
  flex: 1;
  max-width: 280px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 0 1.5rem;
}

.how-connector {
  display: flex;
  align-items: center;
  margin-top: 2.2rem;
  flex-shrink: 0;
}

.step-icon {
  width: 60px;
  height: 60px;
  border-radius: 16px;
  border: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg-soft);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--vp-c-brand-1);
  margin-bottom: 1rem;
  transition: background-color 0.2s, border-color 0.2s;
}

.how-step:hover .step-icon {
  background-color: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand-1);
}

.step-num {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--vp-c-brand-1);
  margin-bottom: 0.5rem;
}

.how-step h3 {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 0.6rem;
}

.how-step p {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

/* ----- OPEN SOURCE BANNER ----- */
.p-open-banner {
  margin: 6rem 0;
  position: relative;
  background: linear-gradient(135deg, #0a0a14 0%, #0d1a2e 60%, #051020 100%);
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.07);
  padding: 5rem 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.open-banner-code {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.code-decoration {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: 'Fira Code', 'JetBrains Mono', 'Menlo', monospace;
  font-size: 0.78rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.04);
  white-space: pre;
  width: max-content;
  user-select: none;
}

.open-banner-content {
  position: relative;
  z-index: 1;
}

.open-banner-content h2 {
  font-size: clamp(1.8rem, 4vw, 2.75rem);
  font-weight: 800;
  color: #fff;
  margin-bottom: 1rem;
  letter-spacing: -0.5px;
}

.open-banner-content p {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.55);
  margin-bottom: 2.5rem;
  max-width: 520px;
  margin-left: auto;
  margin-right: auto;
}

.open-banner-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn-ghost-white {
  display: inline-flex;
  align-items: center;
  padding: 0.65rem 1.4rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  text-decoration: none !important;
  color: rgba(255, 255, 255, 0.85) !important;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: background-color 0.2s, border-color 0.2s, color 0.2s;
  background: rgba(255, 255, 255, 0.05);
}

.btn-ghost-white:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.35);
  color: #fff !important;
}

.npm-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.65rem 1.2rem;
  border-radius: 8px;
  font-family: 'Fira Code', 'JetBrains Mono', monospace;
  font-size: 0.82rem;
  color: #7dd3fc;
  background: rgba(125, 211, 252, 0.07);
  border: 1px solid rgba(125, 211, 252, 0.15);
  user-select: all;
  cursor: text;
}

/* ── SCROLL REVEAL (IntersectionObserver) ─────────────────────── */
.scroll-reveal {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1) var(--reveal-delay, 0s),
              transform 0.7s cubic-bezier(0.22, 1, 0.36, 1) var(--reveal-delay, 0s);
}

.p-split.scroll-reveal {
  transform: translateX(-28px);
}

.scroll-reveal.is-visible {
  opacity: 1;
  transform: none;
}

/* ── STATS — borda superior colorida ─────────────────────────── */
.stat-card {
  border-top: 3px solid var(--vp-c-brand-1) !important;
}

.stat-num--text {
  font-size: 1.75rem !important;
  letter-spacing: -0.5px;
}

/* ── f-icon SVG color ─────────────────────────────────────────── */
.f-icon {
  color: var(--vp-c-brand-1);
}

/* ── HOW IT WORKS — connector animated line ──────────────────── */
.connector-line {
  overflow: visible;
}

.connector-line line {
  stroke-dasharray: 5 4;
  stroke-dashoffset: 80;
  animation: dash-flow 2s linear infinite;
}

@keyframes dash-flow {
  from { stroke-dashoffset: 80; }
  to   { stroke-dashoffset: 0; }
}

/* ── CTA PARTICLES (CSS only) ─────────────────────────────────── */
.cta-particles {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  border-radius: 30px;
}

.cta-particle {
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--vp-c-brand-1);
  opacity: 0;
  animation: particle-float var(--p-dur, 6s) var(--p-delay, 0s) ease-in-out infinite;
}

/* Distribute particles */
.cta-particle:nth-child(1)  { left: 8%;   --p-dur: 7s;  --p-delay: 0s;    bottom: -8px; }
.cta-particle:nth-child(2)  { left: 18%;  --p-dur: 9s;  --p-delay: 1.2s;  bottom: -8px; }
.cta-particle:nth-child(3)  { left: 30%;  --p-dur: 6s;  --p-delay: 0.4s;  bottom: -8px; }
.cta-particle:nth-child(4)  { left: 42%;  --p-dur: 8s;  --p-delay: 2s;    bottom: -8px; }
.cta-particle:nth-child(5)  { left: 55%;  --p-dur: 7s;  --p-delay: 0.8s;  bottom: -8px; }
.cta-particle:nth-child(6)  { left: 65%;  --p-dur: 10s; --p-delay: 1.6s;  bottom: -8px; }
.cta-particle:nth-child(7)  { left: 75%;  --p-dur: 6s;  --p-delay: 3s;    bottom: -8px; }
.cta-particle:nth-child(8)  { left: 85%;  --p-dur: 8s;  --p-delay: 0.6s;  bottom: -8px; }
.cta-particle:nth-child(9)  { left: 12%;  --p-dur: 11s; --p-delay: 2.4s;  bottom: -8px; opacity: 0; width: 3px; height: 3px; }
.cta-particle:nth-child(10) { left: 48%;  --p-dur: 7s;  --p-delay: 1s;    bottom: -8px; opacity: 0; }
.cta-particle:nth-child(11) { left: 60%;  --p-dur: 9s;  --p-delay: 3.5s;  bottom: -8px; opacity: 0; width: 3px; height: 3px; }
.cta-particle:nth-child(12) { left: 90%;  --p-dur: 6s;  --p-delay: 0.2s;  bottom: -8px; }

@keyframes particle-float {
  0%   { opacity: 0;   transform: translateY(0)   scale(1); }
  10%  { opacity: 0.6; }
  80%  { opacity: 0.3; }
  100% { opacity: 0;   transform: translateY(-120px) scale(0.6); }
}

/* ── hover-lift for arch-col ─────────────────────────────────── */
.hover-lift {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.hover-lift:hover {
  transform: translateY(-6px);
}

/* .p-hero-radial removed — replaced by split layout design */

/* ── QUICK-ACTION CARDS ──────────────────────────────────────── */
.p-quick-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin: 2.5rem 0 5rem;
}

.quick-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 18px 20px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.03);
  text-decoration: none !important;
  cursor: pointer;
  transition: border-color 0.2s ease, background 0.2s ease, transform 0.2s ease;
  color: var(--vp-c-text-1) !important;
}

.quick-card:hover {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  transform: translateY(-2px);
}

.dark .quick-card {
  border-color: rgba(255, 255, 255, 0.07);
  background: rgba(255, 255, 255, 0.02);
}

.dark .quick-card:hover {
  border-color: var(--vp-c-brand-1);
  background: rgba(50, 145, 255, 0.08);
}

.qc-icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

.qc-text {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.qc-text strong {
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.qc-text span {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.qc-arrow {
  flex-shrink: 0;
  font-size: 1rem;
  color: var(--vp-c-text-3);
  transition: color 0.2s, transform 0.2s;
}

.quick-card:hover .qc-arrow {
  color: var(--vp-c-brand-1);
  transform: translateX(3px);
}

@media (max-width: 1024px) {
  .p-quick-cards {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .p-quick-cards {
    grid-template-columns: 1fr;
    gap: 8px;
  }
}

/* ── SECTION LABELS ──────────────────────────────────────────── */
.section-label {
  display: block;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--vp-c-brand-1);
  margin-bottom: 10px;
}

.section-label--light {
  color: rgba(125, 211, 252, 0.8);
}

/* ── SKILL BADGES ────────────────────────────────────────────── */
.skill-badge {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 10px;
}

.badge-beginner {
  background: rgba(16, 185, 129, 0.15);
  color: #10b981;
}

.badge-intermediate {
  background: rgba(59, 130, 246, 0.15);
  color: #3b82f6;
}

.badge-advanced {
  background: rgba(139, 92, 246, 0.15);
  color: #8b5cf6;
}

/* ── CLI TERMINAL BLOCK ──────────────────────────────────────── */
.cli-terminal {
  width: 100%;
  max-width: 640px;
  background: #0d0d0d;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 2.5rem;
  font-family: 'JetBrains Mono', 'Fira Code', 'SF Mono', Menlo, monospace;
  font-size: 13px;
  position: relative;
  z-index: 1;
}

.cli-terminal-header {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 14px;
  background: #1a1a1a;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
}

.cli-dot {
  width: 11px;
  height: 11px;
  border-radius: 50%;
  flex-shrink: 0;
}

.cli-dot--red    { background: #ff5f57; }
.cli-dot--yellow { background: #ffbd2e; }
.cli-dot--green  { background: #28c840; }

.cli-terminal-title {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.35);
  margin-left: auto;
  margin-right: auto;
  font-family: var(--vp-font-family-base);
}

.cli-terminal-body {
  padding: 16px 20px;
  position: relative;
}

.cli-copy-btn {
  position: absolute;
  top: 10px;
  right: 14px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 5px;
  color: rgba(255, 255, 255, 0.5);
  font-size: 11px;
  font-family: var(--vp-font-family-base);
  padding: 3px 8px;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}

.cli-copy-btn:hover {
  background: rgba(255, 255, 255, 0.14);
  color: rgba(255, 255, 255, 0.85);
}

.cli-line {
  line-height: 1.85;
  color: #e2e8f0;
}

.cli-comment {
  color: rgba(255, 255, 255, 0.3);
  font-style: italic;
}

.cli-prompt {
  color: #10b981;
  margin-right: 10px;
  user-select: none;
}

.cli-cmd {
  color: #e2e8f0;
}

.cli-cursor {
  animation: blink-cursor 1.1s step-end infinite;
  color: var(--vp-c-brand-1);
}

@keyframes blink-cursor {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}

/* ----- EXISTING MEDIA QUERIES PRESERVED ----- */
@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
  .p-open-banner {
    padding: 3rem 1.5rem;
  }
  .arch-header h2,
  .cta-inner-glass h2,
  .p-split-text h2 {
    font-size: 2rem !important;
    line-height: 1.25;
    margin-bottom: 1.5rem !important;
    letter-spacing: -0.5px;
  }

  .arch-header p {
    font-size: 1.05rem;
    margin-bottom: 2rem;
  }

  .p-architecture {
    margin: 5rem 0;
  }

  .arch-columns {
    gap: 2.5rem;
  }

  .cta-inner-glass {
    padding: 3rem 1.5rem;
  }

  .cta-inner-glass p {
    font-size: 1.1rem;
    margin-bottom: 2rem;
  }

  .p-split {
    gap: 2.5rem;
  }
}
</style>
