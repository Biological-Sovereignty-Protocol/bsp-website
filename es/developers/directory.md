# Directorio del Ecosistema

El Biological Sovereignty Protocol conecta a individuos con una red abierta de instituciones de salud, fabricantes de hardware y plataformas de inteligencia.

Este directorio lista los principales **Objetos de Entidad Institucional (IEOs)** que implementan el estándar.

> [!NOTE]
> Cualquier institución puede interactuar con el BSP sin permiso. El sello **BSP-Certified** (`✓`) indica instituciones que se han registrado voluntariamente con el Ambrósio Institute para verificaciones de identidad criptográficamente verificables.

## Laboratorios y Diagnósticos (`BSP-LA`, `BSP-HM`)
Los laboratorios envían BioRecords estandarizados de alta fidelidad directamente a los BEOs de los pacientes.

| Nombre | Dominio IEO | Tipo | Estado |
|------|------------|------|--------|
| Fleury | `fleury.bsp` | Diagnóstico Nacional | Certificado ✓ |
| Dasa | `dasa.bsp` | Diagnóstico Nacional | Integración |
| DB Molecular | `db.bsp` | Laboratorio Especializado | Certificado ✓ |

## Wearables y Hardware (`BSP-DV`)
Fabricantes de hardware que sincronizan datos fisiológicos continuos de forma segura al protocolo.

| Nombre | Dominio IEO | Tipo | Estado |
|------|------------|------|--------|
| Oura | `oura.bsp` | Anillo Sueño/Recuperación | Certificado ✓ |
| WHOOP | `whoop.bsp` | Banda Esfuerzo/Sueño | Integración |
| Apple Health | `apple.bsp` | Agregador OS | Integración |

## Inteligencia y Plataformas
Plataformas que procesan, sintetizan y proporcionan insights sobre datos biológicos.

| Nombre | Dominio IEO | Tipo | Estado |
|------|------------|------|--------|
| Ambrósio Institute | `ambrosio.bsp` | SVA / AVA Core | Fundación ✓ |
| InsideTracker | `insidetracker.bsp` | Plataforma de Biomarcadores | Explorando |

---

### Verificar una Certificación
Una certificación BSP real es verificable on-chain a través del contrato inteligente `IEORegistry`.

```typescript
const registry = new IEORegistry("mainnet");
const status = await registry.verify("fleury.bsp");

console.log(status.isCertified) // true
console.log(status.certifiedSince) // 2026-03-01
```
