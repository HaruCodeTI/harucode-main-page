import { MessageCircle } from 'lucide-react';
import { config } from '../lib/config';

const WhatsAppButton = () => {
  return (
    <a
      href={config.whatsapp.url}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Falar no WhatsApp"
    >
      <MessageCircle size={24} />
    </a>
  );
};

export default WhatsAppButton;