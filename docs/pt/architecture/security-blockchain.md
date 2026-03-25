# Chaves, Blockchain e Acesso

"Como usuários, laboratórios e sistemas se conectam ao ecossistema de forma descentralizada — sem servidor central, sem intermediário, sem permissão prévia."

## Parte 1: O Fundamento — Chaves Criptográficas

O BSP é construído sobre um princípio simples: **nenhuma autoridade central controla o acesso aos seus dados biológicos. Você controla.** O controle é exercido inteiramente por meio de pares de chaves criptográficas.

### O Par de Chaves
*   **Chave Pública**: Seu endereço no ecossistema BSP (ex: `andre.bsp`). Compartilhada livremente com laboratórios e sistemas para identificar seu BEO.
*   **Chave Privada**: Sua chave de controle. Nunca sai do seu dispositivo. Nunca enviada a nenhum servidor. Usada para assinar autorizações e descriptografar seus dados. Sem ela, ninguém acessa seu BEO.

### Analogia: Carteira de Criptomoedas
Como um endereço Bitcoin, sua chave pública recebe dados (BioRecords). Sua chave privada autoriza transações (ConsentTokens). Ao contrário dos bancos, se você perder permanentemente sua chave privada sem backups, perde o acesso aos seus dados para sempre.

### Recuperação Social
Para mitigar riscos de perda, os usuários podem configurar 3 **Guardiões** de confiança.
Usando Shamir Secret Sharing, fragmentos da chave de recuperação são criptografados com as chaves públicas dos guardiões. Se um usuário perder seu dispositivo, qualquer 2 dos 3 guardiões podem confirmar sua identidade para autorizar uma Rotação de Chave, restaurando o acesso sem envolver nenhum servidor central.

## Parte 2: Arweave — Armazenamento Permanente

O BSP usa **Arweave**, uma blockchain de armazenamento permanente.

*   **BDs Tradicionais**: Gerenciados por servidores centrais. Se a empresa fechar, os dados morrem.
*   **Arweave**: Pague uma vez, armazene para sempre. Uma rede descentralizada de nós garante que nenhuma empresa, governo ou mesmo o Ambrósio Institute possa excluir ou alterar os dados.

Se o Ambrósio Institute deixar de existir em 50 anos, os BEOs, BioRecords e Contratos Inteligentes continuam executando no Arweave sem interrupções. Dados soberanos verdadeiramente sobrevivem a seus criadores.

## Parte 3: Contratos Inteligentes — Regras Imutáveis

Toda ação relevante em um BEO gera uma transação permanente no Arweave. A chain do Arweave **acumula** transações — nunca as sobrescreve.

Os contratos relevantes incluem:
*   **BEORegistry**: Cria e gerencia BEOs (aberto a qualquer pessoa). Define o estado "atual" de um BEO resolvendo as transações válidas mais recentes.
*   **IEORegistry**: Gerencia instituições certificadas pelo BSP.
*   **DomainRegistry**: Gerencia o namespace `.bsp`.
*   **AccessControl**: O verdadeiro guardião. Verifica `ConsentTokens` globalmente.

## Parte 4: O Modelo MCP Aplicado ao BSP

O Anthropic Model Context Protocol (MCP) permite que qualquer pessoa crie um Servidor ou Cliente MCP sem a aprovação da Anthropic. A segurança vem do usuário que consente ativamente em quais servidores o assistente pode acessar.

O BSP segue exatamente a mesma lógica.
*   Qualquer pessoa pode criar um BEO, ou um IEO para enviar dados.
*   O único guardião é o **ConsentToken** do indivíduo no contrato `AccessControl`.

### Exemplos de Fluxo
*   **O Usuário**: Abre o aplicativo -> Gera chaves localmente -> Cria BEO no Arweave -> Recebe domínio `.bsp` -> Autoriza laboratórios.
*   **O Laboratório (certificado ou não)**: Instala o `bsp-sdk` -> Solicita autorização -> Envia BioRecords criptografados para o Arweave.
*   **A AVA (Inteligência)**: Usuário abre o aplicativo -> Aplicativo descriptografa registros localmente -> Usuário solicita explicitamente análise da AVA -> AVA processa dados e retorna SVA Score -> Ambrósio Institute descarta dados brutos após o processamento.
