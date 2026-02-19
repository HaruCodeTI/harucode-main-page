import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { config } from '@/lib/config';

const FinalCTA = () => {
  return (
    <section className="px-6 pb-24 lg:pb-32">
      <motion.div
        className="mx-auto max-w-2xl rounded-xl border border-primary/25 bg-card p-8 text-center lg:p-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5 }}
      >
        <p className="section-label">Próximo passo</p>
        <h2 className="mt-4">Vamos desenhar seu plano de transformação.</h2>
        <p className="mx-auto mt-4 max-w-md text-base text-white/55">
          Conte seus desafios. Em 24h úteis entregamos diagnóstico, roadmap, squad sugerido e estimativa de investimento.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href={config.whatsapp.url} target="_blank" rel="noopener noreferrer" className="btn-primary">
            Conversar agora
            <ArrowRight size={16} />
          </a>
          <a href="/contato" className="btn-secondary">
            Enviar briefing completo
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default FinalCTA;
