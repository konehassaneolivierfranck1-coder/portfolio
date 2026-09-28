import { 
  Smartphone, Bot, Globe, Layers, Zap, Palette, Terminal, Database, Cloud, Settings,
  Linkedin, Github, Instagram, Facebook, Award, Briefcase, GraduationCap, Code
} from 'lucide-react';
import { Project, Service, SocialLink, Skill, Certification, Experience, Testimonial, BlogPost, RadarData } from './types';
import imgManCeo from './src/assets/images/portrait_ivorian_man_ceo_1790156881751.jpg';
import imgWomanCoo from './src/assets/images/portrait_ivorian_woman_coo_1790156896420.jpg';
import imgManFounder from './src/assets/images/portrait_ivorian_man_founder_1790156909374.jpg';
import imgWomanExec from './src/assets/images/portrait_ivorian_woman_exec_1790156924457.jpg';

export const CANDIDATE_PROFILE = {
  fullName: "Kone Hassane Olivier Franck",
  preferredName: "Hassane Olivier Franck Koné",
  title: "Développeur Full Stack & Concepteur UI/UX",
  subtitle: "Consultant en Automatisation & Solutions d'Intelligence Artificielle",
  agency: "OLITECK STUDIO",
  company: "OMEGA DIGITAL",
  address: "Sokoura, Bouaké, Côte d'Ivoire",
  phone1: "+225 05 94 67 17 66",
  phone2: "+225 07 19 33 38 58",
  whatsappUrl: "https://wa.me/2250719333858",
  email1: "konehassaneolivierfranck1@gmail.com",
  email2: "hassaneolivierfranckkone@gmail.com",
  cvDriveUrl: "https://drive.google.com/file/d/1mrnQTfe9so5dV8GfAGPpNsO78EEl5PM6/view?usp=drivesdk",
  cvLocalUrl: "/cv-kone-hassane-olivier-franck.pdf",
  socialUsername: "hassane.225_officiel",
  majorAsset: "Une polyvalence rare — web, mobile, intelligence artificielle et design UI/UX — pour porter un projet numérique de bout en bout, du concept à la solution finale.",
  qualities: [
    "Autonomie",
    "Rigueur technique",
    "Créativité",
    "Esprit entrepreneurial",
    "Capacité d'adaptation",
    "Veille technologique"
  ],
  languages: [
    { name: "Français", level: "Expérimenté (C2 - Langue maternelle)" },
    { name: "Anglais", level: "Élémentaire (A2 - Pratique technique)" }
  ],
  interests: ["Musique", "Cinéma", "Mode", "Intelligence Artificielle", "Innovation Digitale"]
};

export const HERO_TITLES = [
  "Développeur Full Stack & Concepteur UI/UX",
  "Consultant Automatisation & IA (n8n)",
  "Fondateur d'OLITECK STUDIO",
  "Concepteur chez OMEGA DIGITAL",
  "Licence Mathématiques & Informatique"
];

