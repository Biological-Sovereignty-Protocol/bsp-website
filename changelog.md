---
title: Changelog
description: Version history of the Biological Sovereignty Protocol specification.
lang: en
---

# Changelog

Major releases of the BSP specification. For code-level changes, see the [GitHub releases](https://github.com/Biological-Sovereignty-Protocol/bsp-spec/releases).

## v2.1.0 — Current

**Cross-stack version alignment**

- SDK (TypeScript, Python), CLI, MCP server, and the `bsp-website` package
  itself now all share the `2.1.0` line. A BSP consumer can pin one major
  and know every client surface matches.
- Consolidated error catalog in `bsp-spec/docs/ERROR_CODES.md` — single
  source of truth across contracts (78 abort codes), API (31 HTTP/machine
  codes), and SDK/CLI/MCP client errors.

## v1.0.0

**Aptos + Arweave migration · MIT license · Public launch**

- Migrated execution layer to Aptos (Move smart contracts) for sub-second finality.
- Permanent storage layer on Arweave.
- Full open source release under MIT license.
- Biomarker taxonomy v1 — 210+ biomarkers across 4 levels (Core, Standard, Extended, Device).
- Governance charter — 2-of-3 multisig for protocol upgrades (see BIP-0001).
- SDKs: TypeScript, Python. CLI and MCP server released.

## v0.9.0

**Move rewrite**

- Smart contracts rewritten in Move.
- BEO, IEO, and ConsentToken modules separated into independent Move packages.
- Access control hardened with resource accounts.
- Exchange protocol v2 — bidirectional streaming for wearable data.

## v0.8.0

**Initial specification draft**

- First public draft of the BSP specification.
- Defined BEO, IEO, and BioRecord schemas.
- Introduced ConsentToken model.
- Initial taxonomy covering ~120 core biomarkers.
- Governance process (BIPs) formalized.

---

For upcoming releases, see the [roadmap](/roadmap).
