import { ArrowLeft, Calendar, Clock, User, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import { config } from '../lib/config';

const PostERP = () => {
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
                {["Restaurante", "ERP", "Gestão", "Custos"].map((tag, index) => (
                  <span 
                    key={index}
                    className="px-4 py-2 bg-white/25 text-white text-sm font-medium rounded-full backdrop-blur-sm border border-white/30 hover:bg-white/35 transition-all duration-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight drop-shadow-lg">
                ERP de Restaurante: quando a planilha vira prejuízo
              </h1>
              
              <p className="text-xl md:text-2xl text-white/95 max-w-3xl mx-auto leading-relaxed font-medium">
                Sinais de que sua operação passou do ponto e precisa de ERP.
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
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=400&fit=crop"
                alt="Restaurante com equipe trabalhando"
                className="w-full h-auto rounded-xl shadow-lg object-cover"
              />
            </div>
            
            {/* Post Content */}
            <article className="prose prose-lg max-w-none">
              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg mb-8">
                <p className="text-red-800 font-semibold text-lg leading-relaxed">
                  Se o fechamento do seu dia depende de <strong>planilha + WhatsApp</strong>, sua margem já está vazando.
                </p>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Três sinais claros de que você precisa de um ERP:
              </h2>
              
              <div className="space-y-8 mb-12">
                {/* Problema 1 */}
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold text-red-600 mb-3">
                    1. Quebra de estoque recorrente
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Sem controle de mínimo/máximo, você compra na pressa e vende sem lucro. 
                    Produtos estragam, clientes ficam insatisfeitos e o dinheiro vai pelo ralo.
                  </p>
                </div>
                
                {/* Problema 2 */}
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold text-red-600 mb-3">
                    2. Conciliação confusa entre PIX, cartão e apps
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    DRE vira adivinhação. Você não sabe exatamente quanto entrou, 
                    quanto saiu e onde está o problema. Resultado: decisões baseadas em "achismos".
                  </p>
                </div>
                
                {/* Problema 3 */}
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold text-red-600 mb-3">
                    3. Retrabalho desnecessário
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Pedido passa por 3 telas antes de chegar na cozinha. 
                    Garçom anota no papel, passa para o caixa, que digita no sistema. 
                    Ineficiência pura.
                  </p>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                A solução: ERP de verdade
              </h2>
              
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Um <strong>ERP de verdade</strong> conecta vendas, estoque, compras e financeiro em um só lugar. 
                Resultado: CMV controlado, compras baseadas em dados reais, e <strong>painel diário</strong> no celular.
              </p>
              
              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg mb-8">
                <h3 className="text-green-800 font-semibold text-lg mb-3">
                  O que você ganha:
                </h3>
                <ul className="text-green-700 space-y-2">
                  <li>• Controle de estoque em tempo real</li>
                  <li>• Relatórios financeiros precisos</li>
                  <li>• Integração entre todas as operações</li>
                  <li>• Decisões baseadas em dados</li>
                  <li>• Economia de tempo e dinheiro</li>
                </ul>
              </div>
              
              <div className="text-center bg-primary-light p-8 rounded-xl">
                <h3 className="text-2xl font-bold text-primary mb-4">
                  Quer enxergar sua operação em tempo real (sem drama)?
                </h3>
                <p className="text-primary/80 mb-6">
                  Fale com a HaruCode e descubra como podemos transformar sua gestão
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
                  to="/blog" 
                  className="group block p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <h4 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors mb-2">
                    O Futuro da Automação nas Empresas
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Como a IA está revolucionando processos empresariais...
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

export default PostERP;