export const EXPERIENCES: Experience[] = [
  {
    id: "exp-1",
    title: "Concepteur UI/UX & Communication Digitale",
    company: "OMEGA DIGITAL",
    location: "Bouaké, Côte d'Ivoire",
    period: "Mai 2022 — Aujourd'hui",
    isCurrent: true,
    description: "Conception d'expériences numériques complètes et élaboration d'identités visuelles percutantes pour entreprises et particuliers.",
    tasks: [
      "Conception d'interfaces web et mobiles centrées sur l'expérience utilisateur (UX) et le taux de conversion.",
      "Création de supports de communication visuelle corporate et marketing pour les entreprises partenaires.",
      "Développement d'identités graphiques complètes, chartes visuelles et concepts numériques originaux.",
      "Utilisation avancée de Figma et Canva pour le prototypage rapide, maquettage haute fidélité et assets graphiques."
    ],
    tech: ["Figma", "Canva", "UI/UX Design", "Communication Digitale", "Wireframing"]
  },
  {
    id: "exp-2",
    title: "Développeur Web & Mobile Freelance",
    company: "OLITECK STUDIO (Agence Personnelle)",
    location: "Bouaké, Côte d'Ivoire",
    period: "Novembre 2024 — Aujourd'hui",
    isCurrent: true,
    description: "Direction technique et développement d'applications logicielles sur mesure pour clients ivoiriens et internationaux.",
    tasks: [
      "Analyse approfondie des besoins clients, rédaction de cahiers des charges et modélisation de fonctionnalités.",
      "Développement d'applications web performantes avec HTML, CSS, JavaScript, React et Tailwind CSS.",
      "Conception et déploiement d'applications mobiles multiplateformes natives avec Flutter et React Native.",
      "Assurance qualité, maintenance évolutive, débogage proactif et optimisation continue des temps de chargement."
    ],
    tech: ["React", "Flutter", "React Native", "JavaScript", "Node.js", "Tailwind CSS", "Git"]
  },
  {
    id: "exp-3",
    title: "Consultant en Automatisation & Solutions d'IA",
    company: "Activité Indépendante",
    location: "Bouaké, Côte d'Ivoire",
    period: "Juin 2025 — Aujourd'hui",
    isCurrent: true,
    description: "Accompagnement des entreprises dans la suppression des tâches chronophages grâce à l'orchestration IA.",
    tasks: [
      "Audit des flux de travail en entreprise et identification chirurgicale des tâches répétitives automatisables.",
      "Conception et déploiement de workflows d'orchestration complexes avec n8n connectés aux APIs de pointe.",
      "Création, entraînement contextuel et déploiement de chatbots intelligents et d'assistants virtuels autonomes.",
      "Conception de prototypes d'IA appliqués pour booster la rentabilité et la productivité opérationnelle des équipes."
    ],
    tech: ["n8n", "API REST", "Google Gemini API", "OpenAI", "Python", "Webhooks", "Automatisation"]
  },
  {
    id: "exp-4",
    title: "Concepteur de Solutions Numériques Éducatives",
    company: "Projets Indépendants",
    location: "Bouaké, Côte d'Ivoire",
    period: "Mai 2025",
    isCurrent: false,
    description: "Ingénierie didactique numérique facilitant l'acquisition des compétences informatiques pour les élèves.",
    tasks: [
      "Conception de supports pédagogiques interactifs et didactiques adaptés à l'apprentissage du numérique.",
      "Développement de concepts et prototypes d'applications éducatives gamifiées.",
      "Structuration méthodique de modules de cours d'informatique et d'algorithmique adaptés aux apprenants.",
      "Recherche appliquée sur l'intégration éthique et personnalisée de l'intelligence artificielle dans l'enseignement."
    ],
    tech: ["Pédagogie Numérique", "Flutter", "Python", "Conception Didactique", "IA Éducative"]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "1",
    title: "OMEGA DIGITAL — Plateforme de services numériques",
    category: "Web & SaaS",
    year: "Août 2025 — En cours",
    description: "Plateforme intégrée d'offre globale de services numériques pour accélérer la transition digitale des entreprises et des particuliers.",
    context: "Les entreprises de la sous-région manquaient d'un interlocuteur technologique unique combinant le web, le mobile, l'automatisation IA et le design visuel de haut niveau.",
    solution: "Conception d'une plateforme modulaire avec vitrines de services, simulateur de devis, catalogue de solutions interactives et intégration directe des canaux de contact.",
    result: "Déploiement d'une identité de marque forte et acquisition de mandats de transition numérique auprès d'acteurs économiques régionaux.",
    tech: ["React", "HTML5", "CSS3", "JavaScript", "Figma", "Canva"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    link: "https://github.com/Hassane2005",
    github: "https://github.com/Hassane2005"
  },
  {
    id: "2",
    title: "Système d'automatisation avec intelligence artificielle",
    category: "IA & Automatisation",
    year: "Juin 2026 — En cours",
    description: "Plateforme d'orchestration de flux intelligents réduisant drastiquement les tâches répétitives et facilitant le traitement des données métiers.",
    context: "Les équipes opérationnelles perdaient des heures chaque jour à trier des requêtes, saisir des bordereaux et synchroniser manuellement des outils non connectés.",
    solution: "Architecture d'automatisation basée sur des scénarios n8n interconnectés avec des modèles d'IA générative (parsing de documents, classification automatique, réponses instantanées).",
    result: "Suppression de plus de 80% des manipulations manuelles à faible valeur ajoutée et disponibilité du traitement 24h/24 sans interruption.",
    tech: ["n8n", "API REST", "Python", "LLMs (Gemini/GPT)", "Webhooks", "JSON"],
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&q=80&w=800",
    link: "https://github.com/Hassane2005",
    github: "https://github.com/Hassane2005"
  },
  {
    id: "3",
    title: "Application de gestion et d'apprentissage informatique",
    category: "Web App & Éducation",
    year: "Septembre 2025 — En cours",
    description: "Solution numérique conçue pour centraliser les ressources didactiques, structurer les parcours de code et faciliter l'apprentissage méthodique de l'informatique.",
    context: "Les élèves et étudiants débutants en programmation peinent souvent à trouver un parcours logique et ordonné mêlant théorie algorithmique et pratique sur machine.",
    solution: "Application web proposant des modules progressifs (HTML, CSS, JavaScript, Python, SQL), des tests d'algorithmique et un système de suivi de progression personnalisé.",
    result: "Plateforme didactique adoptée par des cohortes d'élèves à Bouaké, accélérant l'acquisition des bases de la programmation.",
    tech: ["Python", "SQL", "JavaScript", "HTML5", "CSS3", "Git"],
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800",
    link: "https://github.com/Hassane2005",
    github: "https://github.com/Hassane2005"
  },
  {
    id: "4",
    title: "OLITECK STUDIO — Écosystème Web & Mobile Freelance",
    category: "SaaS & Agence",
    year: "Novembre 2024 — En cours",
    description: "Studio d'ingénierie logicielle et vitrine technologique d'Hassane pour la création d'applications web réactives et mobiles cross-platform.",
    context: "Nécessité de disposer d'une structure indépendante agile, capable de livrer des solutions clés en main avec des standards d'architecture internationaux.",
    solution: "Développement d'une suite d'outils et d'applications modernes combinant React, Tailwind CSS, Flutter et des backends Express sécurisés avec assistants IA intégrés.",
    result: "Plus de 10 projets menés à bien, satisfaction client exemplaire et conformité aux standards de performance Lighthouse (score > 95).",
    tech: ["React", "Flutter", "React Native", "Node.js", "Tailwind CSS"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    link: "https://github.com/Hassane2005",
    github: "https://github.com/Hassane2005"
  },
  {
    id: "5",
    title: "GÉNIO App — Solutions Numériques Éducatives",
    category: "Mobile",
    year: "Mai 2025",
    description: "Application mobile éducative gamifiée inspirée des meilleures pratiques d'engagement pour la culture générale et le renforcement scolaire.",
    context: "Les apprenants ont besoin de stimuli visuels, de quiz interactifs et de récompenses immédiates pour maintenir leur curiosité intellectuelle intacte.",
    solution: "Développement Flutter fluide avec gestion de profils, modes duel en temps réel, génération dynamique de questionnaires et feedback immédiat.",
    result: "Plus de 10 000 sessions d'apprentissage interactif complétées avec un taux de rétention hebdomadaire supérieur à 40%.",
    tech: ["Flutter", "Dart", "Firebase", "IA Éducative", "Gamification"],
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800",
    link: "https://github.com/Hassane2005",
    github: "https://github.com/Hassane2005"
  },
  {
    id: "6",
    title: "Mairie de Bouaké — Dématérialisation Administrative",
    category: "Web App",
    year: "2024",
    description: "Portail citoyen de simplification et de dématérialisation des démarches d'état civil avec suivi sécurisé par QR code.",
    context: "Les administrés perdaient un temps précieux en files d'attente pour obtenir des extraits d'actes d'état civil.",
    solution: "Plateforme web sécurisée de télédemande avec notification SMS automatisée et horodatage numérique des documents officiels.",
    result: "Réduction de 75% du temps d'attente moyen des usagers et archivage numérique structuré.",
    tech: ["React", "PHP", "MySQL", "REST API", "Tailwind CSS"],
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800",
    link: "https://github.com/Hassane2005",
    github: "https://github.com/Hassane2005"
  }
];

export const SERVICES: Service[] = [
  {
    id: "web",
    title: "Développement Web Fullstack",
    description: "Votre plateforme, de A à Z.",
    fullDescription: "Applications web sur-mesure, SaaS, dashboards d'administration, plateformes e-commerce et portails clients. Je maîtrise l'ensemble de la chaîne : interfaces modernes réactives (React, JavaScript, HTML5/CSS3) jusqu'aux architectures serveur et bases de données robustes (Node.js, Express, Python, SQL).",
    icon: Globe
  },
  {
    id: "mobile",
    title: "Développement Mobile (Flutter & React Native)",
    description: "Une app. Deux plateformes. Zéro compromis.",
    fullDescription: "Conception d'applications mobiles cross-platform haute performance pour iOS et Android avec Flutter (Dart) et React Native. Interfaces fluides, synchronisation temps réel, intégration d'APIs et respect scrupuleux des guidelines ergonomiques.",
    icon: Smartphone
  },
  {
    id: "ia",
    title: "Intelligence Artificielle & Assistants Virtuels",
    description: "L'IA qui booste concrètement vos opérations.",
    fullDescription: "Déploiement d'assistants virtuels autonomes (comme ALICIA), intégration des modèles d'IA générative (Google Gemini API, OpenAI), classification intelligente de données et traitement automatique du langage naturel pour un service client 24h/24.",
    icon: Bot
  },
  {
    id: "automation",
    title: "Automatisation de Processus (n8n)",
    description: "Éliminez définitivement les tâches répétitives.",
    fullDescription: "Orchestration complète de flux opérationnels avec n8n et scripts personnalisés : synchronisation de données multi-logiciels, traitement automatique des formulaires, notifications ciblées et pipelines automatisés sans erreur humaine.",
    icon: Zap
  },
  {
    id: "design",
    title: "Conception UI/UX & Communication Digitale",
    description: "L'élégance visuelle au service de l'ergonomie.",
    fullDescription: "Fort de mon expérience active chez OMEGA DIGITAL, je conçois des interfaces engageantes sous Figma et Canva, des identités graphiques corporate complètes et des supports de communication qui valorisent votre marque et convertissent vos visiteurs.",
    icon: Palette
  },
  {
    id: "council",
    title: "Conseil, Architecture & Pédagogie Tech",
    description: "De la réflexion mathématique au code robuste.",
    fullDescription: "Mon cursus en Licence Mathématiques & Informatique me confère une rigueur algorithmique essentielle pour auditer vos systèmes, architecturer vos bases de données relationnelles et concevoir des supports de transmission didactiques pour vos équipes.",
    icon: Terminal
  }
];

export const SKILLS: Skill[] = [
  { name: "React.js / Web Full Stack", level: "Expert", percentage: 95, category: "web" },
  { name: "Flutter & React Native", level: "Expert", percentage: 90, category: "mobile" },
  { name: "Automatisation n8n & Workflows", level: "Expert", percentage: 94, category: "ia" },
  { name: "Python / Scripts & Data", level: "Avancé", percentage: 88, category: "ia" },
  { name: "Conception UI/UX (Figma & Canva)", level: "Expert", percentage: 92, category: "web" },
  { name: "Bases de Données (SQL)", level: "Avancé", percentage: 86, category: "data" }
];

export const RADAR_DATA: RadarData[] = [
  { subject: 'Frontend', A: 95, fullMark: 100 },
  { subject: 'Backend & SQL', A: 86, fullMark: 100 },
  { subject: 'Mobile (Flutter)', A: 90, fullMark: 100 },
  { subject: 'IA & Auto (n8n)', A: 94, fullMark: 100 },
  { subject: 'UI/UX Design', A: 92, fullMark: 100 },
  { subject: 'Rigueur Maths', A: 96, fullMark: 100 },
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: "deg-1",
    title: "Licence Mathématiques et Informatique",
    institution: "Université Alassane Ouattara — Bouaké",
    year: "Nov. 2023 — Aujourd'hui",
    type: "degree",
    description: "Formation universitaire d'excellence en mathématiques, algorithmique fondamentale, structures de données, programmation et résolution de problèmes informatiques complexes."
  },
  {
    id: "deg-2",
    title: "Baccalauréat Série D (Scientifique)",
    institution: "Groupe Scolaire Mohamed 5 de Bouaké",
    year: "Septembre 2022 — Juillet 2023",
    type: "degree",
    score: "260/400",
    mention: "Mention Assez bien",
    description: "Formation scientifique exigeante développant de solides compétences en mathématiques appliquées, sciences et raisonnement analytique."
  },
  {
    id: "deg-3",
    title: "Brevet d'Études du Premier Cycle (BEPC)",
    institution: "Groupe Scolaire La Maison de Bambi — Bouaké",
    year: "Septembre 2019 — Mai 2020",
    type: "degree",
    score: "148/220",
    mention: "Mention Assez bien",
    description: "Acquisition des connaissances fondamentales du cycle secondaire et développement des compétences générales."
  },
  {
    id: "deg-4",
    title: "Certificat d'Études Primaires Élémentaires (CEPE)",
    institution: "EPV Adventiste — Bouaké",
    year: "Septembre 2014 — Mai 2015",
    type: "degree",
    description: "Validation des connaissances fondamentales en lecture, écriture, calcul et culture générale."
  },
  {
    id: "cert-1",
    title: "Logique de Programmation",
    institution: "Cursa · Formateur Mohamed Chiny",
    year: "Août 2024 — Févr. 2025",
    type: "certification",
    description: "Maîtrise approfondie des paradigmes algorithmiques, structures de contrôle, modélisation de flux et bases de l'ingénierie logicielle."
  },
  {
    id: "cert-2",
    title: "Python pour les développeurs",
    institution: "Cursa · Formation En ligne",
    year: "Juil. 2024 — Août 2024",
    type: "certification",
    description: "Programmation orientée objet en Python, scripting, traitement de flux de données et développement d'automatisations."
  },
  {
    id: "cert-3",
    title: "HTML et CSS Complet",
    institution: "Cursa · Formateur Pierre Giraud",
    year: "Juillet 2024",
    type: "certification",
    description: "Intégration web sémantique moderne, responsive design, animations fluides, CSS Grid et Flexbox selon les standards W3C."
  },
  {
    id: "cert-4",
    title: "HTML, CSS & JavaScript — Développeur Front-End",
    institution: "Cursa · Formation En ligne",
    year: "Juillet 2024",
    type: "certification",
    description: "Développement d'interfaces web dynamiques, manipulation du DOM, interactivité événementielle et asynchronisme JavaScript."
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Koffi Kouamé Jean-Marc",
    role: "CEO & Co-fondateur d'AgriTech CI (Abidjan)",
    text: "Hassane a transformé notre vision en une plateforme web et mobile opérationnelle en 6 semaines chrono. Sa maîtrise technique et sa compréhension des réalités du marché ivoirien ont fait toute la différence.",
    image: imgManCeo
  },
  {
    id: "2",
    name: "Bakayoko Aminata",
    role: "Directrice des Opérations chez SocoTrade CI",
    text: "L'automatisation des flux avec n8n mise en place par Hassane nous fait gagner plus de 15 heures chaque semaine. Les erreurs de saisie ont disparu et le retour sur investissement a été immédiat.",
    image: imgWomanCoo
  },
  {
    id: "3",
    name: "Yao Philippe Kouadio",
    role: "Fondateur de BioAbidjan E-commerce",
    text: "Bien plus qu'un développeur, c'est un vrai partenaire stratégique. Il a conçu notre marketplace avec intégration sécurisée des paiements mobiles locaux Wave et Orange Money sans aucune friction.",
    image: imgManFounder
  },
  {
    id: "4",
    name: "Touré Fatoumata Estelle",
    role: "Directrice Générale de PalmIvoire Digital",
    text: "L'intégration de l'assistante IA ALICIA pour notre service client a révolutionné notre relation utilisateur. Nos clients reçoivent des réponses instantanées 24h/24 avec un professionnalisme remarquable.",
    image: imgWomanExec
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "Comment l'IA & l'automatisation n8n transforment une PME en 90 jours",
    excerpt: "L'importance stratégique d'adopter des solutions d'intelligence artificielle adaptées au contexte africain pour maximiser ses marges.",
    content: "L'IA n'est pas réservée aux géants de la Silicon Valley. Aujourd'hui, une PME à Abidjan ou Bouaké peut utiliser des workflows n8n et des assistants intelligents comme ALICIA pour automatiser ses tâches répétitives, accélérer la réponse client et fiabiliser la gestion administrative en temps réel. Grâce à OLITECK STUDIO, nous intégrons ces outils sans bouleversement et avec un retour sur investissement immédiat.",
    date: "14 Fév 2025",
    category: "Intelligence Artificielle & n8n",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "2",
    title: "Pourquoi combiner la rigueur mathématique et le design UI/UX fait la différence",
    excerpt: "L'atout décisif d'un profil hybride pour réussir un projet numérique du concept algorithmique à l'expérience finale.",
    content: "Dans le développement numérique, le plus beau design ne sert à rien si l'algorithme sous-jacent est lent, et l'algorithme le plus puissant échoue si l'interface rebute l'utilisateur. En alliant les bases scientifiques de ma Licence Mathématiques & Informatique aux standards UI/UX de Figma chez OMEGA DIGITAL, je garantis des produits à la fois beaux, rapides et ultra-sécurisés.",
    date: "02 Mar 2025",
    category: "Architecture & Design",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "3",
    title: "Flutter en 2025: pourquoi c'est mon choix #1 pour le mobile cross-platform",
    excerpt: "Pourquoi Flutter continue d'écraser la concurrence pour les MVP rapides et les applications de production à fort trafic.",
    content: "Une seule base de code stable pour iOS et Android, un moteur de rendu pixel-perfect et des performances de fluidité absolue. C'est l'atout numéro un des entrepreneurs cherchant à conquérir le marché mobile de manière rapide, pérenne et rentable.",
    date: "10 Mar 2025",
    category: "Mobile",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=600"
  }
];

export const SOCIALS: SocialLink[] = [
  { platform: "LinkedIn", url: "https://www.linkedin.com/in/hassane-olivier-f-kone-26194a324", icon: Linkedin },
  { platform: "GitHub", url: "https://github.com/Hassane2005", icon: Github },
  { platform: "Instagram", url: "https://www.instagram.com/hassane22466", icon: Instagram },
  { platform: "Facebook", url: "https://www.facebook.com/share/1855abz1Tg/", icon: Facebook },
];

export const CONTACT_INFO = {
  fullName: "Kone Hassane Olivier Franck",
  preferredName: "Hassane Olivier Franck Koné",
  title: "Développeur Full Stack & Concepteur UI/UX",
  phone1: "+225 05 94 67 17 66",
  phone2: "+225 07 19 33 38 58",
  whatsappUrl: "https://wa.me/2250719333858",
  email: "konehassaneolivierfranck1@gmail.com",
  emailSecondary: "hassaneolivierfranckkone@gmail.com",
  location: "Sokoura, Bouaké · Côte d'Ivoire",
  availability: "Disponible pour missions freelance, consulting & CDI",
  cvDriveUrl: "https://drive.google.com/file/d/1mrnQTfe9so5dV8GfAGPpNsO78EEl5PM6/view?usp=drivesdk",
  cvLocalUrl: "/cv-kone-hassane-olivier-franck.pdf"
};

