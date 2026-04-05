---
title: BSP vs FHIR vs HL7 — Comparacion de Estandares de Datos de Salud
description: Compare el Biological Sovereignty Protocol (BSP) con FHIR, HL7, OpenEHR y otros estandares de datos de salud. Entienda cual protocolo le da verdadera propiedad de sus datos.
sidebar: false
---

# BSP vs FHIR vs HL7 vs OpenEHR

Una comparacion practica entre estandares abiertos de datos de salud — que resuelven, quien controla los datos y donde encaja el BSP.

## Tabla Resumen

| Caracteristica | BSP | FHIR (R4/R5) | HL7 v2/v3 | OpenEHR |
|---|---|---|---|---|
| **Propiedad de los datos** | Paciente (criptografica) | Institucion | Institucion | Institucion |
| **Almacenamiento permanente** | Arweave (inmutable) | Depende del servidor | Depende del servidor | Depende del servidor |
| **Modelo de privacidad** | Consent tokens on-chain | OAuth/SMART | ACL | Basado en roles |
| **Interoperabilidad** | Estandar abierto | Estandar abierto | Estandar abierto | Estandar abierto |
| **Vendor lock-in** | Ninguno | Posible | Alto | Bajo |
| **Tarifas de API** | Ninguna | Posible | Altas | Bajas |
| **Longevidad** | Permanente (blockchain) | Depende del proveedor | Depende del proveedor | Depende del proveedor |
| **Listo para IA/ML** | Nativo (BioRecord) | Parcial | Limitado | Parcial |
| **SDK para devs** | TypeScript + Python | Varios | Varios | Algunos |
| **Licencia** | MIT (abierta) | HL7 IP | HL7 IP | Apache 2.0 |

## Que es FHIR?

FHIR (Fast Healthcare Interoperability Resources) es un estandar HL7 para el intercambio electronico de informacion de salud. Define formatos de datos y APIs utilizados por hospitales, aseguradoras y proveedores de historias clinicas electronicas.

**FHIR es excelente para:** interoperabilidad entre instituciones de salud.

**FHIR no resuelve:** propiedad de los datos por el paciente, almacenamiento permanente o libertad de intermediarios de API.

## Que es HL7?

HL7 (Health Level 7) es un conjunto de estandares internacionales para la transferencia de datos clinicos y administrativos entre aplicaciones de software. HL7 v2 sigue siendo el formato de mensajeria mas utilizado en hospitales.

**HL7 es excelente para:** integracion con sistemas de salud heredados.

**HL7 no resuelve:** soberania moderna de datos, consentimiento del paciente o control de acceso descentralizado.

## Que es OpenEHR?

OpenEHR es un estandar abierto para historias clinicas electronicas. Utiliza arquetipos y plantillas para modelar conocimiento clinico de forma independiente de cualquier proveedor.

**OpenEHR es excelente para:** modelos estandarizados de datos clinicos.

**OpenEHR no resuelve:** propiedad criptografica, almacenamiento inmutable o consentimiento controlado por el paciente.

## Donde encaja el BSP

El BSP no reemplaza a FHIR o HL7 dentro de los hospitales. El BSP resuelve un problema diferente: **quien es el dueno final de los datos cuando salen del sistema de salud**.

El BSP opera en la **capa de soberania** — otorgando a los individuos propiedad criptografica sobre sus datos biologicos, sin importar que sistema de historias clinicas los genero.

```
Hospital EHR (FHIR/HL7)
        ↓
  BSP Export (BEO + BioRecord)
        ↓
  Arweave Permanent Storage
        ↓
  Patient-Controlled Access
        ↓
  AI / Research / Longevity Apps
```

## Conceptos clave del BSP no encontrados en otros estandares

- **BEO (Biological Entity Object)** — la identidad criptografica de un organismo vivo
- **IEO (Institutional Entity Object)** — como las instituciones interactuan con datos biologicos
- **ConsentToken** — consentimiento on-chain que no puede ser revocado sin la firma del paciente
- **BioRecord** — formato estandarizado de datos de biomarcadores en series temporales
- **Integracion con Arweave** — datos almacenados permanentemente, independiente de cualquier API

## FAQ

**El BSP funciona junto con FHIR?**
Si. Las exportaciones BSP pueden generarse a partir de recursos FHIR. Ambos son complementarios.

**El BSP es un protocolo blockchain?**
El BSP usa Arweave para almacenamiento permanente y consentimiento on-chain. El protocolo en si es un estandar de datos — los detalles de implementacion son abiertos.

**Quien controla el BSP?**
El BSP esta gobernado por BIPs (Biological Improvement Proposals), modelados a partir del proceso EIP de Ethereum. Ninguna empresa lo controla sola.

---

*Ver tambien: [Que es BSP?](/es/what-is-bsp) · [Vision General de la Especificacion](/es/specification/overview) · [Whitepaper](/es/whitepaper)*
