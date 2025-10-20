import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { config } from '../lib/config';

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-black/90 text-white/60">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.35fr_1fr_1fr]">
          <div className="space-y-6">
            <Link to="/" className="inline-flex items-center gap-3">
              <img
                src="/10.svg"
                alt="HaruCode Logo"
                className="h-12 w-auto drop-shadow-[0_0_22px_rgba(124,58,237,0.45)]"
              />
              <span className="text-sm font-semibold uppercase tracking-[0.35em] text-white/50">HaruCode</span>
            </Link>
            <p className="max-w-md text-sm leading-relaxed text-white/55">
              Construímos produtos, integrações e IA que entregam previsibilidade para operações complexas.
              Exploramos tecnologia como vantagem competitiva.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com/harucode.ti"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/50 transition hover:border-white/30 hover:text-white"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://linkedin.com/company/haru-code"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/50 transition hover:border-white/30 hover:text-white"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-white/40">Mapa</p>
            <nav className="mt-6 flex flex-col gap-3 text-sm text-white/60">
              <Link to="/" className="transition hover:text-white">Início</Link>
              <a href="/#expertise" className="transition hover:text-white">
                Expertise
              </a>
              <a href="/#cases" className="transition hover:text-white">
                Casos
              </a>
              <Link to="/contato" className="transition hover:text-white">
                Contato
              </Link>
            </nav>
          </div>

          <div className="space-y-4 text-sm text-white/60">
            <p className="text-xs uppercase tracking-[0.35em] text-white/40">Contato</p>
            <div className="flex items-start gap-3">
              <span className="mt-1 text-primary">
                <MapPin size={16} />
              </span>
              <p>Campo Grande · MS · Brasil</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-1 text-primary">
                <Phone size={16} />
              </span>
              <p>{config.whatsapp.formatted}</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-1 text-primary">
                <Mail size={16} />
              </span>
              <p>{config.company.email}</p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-white/40 md:flex-row md:items-center md:justify-between">
          <p>© 2025 HaruCode. Tecnologia que protege ativos.</p>
          <a href={config.whatsapp.url} target="_blank" rel="noopener noreferrer" className="transition hover:text-white">
            Falar com especialista agora
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;