# Perguntas Frequentes (FAQ)

Bem-vindo ao FAQ do Protocolo de Soberania Biológica (BSP). Aqui, respondemos às perguntas mais comuns sobre o protocolo, soberania de dados, identidade e o motor de inteligência.

---

## 1. Princípios Básicos

### O que é o Protocolo de Soberania Biológica (BSP)?
O Protocolo de Soberania Biológica é um padrão aberto e descentralizado que define uma linguagem universal para a troca de dados de saúde e longevidade humana. Ele garante que os dados biológicos — exames de sangue, métricas de wearables, dados genômicos — pertençam permanentemente ao indivíduo, e não a hospitais, laboratórios ou plataformas de tecnologia.

### Quem é o dono do BSP?
Ninguém. O BSP é um protocolo aberto, muito parecido com o HTTP ou SMTP. O **Ambrósio Institute** atua como Guardião do padrão, mantendo a especificação e liderando o processo de governança aberta (Propostas de Melhoria BSP - BIPs), mas não é dono do protocolo ou dos dados nele contidos.

### Qual a diferença entre BSP e AVA?
- **BSP (O Protocolo):** A linguagem aberta. Define como os dados são estruturados, trocados e protegidos.
- **AVA (A Inteligência):** O Algoritmo de Vitalidade Ambrósio. É o motor de inteligência proprietário construído pelo Ambrósio Institute que lê os dados BSP para gerar insights de longevidade e o Score de Vitalidade Ambrósio (SVA).

---

## 2. Identidade Biológica e Soberania

### O que é um BEO (Biological Entity Object)?
Um BEO é a sua identidade biológica soberana e permanente. É um objeto criptográfico ancorado na blockchain descentralizada Arweave. Todos os seus dados de saúde padronizados (BioRecords) estão anexados ao seu BEO.

### Preciso de permissão para criar um BEO?
Não. Qualquer um pode criar um BEO usando o SDK aberto do BSP ou qualquer aplicativo compatível com o BSP. É totalmente gratuito e não requer aprovação do Ambrósio Institute ou de qualquer autoridade governamental.

### Onde meus dados são armazenados?
Seu BEO e BioRecords são armazenados permanentemente no **Arweave**, uma rede de armazenamento descentralizado projetada para preservar dados por centenas de anos. Isso garante que seu histórico biológico não possa ser excluído ou perdido se uma empresa falir.

### Quem pode ver meus dados?
Apenas você e as instituições que você autorizar explicitamente. Todos os BioRecords são criptografados com sua chave pública antes de serem armazenados. Eles só podem ser descriptografados usando a chave privada que reside exclusivamente em seu dispositivo pessoal. O próprio Ambrósio Institute não pode acessar seus dados sem o seu consentimento.

---

## 3. Segurança e Consentimento

### Como meus dados são protegidos?
O controle do seu BEO é determinado por uma **chave privada (Ed25519)** armazenada com segurança no cofre de hardware do seu dispositivo (ex: Apple Secure Enclave). As regras de controle de acesso (ConsentTokens) são executadas como processos AO no Arweave, tornando-as matematicamente imunes a desvios não autorizados.

### O que acontece se eu perder meu celular ou minha chave privada?
Se você perder seu dispositivo, você tem duas maneiras de recuperar seu BEO:
1. **Seed Phrase:** A frase de backup de 24 palavras que você recebeu durante a criação.
2. **Recuperação Social (Social Recovery):** Se você ativou o sistema de Recuperação Social, você pode pedir aos seus 3 "Guardiões" designados (amigos de confiança, médicos ou plataformas) para aprovar sua recuperação. Requer um consenso de 2 em 3 para restaurar o acesso com segurança.

### Posso revogar o acesso de uma instituição?
Sim. Você detém o poder supremo. Com um único toque em um aplicativo compatível com o BSP, você pode revogar instantaneamente um **ConsentToken**. O contrato inteligente rejeitará imediatamente quaisquer novas tentativas de leitura/gravação daquela instituição.

---

## 4. Ecossistema e Certificação

### Os laboratórios precisam pagar para usar o BSP?
Não. Ler a especificação, instalar o `bsp-sdk` e enviar BioRecords (com o consentimento do paciente) é totalmente gratuito e aberto.

### O que é a Certificação BSP?
Embora o protocolo seja aberto a qualquer laboratório, a **Certificação BSP (BSP-1 a BSP-4)** é uma marca voluntária de qualidade emitida pelo Ambrósio Institute. Instituições certificadas passam por auditoria técnica, recebem um selo verificado na rede, e seus dados são considerados confiáveis o suficiente para alimentar diretamente o motor de inteligência AVA.

---

## 5. Desenvolvimento e Contribuições

### Sou um desenvolvedor. Por onde começo?
Acesse o [Início Rápido para Desenvolvedores](/pt/getting-started/quickstart) para instalar o SDK em TypeScript ou Python (`bsp-sdk` ou `bsp-sdk`). Você pode começar a enviar BioRecords padronizados para o seu próprio BEO em minutos.

### Como novos biomarcadores são adicionados ao protocolo?
A taxonomia de biomarcadores BSP é aprimorada através do processo **BIP (BSP Improvement Proposal)**. Qualquer pesquisador ou médico no mundo pode propor a inclusão de um novo marcador biológico enviando um BIP formal em nosso repositório público no GitHub. As propostas são revisadas trimestralmente pelo Conselho Científico do Ambrósio Institute.
