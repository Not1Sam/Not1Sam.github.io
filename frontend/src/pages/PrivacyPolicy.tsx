export function PrivacyPolicy() {
  return (
    <main className="py-8 max-w-[800px] animate-fade-in">
      <h1 className="text-[clamp(2rem,5vw,3.5rem)] tracking-tight brand-font mb-4">Privacy Policy.</h1>
      <p className="text-secondary text-[0.85rem] font-mono mb-8">Last updated: July 3, 2026</p>

      <div className="flex flex-col gap-8 text-secondary leading-relaxed">
        <section>
          <h2 className="text-[1.3rem] mb-4 brand-font text-primary">1. Introduction</h2>
          <p>
            Welcome to Not1Sam Portfolio ("we", "our", "this site"). This privacy policy explains how we collect,
            use, and protect information when you visit this website at <span className="fluo-text font-mono">not1sam.github.io</span> and
            interact with our services.
          </p>
        </section>

        <section>
          <h2 className="text-[1.3rem] mb-4 brand-font text-primary">2. Information We Collect</h2>
          <div className="flex flex-col gap-3">
            <h3 className="text-[1.1rem] font-bold brand-font">Contact Form Submissions</h3>
            <p>
              When you submit a message through our contact form, we collect your name, email address, and the
              message content. This data is stored in our database and is accessible only by the site administrator.
            </p>
            <h3 className="text-[1.1rem] font-bold brand-font">Technical Data</h3>
            <p>
              We do not use cookies, tracking pixels, analytics services, or any third-party tracking tools.
              Your visit is not tracked or profiled.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-[1.3rem] mb-4 brand-font text-primary">3. How We Use Your Information</h2>
          <p>We use contact form submissions solely to respond to your inquiries. We do not:</p>
          <ul className="list-disc pl-6 mt-2 flex flex-col gap-2">
            <li>Sell or share your personal data with third parties</li>
            <li>Use your information for marketing purposes</li>
            <li>Track your activity across this or other websites</li>
          </ul>
        </section>

        <section>
          <h2 className="text-[1.3rem] mb-4 brand-font text-primary">4. Data Retention</h2>
          <p>
            Contact form messages are retained in our database until the site administrator manually deletes them.
            There is no automatic data retention policy. You may request deletion of your data by contacting the
            site administrator.
          </p>
        </section>

        <section>
          <h2 className="text-[1.3rem] mb-4 brand-font text-primary">5. Data Security</h2>
          <p>
            We implement reasonable security measures to protect your data. However, no method of transmission
            over the Internet is 100% secure. The backend API is served over HTTPS via Cloudflare Tunnel.
          </p>
        </section>

        <section>
          <h2 className="text-[1.3rem] mb-4 brand-font text-primary">6. Third-Party Services</h2>
          <p>This site is hosted on GitHub Pages (frontend) and a self-hosted server (backend). We use:</p>
          <ul className="list-disc pl-6 mt-2 flex flex-col gap-2">
            <li><strong className="text-primary">GitHub Pages</strong> — Static site hosting</li>
            <li><strong className="text-primary">Cloudflare Tunnel</strong> — Secure API proxy</li>
            <li><strong className="text-primary">Google Fonts</strong> — Font delivery (Space Grotesk, Inter, JetBrains Mono)</li>
          </ul>
          <p className="mt-3">
            Google Fonts may collect limited technical data (IP address, browser type) as part of font delivery.
            This data is governed by Google's privacy policy.
          </p>
        </section>

        <section>
          <h2 className="text-[1.3rem] mb-4 brand-font text-primary">7. Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc pl-6 mt-2 flex flex-col gap-2">
            <li>Request access to your personal data</li>
            <li>Request correction or deletion of your data</li>
            <li>Withdraw consent for data processing</li>
          </ul>
          <p className="mt-3">
            To exercise these rights, contact the site administrator via the contact form or GitHub.
          </p>
        </section>

        <section>
          <h2 className="text-[1.3rem] mb-4 brand-font text-primary">8. Changes to This Policy</h2>
          <p>
            We may update this privacy policy from time to time. Changes will be posted on this page with an
            updated revision date.
          </p>
        </section>

        <section>
          <h2 className="text-[1.3rem] mb-4 brand-font text-primary">9. Contact</h2>
          <p>
            For questions about this privacy policy, contact us via the
            <span className="fluo-text"> /contact </span> page or through GitHub at
            <span className="fluo-text font-mono"> github.com/Not1Sam</span>.
          </p>
        </section>
      </div>
    </main>
  );
}
