---
layout: doc
sidebar: false
outline: deep
title: "**BSP** Whitepaper"
---


<div class="whitepaper-hero">
  <div class="wp-badge">v 1.0</div>
  <h1>Protocolo de Soberania Biológica<br><span class="wp-subtitle">Whitepaper Oficial</span></h1>
  <p class="wp-tagline">O protocolo que dá a cada humano soberania permanente sobre sua própria biologia.</p>
  <div class="wp-meta">
    <span>Publicado pelo Instituto Ambrósio</span>
    <span class="wp-divider">•</span>
    <a href="https://biologicalsovereigntyprotocol.com" target="_blank">biologicalsovereigntyprotocol.com</a>
  </div>
</div>

---

## O que é o Protocolo de Soberania Biológica (**BSP**)?

O sistema global de saúde é construído sobre uma falha estrutural fundamental: os indivíduos não são proprietários dos seus próprios dados biológicos. Registros médicos pertencem a hospitais. Resultados de laboratório pertencem a laboratórios. Dados de wearables pertencem a empresas de tecnologia.

O **Protocolo de Soberania Biológica (**BSP**)** é um padrão aberto que muda isso no nível da infraestrutura. O **BSP** define uma linguagem universal para a troca de dados de saúde e longevidade — um formato comum que qualquer laboratório, dispositivo wearable, plataforma de saúde, serviço de telemedicina ou motor de inteligência artificial pode implementar.

Uma vez implementado, os dados deixam de viver em silos e passam a viver onde pertencem: com o indivíduo.

### Por que o **BSP** é importante?

*   **Indivíduos**: A pessoa detém a chave privada para sua própria biologia. Nenhuma empresa pode excluí-la, movê-la ou restringir o acesso a ela.
*   **Desenvolvedores e Plataformas**: Ao tornar o padrão aberto e gratuito para implementação, o valor da adoção aumenta com cada novo participante. O protocolo cria uma rede onde o compartilhamento de dados é estruturalmente benéfico — não um risco competitivo.
*   **Motores de IA**: A inteligência artificial tem o potencial de revolucionar a medicina preventiva — mas apenas se puder acessar dados biológicos estruturados e padronizados em escala. O **BSP** cria a infraestrutura de dados que os sistemas de saúde impulsionados por IA precisam.

### O Problema

Para entender por que o **BSP** existe, você deve primeiro entender o que está quebrado — e por que permaneceu quebrado por tanto tempo.

#### A Crise da Fragmentação
Cada empresa de saúde — cada laboratório, cada hospital, cada plataforma — construiu um silo proprietário. A consequência é que os dados biológicos que deveriam acumular valor ao longo de uma vida são, em vez disso, perdidos, fragmentados e presos em formatos que servem às instituições, não aos indivíduos.

#### A Falha da Soberania
Você é o sujeito de todos esses dados. Você não é o seu proprietário. O **BSP** resolve isso tornando o indivíduo a âncora do sistema de dados. Cada pedaço de dado biológico é anexado a um Objeto de Entidade Biológica (**BEO**) — uma identidade permanente e descentralizada que pertence ao indivíduo.

#### A Lacuna de Preparação para IA
Os motores de IA de longevidade mais avançados do mundo são treinados em conjuntos de dados proprietários e em silos. O **BSP** cria a infraestrutura de dados que os sistemas de saúde impulsionados por IA precisam.

#### O Imperativo Científico
Sua idade biológica — o estado funcional de seus órgãos, sistema imunológico e maquinaria celular — é o que realmente determina seu risco de doença, níveis de energia e expectativa de vida restante. O **BSP** é a infraestrutura que torna essa nova medicina possível em escala.

### Comece a Construir

<div class="vp-doc">
  <ul>
    <li><a href="/architecture">Learn the architecture and core concepts of **BSP**</a></li>
  </ul>
</div>

---

## Biological Entity Object (**BEO**)

"The sovereign biological identity of a human being. The anchor point for all measured life."

### Overview - What is a **BEO**?
The **BEO** is the foundation of the entire **BSP** ecosystem. It represents a living human being — the sovereign owner of their biological data. All of a person's **BioRecords** are anchored to it. All ConsentTokens that authorize access are issued from it. 

A **BEO** is the permanent, sovereign identity of a human in the **BSP** ecosystem. It is created by the individual directly on Arweave, without approval from any authority. Once created, it belongs to the holder forever.

#### **BEO** vs **IEO** — Fundamental Distinction

