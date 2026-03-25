---
title: O que é o BSP?
description: Um guia completo sobre o Biological Sovereignty Protocol — como funciona, por que importa e o que ele possibilita.
lang: pt
---

<div class="page-hero-image">
  <img src="/images/what-is-bsp-hero.png" alt="O que é o BSP?" loading="lazy" />
</div>

# O que é o BSP?

O Biological Sovereignty Protocol (BSP) é um protocolo aberto e sem permissão que dá aos indivíduos controle total sobre seus dados biológicos — de genômica e registros clínicos a métricas de wearables e perfis de microbioma.

Construído sobre Arweave para armazenamento permanente e usando criptografia Ed25519 para consentimento à prova de adulteração, o BSP remove instituições como guardiões dos seus dados mais pessoais.

## O problema

Seus dados biológicos são as informações mais pessoais que existem. Porém hoje:
- Hospitais e laboratórios são donos dos seus registros — você recebe uma cópia, na melhor das hipóteses
- Empresas de genômica vendem seu DNA para terceiros
- Apps de saúde monetizam suas biométricas sem consentimento real
- Pesquisadores não conseguem acesso a dados reais — regulações de privacidade os bloqueiam
- Você não tem ganho financeiro quando seus dados treinam modelos de IA

## Como o BSP resolve isso

O BSP cria uma pilha de soberania em três camadas:

### 1. BEO — Biological Entity Object
Sua identidade biológica soberana. Uma identidade criptográfica ancorada em você — não em uma instituição. Contém suas referências de dados, políticas de acesso e regras de consentimento. Só você pode assinar alterações no seu BEO.

### 2. IEO — Institution Entity Object
Como as instituições interagem com o protocolo. Laboratórios, hospitais, empresas de IA e pesquisadores registram IEOs para solicitar acesso a dados biológicos — nos seus termos.

### 3. ConsentToken
Uma autorização assinada criptograficamente que você concede a um IEO para um propósito, duração e escopo de dados específicos. Revogável a qualquer momento. Registrado permanentemente na Arweave.

## O que se torna possível

Com o BSP, indivíduos podem:
- Possuir e controlar seu registro biológico completo
- Conceder e revogar acesso a pesquisadores em segundos
- Receber compensação quando seus dados são usados comercialmente
- Portar seus dados entre provedores sem perder o histórico

Pesquisadores e instituições podem:
- Acessar conjuntos de dados biológicos consentidos e de alta qualidade
- Construir modelos de IA de saúde com dados reais e verificados
- Cumprir regulações de privacidade por design

## O padrão aberto

O BSP é totalmente open source. Nenhuma empresa controla o protocolo. Qualquer pessoa pode ler a especificação, construir implementações, propor mudanças via BIPs ou implantar seu próprio registro.

[Ler o Whitepaper](/pt/whitepaper) · [Ver a Especificação](/pt/specification/overview) · [Começar a Construir](/pt/developers/sdk-reference)

## Perguntas frequentes

### Quem é dono dos meus dados biológicos no BSP?
Você. Seu BEO é assinado com sua chave privada. Nenhuma instituição pode modificá-lo sem sua assinatura.

### O BSP está em produção?
O BSP v1 está implantado na mainnet da Arweave. A Registry API e o SDK TypeScript estão disponíveis publicamente.

### Instituições podem rejeitar o BSP?
Podem escolher não usá-lo — mas não podem impedir indivíduos de usá-lo. O BSP é sem permissão.

### Como o BSP é diferente da conformidade com LGPD/HIPAA?
Essas são estruturas legais. O BSP é infraestrutura técnica. A conformidade é aplicada por criptografia, não por papelada.

### Quem mantém o BSP?
O Ambrosio Institute publica a implementação de referência. O protocolo é governado por BIPs (BSP Improvement Proposals) — aberto a qualquer pessoa.
