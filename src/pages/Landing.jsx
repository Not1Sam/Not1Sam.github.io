import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Homelab from "../components/Homelab";
import ProjectList from "../components/ProjectList";
import "../styles/Landing.css";

const Landing = () => {
    return(
        <main className="landing-container">
            <Header />
            <Hero />
            <Homelab />
            <ProjectList />
            
            <footer className="footer-cta animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <h2 className="cta-title brand-font">Have a project<br/>in mind?</h2>
                <div className="cta-links">
                    <a href="mailto:contact@not1sam.dev" className="cta-primary">Let's talk →</a>
                    <a href="https://github.com/Not1Sam" target="_blank" rel="noreferrer" className="cta-secondary">Browse GitHub →</a>
                </div>
                
                <div className="footer-bottom">
                    <p>SOFTWARE_ENGINEER © {new Date().getFullYear()}</p>
                </div>
            </footer>
        </main>
    );
}

export default Landing;