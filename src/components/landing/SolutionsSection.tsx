import { BrainCircuit, Code2, Layers3, Workflow } from 'lucide-react';
import { motion } from 'framer-motion';
import { type ReactNode } from 'react';

interface Solution {
  icon: ReactNode;
  title: string;
  description: string;
  tags: string[];
}

const solutions: Solution[] = [
  {
    icon: <Workflow size={20} />,
    title: 'Automação Operacional',
    description: 'Mapeamos processos críticos e conectamos sistemas para eliminar gargalos e retrabalho.',
    tags: ['Integrações', 'RPA', 'Governança'],
  },
  {
    icon: <Code2 size={20} />,
    title: 'Produtos Digitais Escaláveis',
    description: 'Aplicações web com arquitetura modular, prontas para crescer com o negócio e integrar times.',
    tags: ['Design System', 'Micro Serviços', 'Analytics'],
  },
  {
    icon: <BrainCircuit size={20} />,
    title: 'IA Aplicada a Resultados',
    description: 'Modelos preditivos para leads, estoques e operações financeiras com monitoramento contínuo.',
    tags: ['Machine Learning', 'Data Ops', 'Dashboards'],
  },
  {
    icon: <Layers3 size={20} />,
    title: 'Sites & Portais Institucionais',
    description: 'Experiências digitais com gestão de conteúdo, performance e integrações nativas a marketing e CRM.',
    tags: ['CMS', 'SEO', 'Automação de leads'],
  },
];

const SolutionsSection = () => {
  return (
    <section id="expertise" className="relative px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-[1120px]">
        <motion.div
          className="max-w-2xl space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
        >
          <p className="section-label">Expertise transversal</p>
          <h2>Tecnologia como escudo estratégico para o seu crescimento.</h2>
          <p className="text-base text-white/55">
            Selecionamos a squad ideal para cada fase — discovery, arquitetura, implementação e operação assistida.
            Conectamos pessoas, dados e finanças com precisão.
          </p>
        </motion.div>

        <motion.div
          className="mt-12 grid gap-4 sm:grid-cols-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {solutions.map((s) => (
            <motion.article
              key={s.title}
              className="card-surface card-surface-glow"
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                {s.icon}
              </div>
              <h3 className="mt-5">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/50">{s.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {s.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-white/[0.06] px-2.5 py-1 text-[11px] font-medium text-white/35"
                  >
                    {tag}
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

export default SolutionsSection;
