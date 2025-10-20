const steps = [
  {
    stage: '01',
    title: 'Imersão & Blueprint',
    body: 'Entrevistas, mapas de processos e arquitetura alvo. Em dias, entregamos plano com quick wins e fases.'
  },
  {
    stage: '02',
    title: 'Entrega Modular',
    body: 'Sprints com metas claras, integrações contínuas e demos semanais. Ajustamos rota com dados reais.'
  },
  {
    stage: '03',
    title: 'Operação Assistida',
    body: 'Monitoramento, evolução guiada por métricas e squad dedicada nas primeiras semanas pós-lançamento.'
  }
];

const ProcessSection = () => {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_50%_-20%,rgba(124,58,237,0.25),rgba(10,12,32,0.95))] px-6 py-24">
      <div className="absolute inset-0">
        <div className="absolute left-0 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-light/20 blur-3xl" />
        <div className="absolute right-10 top-0 h-80 w-80 rounded-full bg-primary/30 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-6xl">
        <div className="max-w-3xl space-y-4 text-white">
          <p className="text-xs uppercase tracking-[0.35em] text-white/40">Nosso processo</p>
          <h2 className="text-4xl font-semibold sm:text-5xl">Um fluxo desenhado para reduzir risco e acelerar valor.</h2>
          <p className="text-lg text-white/65">
            Combinamos disciplina de produto, engenharia e operações. Você acompanha tudo com transparência.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.stage}
              className="rounded-3xl border border-white/5 bg-white/5 p-8 backdrop-blur-2xl transition hover:border-primary/40 hover:bg-white/10"
            >
              <span className="text-xs uppercase tracking-[0.35em] text-white/40">{step.stage}</span>
              <h3 className="mt-4 text-2xl font-semibold text-white">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/60">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;

