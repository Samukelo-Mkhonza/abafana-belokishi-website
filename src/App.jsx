import { useTheme } from './hooks/useTheme';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Artists from './components/Artists';
import Releases from './components/Releases';
import Podcast from './components/Podcast';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const { theme, toggle } = useTheme();

  return (
    <>
      <Navbar theme={theme} onToggle={toggle} />
      <main>
        <Hero />
        <About />
        <Artists />
        <Releases />
        <Podcast />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
