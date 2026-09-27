import { MdLightMode, MdDarkMode } from 'react-icons/md';

export default function ThemeToggle({ theme, onToggle }) {
  return (
    <button
      type="button"
      className="icon-btn"
      onClick={onToggle}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? <MdLightMode aria-hidden="true" /> : <MdDarkMode aria-hidden="true" />}
    </button>
  );
}
