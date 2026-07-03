import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SITE_URL } from "../lib/constants";

const SEO_DATA: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Not1Sam — Software Engineer",
    description: "Personal portfolio of Houssam Belkasaoui (Not1Sam). Software Engineer, Networking Enthusiast, Homelaber from Morocco.",
  },
  "/lab": {
    title: "Lab — Not1Sam",
    description: "Experiments and technical explorations by Not1Sam.",
  },
  "/projects": {
    title: "Projects — Not1Sam",
    description: "Selected open source projects and work by Not1Sam.",
  },
  "/stack": {
    title: "Stack — Not1Sam",
    description: "Technologies and tools used by Not1Sam.",
  },
  "/contact": {
    title: "Contact — Not1Sam",
    description: "Get in touch with Not1Sam.",
  },
  "/blog": {
    title: "Blog — Not1Sam",
    description: "Technical blog posts and articles by Not1Sam.",
  },
  "/admin": {
    title: "Admin — Not1Sam",
    description: "Admin panel for Not1Sam portfolio.",
  },
  "/certificates": {
    title: "Certificates — Not1Sam",
    description: "Professional certifications and achievements by Not1Sam.",
  },
  "/cv": {
    title: "CV — Not1Sam",
    description: "Resume and curriculum vitae of Houssam Belkasaoui.",
  },
};

export function SEO() {
  const { pathname } = useLocation();

  useEffect(() => {
    const data = SEO_DATA[pathname] || { title: "Not1Sam", description: "Portfolio of Not1Sam." };
    document.title = data.title;

    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("description", data.description);
    setMeta("og:title", data.title);
    setMeta("og:description", data.description);
    setMeta("og:type", "website");
    setMeta("og:url", `${SITE_URL}${pathname}`);
  }, [pathname]);

  return null;
}