| Feature | **BEO** — Biological Entity Object | **IEO** — Institutional Entity Object |
|---------|----------------|----------------|
| **Represents** | A living human being | An organization, system, or professional |
| **Created by** | The individual — no approval required | Any institution — directly |
| **Transferable** | Never — permanent individual identity | Yes — on company acquisition or merger |
| **Can read BEOs** | Own data only | Never without valid consent token |
| **Can write **BioRecords**** | Cannot — humans observe, not record | Yes — with active ConsentToken |
| **Domain format** | `firstname.bsp` | `institutionname.bsp` |
| **Cost** | Free — sovereignty is a right | Paid — annual certification fee |
| **Revocable by** | Individual only | Institute can revoke for violations |

### Cryptographic Identity — The **BEO** Keys
**BEO** control is entirely determined by the possession of the private key.

*   `private_key`: Ed25519 format. Generated locally. Never transmitted. Used to sign authorizations, decrypt records, and sign Arweave transactions.
*   `public_key`: Registered in the BEORegistry on Arweave. Used to identify the target **BEO** and encrypt data before submission.
*   `seed_phrase`: 24 BIP-39 words. Mnemonic representation of the private key.

#### Social Recovery
The **BEO** functions normally without guardians, but users can configure Social Recovery at any time.

*   **Guardians**: Up to 3 trusted contacts. No guardian has access to the **BEO**'s data. Each receives a cryptographic fragment of the recovery key.
*   **Threshold**: Minimum of 2 guardians needed to authorize recovery (Padrão **BSP**: 2-of-3).
*   **Mechanism**: Shamir Secret Sharing is used. Fragments are encrypted with the guardian's public key and stored on Arweave.

### Schema
The **BEO** is a structured object managed by the `BEORegistry` smart contract on Arweave.

```json
{
  "beo_id": "uuid",
  "domain": "andre.bsp",
  "public_key": "ed25519_key",
  "records": [],
  "record_count": 0,
  "access_control": {
    "active_consents": [],
    "revoked_consents": [],
    "default_policy": "DENY_ALL"
  },
  "recovery": {
    "guardians": [],
    "threshold": 2
  },
  "status": "ACTIVE"
}
```

### Smart Contracts — **BEO** Operations

The **BEO** is governed by two smart contracts on Arweave:

#### BEORegistry
*   `createBEO()`: Creates a new **BEO** and registers the `.bsp` domain.
*   `getBEO()`: Reads public metadata of a **BEO**.
*   `updateRecovery()`: Updates guardian configuration (requires private key signature).
*   `rotateKey()`: Replaces the public key after Social Recovery.
*   `lockBEO()` / `unlockBEO()`: Temporarily locks/unlocks the **BEO**.

#### AccessControl
*   `issueToken()`: Issues a ConsentToken for a specific **IEO**.
*   `revokeToken()`: Immediately revokes a ConsentToken.
*   `verifyToken()`: Verifies if a ConsentToken is valid for a specific operation.
*   `listActiveTokens()`: Lists all active ConsentTokens.
*   `getTokenHistory()`: Returns the full history of issued, expired, and revoked tokens.

> [!IMPORTANT]
> `issueToken()` and `revokeToken()` are exclusively reserved for the **BEO** holder. No institution — not even the Ambrósio Institute — can grant or revoke access to a person's data.

---

## Institutional Entity Object (**IEO**)

"Every institution that touches human biology needs a language to speak it."

### Overview - What is an **IEO**?
The Institutional Entity Object (**IEO**) represents any organization, system, or professional that interacts with biological data on behalf of, or with the consent of, a **BEO** holder.

Every institution in the ecosystem — from a national hospital chain to a wearable device manufacturer — is an **IEO**. It establishes cryptographic identity, defines capabilities, and encodes certification status. Creating an **IEO** is open to any institution. Obtaining **BSP** Certification is voluntary, but unlocks meaningful benefits.

### **IEO** Types
Each **IEO** type represents a distinct category with specific capabilities, restrictions, and certification pathways.

#### Laboratory (LAB)
Clinical and diagnostic laboratories. They are the primary source of **BioRecords**.
*   **Authorized levels**: L2 Standard (default), L1 Core/L3 Extended (advanced).
*   **Can READ BEOs**: Never — submission is strictly write-only.
*   **Domain**: `institutionname.bsp` (e.g., `fleury.bsp`).

