import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve, dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, '..', 'dist');

const routes = ['/', '/lab', '/projects', '/stack', '/contact', '/blog', '/certificates', '/cv', '/privacy', '/terms', '/cookies', '/disclaimer'];

const indexHtml = readFileSync(resolve(distDir, 'index.html'), 'utf-8');

const jsMatch = indexHtml.match(/<script type="module" src="([^"]+)"><\/script>/);
const cssMatches = [...indexHtml.matchAll(/<link rel="stylesheet" href="([^"]+)">/g)];

const jsSrc = jsMatch ? jsMatch[1] : '';
const cssLinks = cssMatches.map((m) => `<link rel="stylesheet" href="${m[1]}" />`).join('\n    ');

const metaContent: Record<string, { title: string; desc: string }> = {
  '/': { title: 'Not1Sam | Software Engineer', desc: 'Portfolio of Not1Sam, Software Engineer and Open Source Contributor from Morocco building clean, structured software.' },
  '/lab': { title: 'Lab | Not1Sam', desc: 'Self-hosted homelab infrastructure and development environment.' },
  '/projects': { title: 'Projects | Not1Sam', desc: 'Selected open source projects and contributions by Not1Sam.' },
  '/stack': { title: 'Tech Stack | Not1Sam', desc: 'Technologies, languages, and tools used by Not1Sam.' },
  '/contact': { title: 'Contact | Not1Sam', desc: 'Get in touch with Not1Sam for collaborations and opportunities.' },
  '/blog': { title: 'Blog | Not1Sam', desc: 'Technical blog posts and dev logs by Not1Sam.' },
  '/certificates': { title: 'Certificates | Not1Sam', desc: 'Professional certifications and achievements.' },
  '/cv': { title: 'CV | Not1Sam', desc: 'Resume and work experience of Not1Sam.' },
  '/privacy': { title: 'Privacy Policy | Not1Sam', desc: 'Privacy policy for Not1Sam Portfolio — how we handle data and protect your privacy.' },
  '/terms': { title: 'Terms of Service | Not1Sam', desc: 'Terms of service and conditions for using Not1Sam Portfolio.' },
  '/cookies': { title: 'Cookie Policy | Not1Sam', desc: 'Cookie policy for Not1Sam Portfolio — how we use cookies and local storage.' },
  '/disclaimer': { title: 'Disclaimer | Not1Sam', desc: 'Legal disclaimer for Not1Sam Portfolio — limitations of liability and content accuracy.' },
};

