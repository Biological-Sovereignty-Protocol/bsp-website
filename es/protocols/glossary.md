# Glosario Canónico

Este documento es la referencia canónica para todos los términos técnicos, objetos, tipos, contratos, repositorios y conceptos del Biological Sovereignty Protocol.

## Sección 1: Objetos Principales del Protocolo

*   **BEO — Biological Entity Object**
    La identidad biológica soberana de un ser humano dentro del ecosistema BSP. Es un objeto permanente almacenado en Arweave, identificado por un dominio `.bsp` (ej., `andre.bsp`), y controlado exclusivamente por el propietario a través de una clave privada.
*   **BEORegistry**
    Contrato inteligente en Arweave responsable de crear e indexar BEOs. Almacena la dirección pública, el hash de la clave pública y metadatos básicos.
*   **BioRecord**
    La unidad atómica de datos biológicos. Cada medición biológica se representa como un BioRecord inmutable, que contiene el código de biomarcador BSP, el valor/unidad, el rango de referencia, la firma de la institución que lo envió y un timestamp.
*   **BIP — BSP Improvement Proposal**
    Mecanismo formal para la evolución del protocolo. Cualquiera puede enviar un BIP proponiendo adiciones a la taxonomía de biomarcadores o a la especificación del protocolo.
*   **Dominio .bsp**
    Dirección biológica permanente y legible por humanos (ej., `andre.bsp` o `fleury.bsp`). Registrada en el contrato inteligente DomainRegistry.
*   **IEO — Institutional Entity Object**
    La identidad institucional de cualquier organización, sistema o profesional que interactúa con datos biológicos.
*   **IEORegistry**
    Contrato inteligente que gestiona los IEOs BSP-Certificados.
*   **ConsentToken**
    Autorización criptográfica que permite a una institución interactuar con los datos del usuario. Emitida por el contrato AccessControl, especificando acciones, categorías y expiración.

## Sección 2: Contratos Inteligentes y Blockchain

*   **AccessControl**
    El contrato de protocolo más crítico. Gestiona todo el acceso por consentimiento entre BEOs e IEOs.
*   **Arweave**
    Blockchain de almacenamiento permanente donde se registran todos los datos del ecosistema BSP.
*   **DomainRegistry**
    Contrato inteligente que controla el namespace `.bsp`, garantizando la unicidad global.
*   **Governance**
    Contrato inteligente que controla las modificaciones a otros contratos BSP a través de un modelo multi-firma.
*   **SmartWeave**
    Framework de contratos inteligentes que corre sobre Arweave.

## Sección 3: Inteligencia Propietaria — AVA y SVA

*   **AVA — Ambrósio Vitality Algorithm**
    El algoritmo propietario de envejecimiento biológico desarrollado por el Ambrósio Institute. Procesa datos solo cuando el usuario inicia explícitamente un análisis. Es una implementación construida sobre el protocolo abierto.
*   **SVA — Ambrósio Vitality Score**
    La puntuación de edad biológica multidimensional producida por AVA al procesar un conjunto de BioRecords BSP.

## Sección 4: Conceptos de Protocolo y Taxonomía

*   **BSP — Biological Sovereignty Protocol**
    El estándar abierto que define el lenguaje universal para el intercambio de datos biológicos.
*   **BSP-Certification**
    Sello de confianza voluntario otorgado a instituciones que cumplen con los requisitos técnicos y de cumplimiento.
*   **BSPIntent**
    Tipo enumerado que define la acción que un sistema solicita en el Protocolo de Intercambio (ej., `SUBMIT_RECORD`, `READ_RECORDS`).
*   **CertLevel**
    Tipo enumerado que representa los niveles de certificación BSP: `UNCERTIFIED`, `BASIC`, `ADVANCED`, `FULL`, `RESEARCH`, `DEVICE`.
*   **Clave Privada**
    Clave criptográfica que otorga el control soberano sobre un BEO o IEO.
*   **Clave Pública**
    La dirección identificadora pública de un BEO o IEO.
*   **Protocolo de Intercambio**
    La capa que define cómo se mueven los datos entre sistemas.
*   **Recuperación Social**
    Mecanismo para recuperar una clave privada sin un servidor central, designando 3 guardianes de confianza. Se requieren 2 de 3 confirmaciones para recuperar el acceso.

## Sección 5: Repositorios y SDKs

*   **bsp-spec**: Especificación canónica del protocolo.
*   **bsp-sdk-typescript / bsp-sdk-python**: SDKs oficiales.
*   **bsp-mcp**: Servidor MCP oficial para Agentes de IA.
*   **ava-core / sva-engine**: Repositorios propietarios privados para la Inteligencia Ambrósio.