#### Hospital & Health System (HSP)
Hospitals and integrated care providers. They generate data across clinical domains.
*   **Authorized levels**: L1 Core + L2 Standard (default).
*   **Can READ BEOs**: Only with active, time-limited consent token.
*   **Physicians**: May credential physicians under the hospital **IEO** (`dr.silva@hcor.bsp`).

#### Wearable & Device (WRB)
Hardware and software companies producing continuous monitoring systems.
*   **Authorized levels**: L4 Device (`BSP-DV`) exclusively.
*   **Submission frequency**: Daily consolidated records per user (no second-by-second spam).
*   **Can READ BEOs**: Never. Devices produce data; they do not consume it.
*   **SDK**: Must use the official **BSP** Device SDK for automated daily batch submission.

#### Physician & Practitioner (PHY)
Licensed physicians, specialists, and health practitioners.
*   **Primary function**: `READ_RECORDS` to interpret existing data.
*   **Write capabilities**: Can only submit clinical assessment **BioRecords** (`BSP-CL`).
*   **Consent model**: Time-limited and scope-limited tokens only (e.g., 30 days, `BSP-LA` only).

#### Health Insurer (INS)
Health insurance companies and managed care organizations. They operate under the most restrictive access model.
*   **Read access**: Aggregate anonymized data only. No individual BEOs.
*   **Individual access**: Only with explicit ongoing opt-in consent; receives ****SVA** score only**, no raw data.
*   **Prohibited use**: Cannot use **BSP** data for underwriting decisions or coverage denial.

#### Research Institution (RES)
Universities, research centers, and clinical trials.
*   **Data access**: Anonymized aggregate with explicit opt-in.
*   **BIP Contribution**: Required for **BSP** Research Partner status.
*   **Publication**: Open access publication of **BSP**-derived findings.

#### Platform & AI System (PLT)
Digital health platforms, telemedicine, and AI systems (like **AVA**).
*   **Primary function**: `ANALYZE_VITALITY` and `REQUEST_SCORE` intents.
*   **Read access**: With persistent, refreshable user consent.
*   **Write access**: Cannot write **BioRecords** — platforms interpret, not measure.

### Permission Matrix

| Action | LAB | HOSP | WEAR | PHY | INS | RES |
|--------|-----|------|------|-----|-----|-----|
| Submit **BioRecords** | ✅ | ✅ | ✅ | ✅* | — | — |
| Read own submissions | — | — | — | — | — | — |
| Read **BEO** (with token) | — | ✅ | — | ✅ | — | — |
| Aggregate anonymized | — | — | — | — | ✅* | ✅ |
| Analyze vitality (**AVA**) | — | — | — | ✅ | — | — |
| Request **SVA** score | — | — | — | ✅ | ✅* | — |
| Issue consent tokens | — | — | — | — | — | — |
| Revoke consent tokens| — | — | — | — | — | — |

*\* PHY may only submit clinical assessment records. INS may only access **SVA** score with opt-in.*

### Public **IEO** Registry & Certification
Every active **IEO** is listed in the ****BSP** Public Registry** — a transparent, on-chain record queryable by anyone. Users can verify an institution's claims before granting consent.

Certified institutions receive an embeddable **Certification Badge** that links directly to their live on-chain registry entry. It cannot be spoofed.

The `IEORegistry` smart contract handles **IEO** creations (free and open) and certification updates (managed by the Institute).

---

## The Ecosystem Flow

"From first access to Vitality Score — the complete journey of the developer and the user through the **BSP** repositories."

This document explains step-by-step how the **BSP** ecosystem operates in practice. The two protagonists are the **Developer** (who builds on the protocol) and the **User** (who lives under its protection). Both paths intersect at the **BEO** (Biological Entity Object).

<EcosystemFlowMcp />

### Part 1: The Developer's Journey
How a laboratory, app, or platform enters the **BSP** ecosystem:

1.  **Understand the Protocol (`bsp-spec`)**: A developer accesses the public **BSP** specification. They learn what a **BEO** is and how the Exchange Protocol works. No registration or approval is needed.
2.  **Install the SDK (`bsp-sdk`)**: Whether building in Python or TypeScript, the developer installs the SDK (e.g., `pip install bsp-sdk`). They can immediately start structuring data into valid, sovereign **BioRecords**.
3.  **Request Authorization**: The lab wants to submit data. They use the SDK to ask the user for authorization. The user signs a ConsentToken on-chain. Without this, the Arweave blockchain automatically rejects the transaction.
4.  **Connect AI Agents (`bsp-mcp`)**: A health platform wants their AI to read the **BEO**. They install `bsp-mcp` (the official Model Context Protocol server for **BSP**), allowing AIs like Claude to query biological data — strictly under the user's consent.

