import { useTheme } from './hooks/useTheme';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Artists from './components/Artists';
import Releases from './components/Releases';
import SoundCloud from './components/SoundCloud';
import Podcast from './components/Podcast';
import Contact from './components/Contact';
import Location from './components/Location';
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
        <SoundCloud />
        <Podcast />
        <Contact />
        <Location />
      </main>
      <Footer />
    </>
  );
}

export default App;
