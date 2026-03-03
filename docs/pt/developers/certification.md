# Processo de Certificação BSP

O Protocolo de Soberania Biológica (BSP) é inerentemente aberto. Qualquer laboratório, dispositivo wearable ou aplicativo pode criar um BEO (Biological Entity Object) ou enviar BioRecords, desde que tenham o consentimento criptográfico do indivíduo.

No entanto, a **Certificação BSP** existe para estabelecer uma camada verificável de confiança, conformidade técnica e qualidade de dados. É uma marca de responsabilidade institucional.

---

## Por que se Certificar?

Embora sistemas não certificados possam tecnicamente participar do ecossistema (se um usuário os autorizar), tornar-se **Certificado-BSP** oferece vantagens significativas para as instituições:

1. **Listagem em Diretório Verificado:** Instituições certificadas aparecem no diretório oficial do Ambrósio Institute. É aqui que os usuários procuram primeiro ao buscar fontes confiáveis de dados biológicos.
2. **Confiança Nativa no Ambrosio OS:** Quando um usuário utiliza o aplicativo oficial Ambrosio, fontes de dados certificadas são confiáveis por padrão. Fontes não certificadas acionam avisos visíveis de "fonte não verificada" antes que o usuário assine um ConsentToken.
3. **Acesso ao Pipeline de Dados AVA:** Este é o benefício mais crítico. Apenas dados originados de uma fonte Certificada-BSP alimentam o Algoritmo de Vitalidade Ambrósio (AVA). Dados não certificados permanecem no BEO do usuário, mas **não** contribuem para o seu Score de Vitalidade Ambrósio (SVA).
4. **Selo On-Chain:** O status é registrado de forma imutável no contrato inteligente `IEORegistry` no Arweave, verificável publicamente por qualquer aplicativo de terceiros.
5. **Participação na Governança:** Instituições certificadas ganham privilégios de voto no processo de Propostas de Melhoria BSP (BIP), moldando diretamente o futuro do padrão.

---

## Níveis de Certificação

O quadro de certificação é mapeado para os quatro níveis da [Taxonomia de Biomarcadores BSP](/pt/developers/taxonomy). Uma instituição precisa ser certificada apenas no nível de dados que produz ativamente.

### BSP-1: Básico em Conformidade
* **Alvo:** Laboratórios clínicos convencionais e hospitais.
* **Requisitos:** Capacidade de processar e enviar biomarcadores de **Nível 2 (Standard)** (ex: Hematologia, Lipídios, Hormônios Convencionais, Química Geral). Deve implementar com precisão o esquema BioRecord e a assinatura criptográfica via SDK.

### BSP-2: Avançado em Conformidade
* **Alvo:** Clínicas de longevidade avançadas e laboratórios de medicina funcional.
* **Requisitos:** Capacidade de processar biomarcadores de **Nível 1 (Core)** e Nível 2 (ex: NAD+, GDF-11, relógios epigenéticos, PCR-as). Deve demonstrar gestão robusta de ConsentTokens e tratamento dinâmico de solicitações.

### BSP-3: Espectro Total em Conformidade
* **Alvo:** Instituições abrangentes de pesquisa e centros de diagnóstico ultra-avançados.
* **Requisitos:** Capacidade através dos Níveis 1, 2 e domínios especializados do **Nível 3 (Extended)** (Genômica, Microbioma, Toxicologia Avançada). Requer profunda integração com o pipeline de inteligência AVA.

### BSP-4: Dispositivo em Conformidade
* **Alvo:** Fabricantes de hardwares (wearables, monitores contínuos de glicose, biossensores).
* **Requisitos:** Capacidade de gerar dados de **Nível 4 (Device)** (VFC, SpO2, Arquitetura do Sono). Requer implementação de consolidação diária de dados — os dispositivos não devem inundar a blockchain com eventos brutos, mas sim enviar BioRecords agregados diariamente.

---

## O Fluxo de Trabalho de Certificação

As instituições que desejam adquirir o selo Certificado-BSP interagem com o backend `bsp-registry-api` (Privado), controlado pelo Ambrósio Institute.

### 1. Envio da Solicitação
A instituição cria um Institutional Entity Object (IEO) nativamente via SDK e envia seu `ieo_id` junto com documentação técnica e registros de garantia de qualidade para o portal do Ambrósio Institute.

### 2. Auditoria Técnica
A equipe de engenharia do Instituto executa a auditoria da integração do sandbox da instituição.
* Eles verificam corretamente os `ConsentTokens` antes das intenções de `SUBMIT_RECORD`?
* Os `BioRecords` estão corretamente mapeados para a taxonomia BSP?
* As faixas de referência estão preenchidas de forma segura?

### 3. Endosso no Contrato Inteligente
Após a aprovação, o Ambrósio Institute assina uma transação multi-sig no contrato Arweave `IEORegistry`, atualizando o status da instituição para **CERTIFIED** na respectiva camada (ex: BSP-2).

### 4. Conformidade Contínua
A certificação é revisada anualmente. As instituições devem manter o tempo de atividade do SLA para suas interfaces de dados e adotar prontamente as atualizações da versão do protocolo para manter seu selo de certificação.

---

*Nota: O portal de certificação é atualmente gerenciado de forma privada pelo Instituto. Se a sua organização está pronta para testar a integração, comece fazendo o download do `bsp-sdk` e testando contra BEOs locais antes de solicitar uma auditoria formal.*
