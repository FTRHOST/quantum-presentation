import React from 'react';
import { Gate, Wire, Measure, XCircleGate } from '../CircuitComponents';

export const Slide6_DJ_Intro = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold text-blue-800 mb-2">Algoritma Deutsch-Jozsa</h2>
      <p className="text-gray-500 text-lg mb-8">Struktur Umum & Prinsip Phase Kickback</p>

      <div className="w-full max-w-5xl grid grid-cols-1 gap-8 items-center">
        
        {/* General Circuit Diagram */}
        <div className="bg-white p-6 rounded-xl border border-gray-300 shadow-lg relative overflow-x-auto">
            <h3 className="text-sm font-bold text-gray-500 mb-4 uppercase tracking-wider">Skema Sirkuit Umum</h3>
            
            {/* 
               We use a rigid structure here to ensure vertical alignment.
               Col 1: Initialization 1 (Input H, Ancilla X)
               Col 2: Initialization 2 (Input Wire Spacer, Ancilla H)
               Col 3: Oracle Uf
               Col 4: Post-processing (Input H, Ancilla Wire)
               Col 5: Measurement
            */}
            
            <div className="flex flex-col gap-6 min-w-max relative">
                
                {/* Oracle Box Overlay - Absolute Positioned to span columns */}
                <div className="absolute top-[28px] left-[248px] w-[96px] h-[104px] border-2 border-black bg-gray-100 flex items-center justify-center z-0">
                    <span className="font-serif italic font-bold text-xl">U_f</span>
                </div>

                {/* Input Register */}
                <div className="flex items-center z-10">
                    <div className="w-24 text-right font-mono font-bold text-gray-700 mr-4">Input |0⟩</div>
                    
                    {/* Col 1 */}
                    <Gate label="H" />
                    
                    {/* Col 2: Spacer Wire to match Ancilla's H gate */}
                    <div className="w-16"><Wire /></div>
                    
                    {/* Col 3: Oracle Pass-through */}
                    <div className="w-24 h-10 flex items-center justify-center">
                       <div className="w-full h-0.5 bg-black"></div>
                    </div>
                    
                    {/* Col 4 */}
                    <Gate label="H" />
                    
                    {/* Col 5 */}
                    <Measure />
                </div>

                {/* Ancilla Register */}
                <div className="flex items-center z-10">
                    <div className="w-24 text-right font-mono font-bold text-gray-700 mr-4">Ancilla |0⟩</div>
                    
                    {/* Col 1: Phase Kickback Prep (Step 1: X) */}
                    <XCircleGate /> 
                    
                    {/* Col 2: Phase Kickback Prep (Step 2: H) */}
                    <Gate label="H" />
                    
                    {/* Col 3: Oracle Pass-through */}
                    <div className="w-24 h-10 flex items-center justify-center">
                       <div className="w-full h-0.5 bg-black"></div>
                    </div>

                    {/* Col 4: Wire */}
                    <div className="w-16"><Wire /></div>
                    
                    {/* Col 5: Wire */}
                    <div className="w-16"><Wire /></div>
                </div>
            </div>

            {/* Explanatory Overlay */}
            <div className="absolute top-1/2 right-10 transform -translate-y-1/2 bg-yellow-50 border border-yellow-200 p-3 rounded shadow text-xs text-yellow-800 max-w-xs">
                <strong>Phase Kickback:</strong><br/>
                Ancilla disiapkan di state <strong>|-⟩</strong> (via X lalu H).<br/>
                Ini menyebabkan nilai fungsi <em>f(x)</em> "terpantul" ke fase qubit input, memungkinkan interferensi terjadi di akhir sirkuit.
            </div>
        </div>

        {/* Comparison Text */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
            <h3 className="font-bold text-blue-900 text-lg mb-2">Problem Oracle</h3>
            <p className="text-gray-700 mb-2">
              Diberikan fungsi <span className="math font-serif">f: {'{0,1}'} → {'{0,1}'}</span>, tentukan apakah fungsi tersebut:
            </p>
            <ul className="list-disc list-inside text-gray-700 ml-2 text-sm">
              <li><strong>Konstan:</strong> Output selalu sama (f(0)=f(1)).</li>
              <li><strong>Seimbang:</strong> Output berbeda (f(0)≠f(1)).</li>
            </ul>
          </div>

          <div className="space-y-4 flex flex-col justify-center">
             <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                <span className="font-bold text-gray-600">Pendekatan Klasik</span>
                <span className="text-red-600 font-bold">2 Evaluasi</span>
             </div>
             <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                <span className="font-bold text-blue-800">Algoritma Deutsch-Jozsa</span>
                <span className="text-green-600 font-bold">1 Evaluasi</span>
             </div>
             <p className="text-xs text-gray-500 mt-2">
                 Interferensi kuantum memungkinkan kita menentukan sifat global fungsi (konstan/seimbang) tanpa mengetahui nilai output spesifiknya.
             </p>
          </div>
        </div>

      </div>
    </div>
  );
};