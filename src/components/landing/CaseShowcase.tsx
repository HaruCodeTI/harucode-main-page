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
    <section id="cases" className="px-6 py-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-12">
        <div className="max-w-3xl space-y-4 text-white">
          <p className="text-xs uppercase tracking-[0.35em] text-white/40">Impacto real</p>
          <h2 className="text-4xl font-semibold sm:text-5xl">
            Casos que combinam tecnologia, operação e dados para gerar novas margens.
          </h2>
          <p className="text-lg text-white/60">
            Da discovery ao suporte contínuo, criamos produtos com governança e observabilidade desde o primeiro dia.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {cases.map((item) => (
            <article
              key={item.title}
              className="group flex flex-col justify-between rounded-3xl border border-white/5 bg-white/5 p-8 backdrop-blur-2xl transition hover:border-primary/30 hover:bg-white/10"
            >
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.4em] text-white/40">{item.sector}</p>
                <h3 className="text-2xl font-semibold text-white">{item.title}</h3>
                <p className="text-sm leading-relaxed text-white/60">{item.description}</p>
              </div>
              <div className="mt-8 flex flex-wrap gap-4 text-xs uppercase tracking-[0.35em] text-white/40">
                {item.metrics.map((metric) => (
                  <span key={metric.label} className="rounded-full border border-white/10 px-4 py-2">
                    {metric.label}: {metric.value}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseShowcase;

