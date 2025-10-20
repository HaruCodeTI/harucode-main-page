import { motion } from 'framer-motion';

const cases = [
  {
    sector: 'Indústria alimentícia',
    title: 'ERP conectado à operação e ao time financeiro',
    description:
      'Sincronizamos estoque, fiscal e produção com automações que evitam rupturas e retrabalho manual.',
    metrics: [
      { label: 'Redução de perdas', value: '28%' },
      { label: 'ROI em', value: '4 meses' },
      { label: 'Times envolvidos', value: '5 áreas' }
    ]
  },
  {
    sector: 'Serviços B2B',
    title: 'Portal institucional que qualifica leads',
    description:
      'Criamos site com CMS e integrações de CRM, medindo jornada ponta a ponta e acelerando o follow-up comercial.',
    metrics: [
      { label: 'Aumento de leads', value: '2.4x' },
      { label: 'Novos formulários', value: '5 fluxos' },
      { label: 'Automação de emails', value: 'Sim' }
    ]
  },
  {
    sector: 'Varejo digital',
    title: 'Robô de integrações entre ERP e plataformas',
    description:
      'Automatizamos cadastro de produtos, conciliação de pedidos e atualização fiscal em múltiplos canais.',
    metrics: [
      { label: 'Integrações ativas', value: '9 APIs' },
      { label: 'Tempo poupado', value: '60h/sem' },
      { label: 'Erro manual', value: '-85%' }
    ]
  }
];

const CaseShowcase = () => {
  return (
    <section id="cases" className="relative px-6 py-24">
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute left-10 top-10 h-40 w-40 rounded-full bg-primary/20 blur-3xl"
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-0 right-10 h-52 w-52 rounded-full bg-primary/15 blur-3xl"
          animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-12">
        <motion.div
          className="max-w-3xl space-y-4 text-white"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <p className="text-xs uppercase tracking-[0.35em] text-white/40">Impacto real</p>
          <h2 className="text-4xl font-semibold sm:text-5xl">
            Casos que combinam tecnologia, operação e dados para gerar novas margens.
          </h2>
          <p className="text-lg text-white/60">
            Da discovery ao suporte contínuo, criamos produtos com governança e observabilidade desde o primeiro dia.
          </p>
        </motion.div>

        <motion.div
          className="grid gap-6 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.2 }
            }
          }}
        >
          {cases.map((item, index) => (
            <motion.article
              key={item.title}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/5 bg-white/5 p-8 backdrop-blur-2xl transition hover:border-primary/30 hover:bg-white/10"
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 }
              }}
              whileHover={{ translateY: -8, transition: { duration: 0.35 } }}
            >
              <motion.span
                className="pointer-events-none absolute inset-0 -z-10 opacity-0 group-hover:opacity-100"
                style={{
                  background:
                    'radial-gradient(circle at 20% 0%, rgba(124,58,237,0.2), transparent 65%)'
                }}
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              />
              <motion.div
                className="absolute inset-x-6 top-0 h-full border-l border-dashed border-white/5"
                initial={{ opacity: 0, scaleY: 0 }}
                whileHover={{ opacity: 1, scaleY: 1 }}
                transition={{ duration: 0.45 }}
                style={{ transformOrigin: 'top center' }}
              />
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.4em] text-white/40">{item.sector}</p>
                <h3 className="text-2xl font-semibold text-white">{item.title}</h3>
                <p className="text-sm leading-relaxed text-white/60">{item.description}</p>
              </div>
              <motion.div
                className="mt-8 flex flex-wrap gap-4 text-xs uppercase tracking-[0.35em] text-white/40"
                initial={{ opacity: 0, y: 10 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
              >
                {item.metrics.map((metric) => (
                  <span key={metric.label} className="rounded-full border border-white/10 px-4 py-2">
                    {metric.label}: {metric.value}
                  </span>
                ))}
              </motion.div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CaseShowcase;

