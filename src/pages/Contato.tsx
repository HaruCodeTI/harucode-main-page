import { useState, type ChangeEvent, type FormEvent } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import { config } from '../lib/config';
import { useGHL } from '../hooks/use-ghl';

function formatPhoneInput(value: string): string {
  const n = value.replace(/\D/g, '');
  if (n.length <= 2) return n;
  if (n.length <= 3) return `(${n.slice(0, 2)}) ${n.slice(2)}`;
  if (n.length <= 7) return `(${n.slice(0, 2)}) ${n.slice(2, 3)} ${n.slice(3)}`;
  return `(${n.slice(0, 2)}) ${n.slice(2, 3)} ${n.slice(3, 7)}-${n.slice(7, 11)}`;
}

const inputClasses = (hasError: boolean) =>
  `w-full rounded-lg border bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/30 ${
    hasError ? 'border-red-500/60' : 'border-white/[0.06]'
  }`;

const Contato = () => {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    telefone: '',
    empresa: '',
    assunto: '',
    mensagem: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { submit, isLoading, isSuccess, error: apiError, reset } = useGHL();

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.nome.trim()) e.nome = 'Nome é obrigatório';
    if (!form.email.trim()) e.email = 'Email é obrigatório';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Email inválido';
    const digits = form.telefone.replace(/\D/g, '');
    if (!digits) e.telefone = 'Telefone é obrigatório';
    else if (digits.length < 10 || digits.length > 11) e.telefone = 'Telefone inválido';
    if (!form.mensagem.trim()) e.mensagem = 'Mensagem é obrigatória';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const nextValue = name === 'telefone' ? formatPhoneInput(value) : value;
    setForm((prev) => ({ ...prev, [name]: nextValue }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    await submit(form);
  };

  const handleReset = () => {
    reset();
    setForm({ nome: '', email: '', telefone: '', empresa: '', assunto: '', mensagem: '' });
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="relative px-6 pb-10 pt-28 text-center lg:pt-36">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_-10%,rgba(139,92,246,0.1),transparent)]" />
        <div className="relative mx-auto max-w-2xl">
          <p className="section-label mb-4">Fale com especialistas</p>
          <h1>Conecte seu negócio a um time que entrega tecnologia sob medida.</h1>
          <p className="mt-4 text-base text-white/55">
            Conte sua dor em poucos minutos. Voltamos com diagnóstico, roadmap prático e investimento estimado em até 24h úteis.
          </p>
        </div>
      </section>

      <section className="px-6 pb-24 lg:pb-32">
        <div className="mx-auto grid max-w-[1120px] gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="card-surface">
            {isSuccess ? (
              <motion.div
                className="flex flex-col items-center py-12 text-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10">
                  <CheckCircle className="h-7 w-7 text-emerald-400" />
                </div>
                <h3 className="mt-5">Mensagem enviada</h3>
                <p className="mt-2 max-w-sm text-sm text-white/50">
                  Obrigado pelo contato. Nossa equipe retornará em até 24h úteis com um diagnóstico inicial.
                </p>
                <button onClick={handleReset} className="btn-secondary mt-6 text-[13px]">
                  Enviar nova mensagem
                </button>
              </motion.div>
            ) : (
              <>
                <div className="mb-8">
                  <p className="section-label">Formulário</p>
                  <h3 className="mt-2">Conte sobre seu projeto</h3>
                  <p className="mt-1 text-sm text-white/45">Precisamos de alguns detalhes para direcionar o time correto.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="nome" className="mb-1.5 block text-[13px] font-medium text-white/45">Nome completo *</label>
                      <input id="nome" name="nome" value={form.nome} onChange={handleChange} placeholder="Como devemos te chamar?" className={inputClasses(!!errors.nome)} />
                      {errors.nome && <p className="mt-1 text-[12px] text-red-400">{errors.nome}</p>}
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-1.5 block text-[13px] font-medium text-white/45">Email *</label>
                      <input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="nome@empresa.com" className={inputClasses(!!errors.email)} />
                      {errors.email && <p className="mt-1 text-[12px] text-red-400">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="telefone" className="mb-1.5 block text-[13px] font-medium text-white/45">Telefone *</label>
                      <input id="telefone" name="telefone" type="tel" value={form.telefone} onChange={handleChange} placeholder="(67) 99999-9999" className={inputClasses(!!errors.telefone)} />
                      {errors.telefone && <p className="mt-1 text-[12px] text-red-400">{errors.telefone}</p>}
                    </div>
                    <div>
                      <label htmlFor="empresa" className="mb-1.5 block text-[13px] font-medium text-white/45">Empresa</label>
                      <input id="empresa" name="empresa" value={form.empresa} onChange={handleChange} placeholder="Onde você atua?" className={inputClasses(false)} />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="assunto" className="mb-1.5 block text-[13px] font-medium text-white/45">Assunto</label>
                    <select id="assunto" name="assunto" value={form.assunto} onChange={handleChange} className={`${inputClasses(false)} appearance-none`}>
                      <option value="">Selecione um assunto</option>
                      <option value="automacao">Automação de Processos</option>
                      <option value="desenvolvimento">Desenvolvimento Web</option>
                      <option value="ia">Consultoria em IA</option>
                      <option value="consultoria">Consultoria Geral</option>
                      <option value="suporte">Suporte</option>
                      <option value="outro">Outro</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="mensagem" className="mb-1.5 block text-[13px] font-medium text-white/45">Mensagem *</label>
                    <textarea id="mensagem" name="mensagem" rows={5} value={form.mensagem} onChange={handleChange} placeholder="O que você quer construir ou otimizar?" className={`${inputClasses(!!errors.mensagem)} resize-none`} />
                    {errors.mensagem && <p className="mt-1 text-[12px] text-red-400">{errors.mensagem}</p>}
                  </div>

                  {apiError && (
                    <p className="rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400">
                      {apiError}
                    </p>
                  )}

                  <button type="submit" disabled={isLoading} className={`btn-primary w-full ${isLoading ? 'cursor-not-allowed opacity-60' : ''}`}>
                    {isLoading ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send size={15} />
                        Enviar mensagem
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <div className="card-surface space-y-5">
              <div>
                <p className="section-label">Acesso direto</p>
                <h3 className="mt-2">Contato imediato</h3>
                <p className="mt-1 text-sm text-white/45">Estamos prontos para iniciar um diagnóstico com nosso time.</p>
              </div>

              <div className="space-y-4 text-sm">
                {[
                  { icon: <MapPin size={16} />, label: 'Endereço', value: 'Rua Geraldo A. Ramos, 90\nCampo Grande, MS' },
                  { icon: <Phone size={16} />, label: 'WhatsApp', value: config.whatsapp.formatted, sub: 'Segunda a sexta · 9h às 19h' },
                  { icon: <Mail size={16} />, label: 'Email', value: config.company.email, sub: 'Retorno em até 24h úteis' },
                  { icon: <Clock size={16} />, label: 'Disponibilidade', value: 'Sábado 9h–13h · Domingo off' },
                ].map((item) => (
                  <div key={item.label} className="flex gap-3">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      {item.icon}
                    </span>
                    <div>
                      <p className="text-[12px] font-medium uppercase tracking-wide text-white/30">{item.label}</p>
                      <p className="whitespace-pre-line text-white/65">{item.value}</p>
                      {item.sub && <p className="text-[12px] text-white/30">{item.sub}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card-surface border-primary/20">
              <p className="text-sm font-medium text-white">Precisa agilizar?</p>
              <p className="mt-1.5 text-sm text-white/45">Nosso time responde em minutos via WhatsApp.</p>
              <a
                href={config.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-4 w-full justify-center text-[13px]"
              >
                Conversar via WhatsApp
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Contato;
