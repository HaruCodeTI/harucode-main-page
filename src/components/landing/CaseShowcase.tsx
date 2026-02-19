import { motion } from 'framer-motion';

const cases = [
  {
    sector: 'Indústria alimentícia',
    title: 'ERP conectado à operação e ao time financeiro',
    description: 'Sincronizamos estoque, fiscal e produção com automações que evitam rupturas e retrabalho manual.',
    metrics: [
      { label: 'Redução de perdas', value: '28%' },
      { label: 'ROI em', value: '4 meses' },
      { label: 'Times envolvidos', value: '5 áreas' },
    ],
  },
  {
    sector: 'Serviços B2B',
    title: 'Portal institucional que qualifica leads',
    description: 'Site com CMS e integrações de CRM, medindo jornada ponta a ponta e acelerando o follow-up comercial.',
    metrics: [
      { label: 'Aumento de leads', value: '2.4x' },
      { label: 'Novos fluxos', value: '5' },
      { label: 'Automação de emails', value: 'Sim' },
    ],
  },
  {
    sector: 'Varejo digital',
    title: 'Robô de integrações entre ERP e plataformas',
    description: 'Cadastro de produtos, conciliação de pedidos e atualização fiscal em múltiplos canais, automatizados.',
    metrics: [
      { label: 'Integrações ativas', value: '9 APIs' },
      { label: 'Tempo poupado', value: '60h/sem' },
      { label: 'Erro manual', value: '-85%' },
    ],
  },
];

const CaseShowcase = () => {
  return (
    <section id="cases" className="px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-[1120px]">
        <motion.div
          className="max-w-2xl space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <p className="section-label">Impacto real</p>
          <h2>Casos que combinam tecnologia e dados para gerar novas margens.</h2>
          <p className="text-base text-white/55">
            Da discovery ao suporte contínuo, criamos produtos com governança e observabilidade desde o primeiro dia.
          </p>
        </motion.div>

        <motion.div
          className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {cases.map((item) => (
            <motion.article
              key={item.title}
              className="card-surface card-surface-glow flex flex-col justify-between border-t border-t-primary/30"
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
            >
              <div>
                <p className="section-label">{item.sector}</p>
                <h3 className="mt-3">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50">{item.description}</p>
              </div>
              <div className="mt-6 flex flex-wrap gap-2 border-t border-white/[0.06] pt-5">
                {item.metrics.map((m) => (
                  <span
                    key={m.label}
                    className="rounded-md border border-white/[0.06] px-2.5 py-1 text-[11px] font-medium text-white/40"
                  >
                    {m.label}: <span className="text-white/70">{m.value}</span>
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CaseShowcase;
