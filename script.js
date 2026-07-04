document.documentElement.classList.add('js');

const TYPE_SPEED_MS = 45;
const TYPE_START_DELAY_MS = 1500;

const TRANSLATIONS = {
  en: {
    navAbout: "About",
    navSkills: "Skills",
    navProjects: "Projects",
    navContact: "Contact",
    statusBadge: "STATUS: OPEN TO WORK",
    heroEyebrow: "DEFENSIVE SECURITY / BLUE TEAM",
    heroRole: "Junior SOC Analyst — Blue Team & Incident Response",
    heroTagline: "From the field to the SOC — I bring seven years of frontline discipline to defending systems, one detection at a time.",
    ctaProjects: "View Projects",
    ctaContact: "Contact Me",
    aboutEyebrow: "ABOUT",
    aboutTitle: "About Me",
    aboutBio: "After nearly seven years in B2B sales and CRM, where I learned to manage high-pressure situations, follow structured processes, and communicate clearly with stakeholders under time constraints, I retrained in cybersecurity through an intensive bootcamp, finishing with a 92% final exam score. I'm now building hands-on blue team experience through investigation-style challenges covering network forensics, incident response, and threat hunting, backed by a homelab where I practice detection and analysis in a realistic environment. I bring the same rigor and client-facing communication skills from sales to the SOC — translating technical findings into clear, actionable reporting.",
    statScoreLabel: "Bootcamp Final Exam Score",
    statChallengesLabel: "TryHackMe Blue Team Challenges",
    statLabLabel: "Home SOC Lab",
    statExperienceLabel: "Years Professional Experience",
    skillsEyebrow: "SKILLS",
    skillsTitle: "Tools & Tradecraft",
    skillCategorySiem: "SIEM & Detection",
    skillItemSiem1: "Splunk (log analysis, search & correlation)",
    skillItemSiem2: "SIEM deployment (homelab)",
    skillItemSiem3: "Sigma / detection logic basics",
    skillCategoryThreatHunting: "Incident Response & Forensics",
    skillItemIr1: "Windows event log & PowerShell log analysis",
    skillItemIr2: "Network forensics (Wireshark, tshark)",
    skillItemIr3: "C2 beaconing & DNS tunneling detection",
    skillItemIr4: "Malware triage (PE format, file signature analysis)",
    skillCategoryScripting: "Infrastructure & Networking",
    skillItemInfra1: "Proxmox (virtualization)",
    skillItemInfra2: "pfSense (firewall/network segmentation)",
    skillItemInfra3: "Kali Linux",
    skillItemInfra4: "Tailscale (secure remote access)",
    skillCategoryCerts: "Certifications & Training",
    skillItemCert1: "ISC2 CC (in progress)",
    skillItemCert2: "CompTIA Security+ (in progress)",
    skillItemCert3: "Ironhack Cybersecurity Bootcamp (2026)",
    skillItemCert4: "TryHackMe — SOC Level 1 path completed",
    projectsEyebrow: "PROJECTS",
    projectsTitle: "Featured GitHub Projects",
    project1Desc: "A documented collection of TryHackMe blue team investigation challenges — network forensics, Windows endpoint analysis, incident response, phishing, threat hunting, and malware analysis.",
    project2Desc: "A self-hosted homelab built for hands-on security practice — virtualization, network segmentation, and a SIEM pipeline.",
    project3Desc: "An automation-driven accountability bot combining a chat interface with an LLM backend and a serverless database.",
    projectLinkText: "View on GitHub →",
    contactEyebrow: "CONTACT",
    contactTitle: "Let's Talk",
    contactLine: "Open to Junior SOC Analyst, blue team, and incident response roles.",
    ctaEmail: "Email Me",
    ctaResume: "Resume",
    footerCopyright: "© 2026 Pierre-François Demai. Built with static HTML, CSS, and JS.",
    footerStatus: "Status: Open to Junior SOC Analyst opportunities.",
    pageTitle: "Pierre-François Demai — Junior SOC Analyst",
    metaDescription: "Pierre-François Demai is a junior SOC analyst focused on blue team defense, incident response, and digital forensics.",
  },
  fr: {
    navAbout: "À propos",
    navSkills: "Compétences",
    navProjects: "Projets",
    navContact: "Contact",
    statusBadge: "STATUT : DISPONIBLE",
    heroEyebrow: "SÉCURITÉ DÉFENSIVE / BLUE TEAM",
    heroRole: "Analyste SOC Junior — Blue Team & Réponse aux incidents",
    heroTagline: "Du terrain au SOC — j'apporte sept ans de rigueur de terrain à la défense des systèmes, une détection à la fois.",
    ctaProjects: "Voir les projets",
    ctaContact: "Me contacter",
    aboutEyebrow: "À PROPOS",
    aboutTitle: "À propos de moi",
    aboutBio: "Après près de sept ans dans la vente B2B et la gestion de la relation client (CRM), où j'ai appris à gérer des situations sous pression, à suivre des processus structurés et à communiquer clairement avec les parties prenantes dans des délais contraints, je me suis reconverti en cybersécurité via un bootcamp intensif, terminé avec 92 % à l'examen final. Je construis aujourd'hui une expérience blue team concrète à travers des défis d'investigation couvrant le forensic réseau, la réponse aux incidents et le threat hunting, appuyée par un homelab où je m'entraîne à la détection et à l'analyse dans un environnement réaliste. J'apporte au SOC la même rigueur et les mêmes compétences de communication orientées client acquises dans la vente — en traduisant les résultats techniques en rapports clairs et actionnables.",
    statScoreLabel: "Note à l'examen final du bootcamp",
    statChallengesLabel: "Défis Blue Team sur TryHackMe",
    statLabLabel: "SOC Lab perso",
    statExperienceLabel: "Ans d'expérience professionnelle",
    skillsEyebrow: "COMPÉTENCES",
    skillsTitle: "Outils et savoir-faire",
    skillCategorySiem: "SIEM et détection",
    skillItemSiem1: "Splunk (analyse de logs, recherche et corrélation)",
    skillItemSiem2: "Déploiement SIEM (homelab)",
    skillItemSiem3: "Sigma / bases de la logique de détection",
    skillCategoryThreatHunting: "Réponse aux incidents et forensic",
    skillItemIr1: "Analyse des journaux d'événements Windows et des logs PowerShell",
    skillItemIr2: "Forensic réseau (Wireshark, tshark)",
    skillItemIr3: "Détection de beaconing C2 et de tunneling DNS",
    skillItemIr4: "Triage de malware (format PE, analyse de signatures de fichiers)",
    skillCategoryScripting: "Infrastructure et réseau",
    skillItemInfra1: "Proxmox (virtualisation)",
    skillItemInfra2: "pfSense (pare-feu / segmentation réseau)",
    skillItemInfra3: "Kali Linux",
    skillItemInfra4: "Tailscale (accès distant sécurisé)",
    skillCategoryCerts: "Certifications et formation",
    skillItemCert1: "ISC2 CC (en cours)",
    skillItemCert2: "CompTIA Security+ (en cours)",
    skillItemCert3: "Bootcamp cybersécurité Ironhack (2026)",
    skillItemCert4: "TryHackMe — parcours SOC Level 1 terminé",
    projectsEyebrow: "PROJETS",
    projectsTitle: "Projets GitHub à la une",
    project1Desc: "Une collection documentée de défis d'investigation blue team sur TryHackMe — forensic réseau, analyse de postes Windows, réponse aux incidents, phishing, threat hunting et analyse de malware.",
    project2Desc: "Un homelab auto-hébergé conçu pour la pratique de la sécurité — virtualisation, segmentation réseau et une pipeline SIEM.",
    project3Desc: "Un bot de responsabilisation automatisé combinant une interface de chat, un backend LLM et une base de données serverless.",
    projectLinkText: "Voir sur GitHub →",
    contactEyebrow: "CONTACT",
    contactTitle: "Discutons",
    contactLine: "Ouvert aux postes d'analyste SOC junior, blue team et réponse aux incidents.",
    ctaEmail: "M'envoyer un e-mail",
    ctaResume: "CV",
    footerCopyright: "© 2026 Pierre-François Demai. Site statique en HTML, CSS et JS.",
    footerStatus: "Statut : ouvert aux opportunités d'analyste SOC junior.",
    pageTitle: "Pierre-François Demai — Analyste SOC Junior",
    metaDescription: "Pierre-François Demai est analyste SOC junior, spécialisé en défense blue team, réponse aux incidents et forensic numérique.",
  },
};

