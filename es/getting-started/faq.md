# Preguntas Frecuentes (FAQ)

Bienvenido al FAQ del Protocolo de Soberanía Biológica (BSP). Aquí abordamos las preguntas más comunes sobre el protocolo, la soberanía de los datos, la identidad y el motor de inteligencia.

---

## 1. Principios Básicos

### ¿Qué es el Protocolo de Soberanía Biológica (BSP)?
El Protocolo de Soberanía Biológica es un estándar abierto y descentralizado que define un lenguaje universal para el intercambio de datos de salud y longevidad humana. Garantiza que los datos biológicos —análisis de sangre, métricas de wearables, datos genómicos— pertenezcan permanentemente al individuo, en lugar de a hospitales, laboratorios o plataformas tecnológicas.

### ¿Quién es el dueño del BSP?
Nadie. El BSP es un protocolo abierto, muy parecido a HTTP o SMTP. El **Ambrósio Institute** actúa como Guardián del estándar, manteniendo la especificación y liderando el proceso de gobernanza abierta (Propuestas de Mejora BSP - BIPs), pero no es dueño del protocolo ni de los datos contenidos en él.

### ¿Cuál es la diferencia entre BSP y AVA?
- **BSP (El Protocolo):** El lenguaje abierto. Define cómo se estructuran, intercambian y aseguran los datos.
- **AVA (La Inteligencia):** El Algoritmo de Vitalidad Ambrósio. Es el motor de inteligencia propietario construido por el Ambrósio Institute que lee datos BSP para generar insights de longevidad y el Score de Vitalidad Ambrósio (SVA).

---

## 2. Identidad Biológica y Soberanía

### ¿Qué es un BEO (Biological Entity Object)?
Un BEO es su identidad biológica soberana y permanente. Es un objeto criptográfico anclado en la blockchain descentralizada Arweave. Todos sus datos de salud estandarizados (BioRecords) están adjuntos a su BEO.

### ¿Necesito permiso para crear un BEO?
No. Cualquiera puede crear un BEO utilizando el SDK abierto de BSP o cualquier aplicación compatible con BSP. Es completamente gratuito y no requiere aprobación del Ambrósio Institute ni de ninguna autoridad gubernamental.

### ¿Dónde se almacenan mis datos?
Su BEO y BioRecords se almacenan permanentemente en **Arweave**, una red de almacenamiento descentralizado diseñada para preservar datos durante cientos de años. Esto asegura que su historial biológico no pueda ser eliminado o perdido si una empresa quiebra.

### ¿Quién puede ver mis datos?
Solo usted, y las instituciones que autorice explícitamente. Todos los BioRecords se encriptan con su clave pública antes de ser almacenados. Solo pueden ser desencriptados utilizando la clave privada que reside exclusivamente en su dispositivo personal. El propio Ambrósio Institute no puede acceder a sus datos sin su consentimiento.

---

## 3. Seguridad y Consentimiento

### ¿Cómo se aseguran mis datos?
El control de su BEO está determinado por una **clave privada (Ed25519)** almacenada de forma segura en el enclave de hardware de su dispositivo (ej: Apple Secure Enclave). Las reglas de control de acceso (ConsentTokens) se ejecutan como contratos SmartWeave en la blockchain, haciéndolos matemáticamente inmunes a accesos no autorizados.

### ¿Qué pasa si pierdo mi teléfono o mi clave privada?
Si pierde su dispositivo, tiene dos formas de recuperar su BEO:
1. **Frase Semilla (Seed Phrase):** La frase de respaldo de 24 palabras que recibió durante la creación.
2. **Recuperación Social (Social Recovery):** Si habilitó el sistema de Recuperación Social, puede pedir a sus 3 "Guardianes" designados (amigos de confianza, médicos o plataformas) que aprueben su recuperación. Requiere un consenso de 2 sobre 3 para restaurar el acceso de forma segura.

### ¿Puedo revocar el acceso de una institución?
Sí. Usted tiene el poder absoluto. Con un solo toque en una aplicación compatible con BSP, puede revocar instantáneamente un **ConsentToken**. El contrato inteligente rechazará de inmediato cualquier intento adicional de lectura/escritura de esa institución.

---

## 4. Ecosistema y Certificación

### ¿Los laboratorios necesitan pagar para usar BSP?
No. Leer la especificación, instalar el `bsp-sdk` y enviar BioRecords (con el consentimiento del paciente) es totalmente gratuito y abierto.

### ¿Qué es la Certificación BSP?
Aunque el protocolo está abierto a cualquier laboratorio, la **Certificación BSP (BSP-1 a BSP-4)** es una marca de calidad voluntaria emitida por el Ambrósio Institute. Las instituciones certificadas se someten a auditorías técnicas, reciben una insignia verificada on-chain y sus datos se consideran lo suficientemente confiables como para alimentar directamente el motor de inteligencia AVA.

---

## 5. Desarrollo y Contribuciones

### Soy desarrollador. ¿Por dónde empiezo?
Diríjase al [Inicio Rápido para Desarrolladores](/es/getting-started/quickstart) para instalar el SDK de TypeScript o Python (`bsp-sdk` o `bsp-sdk`). Puede comenzar a enviar BioRecords estandarizados a su propio BEO en minutos.

### ¿Cómo se agregan nuevos biomarcadores al protocolo?
La taxonomía de biomarcadores BSP se mejora a través del proceso **BIP (BSP Improvement Proposal)**. Cualquier investigador o médico del mundo puede proponer la inclusión de un nuevo marcador biológico enviando un BIP formal en nuestro repositorio público de GitHub. Las propuestas son revisadas trimestralmente por el Consejo Científico del Ambrósio Institute.
