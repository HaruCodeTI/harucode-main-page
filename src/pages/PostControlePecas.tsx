import { ArrowLeft, Calendar, Clock, User, Tag, Package, MapPin, Calculator, FileText, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import { config } from '../lib/config';

const PostControlePecas = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary via-primary/90 to-primary/80 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <div className="mb-8">
              <Link 
                to="/blog" 
                className="inline-flex items-center space-x-2 text-white/90 hover:text-white transition-colors bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Voltar ao Blog</span>
              </Link>
            </div>
            
            {/* Post Header */}
            <div className="text-center space-y-8">
              <div className="flex flex-wrap justify-center gap-3 mb-6">
                {["Assistência Técnica", "Peças", "Estoque"].map((tag, index) => (
                  <span 
                    key={index}
                    className="px-4 py-2 bg-white/25 text-white text-sm font-medium rounded-full backdrop-blur-sm border border-white/30 hover:bg-white/35 transition-all duration-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight drop-shadow-lg">
                Controle de peças: pare de perder dinheiro no estoque
              </h1>
              
              <p className="text-xl md:text-2xl text-white/95 max-w-3xl mx-auto leading-relaxed font-medium">
                Rastreie entradas/saídas, lote e custo para lucro real por OS.
              </p>
              
              {/* Post Meta */}
              <div className="flex flex-wrap justify-center items-center gap-8 text-white/90 text-sm bg-white/10 backdrop-blur-sm px-8 py-4 rounded-2xl border border-white/20">
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span className="font-medium">Equipe HaruCode</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span className="font-medium">20 de Agosto, 2025</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span className="font-medium">2 min de leitura</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Post Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Featured Image */}
            <div className="mb-12">
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop"
                alt="Estoque organizado com peças e componentes"
                className="w-full h-auto rounded-xl shadow-lg object-cover"
              />
            </div>
            
            {/* Post Content */}
            <article className="prose prose-lg max-w-none">
              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg mb-8">
                <p className="text-red-800 font-semibold text-lg leading-relaxed">
                  Sem sistema, o estoque mente. Você entrega o serviço e a <strong>arruela sumiu</strong>.
                </p>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Fundamentos que resolvem o problema do estoque:
              </h2>
              
              <div className="space-y-8 mb-12">
                {/* Solução 1 */}
                <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Package className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-blue-800 mb-3">
                        1. SKU + Localização (estante/caixa)
                      </h3>
                      <p className="text-blue-700 leading-relaxed">
                        Cada peça tem um código único e localização específica. 
                        Nada mais de "deve estar em algum lugar". 
                        Sistema de endereçamento que facilita a localização.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Solução 2 */}
                <div className="bg-green-50 p-6 rounded-xl border-l-4 border-green-500">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <Calculator className="w-6 h-6 text-green-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-green-800 mb-3">
                        2. Custo médio automático para precificar sem chute
                      </h3>
                      <p className="text-green-700 leading-relaxed">
                        O sistema calcula automaticamente o custo médio das peças. 
                        Precificação precisa baseada em dados reais, 
                        não em estimativas que comprometem a margem.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Solução 3 */}
                <div className="bg-purple-50 p-6 rounded-xl border-l-4 border-purple-500">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-6 h-6 text-purple-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-purple-800 mb-3">
                        3. Vínculo à OS: peça só sai com número de ordem
                      </h3>
                      <p className="text-purple-700 leading-relaxed">
                        Controle total: cada peça retirada está vinculada a uma Ordem de Serviço. 
                        Rastreabilidade completa e responsabilidade definida. 
                        Nada sai sem justificativa.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Solução 4 */}
                <div className="bg-orange-50 p-6 rounded-xl border-l-4 border-orange-500">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Users className="w-6 h-6 text-orange-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-orange-800 mb-3">
                        4. Requisição por técnico registrada
                      </h3>
                      <p className="text-orange-700 leading-relaxed">
                        Quem tirou, quando e por quê. Histórico completo de movimentações. 
                        Responsabilização e transparência total no uso das peças.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Resultado: Lucratividade real e controle total
              </h2>
              
              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg mb-8">
                <h3 className="text-green-800 font-semibold text-lg mb-3">
                  Benefícios implementados:
                </h3>
                <ul className="text-green-700 space-y-2">
                  <li>• <strong>Margem real por serviço</strong> - custos precisos</li>
                  <li>• <strong>Compras no timing certo</strong> - estoque otimizado</li>
                  <li>• <strong>Zero sumiço</strong> - rastreabilidade total</li>
                  <li>• <strong>Controle de qualidade</strong> - peças certificadas</li>
                  <li>• <strong>Relatórios automáticos</strong> - decisões baseadas em dados</li>
                </ul>
              </div>
              
              <div className="text-center bg-primary-light p-8 rounded-xl">
                <h3 className="text-2xl font-bold text-primary mb-4">
                  Quer organizar seu estoque em uma semana?
                </h3>
                <p className="text-primary/80 mb-6">
                  Chama a HaruCode e transforme seu controle de peças
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href={config.whatsapp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary inline-flex items-center justify-center space-x-2 px-8 py-3"
                  >
                    <span>Conversar no WhatsApp</span>
                  </a>
                  <Link 
                    to="/contato" 
                    className="bg-white text-primary border-2 border-primary px-8 py-3 rounded-xl font-medium transition-all duration-300 hover:bg-primary hover:text-white inline-flex items-center justify-center"
                  >
                    Solicitar Proposta
                  </Link>
                </div>
              </div>
            </article>
            
            {/* Related Posts */}
            <div className="mt-20 pt-12 border-t border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                Posts relacionados
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                <Link 
                  to="/blog/erp-restaurante-planilha-prejuizo" 
                  className="group block p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <h4 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors mb-2">
                    ERP de Restaurante: quando a planilha vira prejuízo
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Sinais de que sua operação passou do ponto e precisa de ERP...
                  </p>
                </Link>
                <Link 
                  to="/blog" 
                  className="group block p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <h4 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors mb-2">
                    ROI em Projetos de Automação
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Como calcular e maximizar o retorno sobre investimento...
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default PostControlePecas;
