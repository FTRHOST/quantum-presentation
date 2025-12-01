import React from 'react';
import { Gate, Wire, ControlDot, TargetX, MathFormula } from '../CircuitComponents';

export const Slide4_Entanglement = () => {
  return (
    <div className="h-full flex flex-col relative">
      <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-6 border-b pb-4">Keterikatan (Entanglement)</h2>

      <div className="mb-8">
        <p className="text-gray-800 text-xl leading-relaxed max-w-4xl">
          Keterikatan adalah fenomena di mana keadaan beberapa qubit tidak dapat dideskripsikan secara independen.
          Pengukuran pada satu qubit secara instan memengaruhi qubit lainnya.
        </p>
        
        <div className="mt-6 bg-indigo-50 p-6 rounded-xl border border-indigo-100 flex flex-col md:flex-row items-center justify-between">
           <div>
              <h3 className="text-xl font-bold text-indigo-900 mb-2">Studi Kasus: Keadaan Bell (Bell State)</h3>
              <p className="text-gray-700">Salah satu keadaan terikat dua-qubit yang paling maksimal.</p>
           </div>
           <div className="mt-4 md:mt-0 bg-white px-8 py-4 rounded-lg shadow-sm border border-indigo-200">
               <MathFormula tex="|Φ^+⟩ = \frac{1}{\sqrt{2}}(|00⟩ + |11⟩)" large />
           </div>
        </div>
      </div>

      <div className="flex-1 bg-white border border-gray-200 rounded-xl p-8 shadow-inner flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute top-4 left-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Sirkuit Pembangkit</div>
        
        {/* Circuit Diagram */}
        <div className="flex flex-col relative transform scale-110 md:scale-125 origin-center my-8">
          {/* Qubit 0 */}
          <div className="flex items-center relative" style={{ marginBottom: '40px' }}>
            <span className="w-10 font-mono font-bold text-xl text-gray-600 mr-4">q0</span>
            <div className="w-16"><Wire /></div>
            <Gate label="H" description="Menciptakan superposisi 50/50 pada q0" />
            <div className="w-16"><Wire /></div>
            {/* Control Point for CNOT */}
            <div className="h-10 flex items-center justify-center w-16 relative">
               <div className="absolute w-full h-0.5 bg-gray-800"></div>
               <ControlDot />
               {/* Vertical Line spanning exactly 40px (margin) + 40px (half height of next row) */}
               <div className="absolute top-1/2 left-1/2 w-0.5 bg-black -translate-x-1/2 z-0" style={{ height: '80px' }}></div> 
            </div>
            <div className="w-16"><Wire /></div>
            <div className="w-8"><Wire /></div>
          </div>

          {/* Qubit 1 */}
          <div className="flex items-center relative">
            <span className="w-10 font-mono font-bold text-xl text-gray-600 mr-4">q1</span>
            <div className="w-16"><Wire /></div>
            <div className="w-16"><Wire /></div>
            <div className="w-16"><Wire /></div>
            <TargetX /> {/* Target for CNOT */}
            <div className="w-16"><Wire /></div>
            <div className="w-8"><Wire /></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mt-4">
           <div className="bg-yellow-50 p-4 rounded border-l-4 border-yellow-400">
              <span className="font-bold text-gray-900 block mb-1">1. Superposisi (Hadamard)</span>
              <p className="text-sm text-gray-700">Gerbang H pada q0 membuat keadaan menjadi kombinasi |0⟩ dan |1⟩.</p>
           </div>
           <div className="bg-green-50 p-4 rounded border-l-4 border-green-400">
              <span className="font-bold text-gray-900 block mb-1">2. Entanglement (CNOT)</span>
              <p className="text-sm text-gray-700">Gerbang CNOT menghubungkan q0 dan q1. Jika q0=1, q1 dibalik. Karena q0 superposisi, q1 ikut "terikat".</p>
           </div>
        </div>

        {/* QR Code Section */}
        <div className="absolute bottom-4 right-4 flex flex-col items-center opacity-70 hover:opacity-100 transition-opacity p-2 bg-white/80 rounded border border-gray-100 shadow-sm">
            <img 
            src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https://kuantumsaga.vercel.app" 
            alt="Scan for Live Demo" 
            className="w-16 h-16 mix-blend-multiply"
            />
            <span className="text-[9px] text-gray-500 mt-1 font-mono">Live Demo</span>
        </div>
      </div>
    </div>
  );
};