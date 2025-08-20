import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, User, Clock, Search, Filter } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import { config } from '../lib/config';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todos');

  // Função para gerar URL do post baseada no título
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

  const categories = [
    { id: 'todos', label: 'Todos' },
    { id: 'automacao', label: 'Automação' },
    { id: 'marketing', label: 'Marketing' }
  ];

  const posts = [
    {
      id: 1,
      title: "ERP de Restaurante: quando a planilha vira prejuízo",
      excerpt: "Sinais de que sua operação passou do ponto e precisa de ERP. Descubra como planilhas e WhatsApp estão comprometendo sua margem...",
      content: "Se o fechamento do seu dia depende de **planilha + WhatsApp**, sua margem já está vazando. Três sinais claros: 1) **Quebra de estoque** recorrente. Sem mínimo/máximo, você compra na pressa e vende sem lucro. 2) **Conciliação confusa** entre PIX, cartão e apps. DRE vira adivinhação. 3) **Retrabalho**: pedido passa por 3 telas antes de chegar na cozinha. Um **ERP de verdade** conecta vendas, estoque, compras e financeiro. Resultado: CMV controlado, compras por dados, e **painel diário** no celular. Quer enxergar sua operação em tempo real (sem drama)? **Fale com a HaruCode**.",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop",
      author: "Equipe HaruCode",
      date: "20 de Agosto, 2025",
      category: "automacao",
      tags: ["Restaurante", "ERP", "Gestão", "Custos"],
      readTime: "2 min"
    },
    {
      id: 2,
      title: "Controle de peças: pare de perder dinheiro no estoque",
      excerpt: "Rastreie entradas/saídas, lote e custo para lucro real por OS. Descubra como organizar seu estoque em uma semana...",
      content: "Sem sistema, o estoque mente. Você entrega o serviço e a **arruela sumiu**. Fundamentos que resolvem: **SKU + localização** (estante/caixa). **Custo médio automático** para precificar sem chute. **Vínculo à OS**: peça só sai com número de ordem. **Requisição por técnico** registrada (quem tirou, quando e por quê). Resultado: **margem real por serviço**, compras no timing certo e zero sumiço. Quer organizar seu estoque em uma semana? **Chama a HaruCode**.",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
      author: "Equipe HaruCode",
      date: "20 de Agosto, 2025",
      category: "automacao",
      tags: ["Assistência Técnica", "Peças", "Estoque"],
      readTime: "2 min"
    },
    {
      id: 3,
      title: "7 itens de um site que realmente gera leads",
      excerpt: "Checklist direto para transformar visitas em orçamentos. Descubra como otimizar seu site para conversões...",
      content: "Seu site é bonito, mas converte? Foque no essencial: 1) **Proposta clara no topo** (+ botão). 2) **Prova social**: 3 depoimentos com nome e ramo. 3) **Portfólio enxuto**: 6 cases com resultado, não só layout. 4) **CTA fixo** (WhatsApp) no mobile. 5) **Página de preços** com faixas (sem esconder o jogo). 6) **Velocidade**: Lighthouse verde. 7) **Formulário curto**: nome, telefone, necessidade e prazo. Quer esse checklist aplicado ao seu site e um relatório em 24h? **Bora fazer.**",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      author: "Equipe HaruCode",
      date: "20 de Agosto, 2025",
      category: "marketing",
      tags: ["Sites", "Conversão", "Marketing"],
      readTime: "2 min"
    }
  ];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'todos' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 hero-gradient">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            <span className="text-gradient">Blog</span> HaruCode
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Insights, tendências e conhecimentos sobre tecnologia, automação e transformação digital
          </p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar artigos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">
                Nenhum artigo encontrado para sua busca.
              </p>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <div className="grid gap-8">
                  {filteredPosts.map((post, index) => (
                    <article
                      key={post.id}
                      className={`glass-card overflow-hidden card-hover ${
                        index === 0 ? 'lg:grid lg:grid-cols-2 lg:gap-6' : ''
                      }`}
                    >
                      <div className={index === 0 ? 'lg:order-2' : ''}>
                        <img
                          src={post.image}
                          alt={post.title}
                          className={`w-full object-cover ${
                            index === 0 ? 'h-64 lg:h-full' : 'h-48'
                          }`}
                        />
                      </div>
                      
                      <div className={`p-6 space-y-4 ${index === 0 ? 'lg:order-1' : ''}`}>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <User className="w-4 h-4" />
                            <span>{post.author}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{post.date}</span>
                          </div>
                          <span>{post.readTime} de leitura</span>
                        </div>
                        
                        <h2 className={`font-bold text-foreground hover:text-primary transition-colors ${
                          index === 0 ? 'text-2xl' : 'text-xl'
                        }`}>
                          {post.title}
                        </h2>
                        
                        <p className="text-muted-foreground leading-relaxed">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag, tagIndex) => (
                              <span
                                key={tagIndex}
                                className="inline-flex items-center space-x-1 text-xs bg-primary-light text-primary px-2 py-1 rounded-full"
                              >
                                <Filter className="w-3 h-3" />
                                <span>{tag}</span>
                              </span>
                            ))}
                          </div>
                          
                          <Link 
                            to={getPostUrl(post)}
                            className="text-primary font-medium hover:underline inline-flex items-center space-x-1"
                          >
                            <span>Ler mais</span>
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Popular Posts */}
                <div className="glass-card p-6">
                  <h3 className="text-lg font-semibold mb-4">Artigos Populares</h3>
                  <div className="space-y-4">
                    {posts.slice(0, 3).map((post) => (
                      <Link 
                        key={post.id} 
                        to={getPostUrl(post)}
                        className="flex space-x-3 group cursor-pointer"
                      >
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1 space-y-1">
                          <h4 className="text-sm font-medium group-hover:text-primary transition-colors line-clamp-2">
                            {post.title}
                          </h4>
                          <p className="text-xs text-muted-foreground">{post.date}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Newsletter */}
                <div className="glass-card p-6 text-center space-y-4">
                  <h3 className="text-lg font-semibold">Newsletter</h3>
                  <p className="text-sm text-muted-foreground">
                    Receba os últimos artigos e novidades em seu email
                  </p>
                  <div className="space-y-3">
                    <input
                      type="email"
                      placeholder="Seu email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    <button className="btn-primary w-full">
                      Inscrever-se
                    </button>
                  </div>
                </div>

                {/* Categories Widget */}
                <div className="glass-card p-6">
                  <h3 className="text-lg font-semibold mb-4">Categorias</h3>
                  <div className="space-y-2">
                    {categories.slice(1).map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-primary-light hover:text-primary transition-colors"
                      >
                        {category.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-light">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl font-bold text-primary">
              Tem alguma dúvida ou sugestão?
            </h2>
            <p className="text-xl text-primary/80">
              Entre em contato conosco. Adoraríamos ouvir sua opinião!
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

export default Blog;