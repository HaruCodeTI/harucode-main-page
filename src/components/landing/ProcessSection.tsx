import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Imersão & Blueprint',
    body: 'Entrevistas, mapas de processos e arquitetura alvo. Em dias, entregamos plano com quick wins e fases.',
  },
  {
    number: '02',
    title: 'Entrega Modular',
    body: 'Sprints com metas claras, integrações contínuas e demos semanais. Ajustamos rota com dados reais.',
  },
  {
    number: '03',
    title: 'Operação Assistida',
    body: 'Monitoramento, evolução guiada por métricas e squad dedicada nas primeiras semanas pós-lançamento.',
  },
];

const ProcessSection = () => {
  return (
    <section className="px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-[1120px]">
        <motion.div
          className="max-w-2xl space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
        >
          <p className="section-label">Nosso processo</p>
          <h2>Um fluxo desenhado para reduzir risco e acelerar valor.</h2>
          <p className="text-base text-white/55">
            Combinamos disciplina de produto, engenharia e operações. Você acompanha tudo com transparência.
          </p>
        </motion.div>

        <div className="relative mt-12 lg:hidden">
          <div className="absolute bottom-0 left-[18px] top-0 w-px bg-white/[0.06]" />
          <div className="space-y-4">
            {steps.map((step) => (
              <motion.div
                key={`mobile-${step.number}`}
                className="card-surface relative pl-9"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <span className="absolute left-3 top-8 h-3 w-3 rounded-full border border-primary bg-background" />
                <span className="font-mono text-sm font-semibold text-primary">{step.number}</span>
                <h3 className="mt-3">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50">{step.body}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="mt-12 hidden gap-4 lg:grid lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {steps.map((step) => (
            <motion.div
              key={step.number}
              className="card-surface"
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
            >
              <span className="font-mono text-sm font-semibold text-primary">{step.number}</span>
              <h3 className="mt-3">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/50">{step.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;
