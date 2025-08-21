import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, MapPin, Phone, Mail } from 'lucide-react';
import { config } from '../lib/config';

const Footer = () => {
  return (
    <footer className="bg-black text-secondary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <img 
                src="/10.svg" 
                alt="HaruCode Logo" 
                className="h-14 w-auto opacity-90 filter brightness-110"
              />
            </div>
            <p className="text-gray-300 leading-relaxed">
              Transformamos ideias em soluções tecnológicas que impulsionam o crescimento 
              do seu negócio através de automação, desenvolvimento e consultoria em IA.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Links Rápidos</h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="text-gray-300 hover:text-primary transition-colors">
                Home
              </Link>
              <Link to="/servicos" className="text-gray-300 hover:text-primary transition-colors">
                Serviços
              </Link>
              <Link to="/quem-somos" className="text-gray-300 hover:text-primary transition-colors">
                Quem Somos
              </Link>
              <Link to="/blog" className="text-gray-300 hover:text-primary transition-colors">
                Blog
              </Link>
              <Link to="/contato" className="text-gray-300 hover:text-primary transition-colors">
                Contato
              </Link>
            </nav>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Serviços</h3>
            <nav className="flex flex-col space-y-2">
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                Automação de Processos
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                Desenvolvimento Web
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                Consultoria em IA
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                Integração de Sistemas
              </a>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contato</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin size={18} className="text-primary" />
                <span className="text-gray-300">
                  Campo Grande, MS - Brasil
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-primary" />
                <span className="text-gray-300">
                  {config.whatsapp.formatted}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-primary" />
                <span className="text-gray-300">
                  {config.company.email}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-gray-300">
            © 2025 HaruCode. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;