function getRouteContent(route: string): string {
  switch (route) {
    case '/':
      return `
        <section>
          <span style="color:#39ff14;font-size:0.85rem;font-weight:600;letter-spacing:0.15em;text-transform:uppercase">SYSTEM STATUS</span>
          <h1 style="font-size:clamp(3rem,8vw,5rem);font-family:'Space Grotesk',sans-serif;margin-top:0.5rem">Not1Sam.</h1>
          <p style="font-size:clamp(1.2rem,2.5vw,1.8rem);color:#888;margin-top:1rem">Software Engineer &amp; Open Source Contributor</p>
          <p style="font-size:1.05rem;line-height:1.6;color:#888;margin-top:1rem;max-width:600px">Building clean, structured, purposeful software — from REST APIs to containerised infrastructure.</p>
          <p style="font-size:1.05rem;line-height:1.6;color:#888;margin-top:1rem">I run a self-hosted homelab powered by Unraid, WireGuard VPN, and Docker containers. I build with Python (FastAPI), TypeScript (React/Vite), and deploy via GitHub Actions to GitHub Pages and Docker/Portainer.</p>
        </section>
        <section style="margin-top:4rem;border-top:1px solid #262626;padding-top:4rem">
          <h2 style="font-size:2.5rem;font-family:'Space Grotesk',sans-serif">Selected Work.</h2>
          <p style="color:#888;margin-top:1rem">Check out my projects on GitHub: <a href="https://github.com/Not1Sam" style="color:#39ff14">github.com/Not1Sam</a></p>
        </section>`;
    case '/lab':
      return `
        <section>
          <h1 style="font-size:clamp(2.5rem,6vw,4rem);font-family:'Space Grotesk',sans-serif">Self-Hosted Homelab.</h1>
          <div style="margin-top:2rem">
            <h3 style="font-size:1.8rem;color:#39ff14;font-family:'Space Grotesk',sans-serif">Personal Infrastructure</h3>
            <p style="font-size:1.05rem;line-height:1.6;color:#888;margin-top:1rem">I run a dedicated self-hosted server powered by Unraid. It acts as the backbone for my digital life and development workflow. By leveraging Dev Containers, I can spin up isolated, reproducible environments directly on the server.</p>
            <div style="margin-top:2rem">
              <h4 style="font-size:1.2rem;color:#39ff14;font-family:'Space Grotesk',sans-serif">Active Services</h4>
              <ul style="color:#888;margin-top:1rem;list-style:none;padding:0">
                <li style="padding:0.5rem 0;border-bottom:1px solid #262626"><strong style="color:#fff">Arch Linux</strong> — Daily Driver OS (I use Arch btw)</li>
                <li style="padding:0.5rem 0;border-bottom:1px solid #262626"><strong style="color:#fff">Unraid</strong> — Core Server OS &amp; Storage Array</li>
                <li style="padding:0.5rem 0;border-bottom:1px solid #262626"><strong style="color:#fff">Plex</strong> — Media Streaming</li>
                <li style="padding:0.5rem 0;border-bottom:1px solid #262626"><strong style="color:#fff">Bitwarden</strong> — Password Management</li>
                <li style="padding:0.5rem 0;border-bottom:1px solid #262626"><strong style="color:#fff">WireGuard VPN</strong> — Secure Remote Access</li>
                <li style="padding:0.5rem 0"><strong style="color:#fff">Dev Containers</strong> — Isolated Development</li>
              </ul>
            </div>
          </div>
        </section>`;
    case '/stack':
      return `
        <section>
          <h1 style="font-size:clamp(2.5rem,6vw,4rem);font-family:'Space Grotesk',sans-serif">Tech Stack.</h1>
          <p style="color:#888;margin-top:1rem;margin-bottom:2rem">Technologies, languages, and tools I work with.</p>
          <div style="margin-bottom:2rem">
            <h3 style="font-size:1.3rem;color:#39ff14;text-transform:uppercase;letter-spacing:0.1em;font-family:'Space Grotesk',sans-serif">Languages</h3>
            <p style="color:#888;margin-top:0.5rem">Python, TypeScript, JavaScript, Java, Bash</p>
          </div>
          <div style="margin-bottom:2rem">
            <h3 style="font-size:1.3rem;color:#39ff14;text-transform:uppercase;letter-spacing:0.1em;font-family:'Space Grotesk',sans-serif">Frontend</h3>
            <p style="color:#888;margin-top:0.5rem">React, Vite, Tailwind CSS, Next.js</p>
          </div>
          <div style="margin-bottom:2rem">
            <h3 style="font-size:1.3rem;color:#39ff14;text-transform:uppercase;letter-spacing:0.1em;font-family:'Space Grotesk',sans-serif">Backend</h3>
            <p style="color:#888;margin-top:0.5rem">FastAPI, Node.js, Express, SQLAlchemy, PostgreSQL, SQLite</p>
          </div>
          <div style="margin-bottom:2rem">
            <h3 style="font-size:1.3rem;color:#39ff14;text-transform:uppercase;letter-spacing:0.1em;font-family:'Space Grotesk',sans-serif">DevOps</h3>
            <p style="color:#888;margin-top:0.5rem">Docker, Portainer, GitHub Actions, Nginx, Linux, Arch Linux</p>
          </div>
          <div style="margin-bottom:2rem">
            <h3 style="font-size:1.3rem;color:#39ff14;text-transform:uppercase;letter-spacing:0.1em;font-family:'Space Grotesk',sans-serif">Tools</h3>
            <p style="color:#888;margin-top:0.5rem">Git, Obsidian, VS Code, Figma</p>
          </div>
        </section>`;
    case '/contact':
      return `
        <section>
          <h1 style="font-size:clamp(2.5rem,6vw,4rem);font-family:'Space Grotesk',sans-serif">Contact.</h1>
          <p style="color:#888;margin-top:1rem;margin-bottom:2rem">Get in touch via the form below or connect on social media.</p>
          <div style="max-width:500px">
            <p style="color:#888;margin-bottom:1rem">Send a message and I will get back to you as soon as possible.</p>
            <p style="color:#888">You can also reach me on GitHub: <a href="https://github.com/Not1Sam" style="color:#39ff14">github.com/Not1Sam</a></p>
          </div>
        </section>`;
    case '/blog':
      return `
        <section>
          <h1 style="font-size:clamp(2.5rem,6vw,4rem);font-family:'Space Grotesk',sans-serif">Blog.</h1>
          <p style="color:#888;margin-top:1rem">Technical blog posts and dev logs.</p>
          <p style="color:#888;margin-top:1rem">Blog posts are loaded from the backend API at <a href="https://x7k9m2.bungus.fyi/api/blog" style="color:#39ff14">x7k9m2.bungus.fyi/api/blog</a>.</p>
        </section>`;
    case '/certificates':
      return `
        <section>
          <h1 style="font-size:clamp(2.5rem,6vw,4rem);font-family:'Space Grotesk',sans-serif">Certificates.</h1>
          <p style="color:#888;margin-top:1rem">Professional certifications and achievements.</p>
          <p style="color:#888;margin-top:1rem">Certifications are loaded from the backend API at <a href="https://x7k9m2.bungus.fyi/api/certificates" style="color:#39ff14">x7k9m2.bungus.fyi/api/certificates</a>.</p>
        </section>`;
    case '/cv':
      return `
        <section>
          <h1 style="font-size:clamp(2.5rem,6vw,4rem);font-family:'Space Grotesk',sans-serif">CV.</h1>
          <p style="color:#888;margin-top:1rem;font-size:1.1rem">Houssam Belkasaoui — Software Engineer from Morocco</p>
          <div style="margin-top:3rem">
            <h2 style="font-size:1.8rem;font-family:'Space Grotesk',sans-serif">Skills</h2>
            <div style="margin-top:1.5rem">
              <h3 style="font-size:1.1rem;color:#39ff14;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:0.5rem">Languages</h3>
              <p style="color:#888">Python, TypeScript, JavaScript, Java, Bash</p>
            </div>
            <div style="margin-top:1rem">
              <h3 style="font-size:1.1rem;color:#39ff14;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:0.5rem">Frontend</h3>
              <p style="color:#888">React, Vite, Tailwind CSS, Next.js</p>
            </div>
            <div style="margin-top:1rem">
              <h3 style="font-size:1.1rem;color:#39ff14;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:0.5rem">Backend</h3>
              <p style="color:#888">FastAPI, Node.js, Express, SQLAlchemy, PostgreSQL, SQLite</p>
            </div>
            <div style="margin-top:1rem">
              <h3 style="font-size:1.1rem;color:#39ff14;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:0.5rem">DevOps</h3>
              <p style="color:#888">Docker, Portainer, GitHub Actions, Nginx, Linux, Arch Linux</p>
            </div>
            <div style="margin-top:1rem">
              <h3 style="font-size:1.1rem;color:#39ff14;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:0.5rem">Tools</h3>
              <p style="color:#888">Git, Obsidian, VS Code, Figma</p>
            </div>
          </div>
          <div style="margin-top:3rem">
            <h2 style="font-size:1.8rem;font-family:'Space Grotesk',sans-serif">Education</h2>
            <p style="color:#888;margin-top:1rem">Software Engineering Student — EST Salé, Morocco</p>
          </div>
          <div style="margin-top:2rem">
            <h2 style="font-size:1.8rem;font-family:'Space Grotesk',sans-serif">Interests</h2>
            <p style="color:#888;margin-top:1rem">Open source, self-hosting, containerization, and building tools that make a difference.</p>
          </div>
        </section>`;
    case '/privacy':
      return `
        <section>
          <h1 style="font-size:clamp(2.5rem,6vw,4rem);font-family:'Space Grotesk',sans-serif">Privacy Policy.</h1>
          <p style="color:#888;font-size:0.85rem;font-family:monospace;margin-bottom:2rem">Last updated: July 3, 2026</p>
          <div style="display:flex;flex-direction:column;gap:2.5rem;color:#888;line-height:1.6">
            <div>
              <h2 style="font-size:1.3rem;color:#fff;font-family:'Space Grotesk',sans-serif;margin-bottom:1rem">1. Introduction</h2>
              <p>Welcome to Not1Sam Portfolio. This privacy policy explains how we collect, use, and protect information when you visit this website and interact with our services.</p>
            </div>
            <div>
              <h2 style="font-size:1.3rem;color:#fff;font-family:'Space Grotesk',sans-serif;margin-bottom:1rem">2. Information We Collect</h2>
              <p>When you submit a message through our contact form, we collect your name, email address, and the message content. We do not use cookies, tracking pixels, analytics services, or any third-party tracking tools.</p>
            </div>
            <div>
              <h2 style="font-size:1.3rem;color:#fff;font-family:'Space Grotesk',sans-serif;margin-bottom:1rem">3. How We Use Your Information</h2>
              <p>We use contact form submissions solely to respond to your inquiries. We do not sell, share, or use your personal data for marketing purposes.</p>
            </div>
            <div>
              <h2 style="font-size:1.3rem;color:#fff;font-family:'Space Grotesk',sans-serif;margin-bottom:1rem">4. Data Security</h2>
              <p>We implement reasonable security measures to protect your data. The backend API is served over HTTPS via Cloudflare Tunnel.</p>
            </div>
            <div>
              <h2 style="font-size:1.3rem;color:#fff;font-family:'Space Grotesk',sans-serif;margin-bottom:1rem">5. Contact</h2>
              <p>For questions about this privacy policy, contact us via the /contact page or through GitHub at github.com/Not1Sam.</p>
            </div>
          </div>
        </section>`;
    case '/terms':
      return `
        <section>
          <h1 style="font-size:clamp(2.5rem,6vw,4rem);font-family:'Space Grotesk',sans-serif">Terms of Service.</h1>
          <p style="color:#888;font-size:0.85rem;font-family:monospace;margin-bottom:2rem">Last updated: July 3, 2026</p>
          <div style="display:flex;flex-direction:column;gap:2.5rem;color:#888;line-height:1.6">
            <div>
              <h2 style="font-size:1.3rem;color:#fff;font-family:'Space Grotesk',sans-serif;margin-bottom:1rem">1. Acceptance of Terms</h2>
              <p>By accessing and using this website, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, you must not use this website.</p>
            </div>
            <div>
              <h2 style="font-size:1.3rem;color:#fff;font-family:'Space Grotesk',sans-serif;margin-bottom:1rem">2. Use of This Website</h2>
              <p>You may browse publicly available content and submit messages through the contact form. You must not attempt to gain unauthorized access to the admin panel or submit spam or malicious content.</p>
            </div>
            <div>
              <h2 style="font-size:1.3rem;color:#fff;font-family:'Space Grotesk',sans-serif;margin-bottom:1rem">3. Intellectual Property</h2>
              <p>All content on this website is the property of Houssam Belkasaoui (Not1Sam). The source code is available on GitHub under a restrictive license that prohibits commercial or academic use.</p>
            </div>
            <div>
              <h2 style="font-size:1.3rem;color:#fff;font-family:'Space Grotesk',sans-serif;margin-bottom:1rem">4. Limitation of Liability</h2>
              <p>This website is provided "as is" without warranties of any kind. We are not responsible for any damages arising from the use or inability to use this website.</p>
            </div>
            <div>
              <h2 style="font-size:1.3rem;color:#fff;font-family:'Space Grotesk',sans-serif;margin-bottom:1rem">5. Governing Law</h2>
              <p>These terms are governed by the laws of Morocco. Any disputes arising from the use of this website shall be resolved in the courts of Morocco.</p>
            </div>
          </div>
        </section>`;
    case '/cookies':
      return `
        <section>
          <h1 style="font-size:clamp(2.5rem,6vw,4rem);font-family:'Space Grotesk',sans-serif">Cookie Policy.</h1>
          <p style="color:#888;font-size:0.85rem;font-family:monospace;margin-bottom:2rem">Last updated: July 3, 2026</p>
          <div style="display:flex;flex-direction:column;gap:2.5rem;color:#888;line-height:1.6">
            <div>
              <h2 style="font-size:1.3rem;color:#fff;font-family:'Space Grotesk',sans-serif;margin-bottom:1rem">1. What Are Cookies</h2>
              <p>Cookies are small text files that websites place on your device to store information.</p>
            </div>
            <div>
              <h2 style="font-size:1.3rem;color:#39ff14;font-family:'Space Grotesk',sans-serif;margin-bottom:1rem">2. Our Use of Cookies</h2>
              <p><strong style="color:#fff">This website does not use cookies.</strong> We do not deploy any first-party cookies, third-party cookies, tracking pixels, or similar technologies.</p>
              <p style="margin-top:1rem">The only local storage used is localStorage for theme preference, sessionStorage for GitHub API caching, and localStorage for admin authentication tokens.</p>
            </div>
            <div>
              <h2 style="font-size:1.3rem;color:#fff;font-family:'Space Grotesk',sans-serif;margin-bottom:1rem">3. Third-Party Services</h2>
              <p>Google Fonts and GitHub may set their own cookies as part of font delivery and navigation. We have no control over cookies set by these external services.</p>
            </div>
          </div>
        </section>`;
    case '/disclaimer':
      return `
        <section>
          <h1 style="font-size:clamp(2.5rem,6vw,4rem);font-family:'Space Grotesk',sans-serif">Disclaimer.</h1>
          <p style="color:#888;font-size:0.85rem;font-family:monospace;margin-bottom:2rem">Last updated: July 3, 2026</p>
          <div style="display:flex;flex-direction:column;gap:2.5rem;color:#888;line-height:1.6">
            <div>
              <h2 style="font-size:1.3rem;color:#fff;font-family:'Space Grotesk',sans-serif;margin-bottom:1rem">1. General Information</h2>
              <p>The information provided on this website is for general informational purposes only. We make no representation or warranty regarding the accuracy, adequacy, or completeness of any information on the site.</p>
            </div>
            <div>
              <h2 style="font-size:1.3rem;color:#fff;font-family:'Space Grotesk',sans-serif;margin-bottom:1rem">2. Project and Code Disclaimer</h2>
              <p>Code examples, projects, and technical demonstrations are provided "as is" without warranty of any kind. The source code is available on GitHub under a restrictive license that prohibits any commercial or academic use.</p>
            </div>
            <div>
              <h2 style="font-size:1.3rem;color:#fff;font-family:'Space Grotesk',sans-serif;margin-bottom:1rem">3. Limitation of Liability</h2>
              <p>In no event shall we be liable for any loss or damage arising from the use of this website, including indirect or consequential loss or damage.</p>
            </div>
            <div>
              <h2 style="font-size:1.3rem;color:#fff;font-family:'Space Grotesk',sans-serif;margin-bottom:1rem">4. Contact</h2>
              <p>If you have any questions about this disclaimer, please contact us via the /contact page or through GitHub at github.com/Not1Sam.</p>
            </div>
          </div>
        </section>`;
    default:
      return '';
  }
}

