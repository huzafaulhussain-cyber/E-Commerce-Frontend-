import React, { useState, useRef, useCallback, useEffect } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";

const categories = [
  { 
    id: "01", 
    title: "Diagnostics", 
    coverImg: "https://trimed-ltd.net/wp-content/uploads/2024/01/Trimed_01-1.jpg",
    pages: [
        "https://trimed-ltd.net/wp-content/uploads/2024/01/Trimed_01-1.jpg", 
        "https://trimed-ltd.net/wp-content/uploads/2024/01/Trimed_01-1.jpg", 
        "https://trimed-ltd.net/wp-content/uploads/2024/01/Trimed_01-1.jpg", 
        "https://trimed-ltd.net/wp-content/uploads/2024/01/Trimed_01-1.jpg", 
        "https://trimed-ltd.net/wp-content/uploads/2024/01/Trimed_01-1.jpg", 
        "https://trimed-ltd.net/wp-content/uploads/2024/01/Trimed_01-1.jpg", 
     
    ]
  },
  { 
    id: "02", 
    title: "Diagnostics", 
    coverImg: "https://trimed-ltd.net/wp-content/uploads/2024/01/Trimed_01-1.jpg",
    pages: [
        "https://trimed-ltd.net/wp-content/uploads/2024/01/Trimed_01-1.jpg", 
        "https://trimed-ltd.net/wp-content/uploads/2024/01/Trimed_01-1.jpg", 
        "https://trimed-ltd.net/wp-content/uploads/2024/01/Trimed_01-1.jpg", 
        "https://trimed-ltd.net/wp-content/uploads/2024/01/Trimed_01-1.jpg", 
        "https://trimed-ltd.net/wp-content/uploads/2024/01/Trimed_01-1.jpg", 
        "https://trimed-ltd.net/wp-content/uploads/2024/01/Trimed_01-1.jpg", 
     
    ]
  },
  { 
    id: "03", 
    title: "Diagnostics", 
    coverImg: "https://trimed-ltd.net/wp-content/uploads/2024/01/Trimed_01-1.jpg",
    pages: [
        "https://trimed-ltd.net/wp-content/uploads/2024/01/Trimed_01-1.jpg", 
        "https://trimed-ltd.net/wp-content/uploads/2024/01/Trimed_01-1.jpg", 
        "https://trimed-ltd.net/wp-content/uploads/2024/01/Trimed_01-1.jpg", 
        "https://trimed-ltd.net/wp-content/uploads/2024/01/Trimed_01-1.jpg", 
        "https://trimed-ltd.net/wp-content/uploads/2024/01/Trimed_01-1.jpg", 
        "https://trimed-ltd.net/wp-content/uploads/2024/01/Trimed_01-1.jpg", 
     
    ]
  },
  { 
    id: "04", 
    title: "Diagnostics", 
    coverImg: "https://trimed-ltd.net/wp-content/uploads/2024/01/Trimed_01-1.jpg",
    pages: [
        "https://trimed-ltd.net/wp-content/uploads/2024/01/Trimed_01-1.jpg", 
        "https://trimed-ltd.net/wp-content/uploads/2024/01/Trimed_01-1.jpg", 
        "https://trimed-ltd.net/wp-content/uploads/2024/01/Trimed_01-1.jpg", 
        "https://trimed-ltd.net/wp-content/uploads/2024/01/Trimed_01-1.jpg", 
     
    ]
  },
   
];

