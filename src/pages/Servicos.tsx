import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Code, Brain, Users, Target, CheckCircle, Star } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import { config } from '../lib/config';

const Servicos = () => {
  const [activeService, setActiveService] = useState(0);

  const services = [
    {
      icon: <Zap className="w-12 h-12" />,
      title: "Automação Inteligente de Processos",
      description: "Transformamos tarefas manuais em processos automatizados que economizam tempo e reduzem erros.",
      features: [
        "Automação de workflows empresariais",
        "Integração entre sistemas diferentes",
        "Robotic Process Automation (RPA)",
        "Automação de relatórios e dashboards",
        "Notificações e alertas inteligentes"
      ],
      benefits: [
        "Redução de até 80% no tempo de processos",
        "Eliminação de erros humanos",
        "Maior produtividade da equipe"
      ]
    },
    {
      icon: <Code className="w-12 h-12" />,
      title: "Aplicações Web Sob Medida",
      description: "Desenvolvemos soluções web escaláveis e modernas, focadas na experiência do usuário.",
      features: [
        "Desenvolvimento full-stack",
        "Design responsivo e moderno",
        "Integração com APIs e serviços",
        "Sistemas de gestão personalizados",
        "E-commerce e marketplace"
      ],
      benefits: [
        "Interface intuitiva e moderna",
        "Performance otimizada",
        "Escalabilidade garantida",
        "Suporte técnico contínuo"
      ]
    },
    {
      icon: <Brain className="w-12 h-12" />,
      title: "Consultoria em IA & Dados",
      description: "Implementamos soluções de inteligência artificial para insights e decisões baseadas em dados.",
      features: [
        "Machine Learning personalizado",
        "Análise preditiva",
        "Chatbots inteligentes",
        "Processamento de linguagem natural",
        "Análise de dados avançada"
      ],
      benefits: [
        "Decisões baseadas em dados",
        "Previsão de tendências",
        "Automação de atendimento",
        "Insights valiosos do negócio"
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 hero-gradient">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Nossos <span className="text-gradient">Serviços</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Soluções tecnológicas completas para acelerar o crescimento do seu negócio
          </p>
        </div>
      </section>

      {/* Services Navigation */}
      <section className="py-8 bg-white sticky top-20 z-40 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {services.map((service, index) => (
              <button
                key={index}
                onClick={() => setActiveService(index)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeService === index
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {service.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Active Service Details */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-stretch">
              {/* Service Info */}
              <div className="space-y-8 flex flex-col">
                <div className="space-y-4">
                  <div className="w-20 h-20 bg-primary-light rounded-xl flex items-center justify-center">
                    <div className="text-primary">{services[activeService].icon}</div>
                  </div>
                  <h2 className="text-3xl font-bold">{services[activeService].title}</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {services[activeService].description}
                  </p>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xl font-semibold">O que inclui:</h3>
                  <div className="grid gap-3">
                    {services[activeService].features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Spacer para alinhar com o bloco de benefícios */}
                <div className="flex-1"></div>
              </div>

              {/* Benefits & CTA */}
              <div className="glass-card p-8 space-y-8 flex flex-col">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Benefícios:</h3>
                  <div className="space-y-3">
                    {services[activeService].benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-muted-foreground">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 pt-6 border-t border-gray-200 mt-auto">
                  <h4 className="font-semibold">Pronto para começar?</h4>
                  <p className="text-sm text-muted-foreground">
                    Vamos conversar sobre como podemos ajudar seu negócio a crescer
                  </p>
                  <a
                    href={config.whatsapp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary inline-flex items-center justify-center space-x-2"
                  >
                    <span>Solicitar Proposta</span>
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold">Como Trabalhamos</h2>
            <p className="text-xl text-muted-foreground">
              Processo estruturado para garantir o sucesso do seu projeto
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Análise", description: "Entendemos sua necessidade e objetivos" },
              { step: "02", title: "Planejamento", description: "Criamos uma estratégia personalizada" },
              { step: "03", title: "Desenvolvimento", description: "Implementamos a solução com qualidade" },
              { step: "04", title: "Suporte", description: "Oferecemos suporte contínuo e evolução" }
            ].map((process, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                  {process.step}
                </div>
                <h3 className="text-lg font-semibold">{process.title}</h3>
                <p className="text-muted-foreground">{process.description}</p>
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
              Vamos transformar sua ideia em realidade?
            </h2>
            <p className="text-xl text-primary/80">
              Entre em contato e descubra como podemos ajudar seu negócio a crescer
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={config.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center justify-center space-x-2"
              >
                <span>Converse no WhatsApp</span>
                <ArrowRight className="w-6 h-6" />
              </a>
              <a
                href="/contato"
                className="btn-secondary inline-flex items-center space-x-2"
              >
                <span>Enviar mensagem</span>
              </a>
            </div>
          </div>
        </div>
      </section>



      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Servicos;