import { HASSANE_PROFILE } from "../constants/portfolioData";

export function detectIsEnglish(text: string): boolean {
  const lower = text.toLowerCase();
  const tokens = lower.split(/[\s,?.!;:'"()]+/);
  const enWords = new Set([
    "hello", "hi", "hey", "how", "what", "who", "price", "cost", "project", 
    "service", "skill", "contact", "experience", "hire", "work", "where", 
    "can", "tell", "download", "resume", "cv", "is", "the", "your", "my"
  ]);
  const frWords = new Set([
    "bonjour", "salut", "coucou", "qui", "quel", "quelle", "comment", "tarif", 
    "prix", "projet", "service", "compétence", "competence", "contacter", "contact", 
    "expérience", "experience", "devis", "travail", "où", "ou", "peux-tu", "dis-moi", 
    "cv", "telecharger", "télécharger", "est", "son", "sa", "ses", "le", "la", "les", 
    "numéro", "numero", "téléphone", "telephone", "pourquoi"
  ]);

  let enScore = 0;
  let frScore = 0;

  for (const t of tokens) {
    if (enWords.has(t)) enScore++;
    if (frWords.has(t)) frScore++;
  }

  return enScore > frScore;
}

/**
 * High-speed built-in knowledge retrieval engine
 * Delivers structured, convincing, and deeply respectful answers.
 */
export function getKnowledgeBaseResponse(userQuery: string): string {
  const query = userQuery.toLowerCase();
  const isEn = detectIsEnglish(userQuery);

  if (isEn) {
    // Contacts & WhatsApp
    if (query.includes("contact") || query.includes("reach") || query.includes("email") || query.includes("phone") || query.includes("call") || query.includes("location") || query.includes("where") || query.includes("whatsapp")) {
      return `You can connect directly with **${HASSANE_PROFILE.preferredName}** through these verified channels:\n\n` +
        `- 💬 **WhatsApp**: [${HASSANE_PROFILE.contacts.phone2}](${HASSANE_PROFILE.contacts.whatsappUrl}) *(instant response)*\n` +
        `- 📞 **Direct Calls**: ${HASSANE_PROFILE.contacts.phone1} / ${HASSANE_PROFILE.contacts.phone2}\n` +
        `- 📧 **Email**: [${HASSANE_PROFILE.contacts.emailPrimary}](mailto:${HASSANE_PROFILE.contacts.emailPrimary})\n` +
        `- 📍 **Location**: ${HASSANE_PROFILE.contacts.location} *(available globally for remote contracts)*\n\n` +
        `You can also click the green WhatsApp button in the **Contact** section to start a conversation right away!`;
    }

    // CV / Resume
    if (query.includes("cv") || query.includes("resume") || query.includes("download") || query.includes("pdf")) {
      return `📄 **${HASSANE_PROFILE.preferredName}'s Official CV** is available directly:\n\n` +
        `- 🔗 **Google Drive Link**: [View & Download Official CV](${HASSANE_PROFILE.contacts.cvDriveUrl})\n` +
        `- 📍 You can also click the purple button **"Télécharger mon CV"** directly in the Home section of this page.\n\n` +
        `It details his full academic journey (B.Sc. in Mathematics & Computer Science), his experiences at OMEGA DIGITAL & Oliteck Studio, and all certified qualifications. Would you like to discuss an opportunity with him?`;
    }

    // Projects
    if (query.includes("project") || query.includes("portfolio") || query.includes("work") || query.includes("application") || query.includes("omega") || query.includes("oliteck")) {
      return `Here are some of **${HASSANE_PROFILE.preferredName}**'s flagship achievements:\n\n` +
        `- 🏢 **OMEGA DIGITAL Platform**: Full-scale digital identity and services platform for enterprise digital acceleration (Web, Mobile, AI, Design).\n` +
        `- 📚 **Educational Management & Learning App**: Web & data platform designed to centralize pedagogical resources and facilitate coding education (HTML/CSS/JS/Python/SQL).\n` +
        `- 🤖 **AI-Powered Automation System**: Smart automated workflows cutting repetitive business operations through n8n & custom generative AI endpoints.\n` +
        `- 📱 **HealthTrack Pro**: Mobile Flutter application with predictive AI for patient vital signs tracking.\n` +
        `- ⚡ **HyperSpeed E-Commerce**: High-performance marketplace integrating Mobile Money (Wave, Orange, MTN, Moov) and Stripe.\n\n` +
        `Every solution is engineered for performance, clean architecture, and delightful user experience. Which type of project are you looking to build?`;
    }

    // Services & Pricing
    if (query.includes("service") || query.includes("offer") || query.includes("hire") || query.includes("price") || query.includes("cost") || query.includes("rate") || query.includes("quote")) {
      return `**Oliteck Studio** & Hassane provide end-to-end digital excellence tailored to your goals:\n\n` +
        `- 🌐 **Full Stack Web Engineering**: High-conversion, ultra-responsive web applications (React, Next.js, Node.js, Tailwind CSS).\n` +
        `- 📱 **Mobile Development**: Native-grade mobile apps for iOS and Android built with Flutter and React Native.\n` +
        `- 🤖 **AI Solutions & Workflow Automation**: 24/7 intelligent chatbots, custom LLM integrations, and n8n pipelines that save dozens of hours each week.\n` +
        `- 🎨 **UI/UX & Visual Identity**: Pixel-perfect design and modern wireframing on Figma and Canva.\n\n` +
        `💼 **Investments & Quotes**: Transparent, tailored estimates tailored to your scope. Professional turnkey web packages start at **200,000 FCFA (~$330 / €300)**. Would you like to schedule a free 30-minute discovery call?`;
    }

    // Skills & Stack
    if (query.includes("skill") || query.includes("stack") || query.includes("tech") || query.includes("language") || query.includes("tool")) {
      return `**Hassane's Core Technical & Creative Arsenal:**\n\n` +
        `- 💻 **Frontend & Web**: React, Next.js, TypeScript, JavaScript, Tailwind CSS, Vite, HTML5/CSS3.\n` +
        `- ⚙️ **Backend & Databases**: Node.js, Express, Python, PHP, SQL, Firebase, REST APIs.\n` +
        `- 📱 **Mobile Systems**: Flutter (Dart), React Native.\n` +
        `- 🤖 **AI & Automations**: n8n, OpenAI, Google Gemini API, Workflow Orchestration.\n` +
        `- 🎨 **UI/UX & Design**: Figma, Canva, User-Centric Design.\n` +
        `- 🗣️ **Languages**: French (Fluent / Native C2), English (Technical / Elementary A2).\n\n` +
        `This versatile stack enables him to handle projects end-to-end, from wireframe to cloud deployment.`;
    }

    // Identity query (ALICIA)
    if (query.includes("who are you") || query.includes("your name") || query.includes("alicia") || query.includes("what is your name")) {
      return `I am **ALICIA**, the official personal AI assistant of **${HASSANE_PROFILE.preferredName}** (founder of Oliteck Studio & UI/UX Designer at OMEGA DIGITAL).\n\n` +
        `My mission is to assist you in discovering Hassane's portfolio, his academic foundation in Mathematics & Computer Science, his full stack and AI automation expertise, or to connect you directly with him for your next digital initiative. How may I help you?`;
    }

    // Background & Education
    if (query.includes("about") || query.includes("background") || query.includes("education") || query.includes("degree") || query.includes("certif")) {
      return `**${HASSANE_PROFILE.preferredName}** is an ambitious Software Engineer, UI/UX Designer, and AI Automation Consultant based in Bouaké, Côte d'Ivoire.\n\n` +
        `- 🎓 **Academic Degree**: B.Sc. in Mathematics and Computer Science from Université Alassane Ouattara (Bouaké).\n` +
        `- 📜 **Scientific Foundation**: Scientific Baccalaureate Série D (Score: 260/400, Honors).\n` +
        `- 🏆 **Cursa Certified**: Programming Logic, Python for Developers, Modern HTML/CSS & Front-End JavaScript.\n` +
        `- 💡 **Key Strength**: A rare combination of rigorous algorithmic thinking, refined UI/UX design taste, and mastery of cutting-edge AI automation tools.\n` +
        `- 🚀 **Active Roles**: UI/UX & Digital Communication at OMEGA DIGITAL, and Founder of Oliteck Studio.\n\n` +
        `He is dedicated to delivering resilient, high-converting digital products for ambitious businesses worldwide.`;
    }

    // Elegant Bridging Technique for Off-topic questions (NEVER says "I don't have the answer")
    return `That is a thought-provoking topic! Within this portfolio, my role as **ALICIA** alongside **Hassane** is specifically dedicated to guiding your digital ambitions: developing high-performance web systems, crafting modern mobile applications, or automating your business processes with artificial intelligence.\n\n` +
      `If you have a business challenge, an app idea, or a manual workflow you wish to optimize with elite digital craftsmanship, Hassane brings the exact blend of mathematical rigor and modern development to make it happen.\n\n` +
      `What kind of digital goal or project can we explore together today?`;
  } else {
    // Contact & WhatsApp
    if (query.includes("contact") || query.includes("joindre") || query.includes("email") || query.includes("téléphone") || query.includes("telephone") || query.includes("tel") || query.includes("whatsapp") || query.includes("adresse") || query.includes("où") || query.includes("rdv") || query.includes("rendez-vous")) {
      return `Vous pouvez contacter directement **${HASSANE_PROFILE.preferredName}** via plusieurs canaux directs :\n\n` +
        `- 💬 **WhatsApp direct** : [${HASSANE_PROFILE.contacts.phone2}](${HASSANE_PROFILE.contacts.whatsappUrl}) *(réponse rapide)*\n` +
        `- 📞 **Téléphone** : ${HASSANE_PROFILE.contacts.phone1} / ${HASSANE_PROFILE.contacts.phone2}\n` +
        `- 📧 **Email** : [${HASSANE_PROFILE.contacts.emailPrimary}](mailto:${HASSANE_PROFILE.contacts.emailPrimary})\n` +
        `- 📍 **Localisation** : ${HASSANE_PROFILE.contacts.location} *(disponible pour des missions à distance partout dans le monde)*\n\n` +
        `Vous pouvez aussi cliquer directement sur le bouton vert **"Discuter sur WhatsApp"** dans la section Contact de cette page !`;
    }

    // CV / Resume
    if (query.includes("cv") || query.includes("curriculum") || query.includes("télécharger") || query.includes("telecharger") || query.includes("pdf") || query.includes("drive")) {
      return `📄 **Le CV Officiel de ${HASSANE_PROFILE.preferredName}** est accessible directement :\n\n` +
        `- 🔗 **Lien Google Drive officiel** : [Consulter & Télécharger le CV sur Google Drive](${HASSANE_PROFILE.contacts.cvDriveUrl})\n` +
        `- 📍 Vous pouvez également cliquer sur le bouton violet **"Télécharger mon CV"** situé tout en haut dans la section d'accueil de ce portfolio.\n\n` +
        `Il contient le détail complet de son cursus (Licence Mathématiques & Informatique, Bac D Mention Assez bien), ses expériences chez OMEGA DIGITAL et Oliteck Studio, ainsi que ses certifications Cursa. Souhaitez-vous échanger sur une opportunité de collaboration ?`;
    }

    // Projets
    if (query.includes("projet") || query.includes("portfolio") || query.includes("réalisation") || query.includes("realisation") || query.includes("application") || query.includes("omega") || query.includes("oliteck")) {
      return `Voici les projets phares conçus et développés par **${HASSANE_PROFILE.preferredName}** :\n\n` +
        `- 🏢 **Plateforme OMEGA DIGITAL** : Conception de l'identité numérique et de l'offre globale de solutions digitales pour entreprises (Web, Mobile, IA, Design).\n` +
        `- 📚 **Application de gestion & apprentissage informatique** : Plateforme interactive facilitant l'accès aux ressources éducatives et l'apprentissage de la programmation (HTML, CSS, JS, Python, SQL).\n` +
        `- 🤖 **Système d'automatisation avec IA** : Workflows intelligents automatisant le traitement des données et les tâches répétitives via n8n et l'intelligence artificielle.\n` +
        `- 📱 **HealthTrack Pro** : Application mobile Flutter dotée d'une IA prédictive pour le suivi clinique en temps réel.\n` +
        `- ⚡ **HyperSpeed E-Commerce** : Marketplace ultra-rapide avec intégration fluide des paiements Mobile Money (Wave, Orange, MTN, Moov) et Stripe.\n\n` +
        `Chaque solution est bâtie pour allier performance, design épuré et efficacité concrète. Quel type d'application souhaitez-vous développer ?`;
    }

    // Tarifs, Devis, Services
    if (query.includes("service") || query.includes("prestation") || query.includes("tarif") || query.includes("prix") || query.includes("coût") || query.includes("cout") || query.includes("devis") || query.includes("combien") || query.includes("engager") || query.includes("recruter")) {
      return `**Oliteck Studio** et Hassane vous accompagnent avec des prestations numériques sur mesure :\n\n` +
        `- 🌐 **Développement Web Full Stack** : Applications web modernes, réactives et optimisées pour la conversion (React, Next.js, Node.js, Tailwind CSS).\n` +
        `- 📱 **Développement Mobile** : Applications natives iOS & Android ergonomiques et fluides (Flutter, React Native).\n` +
        `- 🧠 **Automatisation & Intelligence Artificielle** : Assistants conversationnels 24/7, intégration de modèles d'IA et pipelines n8n pour libérer des heures précieuses à vos équipes.\n` +
        `- 🎨 **Conception UI/UX & Graphisme** : Maquettes interactives sur Figma et Canva centrées sur l'expérience client.\n\n` +
        `💼 **Investissement & Devis** : Les tarifs s'adaptent à l'envergure de votre projet. Un pack web professionnel démarre à partir de **200 000 FCFA (~300 €)**. Souhaitez-vous planifier un échange découverte gratuit de 30 minutes ?`;
    }

    // Compétences & Technologies
    if (query.includes("compétence") || query.includes("competence") || query.includes("stack") || query.includes("techno") || query.includes("langage") || query.includes("outil") || query.includes("react") || query.includes("flutter") || query.includes("python") || query.includes("ia")) {
      return `**Arsenal Technique et Créatif d'Hassane :**\n\n` +
        `- 💻 **Frontend & Web** : React, Next.js, TypeScript, JavaScript, Tailwind CSS, Vite, HTML5, CSS3.\n` +
        `- ⚙️ **Backend & Bases de données** : Node.js, Express, Python, PHP, SQL, Firebase, API REST.\n` +
        `- 📱 **Écosystème Mobile** : Flutter (Dart), React Native.\n` +
        `- 🤖 **IA & Automatisation** : n8n, OpenAI, Google Gemini API, assistants virtuels autonomes.\n` +
        `- 🎨 **UI/UX & Identité visuelle** : Figma, Canva, ergonomie utilisateur.\n` +
        `- 🗣️ **Langues** : Français (C2 - Maîtrise parfaite), Anglais (A2 - Pratique technique).\n\n` +
        `Cette polyvalence lui permet de piloter un projet de bout en bout, de l'idée initiale jusqu'au déploiement final.`;
    }

    // Identité (ALICIA)
    if (query.includes("qui es-tu") || query.includes("qui est tu") || query.includes("ton nom") || query.includes("comment tu t'appelles") || query.includes("alicia") || query.includes("t'appelles") || query.includes("présente-toi") || query.includes("presente-toi")) {
      return `Je suis **ALICIA**, l'assistante IA personnelle et officielle de **${HASSANE_PROFILE.preferredName}** (fondateur d'Oliteck Studio et Concepteur UI/UX chez OMEGA DIGITAL).\n\n` +
        `Mon rôle est de vous guider à travers ses réalisations numériques, son cursus universitaire en Mathématiques & Informatique, son savoir-faire en automatisation (n8n) et développement web/mobile, ou de faciliter une prise de contact directe par WhatsApp ou email. Comment puis-je vous renseigner ?`;
    }

    // Parcours, Diplômes, Qui est Hassane
    if (query.includes("qui") || query.includes("propos") || query.includes("parcours") || query.includes("formation") || query.includes("diplome") || query.includes("diplôme") || query.includes("certif") || query.includes("etude") || query.includes("étude")) {
      return `**${HASSANE_PROFILE.preferredName}** est un Développeur Full Stack, Concepteur UI/UX et Consultant en Automatisation & IA basé à Bouaké, Côte d'Ivoire.\n\n` +
        `- 🎓 **Cursus Académique** : Licence en Mathématiques et Informatique à l'Université Alassane Ouattara (Bouaké).\n` +
        `- 📜 **Base Scientifique** : Baccalauréat Série D au GS Mohamed 5 de Bouaké (Note : 260/400, Mention Assez bien) et BEPC au GS La Maison de Bambi (148/220, Mention Assez bien).\n` +
        `- 🏆 **Certifications Cursa** : Logique de Programmation (Mohamed Chiny), Python pour les développeurs, HTML/CSS Complet (Pierre Giraud) et Développeur Front-End JavaScript.\n` +
        `- 💼 **Postes Clés** : Concepteur UI/UX & Communication Digitale chez OMEGA DIGITAL (depuis Mai 2022) et Fondateur d'OLITECK STUDIO.\n\n` +
        `Son atout majeur : une polyvalence rare — web, mobile, intelligence artificielle et design UI/UX — pour porter vos projets numériques de bout en bout, de l'idée algorithmique à la solution finale rentable.`;
    }

    // Redirection psychologique élégante pour les questions hors-sujet
    return `C'est une perspective tout à fait curieuse et stimulante ! Dans le cadre de ce portfolio, ma mission en tant qu'assistante **ALICIA** auprès d'**Hassane** est précisément de vous guider et de vous accompagner dans vos projets digitaux : le développement de plateformes web sur mesure, la conception d'applications mobiles intuitives et l'automatisation intelligente de vos activités.\n\n` +
      `Si vous pilotez une entreprise ou souhaitez concrétiser une idée technologique novatrice, Hassane dispose de la polyvalence idéale (code, design et intelligence artificielle) pour transformer cette vision en une solution concrète et rentable.\n\n` +
      `Quel type de défi numérique ou de projet pouvons-nous analyser ensemble ?`;
  }
}
