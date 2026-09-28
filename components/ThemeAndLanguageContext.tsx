import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'fr' | 'en';
type Theme = 'light' | 'dark';

interface TranslationKeys {
  [key: string]: string;
}

const TRANSLATIONS: Record<Language, TranslationKeys> = {
  fr: {
    // navbar
    nav_home: "Accueil",
    nav_about: "À propos",
    nav_skills: "Compétences",
    nav_services: "Services",
    nav_projects: "Projets",
    nav_certifications: "Certifications",
    nav_testimonials: "Témoignages",
    nav_blog: "Blog",
    nav_contact: "Contact",
    nav_cv: "Mon CV",
    
    // Theme loading or alerts
    system_status: "SYSTEME : ACTIF",
    
    // hero
    hero_greeting: "Bonjour, je suis",
    hero_subtitle: "Ingénieur Fullstack & Architecte IA",
    hero_desc: "Je ne construis pas des sites web. Je conçois des instruments de croissance — des plateformes qui pensent, s'adaptent et convertissent.",
    hero_secondary: "Du concept à la mise en production, je transforme vos ambitions digitales en solutions qui font réellement la différence.",
    hero_badge: "🟢 Actuellement disponible pour des missions & partenariats",
    hero_credibility: "✅ 20+ projets livrés  |  ✅ 5+ pays  |  ✅ 4+ ans d'expérience",
    hero_cta_cv: "Télécharger mon CV",
    hero_cta_work: "🚀 Explorer mes projets",
    hero_cta_contact: "💬 Démarrer un projet ensemble",
    
    // tech marquee bandeau
    tech_marquee_title: "Des technologies maîtrisées. Des résultats prouvés. Une vision claire.",
    
    // about
    about_title: "À Propos de Moi",
    about_subtitle: "Je suis l'ingénieur que les entrepreneurs appellent quand ça doit vraiment marcher.",
    about_p1: "Basé en Côte d'Ivoire, je conçois des solutions digitales pour des startups, PME et grandes entreprises qui veulent passer à la vitesse supérieure — en Afrique comme à l'international.",
    about_p2: "Mon histoire ne commence pas avec un diplôme. Elle commence avec une obsession : comprendre comment les systèmes fonctionnent, puis les rendre meilleurs. Formé à l'Université Alassane Ouattara de Bouaké, j'ai très vite compris que la théorie sans l'exécution ne vaut rien. Alors j'ai construit. Des applications. Des plateformes. Des automatisations. Et un studio.",
    about_quote: "La technologie n'est pas une fin en soi. C'est un multiplicateur de potentiel humain. Mon rôle est de vous donner ce multiplicateur — configuré, optimisé, et prêt à l'emploi.",
    
    // Oliteck studio block
    oliteck_title: "OLITECK STUDIO — Ma vision concrétisée",
    oliteck_desc: "J'ai fondé OLITECK STUDIO avec une conviction simple : les entreprises ambitieuses méritent un partenaire technologique qui parle leur langue — celle des objectifs, de la croissance et du retour sur investissement. OLITECK STUDIO n'est pas une agence de plus. C'est un laboratoire d'ingénierie digitale où chaque projet est traité comme un produit stratégique.",
    
    // about metrics
    about_3d_title: "Metrics interactives 3D",
    about_3d_subtitle: "Console de données",
    about_3d_desc: "Survolez ou faites glisser les cubes pour naviguer dans les dimensions de mes talents",
    about_info_base: "Base",
    about_info_focus: "Focus",
    about_info_studio: "Studio",
    about_btn_cv: "Télécharger mon CV",
    about_btn_collab: "Démarrer un projet",
    about_btn_top: "REVENIR EN HAUT",
    
    // 3D cubes translation
    cube_exp_front: "Expérience",
    cube_exp_sub: "Survoler",
    cube_exp_back: "4+ ans exp",
    cube_exp_full: "FullStack",
    
    cube_crea_front: "Créations",
    cube_crea_sub: "Survoler",
    cube_crea_back: "20+ Projets",
    cube_crea_back_sub: "Livrés",
    
    cube_ia_front: "Impact IA",
    cube_ia_sub: "Survoler",
    cube_ia_back: "100% IA",
    cube_ia_back_sub: "Intégration",
    
    // Values
    valeurs_title: "4 Valeurs Fondamentales",
    valeurs_precision_title: "🎯 Précision",
    valeurs_precision_desc: "Je livre exactement ce qui a été promis — ni plus flou, ni moins complet.",
    valeurs_performance_title: "⚡ Performance",
    valeurs_performance_desc: "Des solutions rapides, robustes et scalables, conçues pour durer.",
    valeurs_innovation_title: "🧠 Innovation",
    valeurs_innovation_desc: "Toujours un coup d'avance sur les tendances tech qui comptent vraiment.",
    valeurs_impact_title: "🤝 Impact",
    valeurs_impact_desc: "Vos résultats business sont ma véritable mesure de succès.",

    // Skills
    skills_title: "Compétences",
    skills_desc: "Mes Armes de Prédilection",
    skills_subtitle: "Un arsenal technique soigneusement sélectionné pour chaque mission.",
    skills_analysis: "Analyse d'Expertise",
    skills_all: "Tous",
    skills_web: "Web / Frontend",
    skills_mobile: "Mobile",
    skills_ia: "IA & Automatisation",
    skills_data: "Bases de données / DevOps",
    skills_category: "Catégories",
    
    // Services
    services_title: "Ce que je construis pour vous",
    services_desc: "Des solutions sur-mesure, pensées pour votre croissance.",
    services_more: "En savoir plus",
    services_close: "Fermer",
    
    // Projects
    projects_title: "Mes Créations",
    projects_desc: "Chaque projet est une solution à un problème réel.",
    projects_all: "Tous",
    projects_category: "Catégorie",
    projects_tech: "Technologies utilisées",
    projects_btn_visit: "Visiter le site",
    projects_btn_code: "Code source",
    
    // Certifications
    cert_title: "Certifications & Diplômes",
    cert_subtitle: "Mon parcours académique et professionnel.",
    
    // Testimonials
    test_title: "Ce Que Disent Ceux Qui Ont Travaillé Avec Moi",
    test_subtitle_1: "La confiance se",
    test_subtitle_2: "Construit Projet Après Projet",
    
    // Blog
    blog_title: "Mes Réflexions sur le Digital",
    blog_subtitle_1: "Articles",
    blog_subtitle_2: "Récents",
    blog_read_more: "Lire la suite",
    blog_back: "Retour aux articles",
    blog_author: "Hassane Kone",
    blog_reading_time: "Lecture :",
    
    // FAQ
    faq_sec_title: "Questions Fréquentes",
    faq_sec_desc: "Tout ce que vous voulez savoir avant de démarrer.",

    // Intermediate CTA
    cta_inter_title: "Votre prochain projet mérite le meilleur.",
    cta_inter_subtitle: "Discutons de comment je peux vous aider à le concrétiser.",
    cta_inter_btn: "📅 Réserver un appel gratuit de 30 min",

    // Contact
    contact_title: "Travaillons Ensemble",
    contact_subtitle_1: "Vous avez un projet ?",
    contact_subtitle_2: "Écrivez-moi",
    contact_desc: "Vous avez une idée qui mérite d'exister ? Un problème que la technologie peut résoudre ? Un projet qui stagne faute d'un bon partenaire technique ? Écrivez-moi. Je réponds sous 24h ouvrables.",
    contact_name: "Prénom & Nom *",
    contact_email: "Adresse Email *",
    contact_subject: "Sujet / Type de projet *",
    contact_budget: "Budget estimé (optionnel)",
    contact_message: "Description du projet *",
    contact_send: "Envoyer le message ✉️",
    contact_sending: "Transmission en cours...",
    contact_success: "Merci pour votre message ! Je vous réponds sous 24 heures ouvrables. En attendant, n'hésitez pas à explorer mes projets. 🚀",
    contact_question: "Une question ?",
    contact_direct: "Contact direct :",
    
    // Modals
    modal_collab_title: "Co-concevons Votre Futur Projet",
    modal_collab_desc: "Remplissez ce formulaire et l'équipe d'Oliteck Studio vous contactera sous 24h.",
    modal_collab_type: "Type de projet",
    modal_collab_budget: "Budget estimé",
    modal_collab_btn: "Lancer la collaboration",
    modal_recom_title: "Recommander Hassane",
    modal_recom_desc: "Vous appréziez mes services ? Laissez un mot de recommandation !",
    modal_recom_role: "Votre Rôle / Entreprise",
    modal_recom_text: "Votre message de recommandation",
    modal_recom_btn: "Publier la recommandation",
    modal_rdv_title: "Prendre RDV avec Hassane",
    modal_rdv_desc: "Planifiez une consultation gratuite de 30 min pour discuter de vos besoins.",
    modal_rdv_date: "Date souhaitée",
    modal_rdv_time: "Heure souhaitée",
    modal_rdv_btn: "Confirmer le RDV",
    
    // Chatbot ALICIA
    bot_title: "ALICIA — Assistante IA",
    bot_subtitle: "En ligne • IA Personnelle d'Hassane",
    bot_placeholder: "Posez votre question à ALICIA...",
    bot_welcome: "Bonjour ! Je suis ALICIA, l'assistante IA personnelle et officielle de Hassane Olivier Franck Koné. Comment puis-je vous accompagner aujourd'hui ? Je peux vous présenter ses projets phares (OMEGA DIGITAL, IA Automation), son parcours académique en Mathématiques & Informatique, ses compétences ou planifier un rendez-vous avec lui !",
    bot_suggest_projects: "Quels sont ses projets phares ?",
    bot_suggest_location: "📍 Où se situe Hassane ? (Google Maps)",
    bot_suggest_tech: "🔍 Actualités Tech & n8n 2026 (Google Search)",
    bot_suggest_contact: "Comment contacter Hassane ?",
    bot_suggest_services: "Quels services propose Oliteck ?",
    bot_suggest_skills: "Quelles sont ses compétences en code & IA ?",
    
    // Footer
    footer_text: "OLITECK STUDIO — Construire le futur digital, un projet à la fois.",
    footer_desc: "Ingénieur Fullstack & Architecte IA basé en Côte d'Ivoire. Disponible pour des projets d'envergure nationale et internationale.",
    footer_rights: "Tous droits réservés. Conçu & développé avec ❤️ en Côte d'Ivoire 🇨🇮",
  },
  en: {
    // navbar
    nav_home: "Home",
    nav_about: "About",
    nav_skills: "Skills",
    nav_services: "Services",
    nav_projects: "Projects",
    nav_certifications: "Certifications",
    nav_testimonials: "Testimonials",
    nav_blog: "Blog",
    nav_contact: "Contact",
    nav_cv: "My CV",
    
    // Theme loading or alerts
    system_status: "SYSTEM: ACTIVE",
    
    // hero
    hero_greeting: "Hello, I am",
    hero_subtitle: "Fullstack Engineer & AI Architect",
    hero_desc: "I don't build websites. I design instruments of growth — platforms that think, adapt, and convert.",
    hero_secondary: "From concept to production, I transform your digital ambitions into solutions that truly make a difference.",
    hero_badge: "🟢 Currently available for missions & partnerships",
    hero_credibility: "✅ 20+ delivered projects | ✅ 5+ countries | ✅ 4+ years of experience",
    hero_cta_cv: "Download my CV",
    hero_cta_work: "🚀 Explore my projects",
    hero_cta_contact: "💬 Start a project together",
    
    // tech marquee bandeau
    tech_marquee_title: "Mastered technologies. Proven results. Clear vision.",
    
    // about
    about_title: "About Me",
    about_subtitle: "I am the engineer entrepreneurs call when it absolutely has to work.",
    about_p1: "Based in Côte d'Ivoire, I design digital solutions for startups, SMEs, and large companies wanting to level up — in Africa and internationally.",
    about_p2: "My story doesn't start with a degree. It starts with an obsession: understanding how systems work, then making them better. Trained at Alassane Ouattara University in Bouaké, I quickly understood that theory without execution is nothing. So I built. Applications. Platforms. Automations. And a studio.",
    about_quote: "Technology is not an end in itself. It is a multiplier of human potential. My role is to give you this multiplier — configured, optimized, and ready to use.",
    
    // Oliteck studio block
    oliteck_title: "OLITECK STUDIO — My Vision Rendered",
    oliteck_desc: "I founded OLITECK STUDIO with a simple conviction: ambitious businesses deserve a tech partner that speaks their language — that of goals, growth, and ROI. OLITECK STUDIO is not just another agency. It is a digital engineering lab where every project is treated as a strategic product.",
    
    // about metrics
    about_3d_title: "Interactive 3D Metrics",
    about_3d_subtitle: "Data Console",
    about_3d_desc: "Hover over or drag the cubes to explore the dimensions of my skills",
    about_info_base: "Base",
    about_info_focus: "Focus",
    about_info_studio: "Studio",
    about_btn_cv: "Download my CV",
    about_btn_collab: "Start a project",
    about_btn_top: "BACK TO TOP",
    
    // 3D cubes translation
    cube_exp_front: "Experience",
    cube_exp_sub: "Hover Me",
    cube_exp_back: "4+ years exp",
    cube_exp_full: "FullStack",
    
    cube_crea_front: "Creations",
    cube_crea_sub: "Hover Me",
    cube_crea_back: "20+ Projects",
    cube_crea_back_sub: "Delivered",
    
    cube_ia_front: "AI Impact",
    cube_ia_sub: "Hover Me",
    cube_ia_back: "100% AI",
    cube_ia_back_sub: "Integration",
    
    // Values
    valeurs_title: "4 Core Values",
    valeurs_precision_title: "🎯 Precision",
    valeurs_precision_desc: "I deliver exactly what was promised — no blurriness, no compromises.",
    valeurs_performance_title: "⚡ Performance",
    valeurs_performance_desc: "Fast, robust, and scalable solutions built to last.",
    valeurs_innovation_title: "🧠 Innovation",
    valeurs_innovation_desc: "Always one step ahead of the tech trends that truly matter.",
    valeurs_impact_title: "🤝 Impact",
    valeurs_impact_desc: "Your business results are my true measure of success.",

    // Skills
    skills_title: "Skills",
    skills_desc: "My Preferred Arsenal",
    skills_subtitle: "A tech arsenal carefully selected for every mission.",
    skills_analysis: "Expertise Analysis",
    skills_all: "All",
    skills_web: "Web / Frontend",
    skills_mobile: "Mobile",
    skills_ia: "AI & Automation",
    skills_data: "Database / DevOps",
    skills_category: "Categories",
    
    // Services
    services_title: "What I Build For You",
    services_desc: "Custom-built solutions engineered for your business growth.",
    services_more: "Learn more",
    services_close: "Close",
    
    // Projects
    projects_title: "My Creative Creations",
    projects_desc: "Every project is a high-performance solution to a real business problem.",
    projects_all: "All",
    projects_category: "Category",
    projects_tech: "Technologies used",
    projects_btn_visit: "Visit site",
    projects_btn_code: "Source code",
    
    // Certifications
    cert_title: "Certifications & Degrees",
    cert_subtitle: "My academic and professional journey.",
    
    // Testimonials
    test_title: "What Those Who Worked With Me Say",
    test_subtitle_1: "Trust Is",
    test_subtitle_2: "Built Project After Project",
    
    // Blog
    blog_title: "My Thoughts on Digital",
    blog_subtitle_1: "Latest",
    blog_subtitle_2: "Articles",
    blog_read_more: "Read more",
    blog_back: "Back to articles",
    blog_author: "Hassane Kone",
    blog_reading_time: "Read time :",
    
    // FAQ
    faq_sec_title: "Frequently Asked Questions",
    faq_sec_desc: "Everything you want to know before launching together.",

    // Intermediate CTA
    cta_inter_title: "Your next project deserves the best.",
    cta_inter_subtitle: "Let's discuss how I can help you bring it to life.",
    cta_inter_btn: "📅 Book a free 30-min call",

    // Contact
    contact_title: "Let's Work Together",
    contact_subtitle_1: "Have a project?",
    contact_subtitle_2: "Write to me",
    contact_desc: "Have an idea that deserves to exist? A roadblock tech can solve? Let's talk. I respond within 24 business hours.",
    contact_name: "First & Last Name *",
    contact_email: "Email Address *",
    contact_subject: "Subject / Project Type *",
    contact_budget: "Estimated budget (optional)",
    contact_message: "Project details *",
    contact_send: "Send Message ✉️",
    contact_sending: "Sending...",
    contact_success: "Thank you for your message! I will reply within 24 business hours. In the meantime, feel free to explore my work. 🚀",
    contact_question: "Any question?",
    contact_direct: "Direct contact:",
    
    // Modals
    modal_collab_title: "Co-design Your Future Project",
    modal_collab_desc: "Fill out this form and the Oliteck Studio team will contact you within 24 hours.",
    modal_collab_type: "Project Type",
    modal_collab_budget: "Estimated Budget",
    modal_collab_btn: "Launch collaboration",
    modal_recom_title: "Recommend Hassane",
    modal_recom_desc: "Appreciate my services? Leave a recommendation word!",
    modal_recom_role: "Your Role / Company",
    modal_recom_text: "Your recommendation message",
    modal_recom_btn: "Publish recommendation",
    modal_rdv_title: "Book a Meeting with Hassane",
    modal_rdv_desc: "Schedule a free 30-min consultation to discuss your needs.",
    modal_rdv_date: "Preferred Date",
    modal_rdv_time: "Preferred Time",
    modal_rdv_btn: "Confirm appointment",
    
    // Chatbot ALICIA
    bot_title: "ALICIA — AI Assistant",
    bot_subtitle: "Online • Hassane's Personal AI",
    bot_placeholder: "Ask ALICIA a question...",
    bot_welcome: "Hello! I am ALICIA, the official personal AI assistant of Hassane Olivier Franck Koné. How can I assist you today? I can present his flagship projects (OMEGA DIGITAL, AI Automation), his academic background in Mathematics & Computer Science, or connect you directly with him!",
    bot_suggest_projects: "What are his flagship projects?",
    bot_suggest_location: "📍 Where is Hassane located? (Google Maps)",
    bot_suggest_tech: "🔍 2026 Tech & n8n Trends (Google Search)",
    bot_suggest_contact: "How to contact Hassane?",
    bot_suggest_services: "What services does his studio offer?",
    bot_suggest_skills: "What are his coding & AI skills?",
    
    // Footer
    footer_text: "OLITECK STUDIO — Building the digital future, one project at a time.",
    footer_desc: "Fullstack Engineer & AI Architect based in Côte d'Ivoire. Available for national and international projects.",
    footer_rights: "All rights reserved. Designed & developed with ❤️ in Côte d'Ivoire 🇨🇮",
  }
};

