import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, Minimize2, Github, Activity, Cpu } from 'lucide-react';
import { Slide1_Title } from './components/slides/Slide1_Title';
import { Slide2_Intro } from './components/slides/Slide2_Intro';
import { Slide3_Qubit } from './components/slides/Slide3_Qubit';
import { Slide4_Entanglement } from './components/slides/Slide4_Entanglement';
import { Slide5_Verification } from './components/slides/Slide5_Verification';
import { Slide6_DJ_Intro } from './components/slides/Slide6_DJ_Intro';
import { Slide7_DJ_Constant } from './components/slides/Slide7_DJ_Constant';
import { Slide8_DJ_Balanced } from './components/slides/Slide8_DJ_Balanced';
import { Slide9_QuantumAdvantage } from './components/slides/Slide9_QuantumAdvantage';
import { Slide10_QFT_Intro } from './components/slides/Slide10_QFT_Intro';
import { Slide11_QFT_Circuit } from './components/slides/Slide11_QFT_Circuit';
import { Slide12_Reversibility } from './components/slides/Slide12_Reversibility';
import { Slide13_Summary } from './components/slides/Slide13_Summary';
import { Slide14_End } from './components/slides/Slide14_End';
import { Slide15_Thanks } from './components/slides/Slide15_Thanks';
import { Slide16_References } from './components/slides/Slide16_References';

const SLIDES = [
  Slide1_Title,
  Slide2_Intro,
  Slide3_Qubit,
  Slide4_Entanglement,
  Slide5_Verification,
  Slide6_DJ_Intro,
  Slide7_DJ_Constant,
  Slide8_DJ_Balanced,
  Slide9_QuantumAdvantage,
  Slide10_QFT_Intro,
  Slide11_QFT_Circuit,
  Slide12_Reversibility,
  Slide13_Summary,
  Slide14_End,
  Slide16_References,
  Slide15_Thanks
];

export default function App() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const nextSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => Math.min(prev + 1, SLIDES.length - 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Fullscreen logic
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      if (containerRef.current) {
        containerRef.current.requestFullscreen().catch(err => {
          console.error(`Error attempting to enable fullscreen: ${err.message}`);
        });
      }
    } else {
      document.exitFullscreen();
    }
  }, []);

  // Sync state with browser fullscreen changes (e.g., user presses ESC)
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const CurrentSlideComponent = SLIDES[currentSlideIndex];
  const progress = ((currentSlideIndex + 1) / SLIDES.length) * 100;

  // Dynamic classes based on fullscreen state
  // Added overflow-visible to container when not fullscreen to allow tooltips to popup if needed, 
  // but generally slides should handle their own internal overflow.
  const containerClasses = isFullscreen
    ? "w-screen h-screen bg-white flex flex-col relative overflow-hidden"
    : "w-full max-w-6xl aspect-[16/9] bg-white rounded-xl shadow-2xl flex flex-col relative border border-gray-200 transition-all duration-300 overflow-hidden";

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800 ${isFullscreen ? 'p-0' : 'p-2 md:p-8'}`}>
      
      {/* Global Animations Styles */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .slide-enter {
          animation: fadeIn 0.5s ease-out forwards;
        }
        @keyframes signalFlow {
          0% { left: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
        .animate-signal-flow {
          animation: signalFlow 2s linear infinite;
        }
      `}</style>

      {/* Main Presentation Container */}
      <div ref={containerRef} className={containerClasses}>
        
        {/* Header/Decorations */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-indigo-600 z-10"></div>
        
        <div className="absolute top-4 left-4 text-xs text-gray-400 font-mono hidden md:block z-20">
          QSIM PRESENTATION // {currentSlideIndex + 1}
        </div>
        
        {/* Top Right Controls */}
        <div className="absolute top-4 right-4 flex items-center space-x-4 z-50">
          <div className="flex space-x-2 text-gray-400 hidden md:flex">
            <Activity size={16} />
            <Cpu size={16} />
          </div>
          
          <button
            onClick={toggleFullscreen}
            className="p-2 text-gray-500 hover:text-blue-600 bg-white/80 hover:bg-white rounded-full transition-all backdrop-blur-sm border border-transparent hover:border-gray-200"
            title={isFullscreen ? "Keluar Layar Penuh (Esc)" : "Layar Penuh"}
          >
            {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
          </button>
        </div>

        {/* Slide Content Area */}
        <div className="flex-1 p-4 md:p-8 lg:p-12 overflow-y-auto overflow-x-hidden relative bg-white">
          <div key={currentSlideIndex} className="h-full w-full slide-enter">
            <CurrentSlideComponent />
          </div>
        </div>

        {/* Navigation Controls (Bottom Bar) */}
        <div className="bg-gray-50 border-t border-gray-200 p-4 flex items-center justify-between z-20 shrink-0">
          
          <div className="flex items-center space-x-4">
             <button 
              onClick={prevSlide}
              disabled={currentSlideIndex === 0}
              className="p-2 rounded-full hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              title="Previous Slide (Arrow Left)"
            >
              <ChevronLeft size={24} />
            </button>
            
            <div className="text-sm font-medium text-gray-600 whitespace-nowrap">
              Slide <span className="text-blue-600">{currentSlideIndex + 1}</span> / {SLIDES.length}
            </div>

            <button 
              onClick={nextSlide}
              disabled={currentSlideIndex === SLIDES.length - 1}
              className="p-2 rounded-full hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              title="Next Slide (Arrow Right)"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          <div className="flex-1 mx-8 h-2 bg-gray-200 rounded-full overflow-hidden hidden sm:block">
            <div 
              className="h-full bg-blue-600 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center space-x-2">
            <a href="https://github.com/FTRHOST/paper-quantum-simulation.git" target="_blank" rel="noreferrer" className="flex items-center space-x-2 px-3 py-1.5 bg-gray-200 hover:bg-gray-300 rounded-md text-sm font-semibold transition-colors">
              <Github size={16} />
              <span className="hidden sm:inline">Source Code</span>
            </a>
          </div>
        </div>
      </div>
      
      {!isFullscreen && (
        <p className="mt-4 text-gray-500 text-sm hidden md:block">
          Gunakan tombol <span className="font-bold border border-gray-300 rounded px-1">←</span> dan <span className="font-bold border border-gray-300 rounded px-1">→</span> pada keyboard untuk navigasi.
        </p>
      )}
    </div>
  );
}