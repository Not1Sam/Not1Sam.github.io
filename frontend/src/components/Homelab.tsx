export function Homelab() {
  const services = [
    { name: "Arch Linux", desc: "Daily Driver OS (I use Arch btw)" },
    { name: "Unraid", desc: "Core Server OS & Storage Array" },
    { name: "Plex", desc: "Media Streaming" },
    { name: "Bitwarden", desc: "Password Management" },
    { name: "WireGuard VPN", desc: "Secure Remote Access" },
    { name: "Dev Containers", desc: "Isolated Development" },
  ];

  return (
    <section className="py-16 border-t border-border">
      <div className="mb-12 animate-fade-in">
        <h2 className="text-[2.5rem] tracking-tight brand-font">Self-Hosted Homelab.</h2>
      </div>

      <div className="grid grid-cols-[3fr_2fr] gap-6 animate-fade-in max-md:grid-cols-1" style={{ animationDelay: "0.2s" }}>
        <div className="bento-box">
          <h3 className="text-[1.8rem] mb-6 text-primary brand-font">Personal Infrastructure</h3>
          <p className="text-secondary text-[1.05rem] leading-relaxed">
            I run a dedicated self-hosted server powered by <strong className="text-primary font-medium">Unraid</strong>. It acts as the backbone for my digital life and development workflow.
            By leveraging <strong className="text-primary font-medium">Dev Containers</strong>, I can spin up isolated, reproducible environments directly on the server, keeping my local machines clean and lightweight.
          </p>
          <p className="text-secondary text-[1.05rem] leading-relaxed mt-4">
            Everything is securely tunneled through my own <strong className="text-primary font-medium">VPN</strong>, giving me access to my development environment and self-hosted apps from anywhere in the world.
          </p>
        </div>

        <div className="bento-box flex flex-col">
          <h3 className="text-[1.8rem] mb-6 text-primary brand-font">Active Services</h3>
          <div className="flex flex-col gap-4">
            {services.map((s, i) => (
              <div key={i} className="flex justify-between items-center pb-3 border-b border-border last:border-b-0 last:pb-0 max-sm:flex-col max-sm:items-start max-sm:gap-1">
                <span className="font-semibold text-primary">{s.name}</span>
                <span className="text-[0.85rem] text-secondary uppercase tracking-widest">{s.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
