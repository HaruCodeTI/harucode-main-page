import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Code, Brain, Users, Target, Heart, Lightbulb, Award, Eye } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';

const Home = () => {
  const [visibleSections, setVisibleSections] = useState<string[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => [...prev, entry.target.id]);
          }
        });
      },
      { threshold: 0.2 }
    );

    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Automação Inteligente de Processos",
      description: "Eliminamos tarefas manuais e conectamos sistemas para aumentar produtividade."
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Aplicações Web Sob Medida",
      description: "Desenvolvimento full-stack escalável, UX focada no usuário e integração com APIs."
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Consultoria em IA & Dados",
      description: "Estratégias de machine learning para geração de leads, insights e decisões orientadas a dados."
    }
  ];

  const blogPosts = [
    {
      image: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=400&h=225&fit=crop",
      title: "O Futuro da Automação nas Empresas",
      excerpt: "Como a IA está revolucionando processos empresariais e aumentando a produtividade..."
    },
    {
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=225&fit=crop",
      title: "Desenvolvimento Web: Tendências 2024",
      excerpt: "As principais tecnologias e frameworks que estão moldando o desenvolvimento web..."
    },
    {
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=225&fit=crop",
      title: "Machine Learning para Pequenas Empresas",
      excerpt: "Como implementar soluções de IA de forma acessível e eficiente em pequenos negócios..."
    }
  ];

  const values = [
    { icon: <Lightbulb className="w-6 h-6" />, text: "Inovação" },
    { icon: <Heart className="w-6 h-6" />, text: "Ética" },
    { icon: <Award className="w-6 h-6" />, text: "Excelência" },
    { icon: <Brain className="w-6 h-6" />, text: "Criatividade" },
    { icon: <Users className="w-6 h-6" />, text: "Proximidade" }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-primary-light/5 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full text-primary text-sm font-medium">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                <span>Inovação Tecnológica</span>
              </div>

              <div className="space-y-6">
                <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                  Tecnologia que{' '}
                  <span className="text-gradient">acelera</span>{' '}
                  o crescimento do seu negócio
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Soluções customizadas em software, automação e IA que modernizam 
                  processos e impulsionam resultados.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://wa.me/5511999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center justify-center space-x-2"
                >
                  <span>Solicitar Proposta</span>
                  <ArrowRight className="w-5 h-5" />
                </a>
                <Link to="/servicos" className="btn-glass inline-flex items-center justify-center">
                  Conhecer Serviços
                </Link>
              </div>

              {/* Statistics */}
              <div className="grid grid-cols-3 gap-8 pt-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">50+</div>
                  <div className="text-sm text-muted-foreground">Projetos Entregues</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">98%</div>
                  <div className="text-sm text-muted-foreground">Satisfação Cliente</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">24h</div>
                  <div className="text-sm text-muted-foreground">Tempo Resposta</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              {/* Dashboard Mockup */}
              <div className="glass-card p-6 float-animation">
                <div className="bg-white rounded-lg shadow-elegant p-4 space-y-4">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-800">HaruCode Dashboard</h3>
                    <div className="flex space-x-1">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* Chart Area */}
                  <div className="h-24 bg-gradient-to-br from-purple-100 to-purple-300 rounded-lg relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/40"></div>
                    <div className="absolute bottom-2 left-2 right-2">
                      <div className="grid grid-cols-4 gap-2">
                        {[40, 60, 80, 50].map((height, i) => (
                          <div
                            key={i}
                            className="bg-white/30 rounded-sm"
                            style={{ height: `${height}%` }}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-sm text-gray-600">Automação</div>
                      <div className="text-2xl font-bold text-green-600">+89%</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-sm text-gray-600">Produtividade</div>
                      <div className="text-2xl font-bold text-blue-600">+156%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white" data-animate id="services">
        <div className="container mx-auto px-4">
          <div className={`text-center space-y-4 mb-16 fade-in-up ${visibleSections.includes('services') ? 'visible' : ''}`}>
            <h2 className="text-4xl font-bold">Nossos Serviços</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Oferecemos soluções completas em tecnologia para transformar e acelerar seu negócio
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className={`glass-card p-8 text-center space-y-4 card-hover fade-in-up ${visibleSections.includes('services') ? 'visible' : ''}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 bg-primary-light rounded-xl flex items-center justify-center mx-auto">
                  <div className="text-primary">{service.icon}</div>
                </div>
                <h3 className="text-xl font-semibold">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-accent" data-animate id="about">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className={`space-y-8 fade-in-up ${visibleSections.includes('about') ? 'visible' : ''}`}>
              <h2 className="text-4xl font-bold">Sobre Nós</h2>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-primary">Missão</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Simplificar tecnologia para impulsionar pessoas e negócios.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-primary">Visão</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Ser referência em soluções digitais inteligentes na América Latina.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-primary">Valores</h3>
                  <div className="flex flex-wrap gap-3">
                    {values.map((value, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 bg-white/50 px-4 py-2 rounded-lg"
                      >
                        <div className="text-primary">{value.icon}</div>
                        <span className="font-medium">{value.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className={`fade-in-up ${visibleSections.includes('about') ? 'visible' : ''}`}>
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop"
                alt="Equipe trabalhando"
                className="rounded-xl shadow-elegant"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Blog Preview Section */}
      <section className="py-20 bg-white" data-animate id="blog">
        <div className="container mx-auto px-4">
          <div className={`text-center space-y-4 mb-16 fade-in-up ${visibleSections.includes('blog') ? 'visible' : ''}`}>
            <h2 className="text-4xl font-bold">Últimos Artigos</h2>
            <p className="text-xl text-muted-foreground">
              Acompanhe as últimas tendências e insights em tecnologia
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {blogPosts.map((post, index) => (
              <article
                key={index}
                className={`glass-card overflow-hidden card-hover fade-in-up ${visibleSections.includes('blog') ? 'visible' : ''}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6 space-y-3">
                  <h3 className="text-lg font-semibold">{post.title}</h3>
                  <p className="text-muted-foreground">{post.excerpt}</p>
                  <Link to="/blog" className="text-primary font-medium hover:underline inline-flex items-center space-x-1">
                    <span>Ler mais</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
          
          <div className={`text-center fade-in-up ${visibleSections.includes('blog') ? 'visible' : ''}`}>
            <Link to="/blog" className="btn-primary inline-flex items-center space-x-2">
              <span>Ver todos artigos</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-light">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl font-bold text-primary">
              Pronto para transformar seu negócio?
            </h2>
            <p className="text-xl text-primary/80">
              Vamos conversar sobre como a tecnologia pode acelerar o crescimento da sua empresa
            </p>
            <a
              href="https://wa.me/5511999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center space-x-2 text-lg px-12 py-4"
            >
              <span>Converse no WhatsApp</span>
              <ArrowRight className="w-6 h-6" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Home;