function generateHtml(route: string, content: string) {
  const meta = metaContent[route] || metaContent['/'];
  const canonicalUrl = `https://not1sam.github.io${route}`;

  return `<!DOCTYPE html>
<html lang="en" data-theme="dark">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="manifest" href="/manifest.json" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="${meta.desc}" />
    <meta name="keywords" content="Not1Sam, Houssam Belkasaoui, Software Engineer, Portfolio, Morocco, React, Docker, Python, FastAPI" />
    <meta property="og:title" content="${meta.title}" />
    <meta property="og:description" content="${meta.desc}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:site_name" content="Not1Sam" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="${meta.title}" />
    <meta name="twitter:description" content="${meta.desc}" />
    <meta http-equiv="X-Content-Type-Options" content="nosniff" />
    <meta http-equiv="X-Frame-Options" content="DENY" />
    <meta http-equiv="X-XSS-Protection" content="1; mode=block" />
    <meta http-equiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
    <meta http-equiv="Permissions-Policy" content="camera=(), microphone=(), geolocation=(), payment=()" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="${canonicalUrl}" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="preconnect" href="https://x7k9m2.bungus.fyi" />
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
    ${cssLinks}
    <title>${meta.title}</title>
  </head>
  <body style="background:#03080a;color:#e0f2f7;font-family:Inter,sans-serif;margin:0;overflow-x:hidden">
    <div id="root">
      <main style="max-width:1200px;margin:0 auto;padding:1.5rem">
        ${content}
      </main>
    </div>
    <script type="module" src="${jsSrc}"></script>
  </body>
</html>`;
}

console.log('Pre-rendering routes...');
for (const route of routes) {
  const content = getRouteContent(route);
  const html = generateHtml(route, content);

  if (route === '/') {
    writeFileSync(resolve(distDir, 'index.html'), html);
    console.log(`  ✓ / (index.html)`);
  } else {
    const dir = join(distDir, route);
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
    writeFileSync(resolve(dir, 'index.html'), html);
    console.log(`  ✓ ${route}`);
  }
}
console.log('Done! All routes pre-rendered with static HTML content for bots and crawlers.');
