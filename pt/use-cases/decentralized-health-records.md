---
title: "Registros de Saúde Descentralizados | BSP"
description: "O BSP usa contratos inteligentes Aptos e armazenamento permanente Arweave para criar registros de saúde verdadeiramente permanentes e descentralizados. Sem servidor central, sem ponto único de falha."
---

# Registros de Saúde Descentralizados que Duram Para Sempre

Registros de saúde descentralizados não são uma ideia nova. A parte difícil é a permanência. A maioria das implementações ainda depende de nós que podem ficar offline, organizações que podem fechar ou mecanismos de consenso que exigem incentivos econômicos contínuos para funcionar.

O BSP adota uma abordagem diferente: escreva uma vez, persista para sempre.

## Por Que os Sistemas Existentes Ficam Aquém

Projetos de **blockchain para dados de saúde** da última década compartilham uma fraqueza estrutural — dependem da participação ativa na rede. Validadores precisam de incentivos. Nós precisam de operadores. Quando a economia do token colapsa ou o time fundador se dissolve, a rede se degrada.

**Sistemas baseados em IPFS** são tão duráveis quanto os serviços de pinning que mantêm os arquivos disponíveis. Se ninguém paga para fixar seus dados, eles desaparecem da rede. "Descentralizado" vira afirmação de marketing, não garantia técnica.

**Sistemas EHR hospitalares** são o baseline com que a maioria das pessoas lida: centralizados, isolados, não interoperáveis por design. Seus registros vivem no sistema do hospital — acessíveis apenas pela interface desse sistema, exportados (quando exportados) em formatos não padronizados.

O resultado é fragmentação de dados, infraestrutura frágil e zero soberania individual.

## Como Aptos e Arweave Mudam a Equação

O BSP usa uma arquitetura de duas camadas. O **Aptos** serve como camada de execução — contratos inteligentes Move gerenciam controle de acesso, tokens de consentimento, registros de identidade e trilhas de auditoria com finalidade sub-segundo. O **Arweave** serve como camada de armazenamento permanente — dados biológicos são armazenados em um protocolo construído especificamente para armazenamento permanente e de baixo custo. O modelo econômico é um endowment único: pague uma vez, armazene para sempre. Sem taxas recorrentes, sem renovações, sem dependência da participação contínua de qualquer parte.

A garantia de permanência é estrutural. Dados escritos no Arweave são replicados em uma rede de mineradores incentivados a armazená-los por 200+ anos pelo mecanismo de endowment criptográfico do protocolo.

**Contratos inteligentes Aptos** (módulos Move) gerenciam a lógica do protocolo:

- **Controle de acesso** — quem pode ler quais partes de um registro de saúde, e sob quais condições
- **Tokens de consentimento** — autorizações com prazo definido e aplicação criptográfica que não dependem de nenhuma API permanecer operacional
- **Trilhas de auditoria** — logs imutáveis de cada evento de acesso, ancorados on-chain

O modelo de recursos Move garante que os ativos do protocolo (BEOs, tokens de consentimento, registros de domínio) não possam ser duplicados ou perdidos — uma garantia estrutural aplicada no nível da linguagem.

## A Estrutura do Registro BSP

Um registro de saúde BSP é um **BEO** (Objeto de Entidade Biológica): um documento JSON conforme o schema aberto do BSP, assinado com a chave privada do proprietário e escrito no Arweave.

Propriedades estruturais principais:

- **Auto-descritivo** — cada registro inclui versão do schema, códigos de taxonomia de tipo de dado e metadados de proveniência
- **Composável** — BEOs podem referenciar outros BEOs, permitindo registros vinculados
- **Portátil** — o formato é aberto e documentado; qualquer leitor compatível pode interpretar qualquer registro BSP
- **Verificável** — assinaturas criptográficas permitem que qualquer parte confirme a integridade e origem do registro sem contatar uma autoridade central

## Interoperabilidade Sem Registro Central

A interoperabilidade tradicional exige um hub: um registro central que mapeia identidades de pacientes entre sistemas. O BSP substitui o hub por uma chave: sua identidade criptográfica é o identificador universal.

Qualquer instituição que implemente BSP pode escrever registros no seu BEO (com seu consentimento) e ler registros dele (com sua autorização). Sem clearing central. Sem identificador nacional de paciente. Sem sistema de login federado que possa ser comprometido.

---

[Ler a Arquitetura](/pt/architecture/ecosystem-flow) | [Ver o Schema BEO](/pt/specification/beo) | [Começar](/pt/getting-started/intro)
