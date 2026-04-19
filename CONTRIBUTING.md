# Contributing to the Biological Sovereignty Protocol (BSP)

First off, thank you for considering contributing to the Biological Sovereignty Protocol! It's people like you who make this decentralized ecosystem a reality, ensuring human biological data remains sovereign, secure, and permanent.

## 🧬 Our Philosophy

The Biological Sovereignty Protocol is built on the belief that **individuals must have absolute cryptographic ownership of their clinical and biological history.** We build on Arweave (permanent storage) and AO (hyper-parallel compute) to guarantee this.

Whether you are fixing a typo in the documentation, building a new SDK feature, or proposing an entirely new Biomarker taxonomy standard, your contributions matter.

## 🌐 Website Contribution Scope

This repository (`bsp-website`) focuses on:
- **Protocol documentation** — architecture, concepts, design principles
- **Developer guides** — implementation paths, SDK references, tutorials
- **Community resources** — use cases, announcements, learning materials
- **BIP discussions** — Biological Improvement Proposals and governance
- **Accessibility** — translations (EN, PT, ES), mobile-first design

### 📝 What You Can Contribute

- **Documentation clarity** — improve guides, fix examples, add diagrams
- **Translations** — expand language support (`es/`, `pt/`)
- **Developer examples** — new SDK use cases or integration patterns
- **BIPs (Biological Improvement Proposals)** — propose taxonomies, protocol changes, or governance improvements
- **Design improvements** — UX/UI enhancements, accessibility fixes
- **Community content** — case studies, interviews, educational resources

## 🏗️ The Ecosystem Architecture

Before diving in, please familiarize yourself with the core pillars of the BSP ecosystem:

