import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/5511999999999"
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float pulse-glow group"
      aria-label="Falar no WhatsApp"
    >
      <MessageCircle size={24} className="group-hover:scale-110 transition-transform duration-300" />
    </a>
  );
};

export default WhatsAppButton;