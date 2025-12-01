import React from 'react';
import { Github } from 'lucide-react';

export const Slide14_End = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center">
      <h2 className="text-4xl font-bold text-gray-900 mb-6">Jelajahi Kodenya Sendiri.</h2>
      <p className="text-xl text-gray-600 mb-12 max-w-2xl">
        Seluruh kode sumber, termasuk Jupyter Notebook, tersedia secara publik.
        Kami mengundang Anda untuk mengunduh, menjalankan, dan memodifikasi kode.
      </p>

      <a 
        href="https://github.com/FTRHOST/paper-quantum-simulation.git" 
        target="_blank"
        rel="noreferrer"
        className="group flex flex-col items-center transition-transform hover:scale-105"
      >
        <div className="w-32 h-32 bg-gray-900 rounded-full flex items-center justify-center mb-6 shadow-2xl group-hover:bg-black transition-colors">
           <Github color="white" size={64} />
        </div>
        
        <div className="bg-white px-6 py-3 rounded-lg border border-gray-300 shadow-sm font-mono text-blue-600 font-bold group-hover:text-blue-800 group-hover:border-blue-300">
          github.com/FTRHOST/paper-quantum-simulation.git
        </div>
      </a>

      <div className="mt-16 text-gray-400 text-sm">
        Terima Kasih
      </div>
    </div>
  );
};