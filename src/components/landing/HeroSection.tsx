import { ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { config } from '@/lib/config';

const highlights = [
  {
    label: 'Projetos digitais lançados',
    value: '+60',
    description: 'Produtos sob medida entregues com ciclos curtos de validação.'
  },
  {
    label: 'Tempo médio de implementação',
    value: '30 dias',
    description: 'Sprints enxutas e integrações que reduzem retrabalho crítico.'
  },
  {
    label: 'Taxa de satisfação',
    value: '97%',
    description: 'Relacionamento próximo, com dados guiando cada entrega.'
  }
];

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-[radial-gradient(circle_at_15%_20%,rgba(124,58,237,0.32),rgba(6,8,20,0.95))]"
    >
      <div className="absolute inset-0 opacity-40">
        <div className="absolute -left-20 top-24 h-80 w-80 rounded-full bg-primary/30 blur-3xl" />
        <div className="absolute right-10 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-primary-light/20 blur-3xl" />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col gap-16 px-6 pb-24 pt-40 text-white">
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-xs uppercase tracking-[0.3em] text-white/80">
              <Sparkles size={14} /> Experiência HaruCode
            </span>
            <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-[56px]">
              Automação, inteligência e design sob medida para proteger a margem e acelerar crescimento.
            </h1>
            <p className="max-w-2xl text-lg text-white/70">
              Unimos produtos digitais, integrações e IA em camadas estratégicas para criar operações mais rentáveis.
              Cada projeto nasce de diagnósticos profundos e ciclos curtos de entrega.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href={config.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center justify-center gap-2 px-7 py-3"
              >
                Começar uma conversa
                <ArrowRight size={18} />
              </a>
              <a
                href="#expertise"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-7 py-3 text-sm text-white/70 transition hover:border-white/30 hover:text-white"
              >
                Conhecer nossa abordagem
              </a>
            </div>
          </div>

          <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-3xl">
            <div className="flex items-center gap-3 text-white">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/30">
                <ShieldCheck className="text-primary" size={24} />
              </span>
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-white/60">Manifesto</p>
                <p className="text-lg font-semibold">Tecnologia que protege ativos e abre novas receitas.</p>
              </div>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-white/70">
              Diagnóstico profundo, arquitetura modular e entregas guiadas por dados. Criamos software que conecta
              áreas, reduz ruídos e mantém você no controle.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 text-xs uppercase tracking-[0.25em] text-white/40">
              <span className="rounded-full border border-white/10 px-4 py-2">Automação</span>
              <span className="rounded-full border border-white/10 px-4 py-2">Integrações ERP</span>
              <span className="rounded-full border border-white/10 px-4 py-2">Sites institucionais</span>
            </div>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" id="expertise-anchor">
          {highlights.map((item) => (
            <div
              key={item.label}
              className="rounded-3xl border border-white/10 bg-black/40 px-6 py-7 backdrop-blur-3xl transition hover:border-primary/40"
            >
              <p className="text-sm uppercase tracking-[0.2em] text-white/40">{item.label}</p>
              <p className="mt-4 text-3xl font-semibold text-white">{item.value}</p>
              <p className="mt-3 text-sm text-white/60">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

