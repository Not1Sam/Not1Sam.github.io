export function Footer() {
  return (
    <footer className="animate-fade-in py-16 border-t border-border mt-16" style={{ animationDelay: "0.4s" }}>
      <h2 className="text-[clamp(1.5rem,3vw,2.5rem)] font-bold tracking-tight mb-8 brand-font">
        [ have a project in mind? ]
      </h2>
      <div className="flex gap-6 mb-12">
        <a
          href="https://linktr.ee/not1sam"
          className="inline-block px-8 py-4 bg-primary text-bg font-semibold text-[1.1rem] rounded transition-all hover:opacity-80 hover:-translate-y-0.5"
        >
          Let&apos;s talk →
        </a>
        <a
          href="https://github.com/Not1Sam"
          target="_blank"
          rel="noreferrer"
          className="inline-block px-8 py-4 border border-border text-primary font-semibold text-[1.1rem] rounded transition-all hover:border-secondary"
        >
          Browse GitHub →
        </a>
      </div>
      <div className="flex flex-col gap-2">
        <p className="brand-font opacity-50 tracking-[2px]">
          [ Houssam Belkassaoui ] © {new Date().getFullYear()}
        </p>
        <p className="brand-font opacity-70 tracking-[2px]">
          Version {__APP_VERSION__}
        </p>
      </div>
    </footer>
  );
}
