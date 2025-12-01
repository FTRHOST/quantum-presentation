import React from 'react';
import { MathFormula } from '../CircuitComponents';

export const Slide10_QFT_Intro = () => {
  return (
    <div className="h-full flex flex-col">
       <style>{`
          @keyframes slideIn {
             0% { opacity: 0; transform: translateX(-50px); }
             100% { opacity: 1; transform: translateX(0); }
          }
          @keyframes waveFlow {
             0% { transform: translateX(0); }
             100% { transform: translateX(-50%); } 
          }
          @keyframes pulseBox {
             0%, 100% { transform: scale(1); box-shadow: 0 0 0 rgba(59, 130, 246, 0); }
             50% { transform: scale(1.05); box-shadow: 0 0 20px rgba(59, 130, 246, 0.5); }
          }
          .animate-input { animation: slideIn 1s ease-out forwards; }
          .animate-output { animation: slideIn 1s ease-out 0.5s forwards; opacity: 0; }
          .animate-box { animation: pulseBox 3s infinite; }
          .flowing-wave { animation: waveFlow 4s linear infinite; }
       `}</style>

       <h2 className="text-3xl font-bold text-blue-800 mb-4 border-b pb-2">Mahakarya Kuantum: Quantum Fourier Transform (QFT)</h2>
       
       <p className="text-gray-700 mb-6 leading-relaxed max-w-5xl text-lg">
          QFT adalah komponen <strong>inti</strong> dari banyak algoritma kuantum (termasuk algoritma Shor). 
          Ia mentransformasikan keadaan dari basis komputasi (waktu/nilai) ke basis Fourier (frekuensi/fase).
       </p>

       {/* Visualization Container */}
       <div className="flex-1 flex flex-col justify-center items-center">
          
          <div className="flex items-center justify-center w-full max-w-6xl space-x-4 md:space-x-8 mb-8">
              
              {/* Left: Input Spike (Computational Basis) */}
              <div className="flex flex-col items-center animate-input">
                  <div className="w-64 h-48 bg-white border-l-2 border-b-2 border-gray-800 relative p-4 shadow-sm">
                      {/* Grid Lines */}
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:20px_20px] opacity-50"></div>
                      
                      {/* The Spike */}
                      <div className="absolute bottom-0 left-[40%] w-4 bg-blue-600 h-[80%] opacity-90 shadow-md"></div>
                      
                      {/* Labels */}
                      <div className="absolute -bottom-6 left-[40%] text-sm font-mono font-bold">|j⟩</div>
                      {/* Arrow tips */}
                      <div className="absolute -left-1.5 -top-2 w-3 h-3 border-t-2 border-l-2 border-gray-800 rotate-45"></div>
                      <div className="absolute -right-2 -bottom-1.5 w-3 h-3 border-t-2 border-r-2 border-gray-800 rotate-45"></div>
                  </div>
                  <div className="text-xs font-semibold mt-6 text-gray-600 bg-gray-100 px-3 py-1 rounded-full">Basis Komputasi</div>
              </div>

              {/* Arrow */}
              <div className="text-gray-400 text-3xl">⟶</div>

              {/* Center: QFT Box */}
              <div className="relative w-40 h-32 animate-box z-10">
                 <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-200 border-2 border-blue-400 shadow-xl rounded-lg transform skew-y-3 z-10 flex items-center justify-center">
                    <span className="text-4xl font-black text-blue-900 drop-shadow-md">QFT</span>
                 </div>
                 {/* 3D Depth Effect */}
                 <div className="absolute inset-0 bg-blue-900 rounded-lg transform translate-x-3 translate-y-3 skew-y-3 opacity-20 z-0"></div>
              </div>

              {/* Arrow */}
              <div className="text-gray-400 text-3xl">⟶</div>

              {/* Right: Output Waves (Fourier Basis) - FLOWING ANIMATION */}
              <div className="flex flex-col items-center animate-output">
                  <div className="w-64 h-48 bg-white border-l-2 border-b-2 border-gray-800 relative shadow-sm overflow-hidden">
                      {/* Grid Lines */}
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:20px_20px] opacity-50 z-0"></div>
                      
                      {/* Flowing Waves Container */}
                      <div className="absolute inset-0 w-[200%] h-full flex z-10 flowing-wave opacity-80">
                         {/* SVG repeated twice to create seamless loop */}
                         <svg className="w-1/2 h-full" preserveAspectRatio="none" viewBox="0 0 200 120">
                            <path d="M0,60 C40,20 60,100 100,60 C140,20 160,100 200,60" fill="none" stroke="#3B82F6" strokeWidth="3" />
                            <path d="M0,60 C50,90 80,10 100,60 C150,90 180,10 200,60" fill="none" stroke="#F59E0B" strokeWidth="2" opacity="0.6" />
                         </svg>
                         <svg className="w-1/2 h-full" preserveAspectRatio="none" viewBox="0 0 200 120">
                            <path d="M0,60 C40,20 60,100 100,60 C140,20 160,100 200,60" fill="none" stroke="#3B82F6" strokeWidth="3" />
                            <path d="M0,60 C50,90 80,10 100,60 C150,90 180,10 200,60" fill="none" stroke="#F59E0B" strokeWidth="2" opacity="0.6" />
                         </svg>
                      </div>

                      {/* Labels */}
                      <div className="absolute bottom-1 w-full flex justify-between px-2 text-[8px] text-gray-400 font-mono z-20">
                         <span>|k⟩</span><span>|k⟩</span><span>|k⟩</span><span>|k⟩</span><span>|k⟩</span><span>|k⟩</span><span>|k⟩</span>
                      </div>
                      
                      {/* Arrow tips */}
                      <div className="absolute -left-1.5 -top-2 w-3 h-3 border-t-2 border-l-2 border-gray-800 rotate-45 z-20"></div>
                      <div className="absolute -right-2 -bottom-1.5 w-3 h-3 border-t-2 border-r-2 border-gray-800 rotate-45 z-20"></div>
                  </div>
                  <div className="text-xs font-semibold mt-6 text-gray-600 bg-gray-100 px-3 py-1 rounded-full">Basis Fourier (Fase)</div>
              </div>
          </div>

          {/* Formula with Explanation */}
          <div className="mt-6 w-full max-w-4xl">
             <div className="bg-white p-6 rounded-2xl shadow-lg border border-blue-100 flex items-center justify-around relative">
                 
                 {/* The Formula */}
                 <div className="scale-125">
                    <MathFormula tex="QFT|j⟩ = \frac{1}{\sqrt{N}} \sum_{k=0}^{N-1} e^{\frac{2\pi i j k}{N}} |k⟩" large />
                 </div>

                 {/* Explanations connected to parts */}
                 <div className="absolute -top-4 left-10 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded border border-yellow-200 shadow-sm">
                    <strong>Normalisasi</strong><br/>Energi tetap 100%
                 </div>

                 <div className="absolute -bottom-4 left-1/3 bg-green-100 text-green-800 text-xs px-2 py-1 rounded border border-green-200 shadow-sm">
                    <strong>Superposisi</strong><br/>Menjumlahkan semua state
                 </div>

                 <div className="absolute -top-4 right-20 bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded border border-purple-200 shadow-sm">
                    <strong>Rotasi Fase</strong><br/>Inti interferensi kuantum
                 </div>
             </div>
             
             <div className="mt-4 text-center text-gray-500 text-sm italic">
                Rumus ini mengubah amplitudo state dari domain komputasi ke domain frekuensi.
             </div>
          </div>

       </div>
    </div>
  );
};