const Catalogue = () => {
  const [selectedCatalogue, setSelectedCatalogue] = useState(null);
  const bookRef = useRef(null);
  const audioRef = useRef(null);
  const lastPlayTime = useRef(0);

  useEffect(() => {
    const audio = new Audio('/pagesound.mp3');
    audio.preload = 'auto';
    audio.load();
    audioRef.current = audio;
  }, []);

  // Sound play karne ka function
  const playFlipSound = useCallback(() => {
    const now = Date.now();
    if (now - lastPlayTime.current < 300) return; // Debounce to prevent double play
    lastPlayTime.current = now;

    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.log("Sound interaction required"));
    }
  }, []);

  const openCatalogue = (item) => {
    setSelectedCatalogue(item);
    document.body.style.overflow = 'hidden';
  };

  const closeCatalogue = () => {
    setSelectedCatalogue(null);
    document.body.style.overflow = 'auto';
  };

  // Navigation handlers with Ref Safety
  const goNext = () => {
    playFlipSound(); // Play immediately on click
    if (bookRef.current) {
        bookRef.current.pageFlip().flipNext();
    }
  };

  const goPrev = () => {
    playFlipSound(); // Play immediately on click
    if (bookRef.current) {
        bookRef.current.pageFlip().flipPrev();
    }
  };

  return (
    <div className="min-h-screen bg-white py-20 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-24">
          <h2 className="text-4xl font-[900] text-slate-900 tracking-tight uppercase italic">
            Digital Catalogue
          </h2>
          <div className="h-1.5 w-24 bg-[#248041] mx-auto mt-4 rounded-full"></div>
          <p className="mt-6 text-slate-500 font-medium italic tracking-wide">Click on a book to view the full catalogue</p>
        </div>

        {/* --- Books Grid: Original Card UI Design --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-20 gap-x-10">
          {categories.map((item) => (
            <div key={item.id} className="flex flex-col items-center group cursor-pointer" onClick={() => openCatalogue(item)}>
              
              <div className="relative w-52 h-72 [perspective:2500px]">
                {/* Book Thickness */}
                <div className="absolute inset-0 w-full h-full bg-white rounded-r-sm shadow-md border border-slate-200 overflow-hidden">
                  <div className="flex items-center justify-center h-full opacity-10 grayscale">
                    <img src={item.coverImg} alt="" className="w-full h-full object-cover" />
                  </div>
                </div>

                {/* Rotating Cover */}
                <div className="relative z-30 w-full h-full origin-left transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] [transform-style:preserve-3d] group-hover:[transform:rotateY(-35deg)] shadow-[2px_0_10px_rgba(0,0,0,0.1)]">
                  <div className="absolute inset-0 w-full h-full bg-white rounded-r-md border border-slate-100 overflow-hidden">
                    <img src={item.coverImg} className="w-full h-full object-cover" alt="" />
                    <div className="absolute bottom-0 inset-x-0 bg-white/95 p-3 border-t border-slate-100">
                        <p className="text-[10px] text-[#248041] font-black tracking-widest uppercase">Haq Surgical</p>
                        <h4 className="text-[12px] font-bold text-slate-800 truncate uppercase">{item.title}</h4>
                    </div>
                    <div className="absolute top-0 right-0 w-11 h-8 bg-[#248041] text-white flex items-center justify-center font-black text-xs shadow-md">
                      {item.id}
                    </div>
                    <div className="absolute left-0 top-0 w-[6px] h-full bg-gradient-to-r from-black/20 to-transparent"></div>
                  </div>
                </div>
                {/* Hover Shadow */}
                <div className="absolute -bottom-8 left-4 right-4 h-5 bg-black/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
              </div>

              {/* Title Under Book */}
              <h3 className="mt-12 text-center">
                <span className="block text-sm font-black text-[#1e293b] group-hover:text-[#248041] transition-colors duration-300 uppercase tracking-widest">
                  {item.title}
                </span>
                <span className="block h-0.5 w-0 group-hover:w-full bg-[#248041] transition-all duration-500 mt-1.5 mx-auto"></span>
              </h3>
            </div>
          ))}
        </div>
      </div>

      {/* ===================== MODAL: CLEAN WHITE STYLE ===================== */}
      {selectedCatalogue && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-white p-4 overflow-hidden">
          
          {/* Header Bar */}
          <div className="absolute top-0 inset-x-0 p-6 flex justify-between items-center z-[300] border-b border-slate-50">
            <h2 className="text-slate-900 font-black uppercase tracking-widest text-lg ml-4">
              {selectedCatalogue.title}
            </h2>
            <div className="flex items-center gap-8 mr-4">
               
                <button onClick={closeCatalogue} className="text-slate-400 hover:text-slate-900 transition-all">
                    <XMarkIcon className="h-10 w-10" />
                </button>
            </div>
          </div>

          {/* Navigation Arrows: Positioned away from book */}
          <button 
            onClick={goPrev}
            className="absolute left-6 lg:left-16 z-[350] p-6 rounded-full bg-slate-50 text-slate-400 hover:bg-[#248041] hover:text-white transition-all shadow-sm active:scale-90"
          >
            <ChevronLeftIcon className="h-10 w-10" />
          </button>

          <button 
            onClick={goNext}
            className="absolute right-6 lg:right-16 z-[350] p-6 rounded-full bg-slate-50 text-slate-400 hover:bg-[#248041] hover:text-white transition-all shadow-sm active:scale-90"
          >
            <ChevronRightIcon className="h-10 w-10" />
          </button>

          {/* Flip Engine: Smooth Real Turning */}
          
          <div className="flex items-center justify-center w-full max-w-5xl h-[75vh]">
            <HTMLFlipBook 
              width={450} 
              height={600} 
              size="stretch"
              minWidth={300}
              maxWidth={1000}
              minHeight={400}
              maxHeight={1500}
              maxShadowOpacity={0.4}
              showCover={true}
              onFlip={playFlipSound} 
              ref={bookRef}
              // className="shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)]"
              style={{ backgroundColor: 'white' }}
              flippingTime={1000}
              useMouseEvents={true}
            >
              {selectedCatalogue.pages.map((page, index) => (
                <div key={index} className="bg-white overflow-hidden relative border-l border-slate-50">
                  <img src={page} className="w-full h-full object-contain pointer-events-none select-none" alt="" />
                  {/* Spine binding shadow */}
                  <div className="absolute inset-y-0 left-0 w-14 bg-gradient-to-r from-black/[0.04] to-transparent"></div>
                </div>
              ))}
            </HTMLFlipBook>
          </div>

          <div className="absolute bottom-10">
            <span className="text-[#248041] font-black text-[10px] tracking-[0.5em] uppercase animate-pulse">Drag corners to turn</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Catalogue;