import { MessageCircle } from 'lucide-react';
import { config } from '../lib/config';

const WhatsAppButton = () => {
  return (
    <a
      href={config.whatsapp.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-transform hover:scale-105"
    >
      <MessageCircle size={20} />
    </a>
  );
};

export default WhatsAppButton;
