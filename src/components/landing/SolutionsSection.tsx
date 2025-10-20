import { BrainCircuit, Code2, Layers3, Workflow } from 'lucide-react';

const solutions = [
  {
    icon: <Workflow size={24} />,
    title: 'Automação Operacional',
    description:
      'Mapeamos processos críticos e conectamos sistemas para eliminar gargalos e retrabalho.',
    tags: ['Integrações', 'RPA', 'Governança']
  },
  {
    icon: <Code2 size={24} />,
    title: 'Produtos Digitais Escaláveis',
    description:
      'Aplicações web com arquitetura modular, prontas para crescer com o negócio e integrar times.',
    tags: ['Design System', 'Micro Serviços', 'Analytics']
  },
  {
    icon: <BrainCircuit size={24} />,
    title: 'IA Aplicada a Resultados',
    description:
      'Modelos preditivos para leads, estoques e operações financeiras com monitoramento contínuo.',
    tags: ['Machine Learning', 'Data Ops', 'Dashboards']
  },
  {
    icon: <Layers3 size={24} />,
    title: 'Sites & Portais Institucionais',
    description:
      'Experiências digitais com gestão de conteúdo, performance e integrações nativas a marketing e CRM.',
    tags: ['CMS', 'SEO', 'Automação de leads']
  }
];

const SolutionsSection = () => {
  return (
    <section id="expertise" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_-10%,rgba(124,58,237,0.28),transparent_55%)]" />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-6 py-24">
        <div className="max-w-3xl space-y-4">
          <p className="text-xs uppercase tracking-[0.4em] text-white/50">Expertise transversal</p>
          <h2 className="text-balance text-4xl font-semibold text-white sm:text-5xl">
            Tecnologia como escudo estratégico para o seu crescimento.
          </h2>
          <p className="text-lg text-white/60">
            Selecionamos a squad ideal para cada fase, cuidando de discovery, arquitetura, implementação e Operação
            Assistida. Conectamos pessoas, dados e finanças com precisão.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {solutions.map((solution) => (
            <article
              key={solution.title}
              className="group rounded-3xl border border-white/5 bg-white/5 p-8 backdrop-blur-2xl transition hover:border-primary/40 hover:bg-white/10"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-black/40 text-primary">
                {solution.icon}
              </div>
              <h3 className="mt-6 text-2xl font-semibold text-white">{solution.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/60">{solution.description}</p>
              <div className="mt-6 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.3em] text-white/40">
                {solution.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-white/10 px-3 py-1">
                    {tag}
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

export default SolutionsSection;

