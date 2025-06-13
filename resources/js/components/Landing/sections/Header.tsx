import React from 'react';
import { Menu, X } from 'lucide-react';

// Theme props interface
interface ThemeProps {
  currentTheme: 'light' | 'dark';
  toggleTheme: () => void;
  getThemeIcon: () => React.ReactElement;
}

const navLinks = [
  { label: 'Beranda', href: '#home', isActive: true },
  { label: 'Cari Kost', href: '#search', isActive: false },
  { label: 'Kost Unggulan', href: '#featured', isActive: false },
  { label: 'Tentang', href: '#about', isActive: false },
  { label: 'Kontak', href: '#contact', isActive: false },
];

const authButtons = [
  { label: 'Masuk', type: 'outline', href: '#' },
  { label: 'Daftar', type: 'primary', href: '#' },
];

const Header: React.FC<ThemeProps> = ({ currentTheme, toggleTheme, getThemeIcon }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  // Close mobile menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (mobileOpen && !target.closest('header')) {
        setMobileOpen(false);
      }
    };

    if (mobileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [mobileOpen]);
  return (
    <header className="fixed top-2 sm:top-4 left-1/2 transform -translate-x-1/2 w-[96%] sm:w-[95%] md:w-[90%] max-w-7xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg shadow-lg rounded-xl sm:rounded-2xl z-[100] border border-slate-200 dark:border-slate-700 transition-all duration-300">
      <div className="flex items-center justify-between py-3 sm:py-4 px-4 sm:px-6 md:px-8 lg:px-10">
        {/* Logo with professional styling */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-slate-800 dark:bg-slate-200 rounded-lg flex items-center justify-center">
            <span className="text-white dark:text-slate-800 font-bold text-sm">SA</span>
          </div>
          <div className="text-2xl font-bold text-slate-800 dark:text-slate-200 tracking-tight select-none">
            Satu Atap
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                link.isActive
                  ? 'text-white bg-slate-800 dark:bg-slate-200 dark:text-slate-800'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-200"
            aria-label={`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} mode`}
          >
            {getThemeIcon()}
          </button>

          {/* Auth Buttons */}
          {authButtons.map(btn => (
            <a
              key={btn.label}
              href={btn.href}
              className={
                btn.type === 'primary'
                  ? 'px-6 py-2 rounded-lg font-semibold text-white bg-slate-800 dark:bg-slate-200 dark:text-slate-800 hover:bg-slate-700 dark:hover:bg-slate-300 transition-colors duration-200'
                  : 'px-6 py-2 rounded-lg font-semibold text-slate-600 dark:text-slate-400 border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-200 transition-colors duration-200'
              }
            >
              {btn.label}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-200 ${
            mobileOpen ? 'ring-2 ring-slate-300 dark:ring-slate-600' : ''
          }`}
          aria-label="Toggle menu"
          onClick={() => setMobileOpen(v => !v)}
        >
          <span className="sr-only">Toggle menu</span>
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg rounded-b-xl sm:rounded-b-2xl shadow-lg">
          <div className="flex flex-col p-4 sm:p-6 space-y-3 sm:space-y-4">
            {/* Mobile Navigation */}
            <div className="space-y-2">
              {navLinks.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`block px-4 py-3 rounded-lg font-medium transition-colors duration-200 ${
                    link.isActive
                      ? 'text-white bg-slate-800 dark:bg-slate-200 dark:text-slate-800'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  <div className="flex items-center justify-between">
                    {link.label}
                    {link.isActive && (
                      <div className="w-2 h-2 bg-slate-800 dark:bg-slate-200 rounded-full"></div>
                    )}
                  </div>
                </a>
              ))}
            </div>

            {/* Mobile Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center space-x-3 w-full p-3 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-200"
              aria-label={`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} mode`}
            >
              {getThemeIcon()}
              <span className="font-medium">
                {currentTheme === 'dark' ? 'Dark Mode' : 'Light Mode'}
              </span>
            </button>

            {/* Mobile Auth Buttons */}
            <div className="space-y-3 pt-2">
              {authButtons.map(btn => (
                <a
                  key={btn.label}
                  href={btn.href}
                  className={
                    btn.type === 'primary'
                      ? 'block w-full px-6 py-3 rounded-lg font-semibold text-white bg-slate-800 dark:bg-slate-200 dark:text-slate-800 hover:bg-slate-700 dark:hover:bg-slate-300 transition-colors duration-200 text-center'
                      : 'block w-full px-6 py-3 rounded-lg font-semibold text-slate-600 dark:text-slate-400 border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-200 transition-colors duration-200 text-center'
                  }
                  onClick={() => setMobileOpen(false)}
                >
                  {btn.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
