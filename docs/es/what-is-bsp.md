---
title: ¿Qué es BSP?
description: Una guía completa sobre el Biological Sovereignty Protocol — cómo funciona, por qué importa y qué posibilita.
lang: es
---

<div class="page-hero-image">
  <img src="/images/what-is-bsp-hero.png" alt="¿Qué es BSP?" loading="lazy" />
</div>

# ¿Qué es BSP?

El Biological Sovereignty Protocol (BSP) es un protocolo abierto y sin permisos que otorga a los individuos plena propiedad y control sobre sus datos biológicos — desde genómica y registros clínicos hasta métricas de wearables y perfiles de microbioma.

Construido sobre Arweave para almacenamiento permanente y usando criptografía Ed25519 para consentimiento a prueba de manipulación, BSP elimina a las instituciones como guardianes de tus datos más personales.

## El problema

Tus datos biológicos son la información más personal que existe. Sin embargo hoy:
- Hospitales y laboratorios son dueños de tus registros — tú recibes una copia en el mejor caso
- Las empresas de genómica venden tu ADN a terceros
- Las apps de salud monetizan tus biométricas sin consentimiento real
- Los investigadores no pueden acceder a datos reales — las regulaciones de privacidad los bloquean
- No tienes beneficio financiero cuando tus datos entrenan modelos de IA

## Cómo BSP lo resuelve

BSP crea una pila de soberanía de tres capas:

### 1. BEO — Biological Entity Object
Tu identidad biológica soberana. Una identidad criptográfica anclada a ti — no a una institución. Contiene tus referencias de datos, políticas de acceso y reglas de consentimiento. Solo tú puedes firmar cambios en tu BEO.

### 2. IEO — Institution Entity Object
Cómo las instituciones interactúan con el protocolo. Laboratorios, hospitales, empresas de IA e investigadores registran IEOs para solicitar acceso a datos biológicos — en tus términos.

### 3. ConsentToken
Una autorización firmada criptográficamente que otorgas a un IEO para un propósito, duración y alcance de datos específicos. Revocable en cualquier momento. Registrada permanentemente en Arweave.

## Qué se hace posible

Con BSP, los individuos pueden:
- Poseer y controlar su registro biológico completo
- Conceder y revocar acceso a investigadores en segundos
- Recibir compensación cuando sus datos se usan comercialmente
- Portar sus datos entre proveedores sin perder el historial

Investigadores e instituciones pueden:
- Acceder a conjuntos de datos biológicos consentidos y de alta calidad
- Construir modelos de IA de salud con datos reales y verificados
- Cumplir con regulaciones de privacidad por diseño

## El estándar abierto

BSP es completamente open source. Ninguna empresa controla el protocolo. Cualquiera puede leer la especificación, crear implementaciones, proponer cambios mediante BIPs o desplegar su propio registro.

[Leer el Whitepaper](/es/whitepaper) · [Ver la Especificación](/es/specification/overview) · [Empezar a Construir](/es/developers/sdk-reference)

## Preguntas frecuentes

### ¿Quién es dueño de mis datos biológicos en BSP?
Tú. Tu BEO está firmado con tu clave privada. Ninguna institución puede modificarlo sin tu firma.

### ¿Está BSP en producción?
BSP v1 está desplegado en la mainnet de Arweave. La Registry API y el SDK TypeScript están disponibles públicamente.

### ¿Pueden las instituciones rechazar BSP?
Pueden elegir no usarlo — pero no pueden impedir que los individuos lo usen. BSP es sin permisos.

### ¿En qué se diferencia BSP del cumplimiento GDPR/HIPAA?
Esos son marcos legales. BSP es infraestructura técnica. El cumplimiento es aplicado por criptografía, no por papeleo.

### ¿Quién mantiene BSP?
El Ambrosio Institute publica la implementación de referencia. El protocolo es gobernado por BIPs (BSP Improvement Proposals) — abierto a cualquiera.
