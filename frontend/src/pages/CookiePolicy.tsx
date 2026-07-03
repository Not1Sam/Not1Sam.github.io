export function CookiePolicy() {
  return (
    <main className="py-8 max-w-[800px] animate-fade-in">
      <h1 className="text-[clamp(2rem,5vw,3.5rem)] tracking-tight brand-font mb-4">Cookie Policy.</h1>
      <p className="text-secondary text-[0.85rem] font-mono mb-8">Last updated: July 3, 2026</p>

      <div className="flex flex-col gap-8 text-secondary leading-relaxed">
        <section>
          <h2 className="text-[1.3rem] mb-4 brand-font text-primary">1. What Are Cookies</h2>
          <p>
            Cookies are small text files that websites place on your device to store information. They are
            commonly used to make websites work efficiently and to provide information to site owners.
          </p>
        </section>

        <section>
          <h2 className="text-[1.3rem] mb-4 brand-font text-primary">2. Our Use of Cookies</h2>
          <p>
            <strong className="text-primary">This website does not use cookies.</strong> We do not deploy any
            first-party cookies, third-party cookies, tracking pixels, or similar technologies.
          </p>
          <p className="mt-3">The only local storage used is:</p>
          <ul className="list-disc pl-6 mt-2 flex flex-col gap-2">
            <li>
              <strong className="text-primary">localStorage for theme preference</strong> — Your selected theme
              (dark/light/purple) is stored locally in your browser to remember your preference across visits.
              This data never leaves your device.
            </li>
            <li>
              <strong className="text-primary">localStorage for admin authentication</strong> — If you log in
              as an administrator, a JWT token is stored locally to maintain your session. This is only used
              for the admin panel.
            </li>
            <li>
              <strong className="text-primary">sessionStorage for GitHub API caching</strong> — GitHub API
              responses are cached temporarily to reduce rate limit consumption. This data is cleared when
              you close the browser tab.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-[1.3rem] mb-4 brand-font text-primary">3. Third-Party Services</h2>
          <p>
            While we do not use cookies directly, some third-party services loaded by this website may
            set their own cookies:
          </p>
          <ul className="list-disc pl-6 mt-2 flex flex-col gap-2">
            <li>
              <strong className="text-primary">Google Fonts</strong> — May set cookies as part of font
              delivery. This is controlled by Google and is subject to Google's cookie policy.
            </li>
            <li>
              <strong className="text-primary">GitHub</strong> — When you click links to GitHub (profile,
              repositories), GitHub may set cookies according to their own policy.
            </li>
          </ul>
          <p className="mt-3">
            We have no control over cookies set by these external services.
          </p>
        </section>

        <section>
          <h2 className="text-[1.3rem] mb-4 brand-font text-primary">4. Managing Cookies</h2>
          <p>
            Since this website does not set cookies, there is nothing to manage. You can control
            localStorage and sessionStorage through your browser's developer tools or settings.
          </p>
        </section>

        <section>
          <h2 className="text-[1.3rem] mb-4 brand-font text-primary">5. Changes to This Policy</h2>
          <p>
            We may update this cookie policy from time to time. Changes will be posted on this page with
            an updated revision date.
          </p>
        </section>
      </div>
    </main>
  );
}
