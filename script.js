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
    heroRole: "Blue Team Security Analyst — Detection & Incident Response",
    heroTagline: "I help secure systems and keep organizations safer, one detection at a time.",
    ctaProjects: "View Projects",
    ctaContact: "Contact Me",
    aboutEyebrow: "ABOUT",
    aboutTitle: "About Me",
    aboutBio: "I'm a defensive security analyst focused on detection engineering, threat hunting, and incident response. I spend my days writing Sigma rules, tuning SIEM alerts, and chasing down the alerts that turn out to matter. Off the clock, I run a home SOC lab to test attacker techniques against my own detections before they show up in the wild.",
    statYearsLabel: "Years in Security",
    statDetectionsLabel: "Detections Shipped",
    statCertsLabel: "Certifications",
    statLabLabel: "Home SOC Lab",
    skillsEyebrow: "SKILLS",
    skillsTitle: "Tools & Tradecraft",
    skillCategorySiem: "SIEM & Detection",
    skillCategoryThreatHunting: "Threat Hunting & IR",
    skillCategoryScripting: "Scripting & Automation",
    skillCategoryCerts: "Certifications",
    projectsEyebrow: "PROJECTS",
    projectsTitle: "Featured GitHub Projects",
    project1Desc: "A curated set of Sigma rules for detecting common lateral-movement and persistence techniques, mapped to MITRE ATT&CK.",
    project2Desc: "Python toolkit for normalizing and correlating logs from mismatched EDR and firewall exports during incident response.",
    project3Desc: "Infrastructure-as-code for a home SOC lab: Elastic stack, Sysmon-instrumented Windows hosts, and a simulated attacker range.",
    project4Desc: "Incident response playbooks and SOAR automation scripts for common alert types, built to cut triage time.",
    projectLinkText: "View on GitHub →",
    contactEyebrow: "CONTACT",
    contactTitle: "Let's Talk",
    contactLine: "Open to blue team, detection engineering, and incident response roles.",
    ctaEmail: "Email Me",
    ctaResume: "Resume",
    footerCopyright: "© 2026 Alex Rivera. Built with static HTML, CSS, and JS.",
    footerStatus: "Status: Actively interviewing.",
    pageTitle: "Alex Rivera — Defensive Security Analyst",
    metaDescription: "Alex Rivera is a defensive security analyst specializing in detection engineering, threat hunting, and incident response.",
  },
  fr: {
    navAbout: "À propos",
    navSkills: "Compétences",
    navProjects: "Projets",
    navContact: "Contact",
    statusBadge: "STATUT : DISPONIBLE",
    heroEyebrow: "SÉCURITÉ DÉFENSIVE / BLUE TEAM",
    heroRole: "Analyste sécurité Blue Team — Détection et réponse aux incidents",
    heroTagline: "J'aide à sécuriser les systèmes et à rendre les entreprises plus sûres, une détection à la fois.",
    ctaProjects: "Voir les projets",
    ctaContact: "Me contacter",
    aboutEyebrow: "À PROPOS",
    aboutTitle: "À propos de moi",
    aboutBio: "Je suis analyste en sécurité défensive, spécialisé dans l'ingénierie de détection, le threat hunting et la réponse aux incidents. Je passe mes journées à écrire des règles Sigma, à ajuster les alertes SIEM, et à traquer celles qui comptent vraiment. En dehors du travail, je fais tourner un SOC lab chez moi pour tester des techniques d'attaque contre mes propres détections avant qu'elles n'apparaissent dans la nature.",
    statYearsLabel: "Ans en sécurité",
    statDetectionsLabel: "Détections déployées",
    statCertsLabel: "Certifications",
    statLabLabel: "SOC Lab perso",
    skillsEyebrow: "COMPÉTENCES",
    skillsTitle: "Outils et savoir-faire",
    skillCategorySiem: "SIEM et détection",
    skillCategoryThreatHunting: "Threat Hunting et réponse aux incidents",
    skillCategoryScripting: "Scripts et automatisation",
    skillCategoryCerts: "Certifications",
    projectsEyebrow: "PROJETS",
    projectsTitle: "Projets GitHub à la une",
    project1Desc: "Un ensemble de règles Sigma soigneusement sélectionnées pour détecter les techniques courantes de mouvement latéral et de persistance, associées à MITRE ATT&CK.",
    project2Desc: "Boîte à outils Python pour normaliser et corréler des journaux issus d'exports EDR et pare-feu hétérogènes lors d'une réponse à incident.",
    project3Desc: "Infrastructure-as-code pour un SOC lab personnel : stack Elastic, hôtes Windows instrumentés avec Sysmon, et un environnement d'attaque simulé.",
    project4Desc: "Playbooks de réponse à incident et scripts d'automatisation SOAR pour les types d'alertes courants, conçus pour réduire le temps de tri.",
    projectLinkText: "Voir sur GitHub →",
    contactEyebrow: "CONTACT",
    contactTitle: "Discutons",
    contactLine: "Ouvert aux postes en Blue Team, ingénierie de détection et réponse aux incidents.",
    ctaEmail: "M'envoyer un e-mail",
    ctaResume: "CV",
    footerCopyright: "© 2026 Alex Rivera. Site statique en HTML, CSS et JS.",
    footerStatus: "Statut : en recherche active.",
    pageTitle: "Alex Rivera — Analyste en sécurité défensive",
    metaDescription: "Alex Rivera est analyste en sécurité défensive, spécialisé en ingénierie de détection, threat hunting et réponse aux incidents.",
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
