import React from 'react';

export const Slide2_Intro = () => {
  return (
    <div className="h-full flex flex-col relative overflow-hidden bg-slate-50">
      {/* CSS for custom animations */}
      <style>{`
        @keyframes wave {
          0% { d: path("M0,50 Q50,20 100,50 T200,50"); }
          50% { d: path("M0,50 Q50,80 100,50 T200,50"); }
          100% { d: path("M0,50 Q50,20 100,50 T200,50"); }
        }
        @keyframes wave2 {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50px); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        @keyframes flow {
          0% { stroke-dashoffset: 200; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }
        .animate-wave-path {
          animation: wave 4s ease-in-out infinite;
        }
        .animate-flow {
          stroke-dasharray: 10 190;
          animation: flow 3s linear infinite;
        }
      `}</style>

      {/* Main Title */}
      <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-900 mb-6 mt-2">
        Menjembatani Teori dan Praktik dalam Komputasi Kuantum
      </h2>

      {/* Three Columns Section */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-300 border-b border-gray-300 mb-4">
        
        {/* Column 1: Teori */}
        <div className="p-4 flex flex-col items-center text-center">
          <h3 className="font-bold text-gray-900 mb-4">Teori Kuantum (abstrak)</h3>
          
          {/* Animated Illustration: Waves */}
          <div className="w-full h-40 flex items-center justify-center mb-4 relative">
            <svg viewBox="0 0 200 120" className="w-full h-full text-blue-800 opacity-60">
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{stopColor:"rgb(100,100,255)", stopOpacity:0}} />
                  <stop offset="50%" style={{stopColor:"rgb(50,50,200)", stopOpacity:1}} />
                  <stop offset="100%" style={{stopColor:"rgb(100,100,255)", stopOpacity:0}} />
                </linearGradient>
              </defs>
              {/* Background abstract math symbols */}
              <text x="20" y="30" className="text-xs font-serif italic fill-gray-400" style={{animation: 'float 3s infinite'}}>|ψ⟩</text>
              <text x="160" y="40" className="text-xs font-serif italic fill-gray-400" style={{animation: 'float 4s infinite 1s'}}>∫</text>
              <text x="150" y="100" className="text-xs font-serif italic fill-gray-400">H</text>
              
              {/* Waves */}
              <path d="M0,60 C50,20 100,100 200,60" fill="none" stroke="currentColor" strokeWidth="1" className="opacity-30" />
              <path d="M0,60 C40,90 120,10 200,60" fill="none" stroke="currentColor" strokeWidth="1" className="opacity-30" />
              
              {/* Animated Main Wave */}
              <path d="M0,60 Q50,10 100,60 T200,60" fill="none" stroke="url(#grad1)" strokeWidth="2" className="animate-wave-path" />
              
              <text x="10" y="110" className="text-[10px] font-mono fill-gray-500">prob(|ψ⟩)</text>
            </svg>
          </div>

          <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
            Konsep matematis murni, seringkali sulit divisualisasikan dan diverifikasi secara langsung.
          </p>
        </div>

        {/* Column 2: Simulasi (Bridge) */}
        <div className="p-4 flex flex-col items-center text-center bg-gray-50/50">
          <h3 className="font-bold text-gray-900 mb-4">Simulasi Klasik (aksesibel)</h3>
          
          {/* Animated Illustration: Bridge */}
          <div className="w-full h-40 flex items-center justify-center mb-4 relative">
             <svg viewBox="0 0 200 100" className="w-full h-full text-blue-900">
                {/* Bridge Structure */}
                <path d="M20,80 Q100,20 180,80" fill="none" stroke="currentColor" strokeWidth="2" />
                <line x1="20" y1="80" x2="180" y2="80" stroke="currentColor" strokeWidth="2" />
                
                {/* Vertical Supports */}
                <line x1="40" y1="80" x2="40" y2="70" stroke="currentColor" strokeWidth="1" />
                <line x1="60" y1="80" x2="60" y2="55" stroke="currentColor" strokeWidth="1" />
                <line x1="80" y1="80" x2="80" y2="45" stroke="currentColor" strokeWidth="1" />
                <line x1="100" y1="80" x2="100" y2="40" stroke="currentColor" strokeWidth="3" /> {/* Center Pillar */}
                <line x1="120" y1="80" x2="120" y2="45" stroke="currentColor" strokeWidth="1" />
                <line x1="140" y1="80" x2="140" y2="55" stroke="currentColor" strokeWidth="1" />
                <line x1="160" y1="80" x2="160" y2="70" stroke="currentColor" strokeWidth="1" />

                {/* Base */}
                <rect x="90" y="80" width="20" height="20" fill="none" stroke="currentColor" />

                {/* Animated Data Flow */}
                <path d="M20,80 Q100,20 180,80" fill="none" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" className="animate-flow" />

                <text x="100" y="90" textAnchor="middle" className="text-[10px] font-bold fill-blue-900 tracking-widest">JEMBATAN</text>
             </svg>
          </div>

          <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
            Pendekatan praktis untuk memvalidasi dan memahami algoritma menggunakan sumber daya komputasi yang tersedia.
          </p>
        </div>

        {/* Column 3: Hardware */}
        <div className="p-4 flex flex-col items-center text-center">
          <h3 className="font-bold text-gray-900 mb-4">Perangkat Keras Kuantum (terbatas)</h3>
          
          {/* Animated Illustration: Chandelier */}
          <div className="w-full h-40 flex items-center justify-center mb-4 relative">
             <svg viewBox="0 0 100 120" className="h-full">
                {/* Structure */}
                <g className="stroke-gray-600 fill-none" strokeWidth="1">
                   {/* Top Plate */}
                   <ellipse cx="50" cy="20" rx="30" ry="5" />
                   <line x1="20" y1="20" x2="20" y2="40" />
                   <line x1="80" y1="20" x2="80" y2="40" />
                   
                   {/* Mid Plate */}
                   <ellipse cx="50" cy="40" rx="30" ry="5" />
                   <line x1="30" y1="40" x2="30" y2="60" />
                   <line x1="70" y1="40" x2="70" y2="60" />

                   {/* Bottom Plate */}
                   <ellipse cx="50" cy="60" rx="20" ry="4" />
                   
                   {/* Core */}
                   <line x1="50" y1="20" x2="50" y2="80" strokeWidth="4" className="stroke-gray-300" />
                   
                   {/* Chip Area */}
                   <rect x="40" y="80" width="20" height="20" className="stroke-blue-900 fill-blue-50" />
                   
                   {/* Wires */}
                   <path d="M40,80 C30,70 30,50 35,40" />
                   <path d="M60,80 C70,70 70,50 65,40" />
                </g>

                {/* Animated Chip Pulse */}
                <rect x="45" y="85" width="10" height="10" className="fill-blue-500 animate-pulse" />
                
                {/* Cold Air Particles */}
                <circle r="1" cx="40" cy="100" fill="lightblue" style={{animation: 'float 2s infinite'}} />
                <circle r="1" cx="60" cy="110" fill="lightblue" style={{animation: 'float 3s infinite 0.5s'}} />
             </svg>
          </div>

          <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
            Akses terbatas, biaya tinggi, rentan terhadap kesalahan dan noise lingkungan.
          </p>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="text-center px-4 md:px-12 pb-2">
        <div className="inline-block relative px-8 py-3 border-2 border-yellow-400 rounded-sm mb-4">
           {/* Decorative brackets/corners */}
           <div className="absolute top-0 left-0 w-3 h-3 border-l-4 border-t-4 border-yellow-400 -mt-1 -ml-1"></div>
           <div className="absolute top-0 right-0 w-3 h-3 border-r-4 border-t-4 border-yellow-400 -mt-1 -mr-1"></div>
           <div className="absolute bottom-0 left-0 w-3 h-3 border-l-4 border-b-4 border-yellow-400 -mb-1 -ml-1"></div>
           <div className="absolute bottom-0 right-0 w-3 h-3 border-r-4 border-b-4 border-yellow-400 -mb-1 -mr-1"></div>

           <span className="font-bold text-yellow-700 text-sm md:text-base">
             Solusi: Simulasi sirkuit kuantum performa tinggi pada komputer klasik.
           </span>
        </div>
      </div>

      {/* Footer Info with Definitions */}
      <div className="bg-gray-100 p-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-4">
         <div className="flex items-start space-x-3">
             <div className="bg-blue-600 text-white font-mono font-bold px-2 py-1 rounded text-xs">Cirq</div>
             <p className="text-xs text-gray-600">
               Framework <em>open-source</em> dari Google untuk membuat, mengedit, dan memanggil sirkuit kuantum (NISQ) menggunakan Python.
             </p>
         </div>
         <div className="flex items-start space-x-3">
             <div className="bg-blue-800 text-white font-mono font-bold px-2 py-1 rounded text-xs">Qsim</div>
             <p className="text-xs text-gray-600">
               Simulator sirkuit kuantum berkinerja tinggi (ditulis dalam C++) yang terintegrasi dengan Cirq untuk mempercepat simulasi pada hardware klasik.
             </p>
         </div>
      </div>

    </div>
  );
};