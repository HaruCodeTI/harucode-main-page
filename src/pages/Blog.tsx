import { useState } from 'react';
import { Search, Calendar, User, ArrowRight, Tag } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todos');

  const categories = [
    { id: 'todos', label: 'Todos' },
    { id: 'automacao', label: 'Automação' },
    { id: 'desenvolvimento', label: 'Desenvolvimento' },
    { id: 'ia', label: 'Inteligência Artificial' },
    { id: 'tendencias', label: 'Tendências' }
  ];

  const posts = [
    {
      id: 1,
      title: "O Futuro da Automação nas Empresas",
      excerpt: "Como a inteligência artificial está revolucionando processos empresariais e aumentando a produtividade de forma exponencial. Descubra as principais tendências...",
      content: "A automação está transformando a maneira como as empresas operam...",
      image: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=600&h=400&fit=crop",
      author: "Ana Silva",
      date: "15 de Março, 2024",
      category: "automacao",
      tags: ["Automação", "IA", "Produtividade"],
      readTime: "5 min"
    },
    {
      id: 2,
      title: "Desenvolvimento Web: Tendências 2024",
      excerpt: "As principais tecnologias e frameworks que estão moldando o desenvolvimento web moderno. React, Vue, Angular e as novas ferramentas que chegaram...",
      content: "O desenvolvimento web está em constante evolução...",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      author: "Carlos Mendes",
      date: "10 de Março, 2024",
      category: "desenvolvimento",
      tags: ["Web", "React", "Tendências"],
      readTime: "7 min"
    },
    {
      id: 3,
      title: "Machine Learning para Pequenas Empresas",
      excerpt: "Como implementar soluções de inteligência artificial de forma acessível e eficiente em pequenos negócios. Casos práticos e resultados reais...",
      content: "O machine learning não é exclusivo para grandes corporações...",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=400&fit=crop",
      author: "Marina Costa",
      date: "5 de Março, 2024",
      category: "ia",
      tags: ["ML", "Pequenas Empresas", "IA"],
      readTime: "6 min"
    },
    {
      id: 4,
      title: "Segurança em Aplicações Web",
      excerpt: "Melhores práticas para proteger suas aplicações web contra ameaças modernas. HTTPS, autenticação, autorização e muito mais...",
      content: "A segurança deve ser uma prioridade em qualquer projeto...",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop",
      author: "Pedro Santos",
      date: "28 de Fevereiro, 2024",
      category: "desenvolvimento",
      tags: ["Segurança", "Web", "HTTPS"],
      readTime: "8 min"
    },
    {
      id: 5,
      title: "ROI em Projetos de Automação",
      excerpt: "Como calcular e maximizar o retorno sobre investimento em projetos de automação empresarial. Métricas, KPIs e casos de sucesso...",
      content: "O retorno sobre investimento é fundamental para justificar projetos...",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      author: "Ana Silva",
      date: "20 de Fevereiro, 2024",
      category: "automacao",
      tags: ["ROI", "Automação", "KPIs"],
      readTime: "4 min"
    },
    {
      id: 6,
      title: "Chatbots Inteligentes com IA",
      excerpt: "Desenvolvendo chatbots que realmente entendem e ajudam os usuários. Natural Language Processing, integração com APIs e personalização avançada...",
      content: "Os chatbots evoluíram muito além de respostas pré-programadas...",
      image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=600&h=400&fit=crop",
      author: "Carlos Mendes",
      date: "15 de Fevereiro, 2024",
      category: "ia",
      tags: ["Chatbots", "NLP", "Atendimento"],
      readTime: "6 min"
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
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
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
                                <Tag className="w-3 h-3" />
                                <span>{tag}</span>
                              </span>
                            ))}
                          </div>
                          
                          <button className="text-primary font-medium hover:underline inline-flex items-center space-x-1">
                            <span>Ler mais</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
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
                      <div key={post.id} className="flex space-x-3 group cursor-pointer">
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
                      </div>
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
              href="https://wa.me/5511999999999"
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

export default Blog;