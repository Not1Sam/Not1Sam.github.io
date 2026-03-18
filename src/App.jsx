import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import './App.css';

// Lazy load pages for performance optimization
const Hero = lazy(() => import('./components/Hero'));
const Homelab = lazy(() => import('./components/Homelab'));
const ProjectList = lazy(() => import('./components/ProjectList'));
const TechStack = lazy(() => import('./pages/TechStack'));
const Contact = lazy(() => import('./pages/Contact'));
const Admin = lazy(() => import('./pages/Admin'));
const Blog = lazy(() => import('./pages/Blog'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <div className="app-container">
      <CustomCursor />
      <Header />
      <div className="main-content">
        <Suspense fallback={<div style={{ display:'flex', justifyContent:'center', alignItems:'center', height:'60vh', color:'var(--accent-fluo)', fontFamily: "'Space Grotesk', sans-serif" }} className="pulse">INITIALIZING_SYSTEM...</div>}>
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/lab" element={<Homelab />} />
            <Route path="/projects" element={<ProjectList />} />
            <Route path="/stack" element={<TechStack />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}

export default App;
