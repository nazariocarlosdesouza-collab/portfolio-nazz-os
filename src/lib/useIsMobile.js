import { useState, useEffect } from 'react';

// Este hook verifica o tamanho da tela e retorna 'true' se for considerado mobile.
export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    window.addEventListener('resize', handleResize);

    // Função de limpeza para remover o event listener quando o componente for desmontado.
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [breakpoint]); // O efeito será re-executado se o breakpoint mudar.

  return isMobile;
}