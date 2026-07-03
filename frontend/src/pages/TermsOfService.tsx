export function TermsOfService() {
  return (
    <main className="py-8 max-w-[800px] animate-fade-in">
      <h1 className="text-[clamp(2rem,5vw,3.5rem)] tracking-tight brand-font mb-4">Terms of Service.</h1>
      <p className="text-secondary text-[0.85rem] font-mono mb-8">Last updated: July 3, 2026</p>

      <div className="flex flex-col gap-8 text-secondary leading-relaxed">
        <section>
          <h2 className="text-[1.3rem] mb-4 brand-font text-primary">1. Acceptance of Terms</h2>
          <p>
            By accessing and using this website ("Not1Sam Portfolio"), you accept and agree to be bound by these
            Terms of Service. If you do not agree to these terms, you must not use this website.
          </p>
        </section>

        <section>
          <h2 className="text-[1.3rem] mb-4 brand-font text-primary">2. Use of This Website</h2>
          <p>This website provides a personal portfolio and blog. You may:</p>
          <ul className="list-disc pl-6 mt-2 flex flex-col gap-2">
            <li>Browse and read publicly available content</li>
            <li>Submit messages through the contact form</li>
            <li>View the CV and certificates pages</li>
          </ul>
          <p className="mt-3">You must not:</p>
          <ul className="list-disc pl-6 mt-2 flex flex-col gap-2">
            <li>Attempt to gain unauthorized access to the admin panel or backend systems</li>
            <li>Submit spam, malicious, or abusive content through the contact form</li>
            <li>Use automated tools to scrape or download content at excessive rates</li>
            <li>Interfere with the proper functioning of the website</li>
          </ul>
        </section>

        <section>
          <h2 className="text-[1.3rem] mb-4 brand-font text-primary">3. Intellectual Property</h2>
          <p>
            All content on this website, including text, code, design, and graphics, is the property of
            Houssam Belkasaoui (Not1Sam) unless otherwise stated. The source code is available on GitHub
            under a restrictive license that prohibits any form of commercial, academic, or gainful use.
          </p>
        </section>

        <section>
          <h2 className="text-[1.3rem] mb-4 brand-font text-primary">4. Limitation of Liability</h2>
          <p>
            This website is provided "as is" without warranties of any kind. We are not responsible for any
            damages arising from the use or inability to use this website. We do not guarantee that the
            website will be available, secure, or error-free at all times.
          </p>
        </section>

        <section>
          <h2 className="text-[1.3rem] mb-4 brand-font text-primary">5. External Links</h2>
          <p>
            This website may contain links to external sites (GitHub, social media, etc.). We are not
            responsible for the content, privacy policies, or practices of these third-party sites.
          </p>
        </section>

        <section>
          <h2 className="text-[1.3rem] mb-4 brand-font text-primary">6. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Changes will be posted on this page
            with an updated revision date. Continued use of the website after changes constitutes
            acceptance of the new terms.
          </p>
        </section>

        <section>
          <h2 className="text-[1.3rem] mb-4 brand-font text-primary">7. Governing Law</h2>
          <p>
            These terms are governed by the laws of Morocco. Any disputes arising from the use of this
            website shall be resolved in the courts of Morocco.
          </p>
        </section>
      </div>
    </main>
  );
}
