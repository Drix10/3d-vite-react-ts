import { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingHero from './components/sections/LandingHero';
import ScrollScene from './components/3d/ScrollScene';
import AdvancedScene from './components/3d/AdvancedScene';
import MinimalLayout from './components/layout/MinimalLayout';
import { Code, Cpu, Star, Zap, Mail, Send, Box } from 'lucide-react';
import { useScrollToHash } from './hooks/useScrollToHash';

const LoadingFallback = () => (
  <div className="w-full h-screen flex justify-center items-center bg-gray-900 text-white">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mx-auto"></div>
      <p className="mt-4">Loading 3D Experience...</p>
    </div>
  </div>
);

function Homepage() {
  useScrollToHash();

  return (
    <>
      <section id="home" className="relative min-h-screen w-full bg-gray-900">
        <LandingHero
          title="Immersive 3D Web"
          description="Create stunning interactive 3D experiences using React, Three.js, and GSAP"
          ctaText="Explore"
          ctaLink="#experience"
        />
      </section>

      <section
        id="experience"
        className="relative h-[200vh] w-full bg-[#040617] snap-start"
      >
        <ScrollScene
          height="200vh"
          backgroundColor="#040617"
          modelPath="/models/example.glb"
          pin={true}
        />
      </section>

      <section id="about" className="bg-gray-900 py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1 text-white">
              <h2 className="text-[2.5rem] font-bold mb-6">
                About This Template
              </h2>
              <p className="text-lg mb-4">
                This template is built to help you create immersive 3D web experiences using modern web technologies.
              </p>
              <p className="text-lg mb-4">
                Featuring integration with Three.js, React Three Fiber, GSAP animations, and scroll-based interactions,
                it provides everything you need to build standout 3D websites.
              </p>

              <ul className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { icon: <Code size={18} />, text: 'Three.js Integration' },
                  { icon: <Zap size={18} />, text: 'GSAP Animations' },
                  { icon: <Star size={18} />, text: 'Scroll Interactions' },
                  { icon: <Cpu size={18} />, text: 'Performance Focused' },
                  { icon: <Box size={18} />, text: 'Model Carousel' }
                ].map(feature => (
                  <li
                    key={feature.text}
                    className="flex items-center p-4 bg-white/5 rounded-lg backdrop-blur-lg transition-all duration-200 hover:-translate-y-1 hover:bg-white/10 shadow-lg"
                  >
                    <span className="text-indigo-500 mr-2">{feature.icon}</span>
                    <span>{feature.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1 h-[400px]">
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

      <section id="contact" className="bg-[#1E293B] py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-[2.5rem] font-bold text-white text-center mb-8">
            Get In Touch
          </h2>
          <div className="flex flex-col md:flex-row gap-12">
            <div className="flex-1">
              <form className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-white mb-2">Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Your name"
                      className="w-full p-3 bg-white/5 border border-white/10 rounded text-white transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                    />
                    <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50" size={18} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-white mb-2">Email</label>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Your email"
                      className="w-full p-3 bg-white/5 border border-white/10 rounded text-white transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                    />
                    <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50" size={18} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-white mb-2">Message</label>
                  <textarea
                    rows={5}
                    placeholder="Your message"
                    className="w-full p-3 bg-white/5 border border-white/10 rounded text-white resize-y transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none font-inherit text-base"
                  ></textarea>
                </div>

                <button
                  className="flex items-center justify-center gap-2 w-full p-3 bg-indigo-500 text-white font-bold rounded hover:bg-indigo-600 transform transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/30"
                >
                  <Send size={18} /> Send Message
                </button>
              </form>
            </div>

            <div className="flex-1 h-[400px]">
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
  useEffect(() => {
    if (window.location.hash && window.location.pathname === '/') {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);

      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 500);
      }
    }
  }, []);

  return (
    <Router>
      <MinimalLayout>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Homepage />} />
          </Routes>
        </Suspense>
      </MinimalLayout>
    </Router>
  );
}
