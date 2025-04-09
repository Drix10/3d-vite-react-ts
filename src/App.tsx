import Layout from './components/layout/Layout';
import Hero3D from './components/3d/Hero3D';
import FeaturesSection from './components/sections/FeaturesSection';
import AboutSection from './components/sections/AboutSection';
import ModelDemoSection from './components/sections/ModelDemoSection';
import ContactSection from './components/sections/ContactSection';
import './index.css';

function App() {
  return (
    <Layout title="3D Landing Page">
      <Hero3D
        title="Create Stunning 3D Experiences"
        subtitle="A modern React template for building immersive 3D landing pages"
        ctaText="Explore Features"
        ctaLink="#features"
      />
      <FeaturesSection />
      <AboutSection />
      <ModelDemoSection />
      <ContactSection />
    </Layout>
  );
}

export default App;