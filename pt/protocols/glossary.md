# Glossário Canônico

Todos os termos, objetos, tipos, contratos e repositórios do ecossistema BSP definidos com precisão em uma única referência.

---

## Objetos Principais do Protocolo

**BEO — Objeto de Entidade Biológica**
A identidade biológica soberana de um ser humano vivo no ecossistema BSP. Um objeto permanente armazenado no Arweave, identificado por um domínio `.bsp` (ex. `andre.bsp`), e controlado exclusivamente pelo titular por meio de uma chave privada. Todos os BioRecords estão ancorados ao BEO. Todos os ConsentTokens são emitidos a partir dele. Nenhuma empresa, governo ou o próprio Ambrósio Institute pode acessar, modificar ou excluir um BEO sem a chave privada do titular.

**BioRecord**
A unidade atômica de dados biológicos. Cada medição — resultado laboratorial, leitura de wearable, avaliação clínica, marcador genômico — é um BioRecord. BioRecords são **imutáveis** após a escrita: correções são novos registros que substituem o anterior, preservando o histórico completo. Cada BioRecord contém: o código BSP do biomarcador, valor com unidade padronizada, faixas de referência, instituição submissora (assinada criptograficamente), hash dos dados brutos e timestamps.

**BIP — Proposta de Melhoria BSP**
O mecanismo formal para evolução do protocolo BSP. Qualquer pesquisador, médico, laboratório, desenvolvedor ou indivíduo pode submeter um BIP — com justificativa científica, pelo menos duas referências revisadas por pares e um código BSP proposto.

**Domínio .bsp**
Endereço biológico permanente e legível por humanos (ex. `andre.bsp`, `fleury.bsp`). Registrado no contrato inteligente DomainRegistry — globalmente único. Uma vez registrado, pertence ao titular permanentemente. Domínios institucionais são transferíveis em aquisição ou fusão.

**ConsentToken**
Autorização criptográfica que permite a um IEO interagir com os dados do titular de um BEO. Emitido on-chain pelo contrato AccessControl, especificando: quem pode acessar (`ieo_id`), quem é acessado (`beo_id`), ações permitidas (intents), categorias de dados acessíveis e duração. Sempre revogável pelo titular — instantaneamente, on-chain.

**IEO — Objeto de Entidade Institucional**
A identidade institucional de qualquer organização, sistema ou profissional que interage com dados biológicos. Qualquer instituição pode criar um IEO sem aprovação prévia. Tipos: `LABORATORY`, `HOSPITAL`, `WEARABLE`, `PHYSICIAN`, `INSURER`, `RESEARCH`, `PLATFORM`.

---

## Contratos Inteligentes e Blockchain

**AccessControl**
O contrato BSP mais crítico. Gerencia todas as concessões de consentimento entre BEOs e IEOs. Qualquer sistema que tente gravar um BioRecord ou ler dados de BEO deve apresentar uma autorização válida registrada aqui. Sem a assinatura do titular, a transação é rejeitada pela blockchain — nenhum servidor pode contorná-la.

**Arweave**
Blockchain de armazenamento descentralizado. Pague uma vez — dados persistem por 200+ anos, garantidos por um modelo matemático de dotação. Os contratos inteligentes BSP rodam via SmartWeave no Arweave. Se o Ambrósio Institute deixar de existir, BEOs e BioRecords permanecem acessíveis para sempre.

**BEORegistry**
Contrato SmartWeave no Arweave responsável por criar e indexar BEOs. **Aberto a qualquer pessoa** — não requer aprovação. Registra: endereço público, hash da chave pública, domínio e metadados do BEO.

**DomainRegistry**
Contrato inteligente que controla o namespace `.bsp`. Garante unicidade: `andre.bsp` pode existir apenas uma vez globalmente. Gerencia registros, transferências e revogações.

**Governança (contrato)**
Contrato SmartWeave que controla modificações em outros contratos BSP. Implementa modelo de assinatura múltipla: operações críticas requerem assinaturas de pelo menos 2 dos 3 detentores de chaves do Instituto. Nenhum indivíduo — incluindo o fundador — pode modificar unilateralmente as regras do protocolo.

