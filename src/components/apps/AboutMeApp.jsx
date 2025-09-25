// src/components/apps/AboutMeApp.jsx - COMPLETO
import React from 'react';

const AboutMeApp = () => {
  return (
    // Usamos 'prose' do Tailwind para uma formatação de texto bonita e automática
    <div className="prose prose-invert max-w-none text-gray-900">
      <h2 className="text-2xl font-bold text-gray-800">
        Eu construo soluções digitais completas.
      </h2>
      <p className="mt-4 text-gray-700">
        Sou um <strong>Full Stack Builder</strong> especializado em acelerar entregas digitais usando uma stack moderna que combina no-code, low-code e Inteligência Artificial.
      </p>
      <p className="mt-2 text-gray-700">
        Meu trabalho é ir da ideia ao projeto no ar, de forma rápida e sem gargalos.
      </p>

      <h3 className="text-xl font-bold mt-6 text-gray-800">O que eu entrego:</h3>
      <ul className="mt-2 list-disc list-inside text-gray-700 space-y-1">
        <li><strong>Front-end de Alto Impacto:</strong> Interfaces ricas e responsivas com React, TailwindCSS e Vite, ou soluções robustas com WordPress e Elementor Pro.</li>
        <li><strong>Integrações Back-end:</strong> Conexão com bancos de dados (Firebase, Supabase) e APIs (pagamentos, login social, automações).</li>
        <li><strong>Inteligência de Dados:</strong> Configuração completa de Google Tag Manager, Analytics e Search Console.</li>
        <li><strong>Deploy e Hospedagem:</strong> Publicação final do projeto, otimizado para performance e segurança.</li>
      </ul>

      <p className="mt-6 font-semibold text-gray-800">
        Busco parcerias com agências que precisam de um braço técnico confiável para acelerar demandas e escalar a produção sem perder a qualidade.
      </p>
    </div>
  );
};

export default AboutMeApp;