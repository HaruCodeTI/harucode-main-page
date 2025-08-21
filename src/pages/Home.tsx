import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Code, Brain, Users, Target, Lightbulb, Award, Eye } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import { config } from '../lib/config';
import Squares from '../components/ui/squares';

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
      id: 1,
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=225&fit=crop",
      title: "ERP de Restaurante: quando a planilha vira prejuízo",
      excerpt: "Sinais de que sua operação passou do ponto e precisa de ERP..."
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=400&h=225&fit=crop",
      title: "O Futuro da Automação nas Empresas",
      excerpt: "Como a IA está revolucionando processos empresariais e aumentando a produtividade..."
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=225&fit=crop",
      title: "Desenvolvimento Web: Tendências 2024",
      excerpt: "As principais tecnologias e frameworks que estão moldando o desenvolvimento web..."
    }
  ];

  const getPostUrl = (post: any) => {
    if (post.id === 1) {
      return '/blog/erp-restaurante-planilha-prejuizo';
    }
    if (post.id === 2) {
      return '/blog/controle-pecas-estoque';
    }
    if (post.id === 3) {
      return '/blog/site-que-gera-leads-checklist';
    }
    // Para outros posts, redireciona para o blog geral
    return '/blog';
  };

  const values = [
    { icon: <Lightbulb className="w-6 h-6" />, text: "Inovação" },
    { icon: <img src="/aba.svg" alt="Ética" className="w-6 h-6" />, text: "Ética" },
    { icon: <Award className="w-6 h-6" />, text: "Excelência" },
    { icon: <Brain className="w-6 h-6" />, text: "Criatividade" },
    { icon: <Users className="w-6 h-6" />, text: "Proximidade" }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-16 md:pb-20 bg-black relative overflow-hidden">
        <Squares 
          speed={0.5} 
          squareSize={100}
          direction='left'
          borderColor='#475569'
          hoverFillColor='#FFFFFF'
          className="absolute inset-0 opacity-40 w-full h-full"
        />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-medium border border-white/30">
                <span className="w-2 h-2 bg-white rounded-full"></span>
                <span>Inovação Tecnológica</span>
              </div>

              <div className="space-y-6">
                <h1 className="text-4xl lg:text-5xl font-bold leading-tight text-white">
                Automação e software que {' '}
                  <span className="text-gradient">cortam</span>{' '}
                  retrabalho e aumentam sua margem.
                </h1>
                <p className="text-lg text-gray-100 leading-relaxed max-w-3xl mx-auto">
                  Soluções customizadas em software, automação e IA que modernizam 
                  processos e impulsionam resultados.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={config.whatsapp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center justify-center space-x-2"
                >
                  <span>Solicitar Proposta</span>
                  <ArrowRight className="w-5 h-5" />
                </a>
                <Link to="/servicos" className="bg-white/20 text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 hover:bg-white/30 hover:scale-105 inline-flex items-center justify-center">
                  Conhecer Serviços
                </Link>
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
          {/* Cabeçalho da seção */}
          <div className={`text-center space-y-6 mb-16 fade-in-up ${visibleSections.includes('about') ? 'visible' : ''}`}>
            <h2 className="text-5xl font-bold">Sobre Nós</h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Simplificamos tecnologia para impulsionar pessoas e negócios — com foco em soluções digitais inteligentes para a América Latina.
            </p>
          </div>
          
          {/* Grade 2x2 */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Coluna Esquerda - Missão, Visão e Valores */}
            <div className="space-y-8">
              {/* Missão */}
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <div className="space-y-4">
                  <span className="text-sm font-semibold text-primary uppercase tracking-wide">Missão</span>
                  <p className="text-lg text-gray-800 leading-relaxed max-w-prose">
                    Simplificar tecnologia para impulsionar pessoas e negócios.
                  </p>
                </div>
              </div>
              
              {/* Visão */}
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <div className="space-y-4">
                  <span className="text-sm font-semibold text-primary uppercase tracking-wide">Visão</span>
                  <p className="text-lg text-gray-800 leading-relaxed max-w-prose">
                    Ser referência em soluções digitais inteligentes na América Latina.
                  </p>
                </div>
              </div>
              
              {/* Valores */}
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <div className="space-y-6">
                  <span className="text-sm font-semibold text-primary uppercase tracking-wide">Valores</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { icon: <Lightbulb className="w-5 h-5" />, text: "Inovação", description: "testamos, medimos e escalamos o que funciona." },
                      { icon: <img src="/aba.svg" alt="Ética" className="w-5 h-5" />, text: "Ética", description: "decisões e dados com transparência." },
                      { icon: <Award className="w-5 h-5" />, text: "Excelência", description: "qualidade previsível e atenção aos detalhes." },
                      { icon: <Brain className="w-5 h-5" />, text: "Criatividade", description: "soluções simples para problemas complexos." },
                      { icon: <Users className="w-5 h-5" />, text: "Proximidade", description: "comunicação direta, sem jargão." }
                    ].map((value, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <div className="text-primary">{value.icon}</div>
                          <span className="font-semibold text-gray-800">{value.text}</span>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed pl-7">{value.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Coluna Direita - Imagem */}
            <div className={`fade-in-up flex items-center justify-center ${visibleSections.includes('about') ? 'visible' : ''}`}>
              <img
                src="/workflow.png"
                alt="Workflow e processos"
                className="w-full h-auto rounded-xl shadow-sm object-cover max-w-lg"
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
              <Link
                key={index}
                to={getPostUrl(post)}
                className={`glass-card overflow-hidden card-hover fade-in-up block ${visibleSections.includes('blog') ? 'visible' : ''}`}
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
                  <div className="text-primary font-medium inline-flex items-center space-x-1">
                    <span>Ler mais</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
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
              href={config.whatsapp.url}
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