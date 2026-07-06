import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SITE_URL, GITHUB_USERNAME } from "../lib/constants";

const SEO_DATA: Record<string, { title: string; description: string; keywords: string; type?: string }> = {
  "/": {
    title: "Not1Sam — Software Engineer & Homelab Engineer from Morocco",
    description: "Portfolio of Houssam Belkasaoui (Not1Sam). Software Engineer, Networking Enthusiast, Homelaber from Morocco building scalable systems with React, FastAPI, and Docker.",
    keywords: "Not1Sam, Houssam Belkasaoui, Software Engineer, Portfolio, Morocco, React, FastAPI, Docker, Homelab, Python, TypeScript",
    type: "profile",
  },
  "/lab": {
    title: "Lab — Not1Sam's Self-Hosted Homelab",
    description: "Explore Not1Sam's self-hosted homelab infrastructure powered by Unraid, Docker, WireGuard VPN, Plex, and Dev Containers.",
    keywords: "homelab, self-hosted, Unraid, Docker, WireGuard, Plex, Bitwarden, dev containers, infrastructure",
    type: "article",
  },
  "/projects": {
    title: "Projects — Not1Sam's Open Source Work",
    description: "Selected open source projects and contributions by Not1Sam. Software engineering, networking tools, and infrastructure projects.",
    keywords: "open source, projects, GitHub, software engineering, contributions",
    type: "collection",
  },
  "/stack": {
    title: "Tech Stack — Not1Sam's Technologies",
    description: "Technologies, languages, frameworks, and tools used by Not1Sam: Python, TypeScript, React, Vite, FastAPI, Docker, PostgreSQL, and more.",
    keywords: "tech stack, technologies, Python, TypeScript, React, Vite, FastAPI, Docker, PostgreSQL, Tailwind CSS",
    type: "article",
  },
  "/contact": {
    title: "Contact — Get in Touch with Not1Sam",
    description: "Contact Not1Sam for collaboration, freelance work, or engineering opportunities. Reach out via the contact form or social links.",
    keywords: "contact, hire, collaboration, freelance, software engineer, Morocco",
    type: "website",
  },
  "/blog": {
    title: "Blog — Not1Sam's Dev Logs & Technical Articles",
    description: "Technical blog posts, dev logs, tutorials, and engineering rants by Not1Sam. Topics include full-stack development, DevOps, and homelab infrastructure.",
    keywords: "blog, dev logs, tutorials, technical articles, software engineering, full-stack, DevOps",
    type: "blog",
  },
  "/admin": { title: "Admin — Not1Sam", description: "Admin panel.", keywords: "admin", type: "website" },
  "/certificates": {
    title: "Certificates — Not1Sam's Professional Certifications",
    description: "Professional certifications and achievements earned by Not1Sam in software engineering, networking, and cloud technologies.",
    keywords: "certificates, certifications, achievements, professional development",
    type: "collection",
  },
  "/cv": {
    title: "CV — Houssam Belkasaoui (Not1Sam) Resume",
    description: "Resume and curriculum vitae of Houssam Belkasaoui (Not1Sam). Software Engineer from Morocco with experience in full-stack development and infrastructure.",
    keywords: "CV, resume, curriculum vitae, Houssam Belkasaoui, software engineer, Morocco",
    type: "profile",
  },
  "/privacy": {
    title: "Privacy Policy — Not1Sam Portfolio",
    description: "Privacy policy for Not1Sam Portfolio. How we collect, use, and protect your data when you visit this website.",
    keywords: "privacy policy, data protection, GDPR",
    type: "article",
  },
  "/terms": {
    title: "Terms of Service — Not1Sam Portfolio",
    description: "Terms of service and conditions for using Not1Sam Portfolio website and services.",
    keywords: "terms of service, legal, conditions",
    type: "article",
  },
  "/cookies": {
    title: "Cookie Policy — Not1Sam Portfolio",
    description: "Cookie policy for Not1Sam Portfolio. How we use cookies and local storage on this website.",
    keywords: "cookie policy, cookies, local storage",
    type: "article",
  },
  "/disclaimer": {
    title: "Disclaimer — Not1Sam Portfolio",
    description: "Legal disclaimer for Not1Sam Portfolio. Limitations of liability and content accuracy.",
    keywords: "disclaimer, legal, liability",
    type: "article",
  },
};

const PERSON_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: "Houssam Belkasaoui",
  alternateName: "Not1Sam",
  url: SITE_URL,
  image: `${SITE_URL}/og-image.svg`,
  jobTitle: "Software Engineer",
  description: "Software Engineer, Networking Enthusiast, and Homelab tinkerer from Morocco building scalable systems.",
  worksFor: { "@type": "Organization", name: "Freelance" },
  address: { "@type": "PostalAddress", addressCountry: "MA", addressLocality: "Salé" },
  sameAs: [
    `https://github.com/${GITHUB_USERNAME}`,
    "https://linktr.ee/not1sam",
  ],
  knowsAbout: [
    "Software Engineering", "Full-Stack Development", "React", "TypeScript", "Python",
    "FastAPI", "Docker", "Self-Hosting", "Networking", "Linux", "Arch Linux",
    "DevOps", "Homelab Infrastructure", "WireGuard VPN", "PostgreSQL", "SQLite",
  ],
  alumniOf: { "@type": "EducationalOrganization", name: "EST Salé — Software Engineering" },
};