1. **[bsp-spec](https://github.com/Biological-Sovereignty-Protocol/bsp-spec)**: The formal specification of the protocol layers, biomarker taxonomy, and schemas.
2. **[bsp-contracts](https://github.com/Ambrosio-Institute/bsp-contracts)**: The Move smart contracts (Aptos) that implement the BEORegistry, IEORegistry, and AccessControl.
3. **[bsp-sdk-typescript](https://github.com/Biological-Sovereignty-Protocol/bsp-sdk-typescript)**: The TypeScript standard library for interacting with BSP identities and records.
4. **[bsp-registry-api](https://github.com/Ambrosio-Institute/bsp-registry-api)**: The protocol relayer for gas abstraction and off-chain notifications.
5. **[bsp-mcp](https://github.com/Biological-Sovereignty-Protocol/bsp-mcp)**: The Model Context Protocol integration bridging AI systems with sovereign biological data.

## 🤝 How to Contribute

### 1. Proposing a Change (Issues)
If you have an idea for improving documentation, adding a new guide, or proposing a BIP:
- **Check existing issues** to avoid duplication.
- **Open an issue** with your proposal, context, and motivation.
- **For BIPs:** Start with a discussion issue outlining the change type (Taxonomy, Protocol, Governance, Informational).

### 2. Submitting Pull Requests (Documentation & Content)

1. **Fork** the repository.
2. **Clone** your fork locally.
   ```bash
   git clone https://github.com/YOUR-USERNAME/bsp-website.git
   cd bsp-website
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Create a feature branch:**
   ```bash
   git checkout -b feat/improve-integration-guide
   ```
5. **Make your changes** — ensure clarity and accuracy.
   - For markdown: use headings, code blocks, and tables consistently.
   - For translations: update both source and target language files.
   - For BIPs: use the `BIP-XXXX.md` template from `bips/BIP-0000.md`.

6. **Test locally (VitePress):**
   ```bash
   npm run dev
   # Visit http://localhost:5173 and verify your changes
   ```

7. **Commit with descriptive messages:**
   ```bash
   git commit -m "docs: add TypeScript SDK integration example"
   ```

8. **Push and create a Pull Request:**
   ```bash
   git push origin feat/improve-integration-guide
   ```
   - Link any related issues.
   - Describe what changed and why.
   - For BIPs: ensure all sections from the template are complete.

### 3. Writing a BIP (Biological Improvement Proposal)

A BIP is a formal proposal to change the BSP specification, taxonomy, or governance.

**Types:**
- **BIP-T (Taxonomy)** — Add or modify biomarkers in the taxonomy
- **BIP-P (Protocol)** — Change schema, exchange protocol, or core structures
- **BIP-G (Governance)** — Modify voting, proposal process, or steering
- **BIP-I (Informational)** — Document best practices, historical information, etc.

**Process:**
1. **Review existing BIPs** in `bips/` to understand the format.
2. **Copy the template:** `bips/BIP-0000.md`
3. **Assign the next BIP number** (check the highest existing BIP).
4. **Fill in all sections:**
   - **Abstract** — What does this BIP propose?
   - **Motivation** — Why is it needed now?
   - **Specification** — Exactly what changes?
   - **Rationale** — Why this approach over alternatives?
   - **Backward Compatibility** — Will it break existing implementations?
   - **Evidence Summary** — For BIP-T and BIP-P, cite peer-reviewed references.
   - **Implementation Notes** — What needs to update (SDK, contracts, taxonomy version)?
   - **References** — All citations with DOI links.

5. **Submit as a PR** with title: `BIP-XXXX: [Title]`
6. **Comment Period:**
   - BIP-T (Taxonomy): 30 days minimum
   - BIP-P (Protocol): 90 days minimum
   - BIP-G (Governance): 120 days minimum

**Example BIPs to reference:** `bips/BIP-0001.md`, `bips/BIP-0002.md`

### 4. Translation Guidelines

Translations are maintained in language folders: `pt/`, `es/`, etc.

**For translators:**
- Create a parallel directory structure to English sources.
- Update the navbar config in `.vitepress/config.ts` to include your language.
- Ensure terminology consistency (create a glossary for technical terms).
- Test with `npm run dev -- --locale pt` to verify rendering.

## 🚨 Security & Integrity

Working with biological data means the stakes for privacy and security are incredibly high.

- **Never** commit API keys, private keys, or secrets. Use environment variables.
- **Never** hardcode personal health information in examples.
- **Validate references** before adding to documentation (especially biomarker ranges and evidence citations).
- **For security vulnerabilities in the protocol itself:** See [SECURITY.md](https://github.com/Biological-Sovereignty-Protocol/bsp-spec/blob/main/SECURITY.md) for private disclosure.

## 🛠️ Development Setup

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation & Running

```bash
# Clone and install
git clone https://github.com/Biological-Sovereignty-Protocol/bsp-website.git
cd bsp-website
npm install

# Local development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Linting and formatting (if applicable)
npm run lint
```

### Directory Structure
```
bsp-website/
├── .vitepress/          # VitePress configuration
├── public/              # Static assets
├── developers/          # Developer guides
├── specification/       # Protocol specification
├── bips/                # Biological Improvement Proposals
├── community.md         # Community hub
├── glossary.md          # Technical glossary
├── pt/                  # Portuguese translations
├── es/                  # Spanish translations
└── package.json
```

## 📚 Community & Support

- **GitHub Discussions** — [Ask questions and discuss architecture](https://github.com/orgs/Biological-Sovereignty-Protocol/discussions)
- **BSP Documentation** — [Full spec and guides](https://biologicalsovereigntyprotocol.com)
- **Ambrosio Institute** — [Protocol announcements and updates](https://ambrosio.institute)
- **Twitter** — [@SovereignBiology](https://twitter.com/ambrosio)

## ✅ Checklist Before Submitting a PR

- [ ] I have read the CONTRIBUTING guidelines
- [ ] My changes follow the style and structure of the repository
- [ ] I have tested my changes locally (`npm run dev`)
- [ ] For new pages: I have added them to `.vitepress/config.ts`
- [ ] For translations: I have updated all relevant language files
- [ ] For BIPs: I have used the template and filled all required sections
- [ ] I have cited sources properly (for scientific claims)
- [ ] I have not committed secrets, API keys, or sensitive data

## 📄 License

By contributing to this repository, you agree that your contributions will be licensed under the same license as the project (MIT for code, CC BY 4.0 for documentation).

---

**Thank you for making BSP better!** 🧬✨
