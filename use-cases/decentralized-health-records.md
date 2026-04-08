---
title: "Decentralized Health Records | BSP"
description: "BSP uses Arweave and AO processes to create truly permanent, decentralized health records. No central server, no single point of failure."
---

# Decentralized Health Records That Last Forever

Decentralized health records aren't a new idea. The hard part is permanence. Most implementations still rely on nodes that can go offline, organizations that can shut down, or consensus mechanisms that require ongoing economic incentives to keep running.

BSP takes a different approach: write once, persist forever.

## Why Existing Systems Fall Short

**Blockchain health data** projects from the last decade share a structural weakness — they depend on active network participation. Validators need incentives. Nodes need operators. When the token economics collapse or the founding team dissolves, the network degrades.

**IPFS-based systems** are only as durable as the pinning services that keep files available. If no one pays to pin your data, it disappears from the network. "Decentralized" becomes a marketing claim, not a technical guarantee.

**Hospital EHR systems** are the baseline most people deal with: centralized, siloed, non-interoperable by design. Your records live in Epic, Cerner, or a local system — accessible only through that system's interface, exported (if at all) in non-standard formats.

The result is fragmented data, fragile infrastructure, and zero individual sovereignty.

## How Arweave and AO Change the Equation

BSP anchors health records on **Arweave** — a protocol built specifically for permanent, low-cost data storage. The economic model is a one-time endowment: pay once, store forever. There are no recurring fees, no renewal requirements, no dependency on continued participation by any party.

The permanence guarantee is structural. Data written to Arweave is replicated across a network of miners incentivized to store it for 200+ years by the protocol's cryptographic endowment mechanism. Nothing in the BSP network needs to "stay alive" for your data to persist.

**AO processes** add hyper-parallel compute on top of this permanent layer. BSP uses AO to manage:

- **Access control** — who can read which portions of a health record, and under what conditions
- **Consent tokens** — time-bounded, cryptographically enforced authorizations that don't depend on any API remaining operational
- **Audit trails** — immutable logs of every access event, attached to the record itself

The combination gives you a health record that is simultaneously permanent, private, and auditable — without any of those properties depending on trusting a third party.

## The BSP Record Structure

A BSP health record is a **BEO** (Biological Entity Object): a JSON document conforming to BSP's open schema, signed with the owner's private key, and written to Arweave.

Key structural properties:

- **Self-describing** — each record includes schema version, data type taxonomy codes, and provenance metadata
- **Composable** — BEOs can reference other BEOs, enabling linked records (e.g., a lab result linked to the order, linked to the provider IEO)
- **Portable** — the format is open and documented; any compliant reader can interpret any BSP record
- **Verifiable** — cryptographic signatures allow any party to confirm the record's integrity and origin without contacting a central authority

## Interoperability Without a Central Registry

Traditional interoperability requires a hub: a central registry that maps patient identities across systems. BSP replaces the hub with a key: your cryptographic identity is the universal identifier.

Any institution implementing BSP can write records to your BEO (with your consent) and read records from it (with your authorization). No central clearinghouse. No national patient identifier required. No federated login system that can be compromised.

This design also makes the system resilient to jurisdiction fragmentation. Your records exist on Arweave regardless of which country's regulations apply to any given institution.

---

[Read the Architecture](/architecture/ecosystem-flow) | [See the BEO Schema](/specification/beo) | [Get Started](/getting-started/intro)