const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "Not1Sam Portfolio",
  description: "Portfolio of Not1Sam — Software Engineer from Morocco",
  author: { "@id": `${SITE_URL}/#person` },
  inLanguage: "en",
};

const FAQ_SCHEMA = [
  {
    "@type": "Question",
    name: "Who is Not1Sam?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Not1Sam is the online alias of Houssam Belkasaoui, a Software Engineer from Salé, Morocco. He specializes in full-stack web development with React and FastAPI, and runs a self-hosted homelab powered by Unraid, Docker, and WireGuard VPN.",
    },
  },
  {
    "@type": "Question",
    name: "What technologies does Not1Sam work with?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Not1Sam works with Python (FastAPI, SQLAlchemy), TypeScript (React, Vite, Tailwind CSS), Docker, PostgreSQL, SQLite, Linux (Arch Linux, Unraid), WireGuard VPN, Nginx, and GitHub Actions for CI/CD.",
    },
  },
  {
    "@type": "Question",
    name: "What is Not1Sam's homelab setup?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Not1Sam runs a dedicated homelab server powered by Unraid with services including Plex (media streaming), Bitwarden (password management), WireGuard VPN (secure remote access), and Dev Containers (isolated development environments). The daily driver OS is Arch Linux.",
    },
  },
  {
    "@type": "Question",
    name: "How can I contact Not1Sam for work?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "You can reach Not1Sam through the contact form on the /contact page of this portfolio, or via GitHub at github.com/Not1Sam. He is open to freelance software engineering, collaboration, and technical consulting opportunities.",
    },
  },
  {
    "@type": "Question",
    name: "Does Not1Sam use cookies or tracking?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "No. This website does not use cookies, tracking pixels, analytics services, or any third-party tracking tools. The only local storage used is: localStorage for admin auth tokens and theme preference, and sessionStorage for GitHub API response caching.",
    },
  },
];

function setMeta(name: string, content: string, attr: string = "name") {
  let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function injectJsonLd(id: string, data: object | object[]) {
  let el = document.querySelector(`script[type="application/ld+json"][data-id="${id}"]`) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement("script");
    el.setAttribute("type", "application/ld+json");
    el.setAttribute("data-id", id);
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

export function SEO() {
  const { pathname } = useLocation();
  useEffect(() => {
    const data = SEO_DATA[pathname] || {
      title: "Not1Sam",
      description: "Portfolio of Not1Sam, Software Engineer from Morocco.",
      keywords: "Not1Sam, Software Engineer",
    };
    const url = `${SITE_URL}${pathname}`;

    document.title = data.title;

    setMeta("description", data.description);
    setMeta("keywords", data.keywords);
    setMeta("author", "Houssam Belkasaoui (Not1Sam)");
    setMeta("robots", "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1");
    setMeta("googlebot", "index, follow");

    setMeta("og:title", data.title, "property");
    setMeta("og:description", data.description, "property");
    setMeta("og:type", data.type || "website", "property");
    setMeta("og:url", url, "property");
    setMeta("og:site_name", "Not1Sam", "property");
    setMeta("og:locale", "en_US", "property");
    setMeta("og:image", `${SITE_URL}/og-image.svg`, "property");
    setMeta("og:image:width", "1200", "property");
    setMeta("og:image:height", "630", "property");
    setMeta("og:image:alt", "Not1Sam — Software Engineer from Morocco", "property");

    setMeta("twitter:card", "summary_large_image", "property");
    setMeta("twitter:title", data.title, "property");
    setMeta("twitter:description", data.description, "property");
    setMeta("twitter:image", `${SITE_URL}/og-image.svg`, "property");
    setMeta("twitter:image:alt", "Not1Sam — Software Engineer from Morocco", "property");
    setMeta("twitter:creator", "@Not1Sam_", "property");
    setMeta("twitter:site", "@Not1Sam_", "property");

    setLink("canonical", url);

    injectJsonLd("person", PERSON_SCHEMA);
    injectJsonLd("website", WEBSITE_SCHEMA);

    const isHome = pathname === "/";
    if (isHome) {
      const homeBreadcrumb = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        ],
      };
      injectJsonLd("breadcrumb-home", homeBreadcrumb);

      const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQ_SCHEMA,
      };
      injectJsonLd("faq", faqSchema);

      const profilePage = {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/#profile`,
        url: SITE_URL,
        name: data.title,
        description: data.description,
        mainEntity: { "@id": `${SITE_URL}/#person` },
        inLanguage: "en",
      };
      injectJsonLd("profile-page", profilePage);
    } else {
      const segments = pathname.split("/").filter(Boolean);
      const breadcrumbs = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          ...segments.map((seg, i) => ({
            "@type": "ListItem",
            position: i + 2,
            name: seg.charAt(0).toUpperCase() + seg.slice(1),
            item: `${SITE_URL}/${segments.slice(0, i + 1).join("/")}`,
          })),
        ],
      };
      injectJsonLd("breadcrumb", breadcrumbs);
    }

    return () => {
      document.querySelectorAll('script[type="application/ld+json"][data-id="breadcrumb"]').forEach((e) => e.remove());
      document.querySelector('script[type="application/ld+json"][data-id="breadcrumb-home"]')?.remove();
      document.querySelector('script[type="application/ld+json"][data-id="faq"]')?.remove();
      document.querySelector('script[type="application/ld+json"][data-id="profile-page"]')?.remove();
    };
  }, [pathname]);
  return null;
}
