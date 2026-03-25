# Arquitetura GitHub

A infraestrutura GitHub do BSP está dividida em duas organizações distintas — uma pública, uma privada. Essa separação reflete a filosofia central: **o protocolo pertence ao mundo, a inteligência pertence à Ambrósio.**

## Organização Pública: `biological-sovereignty-protocol`
Esses repositórios definem o padrão aberto. Qualquer pessoa pode clonar, contribuir e construir sobre eles sem aprovação. Licenciados sob Creative Commons CC BY 4.0.

*   `bsp-spec`: O repositório central de especificações (BEO, IEO, Exchange, Taxonomia, BIPs). A "lei pública" do protocolo.
*   `bsp-sdk-typescript`: O SDK TypeScript oficial (`@bsp/sdk`) para integrações web, mobile e backend.
*   `bsp-sdk-python`: O SDK Python oficial (`bsp-sdk`) para laboratórios, bioinformatas e pipelines de pesquisa.
*   `bsp-mcp`: O servidor oficial Model Context Protocol. Conecta agentes de IA (Claude, GPT) ao protocolo BSP com consentimento ativo do usuário.
*   `bsp-docs-repo`: O site de documentação pública (do qual você faz parte agora).

## Organização Privada: `ambrosio-institute`
Esses repositórios contêm a infraestrutura operacional do Instituto e a inteligência proprietária. São privados para proteger a vantagem competitiva central da organização.

*   `bsp-contracts`: Os 5 contratos inteligentes implantados no Arweave (`BEORegistry`, `IEORegistry`, `DomainRegistry`, `AccessControl`, `Governance`). Consultáveis publicamente on-chain, mas o código de implantação é mantido aqui.
*   `bsp-registry-api`: A API do Instituto para gerenciar o processo humano de Certificação BSP voluntária. *Dados biológicos nunca passam por esta API.*
*   `ava-core`: O Algoritmo de Vitalidade Ambrósio. Modelos proprietários que analisam o envelhecimento biológico, processando BioRecords apenas quando um usuário inicia ativamente uma sessão.
*   `sva-engine`: O motor de pontuação que converte a análise da AVA no multidimensional Score de Vitalidade Ambrósio (SVA) apresentado ao usuário.

## Sequência de Construção
As dependências ditam a ordem de construção do ecossistema:

1.  `bsp-spec` (Fundação)
2.  `bsp-contracts` (Contratos Inteligentes no Arweave)
3.  `bsp-registry-api` (Portal de Certificação)
4.  `bsp-sdk-typescript` (Integrações Web Principais)
5.  `bsp-mcp` (Conectividade para Agentes de IA)
6.  `bsp-sdk-python` (Pipelines de Laboratório e Pesquisa)
7.  `ava-core` e `sva-engine` (Pontuação de inteligência construída inteiramente sobre as primitivas do SDK)
8.  `bsp-docs-repo` (Evolui constantemente junto com o ecossistema)
