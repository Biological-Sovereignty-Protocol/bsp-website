---
title: Glossario BSP — Termos do Biological Sovereignty Protocol
description: Glossario completo dos termos usados no Biological Sovereignty Protocol. Definicoes para BEO, IEO, BioRecord, ConsentToken, biomarcadores e mais.
sidebar: false
---

# Glossario

Definicoes canonicas de todos os termos usados no Biological Sovereignty Protocol.

## A

**Access Control (Controle de Acesso)**
O mecanismo pelo qual o titular de um BEO concede ou revoga acesso aos seus dados biologicos. No BSP, o acesso e gerenciado via ConsentTokens on-chain.

**Arweave**
Uma rede de armazenamento permanente e descentralizada usada pelo BSP para armazenar BioRecords e objetos BEO. Dados armazenados no Arweave nao podem ser deletados ou modificados.

## B

**BEO — Biological Entity Object**
A identidade criptografica de um organismo vivo no ecossistema BSP. Um BEO contem uma chave publica, metadados sobre o organismo (especie, identificadores unicos) e links para BioRecords associados. Veja: [Schema BEO](/pt/specification/beo).

**BioRecord**
Um objeto de dados padronizado em serie temporal contendo uma ou mais medicoes de biomarcadores. BioRecords sao a unidade de dados central do BSP. Veja: [Schema BioRecord](/pt/specification/biorecord).

**BIP — Biological Improvement Proposal**
Um documento de design propondo novos recursos ou mudancas no protocolo BSP. BIPs seguem um processo formal de revisao similar aos EIPs do Ethereum. Veja: [BIPs](/pt/bips/).

**Biological Sovereignty (Soberania Biologica)**
O principio de que todo ser vivo tem o direito de possuir, controlar e se beneficiar dos dados gerados pela sua biologia — permanentemente, sem dependencia de qualquer instituicao ou API.

**Biomarker (Biomarcador)**
Qualquer indicador mensuravel de um estado ou processo biologico. Exemplos incluem glicose sanguinea, VO2 max, cortisol, variantes genomicas, variabilidade da frequencia cardiaca. O BSP define uma [Taxonomia de Biomarcadores](/pt/specification/taxonomy/level-1-core) padronizada.

**Biomarker Taxonomy (Taxonomia de Biomarcadores)**
A classificacao hierarquica de biomarcadores usada no BSP. Organizada em 4 niveis: Core (Nivel 1), Standard (Nivel 2), Extended (Nivel 3) e Device (Nivel 4).

**BSP Domain**
Um identificador legivel por humanos para um BEO (ex.: `alice.bsp`). Analogo aos dominios ENS no Ethereum. Veja: [Sistema de Dominios BSP](/pt/specification/bsp-domain).

## C

**ConsentToken**
Um token on-chain que codifica o consentimento de um paciente para que uma instituicao ou aplicacao especifica acesse campos de dados especificos por um periodo definido. ConsentTokens podem ser revogados pelo titular do BEO a qualquer momento.

**Cryptographic Ownership (Propriedade Criptografica)**
Propriedade de dados respaldada por uma chave privada. Apenas o detentor da chave privada pode assinar transacoes que modificam ou concedem acesso ao seu BEO.

## D

**Decentralized Health Record (Prontuario de Saude Descentralizado)**
Um registro de saude armazenado em um sistema de armazenamento descentralizado e permanente (como Arweave), controlado pelo paciente e nao por um provedor de saude.

## E

**Exchange Protocol (Protocolo de Troca)**
A especificacao BSP para como dados biologicos sao transferidos entre partes. Define formatos de dados, autenticacao e verificacao de consentimento. Veja: [Exchange Protocol](/pt/specification/exchange).

## G

**Governance (Governanca)**
O processo pelo qual mudancas no protocolo BSP sao propostas, debatidas e aprovadas. Governado por BIPs e uma comunidade de contribuidores. Veja: [Governanca](/pt/protocols/governance).

## I

**IEO — Institutional Entity Object**
A identidade criptografica de uma instituicao (hospital, laboratorio, seguradora, instituicao de pesquisa) no ecossistema BSP. IEOs interagem com BEOs atraves de ConsentTokens. Veja: [Schema IEO](/pt/specification/ieo).

**Immutability (Imutabilidade)**
A propriedade de que dados armazenados nao podem ser modificados apos serem gravados. O BSP utiliza a imutabilidade do Arweave para garantir a permanencia dos dados.

## L

**Longevity AI (IA de Longevidade)**
Aplicacoes que usam dados biologicos, armazenados segundo os padroes BSP, para gerar insights sobre envelhecimento, otimizacao da saude e longevidade.

## O

**Open Standard (Padrao Aberto)**
Uma especificacao publicamente disponivel que pode ser implementada por qualquer pessoa sem pagar royalties ou obter permissoes especiais. O BSP e um padrao aberto licenciado sob MIT.

## P

**Permanent Storage (Armazenamento Permanente)**
Armazenamento que garante disponibilidade dos dados indefinidamente, independente da situacao financeira de qualquer organizacao. O BSP usa Arweave para armazenamento permanente.

**Private Key (Chave Privada)**
Um segredo criptografico conhecido apenas pelo proprietario dos dados. Usado para assinar transacoes e provar a propriedade de um BEO.

## S

**SDK**
Software Development Kit. O BSP fornece SDKs oficiais em TypeScript e Python para interacao com o protocolo. Veja: [Referencia do SDK](/pt/developers/sdk-reference).

**Self-Sovereign Identity (SSI) — Identidade Auto-Soberana**
O conceito de que individuos devem controlar suas proprias identidades digitais sem depender de autoridades centralizadas. O BSP aplica principios de SSI aos dados biologicos.

## T

**Transaction ID (TxID)**
Um identificador unico para uma transacao no Arweave. Usado para referenciar um BioRecord ou objeto BEO armazenado.

## V

**Verifiable Credential (Credencial Verificavel)**
Um documento assinado criptograficamente que prova uma afirmacao sobre um BEO (ex.: um resultado de exame laboratorial). BioRecords do BSP sao projetados para funcionar como credenciais verificaveis.

---

*Veja tambem: [O que e BSP?](/pt/what-is-bsp) · [Visao Geral da Especificacao](/pt/specification/overview) · [BSP vs FHIR](/pt/compare)*
