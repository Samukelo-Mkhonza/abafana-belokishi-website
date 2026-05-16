import { MdLightMode, MdDarkMode } from 'react-icons/md';

export default function ThemeToggle({ theme, onToggle }) {
  return (
    <button
      className="theme-toggle"
      onClick={onToggle}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? <MdLightMode /> : <MdDarkMode />}
    </button>
  );
}
