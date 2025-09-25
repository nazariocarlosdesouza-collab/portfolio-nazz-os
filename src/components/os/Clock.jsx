// src/components/os/Clock.jsx - COMPLETO
import React, { useState, useEffect } from 'react';

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // A cada segundo (1000ms), atualiza o estado 'time'
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Função de limpeza para remover o intervalo quando o componente for desmontado
    return () => clearInterval(timerId);
  }, []); // O array vazio [] garante que o useEffect rode apenas uma vez (na montagem)

  // Formata a hora para HH:MM AM/PM
  const formattedTime = time.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <div className="text-white text-sm font-sans">
      {formattedTime}
    </div>
  );
};

export default Clock;