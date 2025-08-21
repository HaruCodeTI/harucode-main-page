// Configurações centralizadas da HaruCode
export const config = {
  // Número do WhatsApp (formato: código do país + DDD + número)
  whatsapp: {
    number: '5567996101030', // Altere este número conforme necessário
    formatted: '+55 (67) 99610-1030', // Formato para exibição
    url: 'https://wa.me/5567996101030' // URL completa do WhatsApp
  },
  
  // Outras configurações podem ser adicionadas aqui
  company: {
    name: 'HaruCode',
    email: 'contato.harucode@gmail.com',
    location: 'Campo Grande, MS - Brasil',
    cnpj: '59.153.541/0001-00'
  },
  
  // Configurações do EmailJS para envio de emails
  emailjs: {
    serviceId: 'service_2p5vvqw', // ID do serviço EmailJS (Gmail, Outlook, etc.)
    templateId: 'template_537uudr', // ID do template de email
    publicKey: 'eNHB0M5ZBjtfnYNNl', // Chave pública do EmailJS
    // Email que receberá as mensagens do formulário de contato
    recipientEmail: 'contato.harucode@gmail.com'
  }
};
