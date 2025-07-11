import React, { useState } from 'react';
import { Menu, X, Home, Phone, HelpCircle, User } from 'lucide-react';
import SatuAtapLogo from '../components/SatuAtapLogo';

// Theme props interface
interface ThemeProps {
  currentTheme: 'light' | 'dark';
  toggleTheme: () => void;
  getThemeIcon: () => React.ReactElement;
}

// Header props interface (simplified - no search)
type HeaderProps = ThemeProps;

// Navigation link interface
interface NavLink {
  label: string;
  href: string;
  id: string;
  icon?: React.ReactElement;
}

// Main navigation links - simplified
const navLinks: NavLink[] = [
  { label: 'Beranda', href: '#', id: 'home', icon: <Home className="w-4 h-4" /> },
  { label: 'Tentang', href: '#about', id: 'about', icon: <HelpCircle className="w-4 h-4" /> },
  { label: 'Kontak', href: '#contact', id: 'contact', icon: <Phone className="w-4 h-4" /> },
];

const Header: React.FC<HeaderProps> = ({ toggleTheme, getThemeIcon }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Handle navigation click
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href.startsWith('#')) {
      // Handle anchor links (if any sections exist)
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Handle external links
      window.location.href = href;
    }
    setMobileOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-card/95 backdrop-blur-lg shadow-lg z-50 border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <SatuAtapLogo size="sm" className="w-8 h-8" />
            <div className="flex flex-col">
              <h1 className="text-lg font-bold text-blue-600 dark:text-blue-400">
                Satu Atap
              </h1>
              <p className="hidden sm:block text-xs text-muted-foreground">
                Platform Kost Terpercaya
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                {link.icon}
                <span>{link.label}</span>
              </a>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-background/50 hover:bg-background transition-colors"
              aria-label="Toggle theme"
            >
              {getThemeIcon()}
            </button>

            {/* Auth Button */}
            <a
              href="/login"
              className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
            >
              <User className="w-4 h-4" />
              <span>Masuk</span>
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg bg-background/50 hover:bg-background transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border bg-card/95 backdrop-blur-lg">
            <nav className="py-4 space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="flex items-center space-x-3 px-4 py-2 text-sm font-medium text-foreground hover:bg-background/50 rounded-lg transition-colors"
                >
                  {link.icon}
                  <span>{link.label}</span>
                </a>
              ))}
              <div className="px-4 pt-2">
                <a
                  href="/login"
                  className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium w-full justify-center"
                >
                  <User className="w-4 h-4" />
                  <span>Masuk</span>
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};



export default Header;
