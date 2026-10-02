import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion';
import { useTheme } from './hooks/useTheme';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Artists from './components/Artists';
import Releases from './components/Releases';
import Podcast from './components/Podcast';
import Contact from './components/Contact';
import Footer from './components/Footer';
import NewReleasePopup from './components/NewReleasePopup';
import ChatBot from './components/ChatBot';

function App() {
  const { theme, toggle } = useTheme();

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <a href="#main" className="skip-link">Skip to content</a>
        <Navbar theme={theme} onToggle={toggle} />
        <main id="main" tabIndex={-1}>
          <Hero />
          <About />
          <Artists />
          <Releases />
          <Podcast />
          <Contact />
        </main>
        <Footer />
        <NewReleasePopup />
        <ChatBot />
      </MotionConfig>
    </LazyMotion>
  );
}

export default App;