interface DynamicModelTranslations {
  hero_titles: string[];
  projects: Array<{ id: string; title: string; category: string; description: string; context?: string; solution?: string; result?: string }>;
  services: Array<{ id: string; title: string; description: string; fullDescription: string }>;
  certifications: Array<{ id: string; title: string; institution: string; description: string }>;
  testimonials: Array<{ id: string; role: string; text: string; name?: string }>;
  blog_posts: Array<{ id: string; title: string; excerpt: string; content: string }>;
}

const TRANSLATIONS_DYNAMIC: Record<Language, DynamicModelTranslations> = {
  fr: {
    hero_titles: [
      "Développeur Full Stack & Concepteur UI/UX",
      "Consultant Automatisation & IA (n8n)",
      "Fondateur d'OLITECK STUDIO",
      "Concepteur chez OMEGA DIGITAL",
      "Licence Mathématiques & Informatique"
    ],
    projects: [
      {
        id: "1",
        title: "OMEGA DIGITAL — Plateforme de services numériques",
        category: "Web & SaaS",
        description: "Plateforme intégrée d'offre globale de services numériques pour accélérer la transition digitale des entreprises et des particuliers.",
        context: "Les entreprises de la sous-région manquaient d'un interlocuteur technologique unique combinant le web, le mobile, l'automatisation IA et le design visuel de haut niveau.",
        solution: "Conception d'une plateforme modulaire avec vitrines de services, simulateur de devis, catalogue de solutions interactives et intégration directe des canaux de contact.",
        result: "Déploiement d'une identité de marque forte et acquisition de mandats de transition numérique auprès d'acteurs économiques régionaux."
      },
      {
        id: "2",
        title: "Système d'automatisation avec intelligence artificielle",
        category: "IA & Automatisation",
        description: "Plateforme d'orchestration de flux intelligents réduisant drastiquement les tâches répétitives et facilitant le traitement des données métiers.",
        context: "Les équipes opérationnelles perdaient des heures chaque jour à trier des requêtes, saisir des bordereaux et synchroniser manuellement des outils non connectés.",
        solution: "Architecture d'automatisation basée sur des scénarios n8n interconnectés avec des modèles d'IA générative (parsing de documents, classification automatique, réponses instantanées).",
        result: "Suppression de plus de 80% des manipulations manuelles à faible valeur ajoutée et disponibilité du traitement 24h/24 sans interruption."
      },
      {
        id: "3",
        title: "Application de gestion et d'apprentissage informatique",
        category: "Web App & Éducation",
        description: "Solution numérique conçue pour centraliser les ressources didactiques, structurer les parcours de code et faciliter l'apprentissage méthodique de l'informatique.",
        context: "Les élèves et étudiants débutants en programmation peinent souvent à trouver un parcours logique et ordonné mêlant théorie algorithmique et pratique sur machine.",
        solution: "Application web proposant des modules progressifs (HTML, CSS, JavaScript, Python, SQL), des tests d'algorithmique et un système de suivi de progression personnalisé.",
        result: "Plateforme didactique adoptée par des cohortes d'élèves à Bouaké, accélérant l'acquisition des bases de la programmation."
      },
      {
        id: "4",
        title: "OLITECK STUDIO — Écosystème Web & Mobile Freelance",
        category: "SaaS & Agence",
        description: "Studio d'ingénierie logicielle et vitrine technologique d'Hassane pour la création d'applications web réactives et mobiles cross-platform.",
        context: "Nécessité de disposer d'une structure indépendante agile, capable de livrer des solutions clés en main avec des standards d'architecture internationaux.",
        solution: "Développement d'une suite d'outils et d'applications modernes combinant React, Tailwind CSS, Flutter et des backends Express sécurisés avec assistants IA intégrés.",
        result: "Plus de 10 projets menés à bien, satisfaction client exemplaire et conformité aux standards de performance Lighthouse (score > 95)."
      },
      {
        id: "5",
        title: "GÉNIO App — Solutions Numériques Éducatives",
        category: "Mobile",
        description: "Application mobile éducative gamifiée inspirée des meilleures pratiques d'engagement pour la culture générale et le renforcement scolaire.",
        context: "Les apprenants ont besoin de stimuli visuels, de quiz interactifs et de récompenses immédiates pour maintenir leur curiosité intellectuelle intacte.",
        solution: "Développement Flutter fluide avec gestion de profils, modes duel en temps réel, génération dynamique de questionnaires et feedback immédiat.",
        result: "Plus de 10 000 sessions d'apprentissage interactif complétées avec un taux de rétention hebdomadaire supérieur à 40%."
      },
      {
        id: "6",
        title: "Mairie de Bouaké — Dématérialisation Administrative",
        category: "Web App",
        description: "Portail citoyen de simplification et de dématérialisation des démarches d'état civil avec suivi sécurisé par QR code.",
        context: "Les administrés perdaient un temps précieux en files d'attente pour obtenir des extraits d'actes d'état civil.",
        solution: "Plateforme web sécurisée de télédemande avec notification SMS automatisée et horodatage numérique des documents officiels.",
        result: "Réduction de 75% du temps d'attente moyen des usagers et archivage numérique structuré."
      }
    ],
    services: [
      {
        id: "web",
        title: "Développement Web Fullstack",
        description: "Votre plateforme, de A à Z.",
        fullDescription: "Applications web sur-mesure, SaaS, dashboards d'administration, plateformes e-commerce et portails clients. Je maîtrise l'ensemble de la chaîne : interfaces modernes réactives (React, JavaScript, HTML5/CSS3) jusqu'aux architectures serveur et bases de données robustes (Node.js, Express, Python, SQL). Pour qui : Startups, entreprises en transformation digitale, porteurs de projets innovants."
      },
      {
        id: "mobile",
        title: "Développement Mobile (Flutter & React Native)",
        description: "Une app. Deux plateformes. Zéro compromis.",
        fullDescription: "Conception d'applications mobiles cross-platform haute performance pour iOS et Android avec Flutter (Dart) et React Native. Interfaces fluides, synchronisation temps réel, intégration d'APIs et respect scrupuleux des guidelines ergonomiques. Pour qui : Entreprises souhaitant étendre leur service sur mobile, startups mobile-first."
      },
      {
        id: "ia",
        title: "Intelligence Artificielle & Assistants Virtuels",
        description: "L'IA qui booste concrètement vos opérations.",
        fullDescription: "Déploiement d'assistants virtuels autonomes (comme ALICIA), intégration des modèles d'IA générative (Google Gemini API, OpenAI), classification intelligente de données et traitement automatique du langage naturel pour un service client 24h/24. Pour qui : Entreprises cherchant à automatiser, personnaliser ou optimiser leurs services grâce à l'IA."
      },
      {
        id: "automation",
        title: "Automatisation de Processus (n8n)",
        description: "Éliminez définitivement les tâches répétitives.",
        fullDescription: "Orchestration complète de flux opérationnels avec n8n et scripts personnalisés : synchronisation de données multi-logiciels, traitement automatique des formulaires, notifications ciblées et pipelines automatisés sans erreur humaine. Pour qui : Équipes qui perdent du temps sur des tâches répétitives à faible valeur ajoutée."
      },
      {
        id: "design",
        title: "Conception UI/UX & Communication Digitale",
        description: "L'élégance visuelle au service de l'ergonomie.",
        fullDescription: "Fort de mon expérience active chez OMEGA DIGITAL, je conçois des interfaces engageantes sous Figma et Canva, des identités graphiques corporate complètes et des supports de communication qui valorisent votre marque et convertissent vos visiteurs. Pour qui : Produits existants nécessitant un redesign, nouveaux projets cherchant une UX irréprochable."
      },
      {
        id: "council",
        title: "Conseil, Architecture & Pédagogie Tech",
        description: "De la réflexion mathématique au code robuste.",
        fullDescription: "Mon cursus en Licence Mathématiques & Informatique me confère une rigueur algorithmique essentielle pour auditer vos systèmes, architecturer vos bases de données relationnelles et concevoir des supports de transmission didactiques pour vos équipes. Pour qui : CTOs, fondateurs techniques, entreprises en phase de forte croissance."
      }
    ],
    certifications: [
      {
        id: "deg-1",
        title: "Licence Mathématiques et Informatique",
        institution: "Université Alassane Ouattara — Bouaké",
        description: "Formation universitaire d'excellence en mathématiques, algorithmique fondamentale, structures de données, programmation et résolution de problèmes informatiques complexes."
      },
      {
        id: "deg-2",
        title: "Baccalauréat Série D (Scientifique)",
        institution: "Groupe Scolaire Mohamed 5 de Bouaké",
        description: "Formation scientifique exigeante développant de solides compétences en mathématiques appliquées, sciences et raisonnement analytique (Note : 260/400 | Mention Assez bien)."
      },
      {
        id: "deg-3",
        title: "Brevet d'Études du Premier Cycle (BEPC)",
        institution: "Groupe Scolaire La Maison de Bambi — Bouaké",
        description: "Acquisition des connaissances fondamentales du cycle secondaire et développement des compétences générales (Note : 148/220 | Mention Assez bien)."
      },
      {
        id: "deg-4",
        title: "Certificat d'Études Primaires Élémentaires (CEPE)",
        institution: "EPV Adventiste — Bouaké",
        description: "Validation des connaissances fondamentales en lecture, écriture, calcul et culture générale."
      },
      {
        id: "cert-1",
        title: "Logique de Programmation",
        institution: "Cursa · Formateur Mohamed Chiny",
        description: "Maîtrise approfondie des paradigmes algorithmiques, structures conditionnelles, boucles et bases de l'ingénierie logicielle."
      },
      {
        id: "cert-2",
        title: "Python pour les développeurs",
        institution: "Cursa · Formation En ligne",
        description: "Programmation orientée objet en Python, scripting, traitement de flux de données et développement d'automatisations."
      },
      {
        id: "cert-3",
        title: "HTML et CSS Complet",
        institution: "Cursa · Formateur Pierre Giraud",
        description: "Intégration web sémantique moderne, responsive design, animations fluides, CSS Grid et Flexbox selon les standards W3C."
      },
      {
        id: "cert-4",
        title: "HTML, CSS & JavaScript — Développeur Front-End",
        institution: "Cursa · Formation En ligne",
        description: "Développement d'interfaces web dynamiques, manipulation du DOM, interactivité événementielle et asynchronisme JavaScript."
      }
    ],
    testimonials: [
      {
        id: "1",
        name: "Koffi Kouamé Jean-Marc",
        role: "CEO & Co-fondateur d'AgriTech CI (Abidjan)",
        text: "Hassane a transformé notre vision en une plateforme web et mobile opérationnelle en 6 semaines chrono. Sa maîtrise technique et sa compréhension des réalités du marché ivoirien ont fait toute la différence."
      },
      {
        id: "2",
        name: "Bakayoko Aminata",
        role: "Directrice des Opérations chez SocoTrade CI",
        text: "L'automatisation des flux avec n8n mise en place par Hassane nous fait gagner plus de 15 heures chaque semaine. Les erreurs de saisie ont disparu et le retour sur investissement a été immédiat."
      },
      {
        id: "3",
        name: "Yao Philippe Kouadio",
        role: "Fondateur de BioAbidjan E-commerce",
        text: "Bien plus qu'un développeur, c'est un vrai partenaire stratégique. Il a conçu notre marketplace avec intégration sécurisée des paiements mobiles locaux Wave et Orange Money sans aucune friction."
      },
      {
        id: "4",
        name: "Touré Fatoumata Estelle",
        role: "Directrice Générale de PalmIvoire Digital",
        text: "L'intégration de l'assistant IA pour notre service client a révolutionné notre relation utilisateur. Nos clients reçoivent des réponses instantanées 24h/24 avec un professionnalisme remarquable."
      }
    ],
    blog_posts: [
      {
        id: "1",
        title: "Comment l'IA peut transformer une PME africaine en 90 jours",
        excerpt: "L'importance stratégique d'adopter des solutions d'intelligence artificielle adaptées au contexte local pour s'élever.",
        content: "L'IA n'est pas réservée aux géants de la Silicon Valley. Aujourd'hui, un commerçant ou une PME à Abidjan ou Bouaké peut utiliser des assistants IA pour automatiser des tâches répétitives, accélérer la réponse client et traiter les données opérationnelles en temps réel. Grâce à OLITECK STUDIO, nous intégrons ces outils sans bouleversement et avec des résultats immédiats."
      },
      {
        id: "2",
        title: "n8n vs Zapier: lequel choisir pour automatiser votre business en 2025 ?",
        excerpt: "Analyse comparative pour structurer vos pipelines d'automatisation et diviser vos charges par dix.",
        content: "Zapier est fabuleux pour l'extrême simplicité, mais n8n s'impose comme le choix d'excellence des ingénieurs pour la sécurité des hébergements et la flexibilité infinie des workflows branchés sur des scripts Python ou JS. Nous détaillons les cas d'usages clés et les seuils de rentabilité financière pour les PME."
      },
      {
        id: "3",
        title: "Flutter en 2025: pourquoi c'est toujours mon choix #1 pour le mobile",
        excerpt: "Pourquoi Flutter continue d'écraser la concurrence pour les MVP rapides et performants.",
        content: "Une seule base de code stable pour iOS et Android, un moteur de rendu pixel-perfect et des performances de fluidité absolue. C'est l'atout numéro un des entrepreneurs cherchant à tester un marché d'applications de manière rapide et professionnelle."
      }
    ]
  },
  en: {
    hero_titles: [
      "Full Stack Developer & UI/UX Designer",
      "AI & Workflow Automation Consultant (n8n)",
      "Founder of OLITECK STUDIO",
      "UI/UX Designer at OMEGA DIGITAL",
      "B.Sc. Mathematics & Computer Science"
    ],
    projects: [
      {
        id: "1",
        title: "OMEGA DIGITAL — Digital Services Platform",
        category: "Web & SaaS",
        description: "Comprehensive digital services ecosystem designed to accelerate digital transformation for enterprises and individuals.",
        context: "Regional businesses lacked a single engineering partner combining web, mobile, AI automation, and high-end visual brand design.",
        solution: "Engineered a modular responsive platform with service showcases, interactive quote simulators, and immediate contact funnels.",
        result: "Strengthened corporate digital presence and secured transformation contracts across regional businesses."
      },
      {
        id: "2",
        title: "AI-Powered Workflow Automation System",
        category: "AI & Automation",
        description: "Intelligent workflow orchestration engine eliminating repetitive operations and streamlining enterprise data processing.",
        context: "Operations teams were losing hours daily manually moving records, processing repetitive forms, and handling routine inquiries.",
        solution: "Built n8n automation pipelines connected with generative AI models (document parsing, smart categorization, instant routing).",
        result: "Eliminated over 80% of repetitive low-value manual tasks, enabling continuous 24/7 business workflow execution."
      },
      {
        id: "3",
        title: "Educational Management & Code Learning App",
        category: "Web App & Education",
        description: "Bespoke digital solution to centralize pedagogical resources, structure programming curricula, and track student mastery.",
        context: "Novice learners in West Africa needed an accessible, step-by-step interactive platform bridging mathematical logic and coding practice.",
        solution: "Web learning application with modular lessons (HTML, CSS, JS, Python, SQL), algorithm challenges, and personal progress analytics.",
        result: "Adopted by student cohorts in Bouaké, significantly accelerating programming literacy."
      },
      {
        id: "4",
        title: "OLITECK STUDIO — Web & Mobile Freelance Lab",
        category: "SaaS & Agency",
        description: "Hassane's personal engineering studio delivering bespoke high-conversion web apps and cross-platform mobile solutions.",
        context: "Needed an agile independent agency framework to deliver turnkey digital products meeting global performance benchmarks.",
        solution: "Engineered a stack of modern apps using React, Tailwind CSS, Flutter, and hardened Express backends with ALICIA AI embedded.",
        result: "10+ successful production deployments, stellar client ratings, and top-tier Lighthouse performance (>95)."
      },
      {
        id: "5",
        title: "GÉNIO App — Educational Mobile Platform",
        category: "Mobile",
        description: "Gamified educational mobile application for general knowledge and school subjects with interactive real-time quizzes.",
        context: "Students required visual stimulation, gamification, and instant feedback to maintain strong learning engagement.",
        solution: "Built a responsive cross-platform Flutter application with live duels, dynamic quiz generators, and digital achievements.",
        result: "Over 10,000 completed learning sessions and sustained weekly engagement exceeding 40%."
      },
      {
        id: "6",
        title: "Bouaké City Hall — Public Service Dematerialization",
        category: "Web App",
        description: "Citizen portal streamlining civil status certificate requests with secure QR-code verification and SMS updates.",
        context: "Citizens experienced lengthy queues and delays when requesting official civil status documents.",
        solution: "Secure online application portal featuring digital tracking, SMS notification dispatch, and timestamped digital archives.",
        result: "Reduced average citizen wait time by 75% while creating an organized, searchable digital registry."
      }
    ],
    services: [
      {
        id: "web",
        title: "Full Stack Web Development",
        description: "Your platform, from A to Z.",
        fullDescription: "Custom web applications, SaaS dashboards, e-commerce marketplaces, and client portals. I oversee the whole lifecycle: reactive interfaces (React, JavaScript, HTML5/CSS3) down to robust server architectures and databases (Node.js, Express, Python, SQL). For: Startups, digital transformation companies, forward-thinking businesses."
      },
      {
        id: "mobile",
        title: "Mobile Development (Flutter & React Native)",
        description: "One app. Two platforms. Zero compromises.",
        fullDescription: "High-performance cross-platform iOS and Android mobile applications using Flutter (Dart) and React Native. Smooth navigation, real-time sync, secure API integrations, and meticulous adherence to UI/UX guidelines. For: Companies scaling to mobile, mobile-first startups."
      },
      {
        id: "ia",
        title: "Artificial Intelligence & Virtual Assistants",
        description: "AI that actually drives real business outcomes.",
        fullDescription: "Deploying autonomous virtual assistants (such as ALICIA), integrating generative AI models (Google Gemini API, OpenAI), smart classification, and Natural Language Processing for 24/7 client operations. For: Businesses looking to automate and augment customer engagement."
      },
      {
        id: "automation",
        title: "Process Automation (n8n)",
        description: "Permanently eliminate repetitive tasks.",
        fullDescription: "End-to-end operational workflow orchestration with n8n and customized scripts: cross-app data synchronization, automated form routing, scheduled triggers, and error-free execution. For: Teams spending valuable hours on repetitive manual work."
      },
      {
        id: "design",
        title: "UI/UX Design & Digital Communication",
        description: "Visual elegance backed by behavioral conversion.",
        fullDescription: "Drawing on my active work at OMEGA DIGITAL, I craft high-fidelity prototypes and design systems in Figma and Canva, build unified corporate identities, and develop digital assets that convert visitors into loyal clients. For: Brand redesigns, ambitious product launches."
      },
      {
        id: "council",
        title: "Advisory, Architecture & Tech Pedagogy",
        description: "From mathematical reasoning to resilient code.",
        fullDescription: "My background in Mathematics & Computer Science provides a rigorous algorithmic foundation to audit your systems, structure relational databases, and design clear pedagogical training materials for your teams. For: CTOs, technical founders, growing organizations."
      }
    ],
    certifications: [
      {
        id: "deg-1",
        title: "B.Sc. in Mathematics and Computer Science",
        institution: "Université Alassane Ouattara — Bouaké",
        description: "Comprehensive university education in higher mathematics, fundamental algorithms, data structures, programming, and advanced problem-solving."
      },
      {
        id: "deg-2",
        title: "Scientific Baccalaureate (Série D)",
        institution: "Groupe Scolaire Mohamed 5 de Bouaké",
        description: "Rigorous scientific foundation developing analytical reasoning, applied mathematics, and physical sciences (Score: 260/400 | Honors: Mention Assez bien)."
      },
      {
        id: "deg-3",
        title: "BEPC (First Cycle Secondary Diploma)",
        institution: "Groupe Scolaire La Maison de Bambi — Bouaké",
        description: "Solid foundation in secondary sciences, logic, and humanities (Score: 148/220 | Honors: Mention Assez bien)."
      },
      {
        id: "deg-4",
        title: "CEPE (Primary Education Certificate)",
        institution: "EPV Adventiste — Bouaké",
        description: "Fundamental mastery of mathematics, analytical reading, writing, and general knowledge."
      },
      {
        id: "cert-1",
        title: "Programming Logic & Algorithms",
        institution: "Cursa · Instructor Mohamed Chiny",
        description: "In-depth study of algorithmic paradigms, conditional branching, iteration architectures, and software engineering principles."
      },
      {
        id: "cert-2",
        title: "Python for Developers",
        institution: "Cursa · Online Professional Track",
        description: "Object-oriented Python programming, data pipelines, scripting, and system automation engineering."
      },
      {
        id: "cert-3",
        title: "Complete Modern HTML & CSS",
        institution: "Cursa · Instructor Pierre Giraud",
        description: "Semantic integration, responsive layouts, smooth micro-animations, CSS Grid, and Flexbox complying with W3C standards."
      },
      {
        id: "cert-4",
        title: "HTML, CSS & JavaScript — Front-End Developer",
        institution: "Cursa · Online Professional Track",
        description: "Interactive UI engineering, DOM manipulation, asynchronous event handling, and dynamic web application logic."
      }
    ],
    testimonials: [
      {
        id: "1",
        name: "Koffi Kouamé Jean-Marc",
        role: "CEO & Co-founder at AgriTech CI (Abidjan)",
        text: "Hassane transformed our vision into an operational web and mobile platform in just 6 weeks. His technical mastery and deep understanding of local business dynamics in Côte d'Ivoire made all the difference."
      },
      {
        id: "2",
        name: "Bakayoko Aminata",
        role: "Chief Operating Officer at SocoTrade CI",
        text: "The n8n automated workflows implemented by Hassane save us over 15 hours of manual work every week. Manual entry errors vanished and return on investment was immediate."
      },
      {
        id: "3",
        name: "Yao Philippe Kouadio",
        role: "Founder of BioAbidjan E-commerce",
        text: "Far more than a developer, he is a strategic partner. He architected our marketplace with smooth integration of local mobile payment rails Wave and Orange Money without any friction."
      },
      {
        id: "4",
        name: "Touré Fatoumata Estelle",
        role: "Managing Director at PalmIvoire Digital",
        text: "Integrating an AI assistant for our customer support completely transformed our client relationships. Our users receive instant, highly professional assistance 24/7."
      }
    ],
    blog_posts: [
      {
        id: "1",
        title: "How AI can transform an African SME in 90 days",
        excerpt: "Strategic actions to deploy custom-fit intelligence layers to automate and boost profits.",
        content: "AI is not just for Silicon Valley giants. Today, a merchant or SME in Abidjan or Bouaké can deploy smart digital systems to handle routine logs, answer clients instantly, and manage operations. At OLITECK STUDIO, we set these engines up smoothly for rapid commercial success."
      },
      {
        id: "2",
        title: "n8n vs Zapier: which should you choose for automation in 2025?",
        excerpt: "A structured choice blueprint to cut operation billing fees and host complex workflows.",
        content: "Zapier is unparalleled for rapid simple connections, but self-hosted n8n is the ultimate choice for developers who want maximum control, raw cost-savings, and ability to weave in complex Python or Node scripts."
      },
      {
        id: "3",
        title: "Flutter in 2025: why it remains my absolute first choice for mobile",
        excerpt: "Why Flutter still wins for rapid, native cross-platform deployment.",
        content: "One single clean codebase to address iOS and Android, pixel-perfect UI execution, and highly optimized rendering speeds. It remains the ideal tech asset for founders checking product-market fit."
      }
    ]
  }
};

interface AppContextProps {
  theme: Theme;
  language: Language;
  toggleTheme: () => void;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dynamic: DynamicModelTranslations;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme') as Theme;
    return saved || 'dark';
  });

  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language') as Language;
    return saved || 'fr';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    const translationSet = TRANSLATIONS[language];
    return translationSet[key] || TRANSLATIONS['fr'][key] || key;
  };

  const dynamic = TRANSLATIONS_DYNAMIC[language];

  return (
    <AppContext.Provider value={{ theme, language, toggleTheme, setLanguage, t, dynamic }}>
      {children}
    </AppContext.Provider>
  );
};

export const useThemeAndLanguage = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useThemeAndLanguage must be used within an AppProvider');
  }
  return context;
};