**IEORegistry**
Contrato SmartWeave que gerencia as instituições BSP-Certificadas. Registra quais instituições detêm certificação, em qual nível e com quais categorias autorizadas. Consultado pelo Ambrosio OS e outros apps para verificar credenciais.

**SmartWeave**
Framework de contratos inteligentes que roda no Arweave. Permite lógica programável na blockchain de armazenamento permanente do Arweave.

---

## Camada de Inteligência

**AVA — Algoritmo de Vitalidade Ambrósio**
O algoritmo proprietário de envelhecimento biológico do Ambrósio Institute. Não faz parte da especificação BSP — uma implementação de referência construída sobre o protocolo aberto. AVA **nunca tem acesso passivo** a nenhum BEO: processa dados apenas quando o usuário inicia ativamente uma análise com consentimento explícito de sessão. Roda no repositório privado `ava-core`.

**SVA — Índice de Vitalidade Ambrósio**
A pontuação de idade biológica multidimensional produzida pela AVA:
- Idade biológica cardiovascular, metabólica, neurológica e imunológica
- Velocidade de envelhecimento (relativa à linha de base cronológica)
- Reserva biológica (percentil populacional)

Proprietário — pode ser produzido apenas pelo `sva-engine` do Instituto.

---

## Tipos e Conceitos do Protocolo

**BSP — Protocolo de Soberania Biológica**
Padrão aberto que define uma linguagem universal para troca de dados biológicos. Define como os dados são estruturados (BioRecord), identificados (BEO, IEO, .bsp), trocados (Protocolo de Troca) e governados (processo BIP). Não define o que fazer com os dados — inteligências como AVA operam acima do protocolo.

**BSP-Certification**
Selo de qualidade voluntário concedido pelo Ambrósio Institute a instituições que atendem requisitos técnicos e de conformidade. Benefícios: listagem no diretório oficial, sugestão no Ambrosio OS, selo on-chain verificável e acesso ao pipeline de dados AVA.
Níveis: `BSP-1` (Básico) → `BSP-2` (Avançado) → `BSP-3` (Espectro Completo) → `BSP-4` (Dispositivo)

**BSPIntent**
Enum tipado que define qual ação um sistema solicita no Protocolo de Troca.

| Intent | Descrição |
|--------|-------------|
| `SUBMIT_RECORD` | Gravar um BioRecord no BEO |
| `READ_RECORDS` | Ler BioRecords existentes |
| `ANALYZE_VITALITY` | Solicitar análise AVA |
| `REQUEST_SCORE` | Solicitar pontuação SVA |
| `EXPORT_DATA` | Exportar todos os dados — sempre disponível ao titular |
| `SYNC_PROTOCOL` | Negociação de versão do protocolo |

**CertLevel**
Enum representando os níveis de certificação BSP.
`UNCERTIFIED` → `BASIC` → `ADVANCED` → `FULL` → `DEVICE` → `RESEARCH`

**IEOStatus**
`ACTIVE` | `SUSPENDED` | `REVOKED` | `PENDING`

**Recuperação Social**
Mecanismo para recuperar uma chave privada de BEO sem um servidor central. O titular designa 3 guardiões de confiança. Para recuperar o acesso, pelo menos 2 dos 3 devem confirmar — usando Shamir Secret Sharing. Os guardiões não têm acesso aos dados do BEO.

---

## Repositórios

| Repositório | Acesso | Finalidade |
|------------|--------|---------|
| `bsp-spec` | Público | Especificação do protocolo |
| `bsp-sdk-typescript` | Público | SDK TypeScript (`@bsp/sdk`) |
| `bsp-sdk-python` | Público | SDK Python (`bsp-sdk`) |
| `bsp-mcp` | Público | Servidor MCP para agentes de IA |
| `bsp-docs-repo` | Público | Este site de documentação |
| `bsp-contracts` | Privado | Contratos inteligentes no Arweave |
| `bsp-registry-api` | Privado | API do portal de certificação |
| `ava-core` | Privado | Algoritmo AVA |
| `sva-engine` | Privado | Motor de pontuação SVA |
