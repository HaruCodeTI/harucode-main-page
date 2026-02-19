import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { config } from '@/lib/config';

const metrics = [
  { value: '+60', label: 'Projetos entregues' },
  { value: '30 dias', label: 'Tempo médio de entrega' },
  { value: '97%', label: 'Satisfação dos clientes' },
];

const logos = ['Vercel', 'Loom', 'Cash App', 'Loops', 'Zapier', 'Ramp', 'Raycast'];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
  }),
};

const HeroSection = () => {
  return (
    <section id="hero" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_-10%,rgba(139,92,246,0.12),transparent)]" />

      <div className="relative mx-auto flex max-w-[1120px] flex-col items-center px-6 pb-20 pt-32 text-center lg:pt-40">
        <motion.p
          className="section-label mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Engenharia de software para operações complexas
        </motion.p>

        <motion.h1
          className="mx-auto max-w-3xl text-balance"
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          Tecnologia que protege margens e acelera crescimento.
        </motion.h1>

        <motion.p
          className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/55 sm:text-lg"
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          Diagnóstico profundo, arquitetura modular e entregas guiadas por dados. Cada projeto nasce para criar
          operações mais rentáveis.
        </motion.p>

        <motion.div
          className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <a href={config.whatsapp.url} target="_blank" rel="noopener noreferrer" className="btn-primary">
            Começar uma conversa
            <ArrowRight size={16} />
          </a>
          <a href="#expertise" className="btn-secondary">
            Conhecer nossa abordagem
          </a>
        </motion.div>

        <motion.div
          className="mt-20 flex w-full flex-col items-center gap-6 border-t border-white/[0.06] pt-10"
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <p className="text-[13px] font-medium text-white/25">
            Tecnologias e parceiros que impulsionam nossos projetos
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {logos.map((name) => (
              <span key={name} className="text-sm font-medium text-white/20">
                {name}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mt-12 grid w-full grid-cols-1 gap-4 sm:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {metrics.map((item) => (
            <motion.div
              key={item.label}
              className="card-surface text-center"
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
            >
              <p className="text-2xl font-semibold text-white">{item.value}</p>
              <p className="mt-1.5 text-sm text-white/45">{item.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
