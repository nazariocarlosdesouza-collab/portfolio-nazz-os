// src/components/apps/ProfileViewer.jsx

import React from 'react';

// CABEÇALHO FINAL E LIMPO, SEM E-MAIL OU DOMÍNIO
const Header = () => (
  <header className="mb-10 p-6 bg-gray-800/50 rounded-lg border border-gray-600/50 text-white shadow-lg flex items-center space-x-6">
    <img 
      src="/nazz.png" 
      alt="Foto de Nazário Carlos" 
      className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-2 border-gray-600"
    />
    <div className="flex-grow">
      <h1 className="text-2xl md:text-3xl font-bold tracking-wider text-gray-100">Nazário Carlos</h1>
      <p className="text-sm md:text-base text-gray-400 font-mono mt-1">Full Stack Builder | Parceiro de Produção Digital</p>
    </div>
  </header>
);

// Componente auxiliar para padronizar os títulos das seções
const Section = ({ title, children }) => (
  <section className="mb-8">
    <h2 className="text-lg font-mono text-gray-300 mb-3">[ {title} ]</h2>
    <div className="text-gray-400 text-sm leading-relaxed">{children}</div>
  </section>
);

// Componente auxiliar para padronizar a exibição dos certificados
const Certificate = ({ title, details, provider, year }) => (
  <li className="mb-3 pb-3 border-b border-gray-700/50 last:border-b-0">
    <h4 className="font-semibold text-gray-200">{title}</h4>
    <p className="text-xs text-gray-400 italic">{details}</p>
    <div className="flex justify-between text-xs text-gray-500 mt-1">
      <span>{provider}</span>
      <span>{year}</span>
    </div>
  </li>
);

const ProfileViewer = () => {
  return (
    <div className="bg-[#1e1e1e] h-full overflow-y-auto p-8 font-sans text-gray-300 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
      
      <Header />

      <main>
        <Section title="PROPOSTA DE VALOR">
          <p>
            Minha especialidade é a <strong>criação de experiências web de ponta a ponta</strong>, desde sites institucionais e landing pages de alta conversão até aplicações imersivas e interativas. Para isso, ofereço uma solução unificada que vai do código e design até a otimização para SEO e automação de marketing, entregando projetos mais coesos e com performance superior.
          </p>
        </Section>

        <Section title="ÁREAS DE ATUAÇÃO">
            <div className="mb-4">
                <h3 className="font-bold text-base text-gray-200 mb-2">Foco Principal: Desenvolvimento Web</h3>
                <ul className="list-disc list-inside space-y-2 pl-2">
                    <li><strong>Sites Institucionais e Landing Pages:</strong> Construção ágil e gerenciável com WordPress e Elementor.</li>
                    <li><strong>Lojas Virtuais de Alta Conversão:</strong> Implementação e otimização de e-commerce com WooCommerce.</li>
                    <li><strong>Aplicações Web Imersivas e Interativas:</strong> Desenvolvimento de alta performance com React, Vite e TypeScript.</li>
                </ul>
            </div>
            <div>
                <h3 className="font-bold text-base text-gray-200 mb-2">Serviços Integrados para Máximo Impacto</h3>
                <ul className="list-disc list-inside space-y-2 pl-2">
                    <li><strong>Design e Multimídia:</strong> Criação de assets visuais (Photoshop, Illustrator) e produção de vídeo/animação (After Effects, Premiere) para enriquecer o projeto.</li>
                    <li><strong>Inteligência de Marketing e SEO:</strong> Estruturação de dados (Google Tag Manager, Analytics, Search Console) para garantir que o site seja encontrado e mensurado.</li>
                    <li><strong>Automação de Processos:</strong> Implementação de workflows (N8N) para conectar o site a outras ferramentas de marketing e operações.</li>
                </ul>
            </div>
        </Section>
        
        <Section title="FERRAMENTAS E TECNOLOGIAS">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4 text-xs">
            <div><h4 className="font-bold text-gray-200 mb-1">Front-End</h4><p>React, Vite, TypeScript, JavaScript, HTML5, CSS3, TailwindCSS</p></div>
            <div><h4 className="font-bold text-gray-200 mb-1">Plataformas</h4><p>WordPress, Elementor Pro, WooCommerce</p></div>
            <div><h4 className="font-bold text-gray-200 mb-1">Design & Vídeo</h4><p>Photoshop, Illustrator, After Effects, Premiere</p></div>
            <div><h4 className="font-bold text-gray-200 mb-1">Análise & SEO</h4><p>Google Tag Manager, Analytics, Search Console, Google Meu Negócio</p></div>
            <div><h4 className="font-bold text-gray-200 mb-1">Automação</h4><p>N8N</p></div>
            <div><h4 className="font-bold text-gray-200 mb-1">Infraestrutura</h4><p>Git, Vercel, Bun</p></div>
          </div>
        </Section>
        
        <Section title="FORMAÇÃO">
           <p className="font-semibold text-gray-200">Formação em Publicidade e Propaganda</p>
           <span className="text-xs text-gray-500">Unisa - Universidade Santo Amaro</span>
        </Section>

        <Section title="CERTIFICAÇÕES TÉCNICAS">
          <ul>
            <Certificate title="WordPress Avançado" details="Certificação Workana: Proficiência comprovada, classificado entre os 4% melhores profissionais da plataforma." provider="Workana" year="96% de acerto" />
            <Certificate title="Motion Design Essencial" details="1 ano de duração." provider="Layer Lemonade" year="2022" />
            <Certificate title="JavaScript Completo" details="10 horas e 20 minutos de duração." provider="MX Cursos" year="2024" />
            <Certificate title="JavaScript Intermediário" details="5 horas e 16 minutos de duração." provider="MX Cursos" year="2023" />
            <Certificate title="JavaScript Básico" details="12 horas e 37 minutos de duração." provider="MX Cursos" year="2023" />
            <Certificate title="React Native - Criando Aplicativos" details="2 horas de duração." provider="MX Cursos" year="2022" />
            <Certificate title="React Básico" details="5 horas de duração." provider="MX Cursos" year="2022" />
            <Certificate title="After Effects - Motion Graphics" details="8 horas de duração." provider="MX Cursos" year="2021" />
            <Certificate title="After Effects - Criando Vinheta Animada" details="12 horas de duração." provider="MX Cursos" year="2021" />
            <Certificate title="After Effects - Criação e Animação de Personagens" details="8 horas de duração." provider="MX Cursos" year="2019" />
          </ul>
        </Section>
      </main>
    </div>
  );
};

export default ProfileViewer;