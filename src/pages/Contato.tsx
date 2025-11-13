import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import { config } from '../lib/config';

const Contato = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    empresa: '',
    assunto: '',
    mensagem: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.telefone.trim()) {
      newErrors.telefone = 'Telefone é obrigatório';
    } else {
      const phoneNumbers = formData.telefone.replace(/\D/g, '');
      if (phoneNumbers.length < 10 || phoneNumbers.length > 11) {
        newErrors.telefone = 'Telefone inválido. Digite DDD + número';
      }
    }

    if (!formData.mensagem.trim()) {
      newErrors.mensagem = 'Mensagem é obrigatória';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const dataToSend = {
        ...formData,
        telefone: formatPhoneForPost(formData.telefone)
      };

      const response = await fetch('https://n8n.harucode.com.br/webhook/97675544-b4af-4bd4-adbd-b219e765b194', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend)
      });

      if (!response.ok) {
        throw new Error('Falha no envio');
      }

      setIsSubmitted(true);
      setFormData({
        nome: '',
        email: '',
        telefone: '',
        empresa: '',
        assunto: '',
        mensagem: ''
      });
    } catch (error) {
      console.error('Erro ao enviar formulário', error);
      window.alert('Não foi possível enviar sua mensagem. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Função para aplicar máscara de telefone brasileiro
  const formatPhoneInput = (value: string): string => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, '');

    // Aplica a máscara conforme o usuário digita
    if (numbers.length <= 2) {
      return numbers;
    } else if (numbers.length <= 3) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    } else if (numbers.length <= 7) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 3)} ${numbers.slice(3)}`;
    } else {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 3)} ${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
    }
  };

  // Função para formatar telefone para envio (apenas números: 5567999999999)
  const formatPhoneForPost = (value: string): string => {
    const numbers = value.replace(/\D/g, '');
    // Adiciona o código do país +55 apenas com números
    return `55${numbers}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // Aplica a máscara se for o campo de telefone
    const newValue = name === 'telefone' ? formatPhoneInput(value) : value;

    setFormData(prev => ({ ...prev, [name]: newValue }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="pt-32 pb-20 min-h-screen flex items-center justify-center">
          <div className="text-center space-y-6 max-w-md mx-auto px-4">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold">Mensagem Enviada!</h1>
            <p className="text-muted-foreground text-lg">
              Obrigado pelo contato. Nossa equipe entrará em contato em breve.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="btn-primary"
            >
              Enviar nova mensagem
            </button>
          </div>
        </div>
        <Footer />
        <WhatsAppButton />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_10%_15%,rgba(124,58,237,0.3),rgba(5,6,16,0.95))] pb-28 pt-40">
        <div className="absolute inset-0">
          <div className="absolute left-1/3 top-10 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-primary-light/25 blur-3xl" />
        </div>
        <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-xs uppercase tracking-[0.35em] text-white/70">
            Fale com especialistas
          </span>
          <h1 className="text-balance text-4xl font-semibold text-white sm:text-5xl">
            Conecte seu negócio a um time que entrega tecnologia sob medida.
          </h1>
          <p className="max-w-2xl text-lg text-white/60">
            Conte sua dor em poucos minutos. Voltamos com diagnóstico, roadmap prático e investimento estimado em até
            24h úteis.
          </p>
        </div>
      </section>

      <section className="relative -mt-20 pb-24">
        <div className="relative mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1.6fr_1fr]">
            {/* Contact Form */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-white shadow-glass backdrop-blur-3xl lg:p-12">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.4em] text-white/40">Formulário</p>
              <h2 className="text-3xl font-semibold">Conte sobre seu projeto</h2>
              <p className="text-sm text-white/60">
                Precisamos apenas de alguns detalhes para direcionar o time correto e montar o blueprint inicial.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-7">
              <div className="grid gap-7 md:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="nome" className="block text-xs uppercase tracking-[0.3em] text-white/50">
                      Nome completo *
                    </label>
                    <input
                      type="text"
                      id="nome"
                      name="nome"
                      value={formData.nome}
                      onChange={handleInputChange}
                      className={`w-full rounded-2xl border bg-black/40 px-5 py-4 text-base text-white/80 placeholder:text-white/30 focus:ring-2 focus:ring-primary focus:outline-none ${
                        errors.nome ? 'border-red-500/80' : 'border-white/10'
                      }`}
                      placeholder="Como devemos te chamar?"
                    />
                    {errors.nome && (
                      <p className="text-red-500 text-sm">{errors.nome}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-xs uppercase tracking-[0.3em] text-white/50">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full rounded-2xl border bg-black/40 px-5 py-4 text-base text-white/80 placeholder:text-white/30 focus:ring-2 focus:ring-primary focus:outline-none ${
                        errors.email ? 'border-red-500/80' : 'border-white/10'
                      }`}
                      placeholder="nome@empresa.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="grid gap-7 md:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="telefone" className="block text-xs uppercase tracking-[0.3em] text-white/50">
                      Telefone *
                    </label>
                    <input
                      type="tel"
                      id="telefone"
                      name="telefone"
                      value={formData.telefone}
                      onChange={handleInputChange}
                      className={`w-full rounded-2xl border bg-black/40 px-5 py-4 text-base text-white/80 placeholder:text-white/30 focus:ring-2 focus:ring-primary focus:outline-none ${
                        errors.telefone ? 'border-red-500/80' : 'border-white/10'
                      }`}
                      placeholder="(67) 99999-9999"
                    />
                    {errors.telefone && (
                      <p className="text-red-500 text-sm">{errors.telefone}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="empresa" className="block text-xs uppercase tracking-[0.3em] text-white/50">
                      Empresa
                    </label>
                    <input
                      type="text"
                      id="empresa"
                      name="empresa"
                      value={formData.empresa}
                      onChange={handleInputChange}
                      className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-base text-white/80 placeholder:text-white/30 focus:ring-2 focus:ring-primary focus:outline-none"
                      placeholder="Onde você atua?"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="assunto" className="block text-xs uppercase tracking-[0.3em] text-white/50">
                    Assunto
                  </label>
                  <select
                    id="assunto"
                    name="assunto"
                    value={formData.assunto}
                    onChange={handleInputChange}
                    className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-base text-white/80 focus:ring-2 focus:ring-primary focus:outline-none"
                  >
                    <option value="">Selecione um assunto</option>
                    <option value="automacao">Automação de Processos</option>
                    <option value="desenvolvimento">Desenvolvimento Web</option>
                    <option value="ia">Consultoria em IA</option>
                    <option value="consultoria">Consultoria Geral</option>
                    <option value="suporte">Suporte</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="mensagem" className="block text-xs uppercase tracking-[0.3em] text-white/50">
                    Mensagem *
                  </label>
                  <textarea
                    id="mensagem"
                    name="mensagem"
                    value={formData.mensagem}
                    onChange={handleInputChange}
                    rows={6}
                    className={`w-full resize-none rounded-2xl border bg-black/40 px-5 py-5 text-base text-white/80 placeholder:text-white/30 focus:ring-2 focus:ring-primary focus:outline-none ${
                      errors.mensagem ? 'border-red-500/80' : 'border-white/10'
                    }`}
                    placeholder="O que você quer construir ou otimizar?"
                  />
                  {errors.mensagem && (
                    <p className="text-red-500 text-sm">{errors.mensagem}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`btn-primary w-full flex items-center justify-center gap-3 px-10 py-4 text-base ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-5 w-5 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                      <span>Enviando...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      <span>Enviar mensagem</span>
                    </>
                  )}
                </button>
              </form>
          </div>

          <div className="flex flex-col gap-6 rounded-3xl border border-white/5 bg-black/60 p-10 text-white/70 backdrop-blur-3xl lg:p-12">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.35em] text-white/40">Acesso direto</p>
              <h2 className="text-3xl font-semibold text-white">Contato imediato</h2>
              <p className="text-sm text-white/60">
                Estamos prontos para entender seu contexto e iniciar um diagnóstico com nosso time multifuncional.
              </p>
            </div>

            <div className="space-y-5 text-sm">
              <div className="flex gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-primary/10 text-primary">
                  <MapPin size={20} />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/40">Endereço</p>
                  <p className="text-white/75">
                    Rua Geraldo Agostinho Ramos, 90 - Jardim Paulista<br />Campo Grande, MS - 79050-080
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-primary/10 text-primary">
                  <Phone size={20} />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/40">Telefone / WhatsApp</p>
                  <p className="text-white/75">{config.whatsapp.formatted}</p>
                  <p className="text-xs text-white/40">Segunda a sexta · 9h às 19h</p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-primary/10 text-primary">
                  <Mail size={20} />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/40">Email</p>
                  <p className="text-white/75">{config.company.email}</p>
                  <p className="text-xs text-white/40">Retorno em até 24h úteis</p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-primary/10 text-primary">
                  <Clock size={20} />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/40">Disponibilidade</p>
                  <p className="text-white/75">Sábado das 9h às 13h · Domingo off</p>
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-3xl border border-white/10 bg-primary/10 p-8 text-white">
              <p className="text-md font-semibold">Precisa agilizar?</p>
              <p className="mt-2 text-sm text-white/70">
                Nosso time responde em minutos via WhatsApp. Envie briefing, documentos ou agenda uma call express.
              </p>
              <a
                href={config.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/90 px-6 py-3 text-sm font-medium text-primary transition hover:bg-white"
              >
                Conversar via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-white/5 bg-black/80 shadow-glass">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3737.5305171778755!2d-54.611043800000004!3d-20.4844673!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9486e600097824d1%3A0xf436d6fd153065b8!2sR.%20Geraldo%20Agostinho%20Ramos%2C%2090%20-%20Jardim%20Paulista%2C%20Campo%20Grande%20-%20MS%2C%2079050-080!5e0!3m2!1sen!2sbr!4v1755637101763!5m2!1sen!2sbr"
            width="100%"
            height="420"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Localização HaruCode"
          />
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Contato;