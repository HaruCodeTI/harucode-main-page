import { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { config } from '../lib/config';

type MenuItem =
  | { label: string; path: string; match?: string }
  | { label: string; href: string };

const Header = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const menuItems = useMemo<MenuItem[]>(
    () => [
      { label: 'Início', href: '#hero' },
      { label: 'Expertise', href: '#expertise' },
      { label: 'Casos', href: '#cases' },
      { label: 'Contato', path: '/contato', match: '/contato' }
    ],
    []
  );

  const isActive = (item: MenuItem) => {
    if ('path' in item) {
      return location.pathname === (item.match ?? item.path);
    }
    const target = item.href.replace('#', '');
    const hash = window.location.hash.replace('#', '');
    return hash === target && hash.length > 0;
  };

  const renderItem = (item: MenuItem, mobile = false) => {
    const baseClasses =
      'text-sm font-medium tracking-wide transition-all duration-300';

    if ('path' in item) {
      return (
        <Link
          key={item.label}
          to={item.path}
          className={`${baseClasses} ${
            isActive(item)
              ? 'text-primary' + (mobile ? ' pl-3 border-l-2 border-primary' : '')
              : 'text-white/80 hover:text-white'
          }`}
          onClick={() => setOpen(false)}
        >
          {item.label}
        </Link>
      );
    }

    return (
      <a
        key={item.label}
        href={location.pathname === '/' ? item.href : `/${item.href}`}
        className={`${baseClasses} ${
          isActive(item) ? 'text-primary' : 'text-white/70 hover:text-white'
        }`}
        onClick={() => setOpen(false)}
      >
        {item.label}
      </a>
    );
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-background/60 backdrop-blur-2xl">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/10.svg"
            alt="HaruCode Logo"
            className="h-12 w-auto drop-shadow-[0_0_22px_rgba(124,58,237,0.45)]"
          />
          
        </Link>

        <nav className="hidden items-center gap-10 lg:flex">
          {menuItems.map((item) => renderItem(item))}
          <a
            href={config.whatsapp.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary px-6 py-2 text-sm"
          >
            Falar com especialista
          </a>
        </nav>

        <button
          onClick={() => setOpen((prev) => !prev)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white lg:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-background/90 px-6 pb-6 pt-4 lg:hidden">
          <nav className="flex flex-col gap-4">
            {menuItems.map((item) => renderItem(item, true))}
            <a
              href={config.whatsapp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary justify-center text-center"
              onClick={() => setOpen(false)}
            >
              WhatsApp
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;