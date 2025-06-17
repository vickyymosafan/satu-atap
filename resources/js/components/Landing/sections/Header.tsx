import React from 'react';
import { Menu, X } from 'lucide-react';

// Theme props interface
interface ThemeProps {
  currentTheme: 'light' | 'dark';
  toggleTheme: () => void;
  getThemeIcon: () => React.ReactElement;
}

// Navigation link interface
interface NavLink {
  label: string;
  href: string;
  id: string;
}

const navLinks: NavLink[] = [
  { label: 'Beranda', href: '#hero', id: 'hero' },
  { label: 'Cari Kost', href: '#quick-search', id: 'quick-search' },
  { label: 'Kost', href: '#featured', id: 'featured' },
  { label: 'Tentang', href: '#about', id: 'about' },
  { label: 'Kontak', href: '#contact', id: 'contact' },
];

const authButtons = [
  { label: 'Masuk', type: 'outline', href: '#' },
  { label: 'Daftar', type: 'primary', href: '#' },
];

const Header: React.FC<ThemeProps> = ({ currentTheme, toggleTheme, getThemeIcon }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState('hero');

  // Scroll detection for active section
  React.useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => document.getElementById(link.id));
      const scrollPosition = window.scrollY + 100; // Offset for header height

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navLinks[i].id);
          break;
        }
      }
    };

    // Set initial active section
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  // Handle navigation click with smooth scroll
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      const headerHeight = 100; // Account for fixed header
      const targetPosition = section.offsetTop - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });

      // Update active section immediately for better UX
      setActiveSection(sectionId);
      setMobileOpen(false); // Close mobile menu if open
    }
  };
  return (
    <header className="fixed top-2 sm:top-4 left-1/2 transform -translate-x-1/2 w-[96%] sm:w-[95%] md:w-[90%] max-w-6xl bg-card/90 backdrop-blur-lg shadow-lg rounded-lg md:rounded-xl z-[100] border border-border transition-all duration-300">
      <div className="flex items-center justify-between py-2 md:py-3 px-4 md:px-6 lg:px-8">
        {/* Logo with professional styling - Laptop optimized */}
        <div className="flex items-center space-x-2 md:space-x-3">
          <div className="w-7 h-7 md:w-8 md:h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-xs md:text-sm">SA</span>
          </div>
          <div className="text-lg md:text-xl lg:text-2xl font-bold text-foreground tracking-tight select-none">
            Satu Atap
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                activeSection === link.id
                  ? 'text-primary-foreground bg-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent'
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
            className="p-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-accent transition-colors duration-200"
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
                  ? 'px-6 py-2 rounded-lg font-semibold text-primary-foreground bg-primary hover:bg-primary/90 transition-colors duration-200'
                  : 'px-6 py-2 rounded-lg font-semibold text-muted-foreground border border-border hover:bg-accent hover:text-accent-foreground transition-colors duration-200'
              }
            >
              {btn.label}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden p-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-accent transition-colors duration-200 ${
            mobileOpen ? 'ring-2 ring-ring' : ''
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
        <div className="md:hidden border-t border-border bg-card/95 backdrop-blur-lg rounded-b-xl sm:rounded-b-2xl shadow-lg">
          <div className="flex flex-col p-4 sm:p-6 space-y-3 sm:space-y-4">
            {/* Mobile Navigation */}
            <div className="space-y-2">
              {navLinks.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={`block px-4 py-3 rounded-lg font-medium transition-colors duration-200 ${
                    activeSection === link.id
                      ? 'text-primary-foreground bg-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    {link.label}
                    {activeSection === link.id && (
                      <div className="w-2 h-2 bg-primary-foreground rounded-full"></div>
                    )}
                  </div>
                </a>
              ))}
            </div>

            {/* Mobile Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center space-x-3 w-full p-3 rounded-lg bg-secondary text-secondary-foreground hover:bg-accent transition-colors duration-200"
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
                      ? 'block w-full px-6 py-3 rounded-lg font-semibold text-primary-foreground bg-primary hover:bg-primary/90 transition-colors duration-200 text-center'
                      : 'block w-full px-6 py-3 rounded-lg font-semibold text-muted-foreground border border-border hover:bg-accent hover:text-accent-foreground transition-colors duration-200 text-center'
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
