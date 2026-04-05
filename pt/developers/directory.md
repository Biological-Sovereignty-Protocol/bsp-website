# Diretório do Ecossistema

O Protocolo de Soberania Biológica conecta indivíduos a uma rede aberta de instituições de saúde, fabricantes de hardware e plataformas de inteligência.

Este diretório lista os **Objetos de Entidade Institucional (IEOs)** proeminentes que implementam o padrão.

> [!NOTE]
> Qualquer instituição pode interagir com o BSP sem permissão prévia. O selo **BSP-Certificado** (`✓`) indica instituições que se registraram voluntariamente no Ambrósio Institute para verificações de identidade criptograficamente verificáveis.

## Laboratórios e Diagnósticos (`BSP-LA`, `BSP-HM`)
Laboratórios enviam BioRecords padronizados e de alta fidelidade diretamente para os BEOs dos pacientes.

| Nome | Domínio IEO | Tipo | Status |
|------|------------|------|--------|
| Fleury | `fleury.bsp` | Diagnóstico Nacional | Certificado ✓ |
| Dasa | `dasa.bsp` | Diagnóstico Nacional | Integração |
| DB Molecular | `db.bsp` | Laboratório Especializado | Certificado ✓ |

## Wearables e Hardware (`BSP-DV`)
Fabricantes de hardware que sincronizam dados fisiológicos contínuos com segurança para o protocolo.

| Nome | Domínio IEO | Tipo | Status |
|------|------------|------|--------|
| Oura | `oura.bsp` | Anel de Sono/Recuperação | Certificado ✓ |
| WHOOP | `whoop.bsp` | Cinta de Carga/Sono | Integração |
| Apple Health | `apple.bsp` | SO Agregador | Integração |

## Inteligência e Plataformas
Plataformas que processam, sintetizam e fornecem insights sobre dados biológicos.

| Nome | Domínio IEO | Tipo | Status |
|------|------------|------|--------|
| Ambrósio Institute | `ambrosio.bsp` | SVA / AVA Core | Fundação ✓ |
| InsideTracker | `insidetracker.bsp` | Plataforma de Biomarcadores | Explorando |

---

### Verificando uma Certificação
Uma verdadeira certificação BSP é verificável on-chain via o contrato inteligente `IEORegistry`.

```typescript
const registry = new IEORegistry("mainnet");
const status = await registry.verify("fleury.bsp");

console.log(status.isCertified) // true
console.log(status.certifiedSince) // 2026-03-01
```