### Part 2: The User's Journey
From the perspective of a person living within the ecosystem:

1.  **Identity Creation (`bsp-contracts`)**: The first time you use a **BSP** app, your **BEO** is created. Keys are generated locally. The address (e.g., `andre.bsp`) belongs to you forever.
2.  **Data Arrival (`bsp-sdk` + Arweave)**: You do a blood test. The laboratory formats the data as **BioRecords** and sends them. Because you authorized the lab, the data is encrypted with your key and stored permanently on Arweave.
3.  **Vitality Analysis (`ava-core`)**: You open your app and actively request an analysis. The app decrypts the **BioRecords** locally and sends them to the **AVA** intelligence engine (with session consent). **AVA** processes the data.
4.  **The Final Product (`sva-engine`)**: You receive your Ambrósio Vitality Score (**SVA**) — a multi-dimensional biological age score showing where you are winning and where you need to act.
5.  **AI Assistant (`bsp-mcp`)**: You ask your AI healthcare assistant about your results. Through the MCP connection, the AI reads your sovereign data and provides deeply contextualized medical insights.

### Where Paths Cross: The Repository Roles

| Repository | Who Uses It | Purpose |
|------------|-------------|---------|
| `bsp-spec` | Devs, Labs, Auditors | The public law of the protocol. |
| `bsp-sdk` | App & Backend Devs | The builder's tools (Python/TypeScript). |
| `bsp-mcp` | AI Platforms | Connects AI agents to the protocol with consent. |
| `bsp-contracts` | Ambrósio Institute | Smart contracts on Arweave (identities live here). |
| `ava-core` | Ambrósio Institute | Proprietary intelligence (processes **BioRecords**). |
| `sva-engine` | Ambrósio Institute | Produces the Vitality Score for the user. |

### Why is it designed this way?

*   **Why is the protocol open?** Because a closed standard is just a product. If **BSP** required approval to create a **BEO**, the Institute would be a bottleneck.
*   **Why does consent replace certification as the gatekeeper?** Because an on-chain signature is mathematically verifiable; it doesn't require trusting an institution. Certification is a badge of trust, not the key to the door.
*   **Why is the intelligence (**AVA**) closed?** The competitive advantage of the Institute is not the protocol itself, but the intelligence applied to the standardized data flowing through it.
*   **Why does **AVA** never have passive access?** Because true sovereignty means no system analyzes your data unless you ask it to.

---

## ConsentToken & AccessControl

"Consent is not a privacy policy. It is a mathematical instruction recorded on the blockchain."

### Overview
The **BSP** consent system makes biological sovereignty a technical reality. It defines how a **BEO** holder authorizes other systems to interact with their biological data with surgical precision over what can be accessed, by whom, and for how long.

The central instrument is the **ConsentToken** — a cryptographic authorization issued by the `AccessControl` smart contract on Arweave after the holder signs it with their private key.

Without a valid ConsentToken, no data operation is possible. The gatekeeper is the individual, not the Ambrósio Institute.

### The ConsentToken Schema

```json
{
  "token_id": "uuid",
  "beo_id": "uuid",
  "ieo_id": "uuid",
  "granted_at": "ISO8601",
  "expires_at": "ISO8601 | null",
  "scope": {
    "intents": ["SUBMIT_RECORD", "READ_RECORDS"],
    "categories": ["**BSP**-LA", "**BSP**-CV"],
    "levels": ["CORE", "STANDARD"],
    "period": { "from": null, "to": null },
    "max_records": 100
  },
  "revocable": true,
  "owner_signature": "ed25519_signature"
}
```

#### Scope Properties
*   **intents**: The actions the **IEO** is authorized to perform (e.g., `READ_RECORDS`, `ANALYZE_VITALITY`).
*   **categories**: Which **BSP** categories are accessible. Limiting this ensures a hematology lab cannot access neurology data (`BSP-NR`).
*   **levels**: Which taxonomy levels are accessible.
*   **period**: The historical time window of data the **IEO** can see.

### Standard Token Types by Relationship

