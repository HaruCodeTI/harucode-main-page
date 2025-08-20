import { Users, Target, Lightbulb, Award, Eye, ArrowRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import { config } from '../lib/config';

const QuemSomos = () => {
  const values = [
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Inovação",
      description: "Buscamos constantemente novas tecnologias e metodologias para entregar soluções únicas."
    },
    {
      icon: <img src="/aba.svg" alt="Ética" className="w-8 h-8" />,
      title: "Ética",
      description: "Transparência e honestidade em todas as nossas relações e processos."
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Excelência",
      description: "Comprometimento com a qualidade máxima em todos os projetos."
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Criatividade",
      description: "Pensamento criativo para resolver desafios complexos de forma simples."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Proximidade",
      description: "Relacionamento próximo e duradouro com nossos clientes."
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 hero-gradient">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Quem <span className="text-gradient">Somos</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Uma equipe apaixonada por tecnologia, dedicada a transformar negócios através da inovação
          </p>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12 mb-20">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary-light rounded-xl flex items-center justify-center mx-auto">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">Missão</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Simplificar tecnologia para impulsionar pessoas e negócios, 
                criando soluções que geram valor real e duradouro.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary-light rounded-xl flex items-center justify-center mx-auto">
                <Eye className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">Visão</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Ser referência em soluções digitais inteligentes na América Latina, 
                reconhecida pela excelência e inovação.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary-light rounded-xl flex items-center justify-center mx-auto">
                <img src="/aba.svg" alt="Propósito" className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">Propósito</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Democratizar o acesso à tecnologia avançada, tornando-a 
                acessível e útil para empresas de todos os tamanhos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-accent">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold">Nossos Valores</h2>
            <p className="text-xl text-muted-foreground">
              Os princípios que guiam todas as nossas decisões e ações
            </p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center space-y-4 glass-card p-6 card-hover">
                <div className="w-16 h-16 bg-primary-light rounded-xl flex items-center justify-center mx-auto">
                  <div className="text-primary">{value.icon}</div>
                </div>
                <h3 className="text-lg font-semibold">{value.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "100+", label: "Projetos Entregues" },
              { number: "50+", label: "Clientes Satisfeitos" },
              { number: "4", label: "Anos de Experiência" },
              { number: "24/7", label: "Suporte Disponível" }
            ].map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="text-4xl font-bold text-gradient">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-light">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl font-bold text-primary">
              Quer fazer parte da nossa história?
            </h2>
            <p className="text-xl text-primary/80">
              Entre em contato e descubra como podemos ajudar seu negócio a crescer
            </p>
            <a
              href={config.whatsapp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center space-x-2"
            >
              <span>Falar conosco</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default QuemSomos;