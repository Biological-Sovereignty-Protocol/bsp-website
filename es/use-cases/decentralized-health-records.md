---
title: "Registros de Salud Descentralizados | BSP"
description: "BSP usa Arweave y contratos SmartWeave para crear registros de salud verdaderamente permanentes y descentralizados. Sin servidor central, sin punto único de fallo."
---

# Registros de Salud Descentralizados que Duran Para Siempre

Los registros de salud descentralizados no son una idea nueva. La parte difícil es la permanencia. La mayoría de las implementaciones aún dependen de nodos que pueden desconectarse, organizaciones que pueden cerrar o mecanismos de consenso que requieren incentivos económicos continuos para funcionar.

BSP adopta un enfoque diferente: escriba una vez, persista para siempre.

## Por Qué los Sistemas Existentes Se Quedan Cortos

Los proyectos de **blockchain para datos de salud** de la última década comparten una debilidad estructural — dependen de la participación activa en la red. Los validadores necesitan incentivos. Los nodos necesitan operadores. Cuando la economía del token colapsa o el equipo fundador se disuelve, la red se degrada.

**Los sistemas basados en IPFS** son tan duraderos como los servicios de pinning que mantienen los archivos disponibles. Si nadie paga por fijar sus datos, desaparecen de la red. "Descentralizado" se convierte en una afirmación de marketing, no en una garantía técnica.

**Los sistemas EHR hospitalarios** son el punto de partida con el que la mayoría de las personas trata: centralizados, aislados, no interoperables por diseño. Sus registros viven en el sistema del hospital — accesibles solo a través de la interfaz de ese sistema.

El resultado es fragmentación de datos, infraestructura frágil y cero soberanía individual.

## Cómo Arweave y SmartWeave Cambian la Ecuación

BSP ancla los registros de salud en **Arweave** — un protocolo construido específicamente para almacenamiento permanente y de bajo costo. El modelo económico es una dotación única: pague una vez, almacene para siempre. Sin tarifas recurrentes, sin renovaciones.

La garantía de permanencia es estructural. Los datos escritos en Arweave se replican en una red de mineros incentivados a almacenarlos durante 200+ años por el mecanismo de dotación criptográfica del protocolo.

**Los contratos SmartWeave** añaden programabilidad sobre esta capa permanente. BSP usa SmartWeave para gestionar:

- **Control de acceso** — quién puede leer qué partes de un registro de salud, y bajo qué condiciones
- **Tokens de consentimiento** — autorizaciones con límite de tiempo y aplicación criptográfica
- **Rastros de auditoría** — registros inmutables de cada evento de acceso, adjuntos al propio registro

## La Estructura del Registro BSP

Un registro de salud BSP es un **BEO** (Objeto de Entidad Biológica): un documento JSON conforme al esquema abierto de BSP, firmado con la clave privada del propietario y escrito en Arweave.

Propiedades estructurales clave:

- **Autodescriptivo** — cada registro incluye versión del esquema, códigos de taxonomía y metadatos de procedencia
- **Composable** — los BEOs pueden referenciar otros BEOs, permitiendo registros vinculados
- **Portable** — el formato es abierto y documentado; cualquier lector compatible puede interpretar cualquier registro BSP
- **Verificable** — las firmas criptográficas permiten a cualquier parte confirmar la integridad del registro sin contactar ninguna autoridad central

## Interoperabilidad Sin Registro Central

La interoperabilidad tradicional requiere un hub: un registro central que mapea identidades de pacientes entre sistemas. BSP reemplaza el hub con una llave: su identidad criptográfica es el identificador universal.

Cualquier institución que implemente BSP puede escribir registros en su BEO (con su consentimiento) y leer registros de él (con su autorización). Sin clearing central. Sin identificador nacional de paciente.

---

[Leer la Arquitectura](/es/architecture/ecosystem-flow) | [Ver el Esquema BEO](/es/specification/beo) | [Comenzar](/es/getting-started/intro)
