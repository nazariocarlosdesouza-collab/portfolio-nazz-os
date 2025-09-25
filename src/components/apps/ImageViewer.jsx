import React, { useState, useEffect } from 'react';
import { fileSystem } from '../../lib/fileSystem';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const ImageViewer = ({ imageSrc, title }) => {
  const allImages = fileSystem.images;
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Se uma imagem específica foi passada (via FileExplorer), mostre-a.
  // Senão, mostre a primeira imagem da galeria.
  const [selectedImage, setSelectedImage] = useState(imageSrc || allImages[0].path);

  // Efeito para sincronizar o currentIndex se a imagem inicial (imageSrc) mudar.
  useEffect(() => {
    const initialIndex = allImages.findIndex(img => img.path === imageSrc);
    if (initialIndex !== -1) {
      setCurrentIndex(initialIndex);
      setSelectedImage(imageSrc);
    }
  }, [imageSrc, allImages]);
  
  // Se imageSrc foi fornecido, isso significa que não estamos no modo galeria.
  // Renderiza apenas a imagem única para manter a simplicidade.
  if (imageSrc) {
    return (
      <div className="bg-gray-900 h-full w-full flex flex-col items-center justify-center p-4">
        <div className="flex-grow flex items-center justify-center w-full overflow-hidden">
          <img src={imageSrc} alt={title} className="max-w-full max-h-full object-contain" />
        </div>
        <footer className="flex-shrink-0 pt-2 text-center">
          <p className="text-sm text-gray-300 truncate">{title}</p>
        </footer>
      </div>
    );
  }
  
  // --- MODO GALERIA (para o app mobile) ---
  const handleThumbnailClick = (imagePath, index) => {
    setSelectedImage(imagePath);
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    const prevIndex = (currentIndex - 1 + allImages.length) % allImages.length;
    setCurrentIndex(prevIndex);
    setSelectedImage(allImages[prevIndex].path);
  };
  
  const goToNext = () => {
    const nextIndex = (currentIndex + 1) % allImages.length;
    setCurrentIndex(nextIndex);
    setSelectedImage(allImages[nextIndex].path);
  };

  return (
    <div className="bg-gray-900 h-full w-full flex flex-col text-white">
      {/* Visualizador Principal da Imagem Selecionada */}
      <div className="flex-grow w-full bg-black flex items-center justify-center relative">
        <img src={selectedImage} alt="Visualização" className="max-w-full max-h-full object-contain" />
        
        {/* Controles de Navegação */}
        <button onClick={goToPrevious} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/80">
          <ChevronLeft size={24} />
        </button>
        <button onClick={goToNext} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/80">
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Grade de Miniaturas */}
      <div className="flex-shrink-0 w-full h-28 bg-gray-800 p-2 border-t border-gray-700">
        <div className="h-full flex items-center gap-2 overflow-x-auto">
          {allImages.map((image, index) => (
            <div 
              key={image.path} 
              className={`h-full aspect-square flex-shrink-0 rounded-md overflow-hidden cursor-pointer border-2 ${selectedImage === image.path ? 'border-blue-500' : 'border-transparent'}`}
              onClick={() => handleThumbnailClick(image.path, index)}
            >
              <img src={image.path} alt={image.name} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageViewer;