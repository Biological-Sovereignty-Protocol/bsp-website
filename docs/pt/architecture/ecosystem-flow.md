<div class="page-hero-image">
  <img src="/images/arch-overview.png" alt="BSP Architecture Overview" style="width:100%;border-radius:16px;margin-bottom:2rem;box-shadow:0 8px 32px rgba(0,118,255,0.12);" />
</div>

# O Fluxo do Ecossistema

"Do primeiro acesso ao Score de Vitalidade — a jornada completa do desenvolvedor e do usuário pelos repositórios BSP."

Este documento explica passo a passo como o ecossistema BSP opera na prática. Os dois protagonistas são o **Desenvolvedor** (que constrói sobre o protocolo) e o **Usuário** (que vive sob sua proteção). Ambos os caminhos se cruzam no **BEO** (Biological Entity Object).

<EcosystemFlowMcp />

## Parte 1: A Jornada do Desenvolvedor
Como um laboratório, aplicativo ou plataforma entra no ecossistema BSP:

1.  **Entender o Protocolo (`bsp-spec`)**: Um desenvolvedor acessa a especificação pública do BSP. Aprende o que é um BEO e como o Protocolo de Troca funciona. Não é necessário registro ou aprovação.
2.  **Instalar o SDK (`bsp-sdk`)**: Seja construindo em Python ou TypeScript, o desenvolvedor instala o SDK (ex: `pip install bsp-sdk`). Pode imediatamente começar a estruturar dados em BioRecords válidos e soberanos.
3.  **Solicitar Autorização**: O laboratório quer enviar dados. Usam o SDK para solicitar autorização ao usuário. O usuário assina um ConsentToken on-chain. Sem isso, a blockchain Arweave automaticamente rejeita a transação.
4.  **Conectar Agentes de IA (`bsp-mcp`)**: Uma plataforma de saúde quer que sua IA leia o BEO. Instala o `bsp-mcp` (o servidor oficial Model Context Protocol para BSP), permitindo que IAs como Claude consultem dados biológicos — estritamente sob o consentimento do usuário.

## Parte 2: A Jornada do Usuário
Da perspectiva de uma pessoa que vive dentro do ecossistema:

1.  **Criação de Identidade (`bsp-contracts`)**: Na primeira vez que usa um aplicativo BSP, seu BEO é criado. As chaves são geradas localmente. O endereço (ex: `andre.bsp`) pertence a você para sempre.
2.  **Chegada de Dados (`bsp-sdk` + Arweave)**: Você faz um exame de sangue. O laboratório formata os dados como BioRecords e os envia. Como você autorizou o laboratório, os dados são criptografados com sua chave e armazenados permanentemente no Arweave.
3.  **Análise de Vitalidade (`ava-core`)**: Você abre seu aplicativo e solicita ativamente uma análise. O aplicativo descriptografa os BioRecords localmente e os envia para o motor de inteligência AVA (com consentimento de sessão). A AVA processa os dados.
4.  **O Produto Final (`sva-engine`)**: Você recebe seu Score de Vitalidade Ambrósio (SVA) — um score multidimensional de idade biológica mostrando onde você está ganhando e onde precisa agir.
5.  **Assistente de IA (`bsp-mcp`)**: Você pergunta ao seu assistente de IA sobre seus resultados. Por meio da conexão MCP, a IA lê seus dados soberanos e fornece insights médicos profundamente contextualizados.

## Onde os Caminhos se Cruzam: Os Papéis dos Repositórios

| Repositório | Quem Usa | Finalidade |
|-------------|----------|------------|
| `bsp-spec` | Devs, Laboratórios, Auditores | A lei pública do protocolo. |
| `bsp-sdk` | Devs de App e Backend | As ferramentas do construtor (Python/TypeScript). |
| `bsp-mcp` | Plataformas de IA | Conecta agentes de IA ao protocolo com consentimento. |
| `bsp-contracts` | Ambrósio Institute | Contratos inteligentes no Arweave (identidades vivem aqui). |
| `ava-core` | Ambrósio Institute | Inteligência proprietária (processa BioRecords). |
| `sva-engine` | Ambrósio Institute | Produz o Score de Vitalidade para o usuário. |

## Por que foi projetado assim?

*   **Por que o protocolo é aberto?** Porque um padrão fechado é apenas um produto. Se o BSP exigisse aprovação para criar um BEO, o Instituto seria um gargalo.
*   **Por que o consentimento substitui a certificação como guardião?** Porque uma assinatura on-chain é matematicamente verificável; não requer confiar em uma instituição. A certificação é um distintivo de confiança, não a chave da porta.
*   **Por que a inteligência (AVA) é fechada?** A vantagem competitiva do Instituto não é o próprio protocolo, mas a inteligência aplicada aos dados padronizados que fluem por ele.
*   **Por que a AVA nunca tem acesso passivo?** Porque soberania verdadeira significa que nenhum sistema analisa seus dados a menos que você solicite.
