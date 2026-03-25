---
title: "Padrão Aberto de Dados de Saúde para Desenvolvedores | BSP"
description: "O BSP é um padrão aberto de dados de saúde construído para permanência e soberania. Compare BSP vs FHIR, HL7 e APIs proprietárias para labs, clínicas e plataformas."
---

# Padrão Aberto de Dados de Saúde para Desenvolvedores, Labs e Plataformas

A interoperabilidade de dados de saúde é um problema teoricamente resolvido há décadas. Na prática, permanece fragmentada. FHIR é amplamente implementado, mas não universalmente adotado. HL7 v2 está em todo lugar. APIs proprietárias se multiplicam. Pacientes ainda não conseguem extrair seus próprios dados da maioria dos sistemas sem burocracia.

O BSP é um tipo diferente de padrão. Não tenta substituir o FHIR para workflows clínicos. Resolve um problema diferente: dar aos indivíduos posse permanente, portátil e legível por máquina de seus dados biológicos — independente da participação contínua de qualquer instituição.

## BSP vs FHIR: Funções Diferentes, Designs Diferentes

| | FHIR | BSP |
|---|---|---|
| **Público primário** | Instituições de saúde | Indivíduos + desenvolvedores |
| **Residência dos dados** | Servidores controlados pelo provedor | Controlados pelo usuário (Arweave) |
| **Modelo de persistência** | Dependente da instituição | Permanência garantida pelo protocolo |
| **Controle de acesso** | Mediado pela instituição | Criptográfico, detido pelo usuário |
| **Escopo de interoperabilidade** | Integração entre sistemas clínicos | Transinstitucional, transfronteiriço, multiplataforma |
| **Modelo de identidade** | Identificadores por instituição | Identidade criptográfica única |
| **Padrão aberto** | Sim (HL7) | Sim (BSP) |

BSP e FHIR não estão em conflito. Labs e clínicas podem implementar FHIR internamente e exportar para BSP ao escrever registros de propriedade do paciente. O BSP inclui uma ponte FHIR na implementação de referência especificamente para esse caso de uso.

## Por Que Construir sobre BSP

Para **labs e empresas de diagnóstico**, o BSP fornece um caminho padronizado de exportação para resultados de propriedade do paciente. Escreva resultados no BEO do paciente uma vez — eles o levam para sempre.

Para **desenvolvedores de wearables e apps de saúde**, a taxonomia de biomarcadores do BSP fornece um vocabulário canônico para dados biológicos. Padronize suas exportações uma vez e seus usuários podem combinar seus dados com qualquer outra fonte compatível com BSP.

Para **clínicas de longevidade e plataformas de medicina de precisão**, o schema estruturado do BSP viabiliza análise longitudinal entre fontes de dados que de outra forma exigiriam ETL customizado para cada integração.

Para **instituições de pesquisa**, o sistema de tokens de consentimento do BSP permite que participantes concedam acesso com prazo definido e escopo limitado a partes específicas de seu registro biológico.

## A Taxonomia de Biomarcadores BSP

O BSP inclui uma taxonomia de quatro níveis cobrindo os tipos de dados biológicos mais comuns:

- **Nível 1 — Core:** 40 biomarcadores que toda plataforma de saúde deveria capturar (lipídios, hemograma, painel metabólico, hormônios principais)
- **Nível 2 — Standard:** Diagnósticos estendidos, hormônios adicionais, marcadores inflamatórios
- **Nível 3 — Extended:** Painéis especializados, microbioma, marcadores epigenéticos
- **Nível 4 — Device:** Dados de monitoramento contínuo de wearables (HRV, glicose, SpO2, estágios do sono)

[Ver a taxonomia completa](/pt/specification/taxonomy/level-1-core)

## Caminho de Implementação

1. **Ler a especificação** — comece com o [schema BEO](/pt/specification/beo) e o [protocolo de troca](/pt/specification/exchange)
2. **Usar o SDK** — SDKs em TypeScript e Python cuidam de gerenciamento de chaves, assinatura de registros e escrita no Arweave
3. **Importar dados existentes** — a ponte FHIR e os importadores CSV cobrem os formatos de exportação mais comuns
4. **Ir ao ar** — escreva seu primeiro BEO no Arweave mainnet em menos de uma hora

---

[Ver Referência SDK](/pt/developers/sdk-reference) | [Ler o Schema BEO](/pt/specification/beo) | [Início Rápido](/pt/getting-started/quickstart)
