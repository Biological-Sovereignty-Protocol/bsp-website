---
title: Glosario BSP — Terminos del Biological Sovereignty Protocol
description: Glosario completo de los terminos usados en el Biological Sovereignty Protocol. Definiciones para BEO, IEO, BioRecord, ConsentToken, biomarcadores y mas.
sidebar: false
---

# Glosario

Definiciones canonicas de todos los terminos usados en el Biological Sovereignty Protocol.

## A

**Access Control (Control de Acceso)**
El mecanismo mediante el cual el titular de un BEO otorga o revoca el acceso a sus datos biologicos. En BSP, el acceso se gestiona mediante ConsentTokens on-chain.

**Arweave**
Una red de almacenamiento permanente y descentralizada utilizada por BSP para almacenar BioRecords y objetos BEO. Los datos almacenados en Arweave no pueden ser eliminados ni modificados.

## B

**BEO — Biological Entity Object**
La identidad criptografica de un organismo vivo en el ecosistema BSP. Un BEO contiene una clave publica, metadatos sobre el organismo (especie, identificadores unicos) y enlaces a BioRecords asociados. Ver: [Schema BEO](/es/specification/beo).

**BioRecord**
Un objeto de datos estandarizado en series temporales que contiene una o mas mediciones de biomarcadores. Los BioRecords son la unidad de datos central en BSP. Ver: [Schema BioRecord](/es/specification/biorecord).

**BIP — Biological Improvement Proposal**
Un documento de diseno que propone nuevas funcionalidades o cambios en el protocolo BSP. Los BIPs siguen un proceso formal de revision similar a los EIPs de Ethereum. Ver: [BIPs](/es/bips/).

**Biological Sovereignty (Soberania Biologica)**
El principio de que todo ser vivo tiene el derecho de poseer, controlar y beneficiarse de los datos generados por su biologia — permanentemente, sin dependencia de ninguna institucion o API.

**Biomarker (Biomarcador)**
Cualquier indicador medible de un estado o proceso biologico. Ejemplos incluyen glucosa en sangre, VO2 max, cortisol, variantes genomicas, variabilidad de la frecuencia cardiaca. BSP define una [Taxonomia de Biomarcadores](/es/specification/taxonomy/level-1-core) estandarizada.

**Biomarker Taxonomy (Taxonomia de Biomarcadores)**
La clasificacion jerarquica de biomarcadores utilizada en BSP. Organizada en 4 niveles: Core (Nivel 1), Standard (Nivel 2), Extended (Nivel 3) y Device (Nivel 4).

**BSP Domain**
Un identificador legible por humanos para un BEO (ej.: `alice.bsp`). Analogo a los dominios ENS en Ethereum. Ver: [Sistema de Dominios BSP](/es/specification/bsp-domain).

## C

**ConsentToken**
Un token on-chain que codifica el consentimiento de un paciente para que una institucion o aplicacion especifica acceda a campos de datos especificos durante un periodo definido. Los ConsentTokens pueden ser revocados por el titular del BEO en cualquier momento.

**Cryptographic Ownership (Propiedad Criptografica)**
Propiedad de datos respaldada por una clave privada. Solo el poseedor de la clave privada puede firmar transacciones que modifiquen o concedan acceso a su BEO.

## D

**Decentralized Health Record (Historia Clinica Descentralizada)**
Un registro de salud almacenado en un sistema de almacenamiento descentralizado y permanente (como Arweave), controlado por el paciente en lugar de un proveedor de salud.

## E

**Exchange Protocol (Protocolo de Intercambio)**
La especificacion BSP para como los datos biologicos se transfieren entre partes. Define formatos de datos, autenticacion y verificacion de consentimiento. Ver: [Exchange Protocol](/es/specification/exchange).

## G

**Governance (Gobernanza)**
El proceso mediante el cual los cambios al protocolo BSP son propuestos, debatidos y aprobados. Gobernado por BIPs y una comunidad de contribuidores. Ver: [Gobernanza](/es/protocols/governance).

## I

**IEO — Institutional Entity Object**
La identidad criptografica de una institucion (hospital, laboratorio, aseguradora, institucion de investigacion) en el ecosistema BSP. Los IEOs interactuan con los BEOs a traves de ConsentTokens. Ver: [Schema IEO](/es/specification/ieo).

**Immutability (Inmutabilidad)**
La propiedad de que los datos almacenados no pueden ser modificados despues de ser escritos. BSP aprovecha la inmutabilidad de Arweave para garantizar la permanencia de los datos.

## L

**Longevity AI (IA de Longevidad)**
Aplicaciones que utilizan datos biologicos, almacenados segun los estandares BSP, para generar insights sobre envejecimiento, optimizacion de la salud y longevidad.

## O

**Open Standard (Estandar Abierto)**
Una especificacion publicamente disponible que puede ser implementada por cualquier persona sin pagar regalias ni obtener permisos especiales. BSP es un estandar abierto licenciado bajo MIT.

## P

**Permanent Storage (Almacenamiento Permanente)**
Almacenamiento que garantiza la disponibilidad de los datos indefinidamente, independientemente del estado financiero de cualquier organizacion. BSP usa Arweave para almacenamiento permanente.

**Private Key (Clave Privada)**
Un secreto criptografico conocido solo por el propietario de los datos. Se utiliza para firmar transacciones y demostrar la propiedad de un BEO.

## S

**SDK**
Software Development Kit. BSP proporciona SDKs oficiales en TypeScript y Python para interactuar con el protocolo. Ver: [Referencia del SDK](/es/developers/sdk-reference).

**Self-Sovereign Identity (SSI) — Identidad Auto-Soberana**
El concepto de que los individuos deben controlar sus propias identidades digitales sin depender de autoridades centralizadas. BSP aplica los principios de SSI a los datos biologicos.

## T

**Transaction ID (TxID)**
Un identificador unico para una transaccion en Arweave. Se utiliza para referenciar un BioRecord o un objeto BEO almacenado.

## V

**Verifiable Credential (Credencial Verificable)**
Un documento firmado criptograficamente que demuestra una afirmacion sobre un BEO (ej.: un resultado de examen de laboratorio). Los BioRecords de BSP estan disenados para funcionar como credenciales verificables.

---

*Ver tambien: [Que es BSP?](/es/what-is-bsp) · [Vision General de la Especificacion](/es/specification/overview) · [BSP vs FHIR](/es/compare)*
