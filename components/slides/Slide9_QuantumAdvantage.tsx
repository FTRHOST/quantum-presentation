import React from 'react';
import { ArrowRight, CheckCircle, AlertCircle, Clock, Zap } from 'lucide-react';

export const Slide9_QuantumAdvantage = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-700 mb-2">
        Satu Kueri. Jawaban Pasti.
      </h2>
      <p className="text-gray-500 mb-10 text-lg uppercase tracking-widest font-semibold">Keunggulan Kuantum Nyata</p>
      
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Classical Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden group hover:shadow-xl transition-all duration-300">
           <div className="bg-gray-100 p-6 flex items-center justify-between border-b border-gray-200">
              <div className="flex items-center space-x-3">
                 <div className="p-2 bg-gray-300 rounded-lg"><Clock size={24} className="text-gray-700"/></div>
                 <h3 className="text-2xl font-bold text-gray-700">Klasik</h3>
              </div>
              <span className="text-sm font-bold text-gray-500 px-3 py-1 bg-gray-200 rounded-full">Lambat</span>
           </div>
           
           <div className="p-8">
              <div className="flex items-center space-x-4 mb-6 opacity-75">
                 <div className="flex-1 bg-gray-100 border border-gray-300 p-3 rounded text-center text-sm font-mono">Evaluasi 1</div>
                 <ArrowRight className="text-gray-400" />
                 <div className="flex-1 bg-gray-100 border border-gray-300 p-3 rounded text-center text-sm font-mono">Evaluasi 2</div>
                 <ArrowRight className="text-gray-400" />
                 <div className="flex-1 bg-green-50 border border-green-200 p-3 rounded text-center text-sm font-bold text-green-700">Jawaban</div>
              </div>

              <div className="space-y-4">
                 <div className="flex items-start">
                    <AlertCircle className="text-red-500 mt-1 mr-3 shrink-0" size={20} />
                    <div>
                       <div className="font-bold text-gray-800">Inefisien</div>
                       <p className="text-sm text-gray-600">Membutuhkan 2 kueri dalam kasus terburuk untuk membedakan fungsi.</p>
                    </div>
                 </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                 <span className="text-4xl font-black text-gray-300">2 Evaluasi</span>
              </div>
           </div>
        </div>

        {/* Quantum Card */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-xl border border-blue-200 overflow-hidden transform md:-translate-y-4 transition-all duration-300 ring-2 ring-blue-400/30">
           <div className="bg-blue-600 p-6 flex items-center justify-between shadow-sm">
              <div className="flex items-center space-x-3">
                 <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm"><Zap size={24} className="text-yellow-300 fill-current"/></div>
                 <h3 className="text-2xl font-bold text-white">Kuantum</h3>
              </div>
              <span className="text-sm font-bold text-blue-900 px-3 py-1 bg-yellow-400 rounded-full shadow">Instan</span>
           </div>
           
           <div className="p-8">
              <div className="flex items-center space-x-4 mb-6">
                 <div className="flex-grow bg-blue-100 border-2 border-blue-500 p-4 rounded-lg text-center font-bold text-blue-800 shadow-md relative overflow-hidden group-hover:scale-105 transition-transform">
                    <span className="relative z-10">1 KUERI PARALEL</span>
                    <div className="absolute top-0 left-0 w-full h-full bg-blue-200 opacity-0 group-hover:opacity-30 transition-opacity"></div>
                 </div>
                 <ArrowRight className="text-blue-500" size={32} />
                 <div className="flex-none bg-green-100 border-2 border-green-500 p-4 rounded-lg text-center font-bold text-green-700 shadow-md">
                    JAWABAN PASTI
                 </div>
              </div>

              <div className="space-y-4">
                 <div className="flex items-start">
                    <CheckCircle className="text-green-500 mt-1 mr-3 shrink-0" size={20} />
                    <div>
                       <div className="font-bold text-gray-800">Superposisi & Interferensi</div>
                       <p className="text-sm text-gray-600">Mengevaluasi semua kemungkinan input sekaligus dalam satu langkah.</p>
                    </div>
                 </div>
              </div>

              <div className="mt-8 pt-6 border-t border-blue-100 text-center">
                 <span className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 drop-shadow-sm">1 Evaluasi</span>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};