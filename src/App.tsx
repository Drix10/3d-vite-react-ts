import { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingHero from './components/sections/LandingHero';
import ScrollScene from './components/3d/ScrollScene';
import AdvancedScene from './components/3d/AdvancedScene';
import MinimalLayout from './components/layout/MinimalLayout';
import { Code, Cpu, Star, Zap, Mail, Send, Box } from 'lucide-react';


const ExperiencePage = lazy(() => import('./pages/ExperiencePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const ModelShowcasePage = lazy(() => import('./pages/ModelShowcasePage'));

const LoadingFallback = () => (
  <div style={{
    width: '100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111827',
    color: 'white'
  }}>
    <div style={{
      textAlign: 'center'
    }}>
      <div className="loader"></div>
      <p style={{ marginTop: '1rem' }}>Loading 3D Experience...</p>
    </div>
  </div>
);

function Homepage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      <section id="home">
        <LandingHero
          title="Immersive 3D Web"
          description="Create stunning interactive 3D experiences using React, Three.js, and GSAP"
          ctaText="Explore"
          ctaLink="#experience"
        />
      </section>

      <section id="experience" style={{ height: '200vh' }}>
        <ScrollScene
          height="200vh"
          backgroundColor="#040617"
          modelPath="/models/example.glb"
          pin={true}
        />
      </section>

      <section id="about" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>About This Template</h2>
              <p>
                This template is built to help you create immersive 3D web experiences using modern web technologies.
              </p>
              <p>
                Featuring integration with Three.js, React Three Fiber, GSAP animations, and scroll-based interactions,
                it provides everything you need to build standout 3D websites.
              </p>
              <ul className="feature-grid">
                {[
                  { icon: <Code size={18} />, text: 'Three.js Integration' },
                  { icon: <Zap size={18} />, text: 'GSAP Animations' },
                  { icon: <Star size={18} />, text: 'Scroll Interactions' },
                  { icon: <Cpu size={18} />, text: 'Performance Focused' },
                  { icon: <Box size={18} />, text: 'Model Carousel' }
                ].map(feature => (
                  <li key={feature.text} className="feature-item">
                    <span className="feature-icon">{feature.icon}</span>
                    {feature.text}
                  </li>
                ))}
              </ul>
            </div>
            <div className="about-3d">
              <AdvancedScene
                backgroundColor="transparent"
                ambientLightIntensity={0.4}
                directionalLightIntensity={0.8}
                cameraPosition={[0, 0, 8]}
              />
            </div>
          </div>
        </div>
      </section>

      <section id="contact">
        <div className="container">
          <h2>Get In Touch</h2>
          <div className="contact-content">
            <div className="contact-form">
              <form>
                <div className="form-group">
                  <label>Name</label>
                  <div className="input-with-icon">
                    <input type="text" placeholder="Your name" />
                    <Mail size={18} className="input-icon" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <div className="input-with-icon">
                    <input type="email" placeholder="Your email" />
                    <Mail size={18} className="input-icon" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea rows={5} placeholder="Your message"></textarea>
                </div>
                <button className="submit-button">
                  <Send size={18} /> Send Message
                </button>
              </form>
            </div>
            <div className="contact-3d">
              <AdvancedScene
                backgroundColor="transparent"
                ambientLightIntensity={0.4}
                directionalLightIntensity={0.6}
                cameraPosition={[0, 0, 8]}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <MinimalLayout>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/experience" element={<ExperiencePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/models" element={<ModelShowcasePage />} />
          </Routes>
        </Suspense>
      </MinimalLayout>
    </Router>
  );
}
