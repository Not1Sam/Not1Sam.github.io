import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { ThemeProvider } from './components/ThemeProvider'
import { CustomCursor } from './components/CustomCursor'
import { ErrorBoundary } from './components/ErrorBoundary'
import { SEO } from './components/SEO'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Home } from './pages/Home'
import { Lab } from './pages/Lab'
import { Projects } from './pages/Projects'
import { Stack } from './pages/Stack'
import { Contact } from './pages/Contact'
import { Blog } from './pages/Blog'
import { Admin } from './pages/Admin'
import { Certificates } from './pages/Certificates'
import { CV } from './pages/CV'
import { PrivacyPolicy } from './pages/PrivacyPolicy'
import { TermsOfService } from './pages/TermsOfService'
import { CookiePolicy } from './pages/CookiePolicy'
import { Disclaimer } from './pages/Disclaimer'
import { NotFound } from './pages/NotFound'

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function App() {
  return (
    <ThemeProvider>
      <CustomCursor />
      <Router>
        <ScrollToTop />
        <SEO />
        <div className="w-full max-w-[100%] px-[4vw] min-h-screen flex flex-col">
          <Header />
          <main id="main-content" tabIndex={-1} className="flex-1 flex flex-col outline-none">
            <ErrorBoundary>
              <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/lab" element={<Lab />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/stack" element={<Stack />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/certificates" element={<Certificates />} />
              <Route path="/cv" element={<CV />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/cookies" element={<CookiePolicy />} />
              <Route path="/disclaimer" element={<Disclaimer />} />
              <Route path="*" element={<NotFound />} />
              </Routes>
            </ErrorBoundary>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