const LANGUAGE_STORAGE_KEY = 'preferredLanguage';

function resolveInitialLanguage() {
  const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (stored === 'en' || stored === 'fr') return stored;
  return navigator.language && navigator.language.toLowerCase().startsWith('fr') ? 'fr' : 'en';
}

function applyLanguage(lang) {
  const dict = TRANSLATIONS[lang];
  document.documentElement.lang = lang;

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n;
    if (dict[key] !== undefined) {
      el.textContent = dict[key];
    }
  });

  document.title = dict.pageTitle;
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', dict.metaDescription);
  }

  const enBtn = document.getElementById('lang-en');
  const frBtn = document.getElementById('lang-fr');
  if (enBtn) enBtn.setAttribute('aria-pressed', String(lang === 'en'));
  if (frBtn) frBtn.setAttribute('aria-pressed', String(lang === 'fr'));
}

function initLanguageToggle() {
  const enBtn = document.getElementById('lang-en');
  const frBtn = document.getElementById('lang-fr');
  if (!enBtn || !frBtn) return;

  function switchLanguage(lang) {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    applyLanguage(lang);
    const typewriterEl = document.getElementById('typewriter');
    if (typewriterEl) {
      typewriterEl.textContent = TRANSLATIONS[lang].heroTagline;
    }
  }

  enBtn.addEventListener('click', () => switchLanguage('en'));
  frBtn.addEventListener('click', () => switchLanguage('fr'));
}

function typewrite(el, text, speed) {
  let i = 0;
  function step() {
    if (i <= text.length) {
      el.textContent = text.slice(0, i);
      i += 1;
      setTimeout(step, speed);
    }
  }
  step();
}

function initTypewriter(lang) {
  const el = document.getElementById('typewriter');
  if (!el) return;
  const tagline = TRANSLATIONS[lang].heroTagline;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = tagline;
    return;
  }
  setTimeout(() => typewrite(el, tagline, TYPE_SPEED_MS), TYPE_START_DELAY_MS);
}

function initScrollReveal() {
  const groups = document.querySelectorAll('.reveal-group');
  if (!groups.length) return;

  if (!('IntersectionObserver' in window)) {
    groups.forEach((group) => group.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  groups.forEach((group) => observer.observe(group));
}

document.addEventListener('DOMContentLoaded', () => {
  const initialLanguage = resolveInitialLanguage();
  applyLanguage(initialLanguage);
  initTypewriter(initialLanguage);
  initScrollReveal();
  initLanguageToggle();
});
