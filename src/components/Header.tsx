import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { config } from '../lib/config';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'Serviços', path: '/servicos' },
    { label: 'Quem Somos', path: '/quem-somos' },
    { label: 'Blog', path: '/blog' },
    { label: 'Contato', path: '/contato' }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
          <header className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-white/20">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img 
              src="/10.svg" 
              alt="HaruCode Logo" 
              className="h-14 w-auto opacity-90 hover:opacity-100 transition-all duration-300 filter brightness-110"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-medium transition-all duration-300 hover:text-primary ${
                  isActive(item.path) 
                    ? 'text-primary border-b-2 border-primary' 
                    : 'text-white hover:text-primary'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={config.whatsapp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:bg-primary/90 hover:scale-105"
            >
              Falar no WhatsApp
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden pb-6 border-t border-white/20 mt-4 pt-4">
            <div className="flex flex-col space-y-4">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`font-medium py-2 transition-all duration-300 ${
                    isActive(item.path) 
                      ? 'text-primary border-l-4 border-primary pl-4' 
                      : 'text-white hover:text-primary hover:pl-2'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <a
                href={config.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:bg-primary/90 text-center mt-4"
              >
                Falar no WhatsApp
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;