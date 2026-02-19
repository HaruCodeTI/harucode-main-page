import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { config } from '../lib/config';

const Footer = () => {
  return (
    <footer className="border-t border-white/[0.06]">
      <div className="mx-auto max-w-[1120px] px-6 py-14">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr]">
          <div className="space-y-4">
            <Link to="/" className="inline-flex items-center gap-2">
              <img src="/10.svg" alt="HaruCode" className="h-7 w-auto" />
              <span className="text-[13px] font-semibold uppercase tracking-[0.12em] text-white/40">HaruCode</span>
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-white/40">
              Construímos produtos, integrações e IA que entregam previsibilidade para operações complexas.
            </p>
            <div className="flex items-center gap-3">
              {[
                { href: 'https://instagram.com/harucode.ti', icon: <Instagram size={15} /> },
                { href: 'https://linkedin.com/company/haru-code', icon: <Linkedin size={15} /> },
              ].map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.06] text-white/35 transition-colors hover:border-white/[0.12] hover:text-white/70"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[13px] font-medium uppercase tracking-[0.04em] text-white/30">Mapa</p>
            <nav className="mt-4 flex flex-col gap-2.5 text-sm text-white/45">
              <Link to="/" className="transition-colors hover:text-white/80">Início</Link>
              <a href="/#expertise" className="transition-colors hover:text-white/80">Expertise</a>
              <a href="/#cases" className="transition-colors hover:text-white/80">Casos</a>
              <Link to="/contato" className="transition-colors hover:text-white/80">Contato</Link>
            </nav>
          </div>

          <div className="space-y-3 text-sm text-white/45">
            <p className="text-[13px] font-medium uppercase tracking-[0.04em] text-white/30">Contato</p>
            {[
              { icon: <MapPin size={14} />, text: 'Campo Grande · MS · Brasil' },
              { icon: <Phone size={14} />, text: config.whatsapp.formatted },
              { icon: <Mail size={14} />, text: config.company.email },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2.5">
                <span className="text-primary/70">{item.icon}</span>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/[0.06] pt-8 text-[13px] text-white/25 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} HaruCode. Tecnologia que protege ativos.</p>
          <a href={config.whatsapp.url} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white/50">
            Falar com especialista
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
