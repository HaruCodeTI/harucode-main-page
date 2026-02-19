import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { config } from '../lib/config';

type MenuItem =
  | { label: string; path: string; match?: string }
  | { label: string; href: string };

const menuItems: MenuItem[] = [
  { label: 'Início', href: '#hero' },
  { label: 'Expertise', href: '#expertise' },
  { label: 'Casos', href: '#cases' },
  { label: 'Contato', path: '/contato', match: '/contato' },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const resolveHref = (item: MenuItem) => {
    if ('path' in item) return item.path;
    return location.pathname === '/' ? item.href : `/${item.href}`;
  };

  const isActive = (item: MenuItem) => {
    if ('path' in item) return location.pathname === (item.match ?? item.path);
    return false;
  };

  const renderLink = (item: MenuItem, mobile = false) => {
    const active = isActive(item);
    const classes = `text-[13px] font-medium transition-colors ${
      active ? 'text-white' : 'text-white/55 hover:text-white'
    } ${mobile ? 'py-2' : ''}`;

    if ('path' in item) {
      return (
        <Link key={item.label} to={item.path} className={classes} onClick={() => setOpen(false)}>
          {item.label}
        </Link>
      );
    }

    return (
      <a key={item.label} href={resolveHref(item)} className={classes} onClick={() => setOpen(false)}>
        {item.label}
      </a>
    );
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-[#09090B]/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1120px] items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <img src="/10.svg" alt="HaruCode" className="h-8 w-auto" />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {menuItems.map((item) => renderLink(item))}
          <a
            href={config.whatsapp.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-[13px]"
          >
            Falar com especialista
          </a>
        </nav>

        <button
          onClick={() => setOpen((prev) => !prev)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.06] text-white/70 lg:hidden"
          aria-label="Menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/[0.06] bg-[#09090B] px-6 pb-6 pt-4 lg:hidden">
          <nav className="flex flex-col gap-1">
            {menuItems.map((item) => renderLink(item, true))}
            <a
              href={config.whatsapp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-3 justify-center text-[13px]"
              onClick={() => setOpen(false)}
            >
              Falar com especialista
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
