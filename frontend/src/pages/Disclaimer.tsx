export function Disclaimer() {
  return (
    <main className="py-8 max-w-[800px] animate-fade-in">
      <h1 className="text-[clamp(2rem,5vw,3.5rem)] tracking-tight brand-font mb-4">Disclaimer.</h1>
      <p className="text-secondary text-[0.85rem] font-mono mb-8">Last updated: July 3, 2026</p>

      <div className="flex flex-col gap-8 text-secondary leading-relaxed">
        <section>
          <h2 className="text-[1.3rem] mb-4 brand-font text-primary">1. General Information</h2>
          <p>
            The information provided on this website ("Not1Sam Portfolio") is for general informational
            purposes only. All content is provided in good faith; however, we make no representation or
            warranty of any kind regarding the accuracy, adequacy, validity, reliability, or completeness
            of any information on the site.
          </p>
        </section>

        <section>
          <h2 className="text-[1.3rem] mb-4 brand-font text-primary">2. Professional Advice</h2>
          <p>
            This website is not a substitute for professional advice. The content, including blog posts,
            technical articles, and project descriptions, reflects personal opinions and experiences.
            You should not rely on this content as professional, technical, or financial advice.
          </p>
        </section>

        <section>
          <h2 className="text-[1.3rem] mb-4 brand-font text-primary">3. External Links</h2>
          <p>
            This website may contain links to external websites or third-party content. We do not
            warrant, endorse, guarantee, or assume responsibility for the accuracy or reliability of
            any information offered by third-party websites linked through this site.
          </p>
        </section>

        <section>
          <h2 className="text-[1.3rem] mb-4 brand-font text-primary">4. Project & Code Disclaimer</h2>
          <p>
            Code examples, projects, and technical demonstrations shown on this website are provided
            "as is" without warranty of any kind. While we strive to provide accurate and working code,
            we make no guarantees about its functionality, security, or suitability for any particular
            purpose.
          </p>
          <p className="mt-3">
            The source code is available on GitHub under a restrictive license that strictly prohibits
            any commercial, academic, or gainful use. You may view the code for learning purposes only.
          </p>
        </section>

        <section>
          <h2 className="text-[1.3rem] mb-4 brand-font text-primary">5. Testimonials & Reviews</h2>
          <p>
            Any testimonials or reviews displayed on this site represent the opinions of the author and
            do not necessarily reflect the views of any other party.
          </p>
        </section>

        <section>
          <h2 className="text-[1.3rem] mb-4 brand-font text-primary">6. Limitation of Liability</h2>
          <p>
            In no event shall we be liable for any loss or damage, including without limitation,
            indirect or consequential loss or damage, or any loss or damage arising from loss of data
            or profits arising out of, or in connection with, the use of this website.
          </p>
        </section>

        <section>
          <h2 className="text-[1.3rem] mb-4 brand-font text-primary">7. Contact</h2>
          <p>
            If you have any questions about this disclaimer, please contact us via the
            <span className="fluo-text"> /contact </span> page or through GitHub at
            <span className="fluo-text font-mono"> github.com/Not1Sam</span>.
          </p>
        </section>
      </div>
    </main>
  );
}