| Relationship | Default Duration | Intents | Scope | Renewal |
|--------------|------------------|---------|-------|---------|
| **User → Laboratory** | Single use / Permanent | `SUBMIT_RECORD` | Lab-specific | Revocation only |
| **User → Physician** | 30–90 days | `READ_RECORDS` | Selected categories | Manual |
| **User → **AVA**/PLT** | Permanent | `ANALYZE_VITALITY`, `REQUEST_SCORE` | All categories | Annual refresh |
| **User → Wearable** | Permanent | `SUBMIT_RECORD` | `BSP-DV` only | Revocation only |
| **User → Insurer** | 12 months | `REQUEST_SCORE` | **SVA** score only | Annual opt-in |

#### Principle of Least Privilege
**BSP** adopts the principle of least privilege: each ConsentToken must contain only the intents, categories, and periods strictly necessary for the stated purpose.

### Revocation
Revocation is the most important right of the **BEO** holder. **Any ConsentToken can be revoked at any time, with immediate on-chain effect.**

*   `revokeToken(token_id)`: Revokes a specific token.
*   `revokeAllFromIEO(ieo_id)`: Revokes all tokens from a specific institution.
*   `revokeAllTokens()`: Emergency switch to revoke everything.

The moment a token is revoked, the `AccessControl` contract records `revoked_at`. From that second onward, any operation attempting to use that token will fail immediately with `TOKEN_REVOKED`. The institution is not notified automatically; they discover it when access is blocked.

---

## Keys, Blockchain & Access

"How users, laboratories, and systems connect to the ecosystem decentralized — without a central server, without an intermediary, without prior permission."

### Part 1: The Foundation — Cryptographic Keys

**BSP** is built on a simple principle: **no central authority controls access to your biological data. You do.** Control is exercised entirely through cryptographic keys.

#### The Key Pair
*   **Public Key**: Your address in the **BSP** ecosystem (e.g., `andre.bsp`). Shared freely with labs and systems to identify your **BEO**.
*   **Private Key**: Your control key. Never leaves your device. Never sent to any server. Used to sign authorizations and decrypt your data. Without it, no one accesses your **BEO**.

#### Analogy: Crypto Wallet
Like a Bitcoin address, your public key receives data (**BioRecords**). Your private key authorizes transactions (ConsentTokens). Unlike banks, if you permanently lose your private key without backups, you lose access to your data forever. 

#### Social Recovery
To mitigate loss risks, users can set up 3 trusted **Guardians**. 
Using Shamir Secret Sharing, fragments of the recovery key are encrypted to the guardians' public keys. If a user loses their device, any 2 of the 3 guardians can confirm their identity to authorize a Key Rotation, restoring access without any central server involvement.

### Part 2: Arweave — Permanent Storage

**BSP** uses **Arweave**, a permanent storage blockchain. 

*   **Traditional DBs**: Run by central servers. If the company closes, the data dies.
*   **Arweave**: Pay once, store forever. A decentralized network of nodes ensures no company, government, or even the Ambrósio Institute can delete or alter the data. 

If the Ambrósio Institute ceases to exist in 50 years, the BEOs, **BioRecords**, and Smart Contracts continue executing on Arweave seamlessly. Sovereign data truly outlives its creators.

### Part 3: Smart Contracts — Immutable Rules

Every major action on a **BEO** generates a permanent transaction on Arweave. The Arweave chain **accumulates** transactions, it never overwrites them.

Relevant contracts include:
*   **BEORegistry**: Creates and manages BEOs (open to anyone). Defines the "current" state of a **BEO** by resolving the most recent valid transactions.
*   **IEORegistry**: Manages **BSP**-Certified institutions.
*   **DomainRegistry**: Manages the `.bsp` namespace.
*   **AccessControl**: The true gatekeeper. Verifies `ConsentTokens` globally.

### Part 4: The MCP Model Applied to **BSP**

The Anthropic Model Context Protocol (MCP) lets anyone create an MCP Server or Client without Anthropic's approval. Safety comes from the user actively consenting to which servers the assistant can access.

**BSP** follows the exact same logic.
*   Anyone can create a **BEO**, or an **IEO** to submit data.
*   The sole gatekeeper is the individual's **ConsentToken** in the `AccessControl` contract.

#### Flow Examples
*   **The User**: Opens app -> Generates keys locally -> Creates **BEO** on Arweave -> Receives `.bsp` domain -> Authorizes labs.
*   **The Lab (Certified or not)**: Installs `bsp-sdk` -> Requests authorization -> Submits encrypted **BioRecords** to Arweave.
*   **The **AVA** (Intelligence)**: User opens app -> App decrypts records locally -> User explicitly requests analysis from **AVA** -> **AVA** processes data and returns **SVA** Score -> Ambrósio Institute discards raw data after processing.

---

