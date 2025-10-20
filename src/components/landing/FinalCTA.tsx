import { ArrowRight } from 'lucide-react';
import { config } from '@/lib/config';

const FinalCTA = () => {
  return (
    <section className="px-6 pb-24 mt-20">
      <div className="mx-auto flex max-w-4xl flex-col gap-6 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-primary/40 via-primary/20 to-black/80 p-10 text-white shadow-glass backdrop-blur-3xl">
        <span className="text-xs uppercase tracking-[0.35em] text-white/60">Próximo passo</span>
        <h2 className="text-4xl font-semibold sm:text-5xl">Vamos desenhar seu plano de transformação.</h2>
        <p className="text-lg text-white/75">
          Conte seus desafios. Em 24h úteis entregamos diagnóstico, roadmap, squad sugerido e estimativa de investimento.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <a
            href={config.whatsapp.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-3"
          >
            Conversar agora
            <ArrowRight size={18} />
          </a>
          <a
            href="/contato"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-3 text-sm text-white/70 transition hover:border-white/40 hover:text-white"
          >
            Enviar briefing completo
          </a>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;

